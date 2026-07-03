#!/usr/bin/env node
/**
 * Creates branded MP4 promo videos in public/promo/
 * Run: npm run generate:promo
 *
 * Output files can be uploaded to Canva, CapCut, etc. to add music,
 * and are also used by the LTL site video players.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "promo");
const tmpDir = join(outDir, ".tmp");
const ffmpeg = ffmpegInstaller.path;

const SERIF_FONT =
  process.platform === "darwin"
    ? "/System/Library/Fonts/Supplemental/Georgia.ttf"
    : "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf";

const SANS_FONT =
  process.platform === "darwin"
    ? "/System/Library/Fonts/Supplemental/Arial.ttf"
    : "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf";

const PODCAST_URL_DISPLAY = "ltlpulse.com/podcast";

const C = {
  gold: "0xFFB400",
  white: "0xF5F5F5",
  gray: "0xC8C8D2",
  trailerBg: "0x0A081B",
  teaserBg: "0x151518",
  card: "0x1E1E24",
};

function esc(text) {
  return text
    .replace(/\\/g, "\\\\\\\\")
    .replace(/:/g, "\\:")
    .replace(/'/g, "'\\''");
}

/** Bump all on-video text ~25% and add a soft edge for readability. */
const TEXT_SCALE = 1.25;

/** Extra bump for 9:16 portrait exports — phone portrait playback. */
const PORTRAIT_TEXT_BOOST = 1.3;

function portraitSize(size) {
  return Math.round(size * PORTRAIT_TEXT_BOOST);
}

/** Scene fade — soft trailer-style in/out between title cards. */
const SCENE_FADE = 0.4;

/** Default line fade-in timing (seconds) — episode teasers. */
const LINE_FADE = 0.55;
const LINE_STAGGER = 0.5;
const LINE_BASE_DELAY = 0.45;

/** Snappier pacing for homepage launch trailer only. */
const LAUNCH_TRAILER_TIMING = {
  sceneFade: 0.3,
  lineFade: 0.42,
  lineStagger: 0.34,
  lineBaseDelay: 0.3,
};

function launchSceneLines(lines) {
  return sceneLines(lines, {
    baseDelay: LAUNCH_TRAILER_TIMING.lineBaseDelay,
    stagger: LAUNCH_TRAILER_TIMING.lineStagger,
    fadeIn: LAUNCH_TRAILER_TIMING.lineFade,
  });
}

function fadeAlphaExpr(delay, fadeIn) {
  const end = delay + fadeIn;
  return `if(lt(t\\,${delay})\\,0\\,if(lt(t\\,${end})\\,(t-${delay})/${fadeIn}\\,1))`;
}

function drawLine({
  text,
  y,
  size = 48,
  color = C.white,
  font = SERIF_FONT,
  delay = LINE_BASE_DELAY,
  fadeIn = LINE_FADE,
}) {
  const fontsize = Math.round(size * TEXT_SCALE);
  const alpha = fadeAlphaExpr(delay, fadeIn);
  return `drawtext=fontfile='${font}':text='${esc(text)}':fontsize=${fontsize}:fontcolor=${color}:borderw=3:bordercolor=0x000000@0.5:x=(w-text_w)/2:y=${y}:alpha='${alpha}'`;
}

/** Stagger multiple on-video lines within a scene. */
function sceneLines(lines, { baseDelay = LINE_BASE_DELAY, stagger = LINE_STAGGER, fadeIn = LINE_FADE } = {}) {
  return lines.map((line, index) =>
    drawLine({
      ...line,
      delay: baseDelay + index * stagger,
      fadeIn,
    }),
  );
}

function renderScene({ width, height, duration, bg, filters, outFile, sceneFade = SCENE_FADE }) {
  const parts = [];
  if (sceneFade) {
    parts.push(`fade=t=in:st=0:d=${sceneFade}:alpha=1`);
  }
  parts.push(...filters);
  if (sceneFade) {
    parts.push(`fade=t=out:st=${Math.max(0, duration - sceneFade)}:d=${sceneFade}:alpha=1`);
  }
  const vf = parts.join(",");
  execFileSync(
    ffmpeg,
    [
      "-y",
      "-f",
      "lavfi",
      "-i",
      `color=c=${bg}:s=${width}x${height}:d=${duration}:r=30`,
      "-vf",
      vf,
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      outFile,
    ],
    { stdio: "inherit" },
  );
}

function concatSegments(segmentFiles, outFile) {
  const listPath = join(tmpDir, "concat.txt");
  writeFileSync(
    listPath,
    segmentFiles.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join("\n"),
  );
  execFileSync(
    ffmpeg,
    [
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      listPath,
      "-c",
      "copy",
      "-movflags",
      "+faststart",
      outFile,
    ],
    { stdio: "inherit" },
  );
}

function launchTrailerLandscapeScenes(h, bg) {
  return [
    {
      d: 2.8,
      bg,
      filters: launchSceneLines([
        {
          text: "LTL CONVERSATIONS",
          y: h * 0.38,
          size: 52,
          color: C.gold,
          font: SANS_FONT,
        },
        {
          text: "EPISODE 1",
          y: h * 0.48,
          size: 44,
          color: C.gray,
          font: SANS_FONT,
        },
      ]),
    },
    {
      d: 4,
      bg,
      filters: launchSceneLines([
        {
          text: "Where leadership meets culture",
          y: h * 0.38,
          size: 88,
        },
        {
          text: "The engine that makes your business last",
          y: h * 0.54,
          size: 50,
          color: C.gray,
          font: SANS_FONT,
        },
      ]),
    },
    {
      d: 4,
      bg,
      filters: launchSceneLines([
        {
          text: "The full LTL team opens Season 1",
          y: h * 0.38,
          size: 62,
          color: C.gold,
        },
        {
          text: "A Full Table conversation — free to listen",
          y: h * 0.52,
          size: 46,
          color: C.gray,
          font: SANS_FONT,
        },
      ]),
    },
    {
      d: 3.5,
      bg,
      filters: launchSceneLines([
        {
          text: "Unlocks Wednesday",
          y: h * 0.4,
          size: 68,
          color: C.gold,
        },
        {
          text: "November 18, 2026",
          y: h * 0.52,
          size: 58,
        },
      ]),
    },
    {
      d: 3.5,
      bg,
      filters: launchSceneLines([
        { text: "Tune in free", y: h * 0.4, size: 84, color: C.gold },
        {
          text: PODCAST_URL_DISPLAY,
          y: h * 0.54,
          size: 46,
          color: C.gray,
          font: SANS_FONT,
        },
      ]),
    },
  ];
}

function launchTrailerPortraitScenes(h, bg) {
  return [
    {
      d: 2.5,
      bg,
      filters: launchSceneLines([
        {
          text: "LTL CONVERSATIONS",
          y: h * 0.34,
          size: portraitSize(42),
          color: C.gold,
          font: SANS_FONT,
        },
        {
          text: "EPISODE 1",
          y: h * 0.4,
          size: portraitSize(38),
          color: C.gray,
          font: SANS_FONT,
        },
      ]),
    },
    {
      d: 3.2,
      bg,
      filters: launchSceneLines([
        {
          text: "Where leadership",
          y: h * 0.36,
          size: portraitSize(72),
        },
        {
          text: "meets culture",
          y: h * 0.46,
          size: portraitSize(72),
        },
      ]),
    },
    {
      d: 3,
      bg,
      filters: launchSceneLines([
        {
          text: "The engine that makes",
          y: h * 0.38,
          size: portraitSize(52),
          color: C.gray,
          font: SANS_FONT,
        },
        {
          text: "your business last",
          y: h * 0.48,
          size: portraitSize(52),
          color: C.gray,
          font: SANS_FONT,
        },
      ]),
    },
    {
      d: 3,
      bg,
      filters: launchSceneLines([
        {
          text: "Full LTL team · Season 1",
          y: h * 0.38,
          size: portraitSize(56),
          color: C.gold,
        },
        {
          text: "Unlocks Nov 18, 2026",
          y: h * 0.48,
          size: portraitSize(48),
        },
      ]),
    },
    {
      d: 2.8,
      bg,
      filters: launchSceneLines([
        { text: "Tune in free", y: h * 0.4, size: portraitSize(64), color: C.gold },
        {
          text: PODCAST_URL_DISPLAY,
          y: h * 0.52,
          size: portraitSize(36),
          color: C.gray,
          font: SANS_FONT,
        },
      ]),
    },
  ];
}

function buildLaunchTrailerLandscape(bg, filename) {
  const w = 1920;
  const h = 1080;
  return renderVideo(launchTrailerLandscapeScenes(h, bg), w, h, filename, {
    sceneFade: LAUNCH_TRAILER_TIMING.sceneFade,
  });
}

function buildLaunchTrailerPortrait(bg, filename) {
  const w = 1080;
  const h = 1920;
  return renderVideo(launchTrailerPortraitScenes(h, bg), w, h, filename, {
    sceneFade: LAUNCH_TRAILER_TIMING.sceneFade,
  });
}

function buildLaunchTrailerPlatform() {
  buildLaunchTrailerLandscape(C.trailerBg, "launch-trailer-landscape.mp4");
  buildLaunchTrailerPortrait(C.trailerBg, "launch-trailer-portrait.mp4");
}

function buildLaunchTrailerMagazine() {
  buildLaunchTrailerLandscape(C.teaserBg, "launch-trailer-magazine-landscape.mp4");
  buildLaunchTrailerPortrait(C.teaserBg, "launch-trailer-magazine-portrait.mp4");
}

function buildEpisode01Landscape() {
  const w = 1920;
  const h = 1080;
  const scenes = [
    {
      d: 3,
      bg: C.teaserBg,
      filters: sceneLines([
        {
          text: "LTL CONVERSATIONS",
          y: h * 0.3,
          size: 48,
          color: C.gold,
          font: SANS_FONT,
        },
        {
          text: "EPISODE 1 · COMING SOON",
          y: h * 0.38,
          size: 44,
          color: C.gray,
          font: SANS_FONT,
        },
      ]),
    },
    {
      d: 5,
      bg: C.teaserBg,
      filters: [
        drawLine({
          text: "Where leadership meets culture",
          y: h * 0.42,
          size: 78,
        }),
      ],
    },
    {
      d: 5,
      bg: C.teaserBg,
      filters: sceneLines([
        {
          text: "Leadership and culture are the engine",
          y: h * 0.38,
          size: 48,
          color: C.gray,
          font: SANS_FONT,
        },
        {
          text: "that makes your business last.",
          y: h * 0.48,
          size: 48,
          color: C.gray,
          font: SANS_FONT,
        },
      ]),
    },
    {
      d: 4,
      bg: C.teaserBg,
      filters: sceneLines([
        {
          text: "Unlocks Wednesday, Nov 18, 2026",
          y: h * 0.38,
          size: 56,
          color: C.gold,
        },
        {
          text: "Free on LTL Pulse",
          y: h * 0.5,
          size: 48,
          font: SANS_FONT,
        },
      ]),
    },
  ];
  return renderVideo(scenes, w, h, "episode-01-landscape.mp4");
}

function buildEpisode01Portrait() {
  const w = 1080;
  const h = 1920;
  const scenes = [
    {
      d: 3,
      bg: C.teaserBg,
      filters: sceneLines([
        {
          text: "LTL CONVERSATIONS",
          y: h * 0.32,
          size: portraitSize(42),
          color: C.gold,
          font: SANS_FONT,
        },
        {
          text: "EPISODE 1 · COMING SOON",
          y: h * 0.38,
          size: portraitSize(38),
          color: C.gray,
          font: SANS_FONT,
        },
      ]),
    },
    {
      d: 4,
      bg: C.teaserBg,
      filters: sceneLines([
        {
          text: "Where leadership",
          y: h * 0.38,
          size: portraitSize(64),
        },
        {
          text: "meets culture",
          y: h * 0.46,
          size: portraitSize(64),
        },
      ]),
    },
    {
      d: 4,
      bg: C.teaserBg,
      filters: sceneLines([
        {
          text: "Unlocks Wed, Nov 18, 2026",
          y: h * 0.4,
          size: portraitSize(52),
          color: C.gold,
        },
        {
          text: "Free on LTL Pulse",
          y: h * 0.5,
          size: portraitSize(44),
          font: SANS_FONT,
        },
      ]),
    },
    {
      d: 4,
      bg: C.teaserBg,
      filters: [
        drawLine({
          text: PODCAST_URL_DISPLAY,
          y: h * 0.44,
          size: portraitSize(36),
          color: C.gray,
          font: SANS_FONT,
        }),
      ],
    },
  ];
  return renderVideo(scenes, w, h, "episode-01-portrait.mp4");
}

function renderVideo(scenes, width, height, filename, { sceneFade = SCENE_FADE } = {}) {
  const segments = scenes.map((scene, index) => {
    const segPath = join(tmpDir, `${filename}-${index}.mp4`);
    renderScene({
      width,
      height,
      duration: scene.d,
      bg: scene.bg,
      filters: scene.filters,
      outFile: segPath,
      sceneFade,
    });
    return segPath;
  });

  const outPath = join(outDir, filename);
  concatSegments(segments, outPath);
  segments.forEach((seg) => {
    if (existsSync(seg)) unlinkSync(seg);
  });
  console.log(`✓ ${filename}`);
  return outPath;
}

function main() {
  if (!existsSync(SERIF_FONT)) {
    console.error(
      `Font not found at ${SERIF_FONT}. Install Georgia/DejaVu or edit font paths in scripts/generate-promo-videos.mjs`,
    );
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });
  mkdirSync(tmpDir, { recursive: true });

  console.log("Creating promo MP4 files in public/promo/ …\n");

  buildLaunchTrailerPlatform();
  buildLaunchTrailerMagazine();
  buildEpisode01Landscape();
  buildEpisode01Portrait();

  console.log("\nDone. Upload these MP4s to Canva/CapCut for music, or use on the site as-is.");
}

main();

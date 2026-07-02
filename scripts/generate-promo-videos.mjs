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

function drawLine({ text, y, size = 48, color = C.white, font = SERIF_FONT }) {
  return `drawtext=fontfile='${font}':text='${esc(text)}':fontsize=${size}:fontcolor=${color}:x=(w-text_w)/2:y=${y}`;
}

function renderScene({ width, height, duration, bg, filters, outFile }) {
  const vf = filters.join(",");
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

function buildLaunchTrailerLandscape() {
  const w = 1920;
  const h = 1080;
  const scenes = [
    {
      d: 4,
      bg: C.trailerBg,
      filters: [
        drawLine({ text: "LTL Pulse", y: h * 0.42, size: 120, color: C.gold }),
      ],
    },
    {
      d: 5,
      bg: C.trailerBg,
      filters: [
        drawLine({
          text: "Where leadership meets culture",
          y: h * 0.38,
          size: 88,
        }),
        drawLine({
          text: "Practical leadership for growing service businesses",
          y: h * 0.54,
          size: 48,
          color: C.gray,
          font: SANS_FONT,
        }),
      ],
    },
    {
      d: 6,
      bg: C.trailerBg,
      filters: [
        drawLine({ text: "12 free conversations", y: h * 0.36, size: 76 }),
        drawLine({
          text: "One unlocks every week",
          y: h * 0.5,
          size: 64,
          color: C.gold,
        }),
      ],
    },
    {
      d: 5,
      bg: C.trailerBg,
      filters: [
        drawLine({
          text: "Season 1 begins",
          y: h * 0.36,
          size: 72,
          color: C.gold,
        }),
        drawLine({
          text: "Wednesday, November 18, 2026",
          y: h * 0.5,
          size: 58,
        }),
      ],
    },
    {
      d: 5,
      bg: C.trailerBg,
      filters: [
        drawLine({ text: "Listen free", y: h * 0.38, size: 88, color: C.gold }),
        drawLine({
          text: "ltl-pulse.vercel.app/podcast",
          y: h * 0.52,
          size: 46,
          color: C.gray,
          font: SANS_FONT,
        }),
      ],
    },
  ];
  return renderVideo(scenes, w, h, "launch-trailer-landscape.mp4");
}

function buildLaunchTrailerPortrait() {
  const w = 1080;
  const h = 1920;
  const scenes = [
    {
      d: 3,
      bg: C.trailerBg,
      filters: [
        drawLine({ text: "LTL Pulse", y: h * 0.4, size: 96, color: C.gold }),
      ],
    },
    {
      d: 4,
      bg: C.trailerBg,
      filters: [
        drawLine({
          text: "Where leadership",
          y: h * 0.36,
          size: 72,
        }),
        drawLine({
          text: "meets culture",
          y: h * 0.46,
          size: 72,
        }),
      ],
    },
    {
      d: 4,
      bg: C.trailerBg,
      filters: [
        drawLine({ text: "12 conversations", y: h * 0.38, size: 64 }),
        drawLine({
          text: "One per week · Free",
          y: h * 0.48,
          size: 52,
          color: C.gold,
        }),
      ],
    },
    {
      d: 4,
      bg: C.trailerBg,
      filters: [
        drawLine({
          text: "Nov 18, 2026",
          y: h * 0.4,
          size: 72,
          color: C.gold,
        }),
        drawLine({
          text: "ltl-pulse.vercel.app/podcast",
          y: h * 0.52,
          size: 38,
          color: C.gray,
          font: SANS_FONT,
        }),
      ],
    },
  ];
  return renderVideo(scenes, w, h, "launch-trailer-portrait.mp4");
}

function buildEpisode01Landscape() {
  const w = 1920;
  const h = 1080;
  const scenes = [
    {
      d: 3,
      bg: C.teaserBg,
      filters: [
        drawLine({
          text: "LTL CONVERSATIONS",
          y: h * 0.3,
          size: 48,
          color: C.gold,
          font: SANS_FONT,
        }),
        drawLine({
          text: "EPISODE 1 · COMING SOON",
          y: h * 0.38,
          size: 44,
          color: C.gray,
          font: SANS_FONT,
        }),
      ],
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
      filters: [
        drawLine({
          text: "Leadership and culture are the engine",
          y: h * 0.38,
          size: 48,
          color: C.gray,
          font: SANS_FONT,
        }),
        drawLine({
          text: "that makes your business last.",
          y: h * 0.48,
          size: 48,
          color: C.gray,
          font: SANS_FONT,
        }),
      ],
    },
    {
      d: 4,
      bg: C.teaserBg,
      filters: [
        drawLine({
          text: "Unlocks Wednesday, Nov 18, 2026",
          y: h * 0.38,
          size: 56,
          color: C.gold,
        }),
        drawLine({
          text: "Free on LTL Pulse",
          y: h * 0.5,
          size: 48,
          font: SANS_FONT,
        }),
      ],
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
      filters: [
        drawLine({
          text: "LTL CONVERSATIONS",
          y: h * 0.32,
          size: 42,
          color: C.gold,
          font: SANS_FONT,
        }),
        drawLine({
          text: "EPISODE 1 · COMING SOON",
          y: h * 0.38,
          size: 38,
          color: C.gray,
          font: SANS_FONT,
        }),
      ],
    },
    {
      d: 4,
      bg: C.teaserBg,
      filters: [
        drawLine({
          text: "Where leadership",
          y: h * 0.38,
          size: 64,
        }),
        drawLine({
          text: "meets culture",
          y: h * 0.46,
          size: 64,
        }),
      ],
    },
    {
      d: 4,
      bg: C.teaserBg,
      filters: [
        drawLine({
          text: "Unlocks Wed, Nov 18, 2026",
          y: h * 0.4,
          size: 52,
          color: C.gold,
        }),
        drawLine({
          text: "Free on LTL Pulse",
          y: h * 0.5,
          size: 44,
          font: SANS_FONT,
        }),
      ],
    },
    {
      d: 4,
      bg: C.teaserBg,
      filters: [
        drawLine({
          text: "ltl-pulse.vercel.app/podcast",
          y: h * 0.44,
          size: 36,
          color: C.gray,
          font: SANS_FONT,
        }),
      ],
    },
  ];
  return renderVideo(scenes, w, h, "episode-01-portrait.mp4");
}

function renderVideo(scenes, width, height, filename) {
  const segments = scenes.map((scene, index) => {
    const segPath = join(tmpDir, `${filename}-${index}.mp4`);
    renderScene({
      width,
      height,
      duration: scene.d,
      bg: scene.bg,
      filters: scene.filters,
      outFile: segPath,
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

  buildLaunchTrailerLandscape();
  buildLaunchTrailerPortrait();
  buildEpisode01Landscape();
  buildEpisode01Portrait();

  console.log("\nDone. Upload these MP4s to Canva/CapCut for music, or use on the site as-is.");
}

main();

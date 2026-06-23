export const sectionFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
} as const;

export const sectionViewport = {
  once: true,
  margin: "-80px",
} as const;

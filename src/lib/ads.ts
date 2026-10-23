export const ADSENSE_CLIENT = "ca-pub-8364820223873979";
export const AD_SLOTS = {
  "tool-rail-right":    { id: "TODO_KLC24", kind: "display-fixed" },
  "tool-below-fold":    { id: "TODO_KLC24", kind: "display-responsive" },
  "guide-in-article":   { id: "TODO_KLC24", kind: "in-article" },
  "time-below-clock":   { id: "TODO_KLC24", kind: "display-responsive" },
  "time-in-article":    { id: "TODO_KLC24", kind: "in-article" },
} as const;
export type AdPlacement = keyof typeof AD_SLOTS;

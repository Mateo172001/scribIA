import { createDarkTheme, createLightTheme } from "@fluentui/react-components";

import type { BrandVariants, Theme } from "@fluentui/react-components";

export const scribIA: BrandVariants = {
  10: "#060202",
  20: "#241111",
  30: "#3F191A",
  40: "#551E21",
  50: "#6C2329",
  60: "#832730",
  70: "#9B2C38",
  80: "#B42F40",
  90: "#CE3348",
  100: "#E83650",
  110: "#F35261",
  120: "#F86D74",
  130: "#FC8588",
  140: "#FF9C9C",
  150: "#FFB4B2",
  160: "#FFCAC8",
};

export const scribIALightTheme: Theme = {
  ...createLightTheme(scribIA),
  colorNeutralBackground1: "#fffbf6",
  colorNeutralStroke1: "#7b7b7b",
};

export const scribIADarkTheme: Theme = {
  ...createDarkTheme(scribIA),
};

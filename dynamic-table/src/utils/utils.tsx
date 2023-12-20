import {
  Color,
  ColorBrightness,
  BaseColor,
  Condition,
  ConditionGroup,
} from "./interfaces";

export const openLink = (url: string) => window.open(url, "_blank")?.focus();

export function isConditionGroup(
  c: Condition | ConditionGroup
): c is ConditionGroup {
  return (c as ConditionGroup).conditions !== undefined;
}

function isBaseColor(c: BaseColor | Color) {
  return (c as Color).base === undefined;
}

export function getColorClassName(color: Color | BaseColor): string {
  if (!color) {
    return "";
  }
  if (isBaseColor(color)) {
    return (color as BaseColor) + "-" + ColorBrightness.Neutral;
  } else {
    return "co-" + (color as Color).base + "-" + (color as Color).brightness;
  }
}

export function sortAlphaNumeric(a: string, b: string) {
  const aa = a.toLowerCase();
  const bb = b.toLowerCase();
  if (aa < bb) {
    return -1;
  }
  if (aa > bb) {
    return 1;
  }
  return 0;
}

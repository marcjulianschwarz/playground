export enum BaseColor {
  Gray = "gray",
  Rose = "rose",
  Raspberry = "raspberry",
  Red = "red",
  Orange = "orange",
  Cinnamon = "cinnamon",
  Amber = "amber",
  Yellow = "yellow",
  Lime = "lime",
  Chartreuse = "chartreuse",
  Green = "green",
  Emerald = "emerald",
  Aquamarine = "aquamarine",
  Teal = "teal",
  Cyan = "cyan",
  Powder = "powder",
  Sky = "sky",
  Cerulean = "cerulean",
  Azure = "azure",
  Blue = "blue",
  Indigo = "indigo",
  Violet = "violet",
  Purple = "purple",
  Magenta = "magenta",
  Pink = "pink",
  White = "",
}

export enum ColorBrightness {
  Deepdark = "6",
  Dark = "5",
  Medium = "4",
  Neutral = "3",
  Light = "2",
  Bright = "1",
}

export interface Color {
  base: BaseColor;
  brightness?: ColorBrightness;
}

export enum ButtonStyle {
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
  Error = "error",
  Next = "next",
  Previous = "previous",
}

export interface MetricData {
  data: number[];
  plot: string;
}

export interface SceneMetrics {
  distGoal: MetricData;
  distWon: MetricData;
  pressure: MetricData;
  avgSpeed: number;
  avgSpeedAtt: number;
  avgSpeedDef: number;
}

export enum BorderStyle {
  Solid = "solid",
  Dashed = "dashed",
  Dotted = "dotted",
  Double = "double",
}

export interface TableColumn {
  title: string;
  key: string;
  type: string;
}

export interface TableData<P> {
  columns: TableColumn[];
  rows: P[];
}

export interface Person {
  name: string;
  lastname?: string;
  age: number;
  address: string;
  phone: string;
  number?: number;
  id: number;
}

export enum Width {
  Small = "small",
  Medium = "medium",
  Large = "large",
  XLarge = "xlarge",
}

export enum Height {
  Small = "small",
  Medium = "medium",
  Large = "large",
  XLarge = "xlarge",
}

export enum Operator {
  EQUAL_TO = "=",
  NOT_EQUAL_TO = "!=",
  GREATER_THAN = ">",
  LESS_THAN = "<",
  INCLUDES = "includes",
}

export interface Condition {
  column: TableColumn;
  value: string;
  operator: Operator;
  type: "string" | "number";
  id: number;
}

export interface ConditionElement {
  conditions: Condition | ConditionGroup;
  column: TableColumn;
  color: Color;
  id: number;
}

export interface ConditionGroup {
  conditions: Condition[];
  type: "AND" | "OR";
}

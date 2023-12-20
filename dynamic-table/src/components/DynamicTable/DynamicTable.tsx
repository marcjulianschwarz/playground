import React from "react";
import { getColorClassName, isConditionGroup } from "../../utils/utils";
import {
  BaseColor,
  Color,
  ColorBrightness,
  Condition,
  ConditionElement,
  ConditionGroup,
  Operator,
  Person,
  TableColumn,
  TableData,
} from "../../utils/interfaces";
import { DynamicTableEntry, entries } from "./DynamicTableEntry";

function DynamicTableRow(props: {
  color?: Color;
  comment?: string;
  children: React.ReactNode[];
}) {
  return (
    <React.Fragment>
      <tr>{props.children}</tr>
      {props.comment ? (
        <tr>
          <td
            colSpan={props.children.length}
            className={getColorClassName({
              base: BaseColor.Amber,
              brightness: ColorBrightness.Bright,
            })}
          >
            <i>{props.comment}</i>
          </td>
        </tr>
      ) : null}
    </React.Fragment>
  );
}

export function DynamicTable<T extends TableData<P>, P>(props: {
  data: T;
  conditions: ConditionElement[];
  onClick?: (row: P, column: TableColumn) => void;
  comment?: (row: P) => string | undefined;
  fullScreen?: boolean;
}) {
  const { data, conditions, onClick, comment, fullScreen } = props;

  function getColor(row: any, conditions: ConditionElement[]): Color {
    if (!conditions) {
      return { base: BaseColor.White, brightness: ColorBrightness.Neutral };
    }

    for (const conditionElement of conditions) {
      if (isConditionGroup(conditionElement.conditions)) {
      } else {
        const condition = conditionElement.conditions as Condition;
        const color = conditionElement.color;

        const value = row[condition.column.key];
        if (!value) {
          return { base: BaseColor.White, brightness: ColorBrightness.Neutral };
        }

        switch (condition.operator) {
          case Operator.EQUAL_TO:
            if (condition.column.type === "string") {
              if (condition.value === value.toString()) {
                return color;
              }
            } else if (condition.column.type === "number") {
              if (Number(condition.value) === Number(value)) {
                return color;
              }
            }
            break;
          case Operator.NOT_EQUAL_TO:
            if (condition.column.type === "string") {
              if (condition.value !== value.toString()) {
                return color;
              }
            } else if (condition.column.type === "number") {
              if (Number(condition.value) !== Number(value)) {
                return color;
              }
            }
            break;

          case Operator.GREATER_THAN:
            if (condition.column.type === "number") {
              if (Number(value) > Number(condition.value)) {
                return color;
              }
            } else {
              if (value > condition.value) {
                return color;
              }
            }
            break;
          case Operator.LESS_THAN:
            if (condition.column.type === "number") {
              if (Number(value) < Number(condition.value)) {
                return color;
              }
            } else {
              if (value < condition.value) {
                return color;
              }
            }
            break;
          case Operator.INCLUDES:
            if (
              condition.column.type === "string" ||
              condition.column.type === "number"
            ) {
              if (value.toString().includes(condition.value.toString())) {
                return color;
              }
            }
            break;
          default:
            return {
              base: BaseColor.White,
              brightness: ColorBrightness.Neutral,
            };
        }
      }
    }
  }

  function showComment(row: P) {
    if (comment) {
      const c = comment(row);
      return c;
    }
  }

  return (
    <div className={"dynamic-table" + (fullScreen ? " fullscreen" : "")}>
      <table>
        <thead>
          <tr>
            {data.columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <DynamicTableRow key={index} comment={showComment(row)}>
              {data.columns.map((column, index) => {
                const Component = entries[column.type] || DynamicTableEntry;
                return (
                  <Component
                    row={row as any as Person}
                    key={index}
                    column={column}
                    color={getColor(
                      row as P,
                      conditions.filter((c) => c.column.key === column.key)
                    )}
                    onClick={onClick as any}
                  >
                    {(row as any as Person)[column.key as keyof Person]}
                  </Component>
                );
              })}
            </DynamicTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}

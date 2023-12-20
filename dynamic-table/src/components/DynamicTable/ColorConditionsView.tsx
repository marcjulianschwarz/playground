import { ChangeEvent, useState } from "react";
import { getColorClassName, isConditionGroup } from "../../utils/utils";
import {
  BaseColor,
  ColorBrightness,
  Condition,
  ConditionElement,
} from "../../utils/interfaces";
import { Button } from "../Button";

export function ColorConditionsView(props: {
  conditions: ConditionElement[];
  onRemoveCondition: (condition: ConditionElement) => void;
}) {
  const [filePath, setFilePath] = useState<string>(
    "/Users/xxx/Desktop/Test/conditions.json"
  );

  let conditions = props.conditions;

  function exportConditions() {
    window.electron.ipcRenderer.send("download", {
      path: filePath,
      data: JSON.stringify(conditions),
    });
  }

  return (
    <div className="color-conditions-view">
      {conditions.map((c) => {
        if (isConditionGroup(c.conditions)) {
        } else {
          const condition = c.conditions as Condition;
          return (
            <div
              key={condition.id}
              className={getColorClassName(c.color) + " color-condition"}
            >
              <div className="color-condition-text">
                Column "{condition.column.title}" {condition.operator} "
                {condition.value}"
              </div>

              <div className="remove-button">
                <Button
                  tooltip="Removes this condition."
                  onClick={() => props.onRemoveCondition(c)}
                  backgroundColor={{
                    base: BaseColor.Red,
                    brightness: ColorBrightness.Neutral,
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        }
      })}

      {conditions.length > 0 ? (
        <div>
          <input
            style={{ width: "300px" }}
            type={"text"}
            onChange={(v: ChangeEvent<HTMLInputElement>) => {
              setFilePath(v.target.value);
            }}
            defaultValue={
              "/Users/xxx/Desktop/Test/conditions.json"
            }
          ></input>
          <Button
            tooltip="Export conditions as JSON"
            onClick={exportConditions}
          >
            Export
          </Button>
        </div>
      ) : null}
    </div>
  );
}

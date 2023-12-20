import { ChangeEvent, useEffect, useState } from "react";
import { sortAlphaNumeric } from "../../utils/utils";
import {
  BaseColor,
  Color,
  ColorBrightness,
  Condition,
  ConditionElement,
  ConditionGroup,
  Operator,
  TableColumn,
} from "../../utils/interfaces";
import { Button } from "../Button";

export function ColorConditionBuilder(props: {
  conditionChange: (condition: ConditionElement) => void;
  onAddCondition: (condition: ConditionElement) => void;
  onImportConditions: (conditions: ConditionElement[]) => void;
  columns: TableColumn[];
}) {
  const [currentCondition, setCurrentCondition] = useState<Condition>({
    column: props.columns[0],
    operator: Operator.EQUAL_TO,
    value: "",
    type: "string",
    id: 0,
  });
  const [currentConditionGroup, setCurrentConditionGroup] =
    useState<ConditionGroup>({ type: "AND", conditions: [] });

  const [color, setColor] = useState<Color>({ base: BaseColor.Blue });
  const [id, setId] = useState<number>(1);
  const [filePath, setFilePath] = useState<string>("");

  const [conditionColumn, setConditionColumn] = useState<TableColumn>(
    props.columns[0]
  );

  // const [column, setColumn] = useState<TableColumn>(props.columns[0]);
  // const [value, setValue] = useState<string>("");
  // const [operator, setOperator] = useState<Operator>(Operator.INCLUDES);

  let allKeys = props.columns.map((c) => c.key);

  useEffect(() => {
    console.log(currentCondition);

    props.conditionChange({
      conditions: currentConditionGroup,
      column: conditionColumn,
      color: color,
      id: id,
    });
  }, [color, currentCondition]);

  async function importConditions() {
    const selectedFile = await window.electron.ipcRenderer.invoke(
      "file-selection"
    );
    if (selectedFile) {
      setFilePath(selectedFile);
      const result = await window.electron.ipcRenderer.invoke("get-data", {
        path: selectedFile,
      });
      const conditions: ConditionElement[] = JSON.parse(result);
      props.onImportConditions(conditions);
    }
  }

  function addConditionToCurrentGroup() {
    const condition = {
      ...currentCondition,
      id: id + 1,
    };

    setId(id + 1);

    console.log(condition);

    setCurrentConditionGroup({
      conditions: [condition, ...currentConditionGroup.conditions],
      type: "AND",
    });
  }

  return (
    <div className="color-condition-builder">
      <div>
        <Button
          tooltip="Import conditions from JSON file"
          onClick={importConditions}
        >
          Import Conditions
        </Button>

        <p>Imported from: {filePath}</p>
      </div>

      <br></br>

      <div className="condition-builder-columns">
        <div className="condition-group-form">
          <h4>Add new conditions:</h4>
          <span>Color Column </span>

          <select
            value={conditionColumn.key}
            onChange={(e) => {
              setConditionColumn(
                props.columns.find((c) => c.key === e.target.value)
              );
            }}
            className="column-select"
          >
            {props.columns.map((column) => (
              <option key={column.key} value={column.key}>
                {column.title}
              </option>
            ))}
          </select>

          <select
            value={color.base}
            onChange={(e) => {
              setColor({ base: e.target.value as BaseColor });
            }}
            className="color-select"
          >
            {Object.keys(BaseColor)
              .sort(sortAlphaNumeric)
              .map((c) => (
                <option key={c} value={BaseColor[c as keyof typeof BaseColor]}>
                  {c}
                </option>
              ))}
          </select>

          <br></br>
          <br></br>

          <span>If</span>

          <select
            value={currentCondition.column.key}
            onChange={(e) => {
              const c = {
                ...currentCondition,
                column: props.columns.find((c) => c.key === e.target.value),
              };
              setCurrentCondition(c);
            }}
            className="column-select"
          >
            {props.columns.map((column) => (
              <option key={column.key} value={column.key}>
                {column.title}
              </option>
            ))}
          </select>

          <select
            value={currentCondition.operator}
            onChange={(e) => {
              const c = {
                ...currentCondition,
                operator: e.target.value as Operator,
              };
              setCurrentCondition(c);
            }}
            className="operator-select"
          >
            {Object.keys(Operator).map((key) => (
              <option key={key} value={Operator[key as keyof typeof Operator]}>
                {key}
              </option>
            ))}
          </select>

          <input
            defaultValue={currentCondition.value}
            onChange={(e) => {
              const c = {
                ...currentCondition,
                value: e.target.value,
              };
              setCurrentCondition(c);
            }}
            className="value-select"
            type={"text"}
          ></input>
          <br></br>
          <Button onClick={addConditionToCurrentGroup}>➕</Button>
        </div>

        <div className="condition-group-view">
          <h4>Current Conditions:</h4>
          {currentConditionGroup.conditions.map((condition) => (
            <p key={condition.id}>{condition.column.title}</p>
          ))}
        </div>
      </div>

      <br></br>
      <br></br>

      <br></br>
      <Button
        tooltip="Adds the condition (group) to the table."
        onClick={() => {
          props.onAddCondition({
            color: color,
            column: conditionColumn,
            conditions: currentConditionGroup,
            id: id,
          });
          setId(id + 1);
        }}
      >
        Add Condition
      </Button>
    </div>
  );
}

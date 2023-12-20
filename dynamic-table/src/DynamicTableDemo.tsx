import { ChangeEvent, FormEvent, useState } from "react";
import {
  BaseColor,
  ColorBrightness,
  Condition,
  ConditionElement,
  Person,
  TableColumn,
  TableData,
} from "./utils/interfaces";
import { DynamicTable } from "./components/DynamicTable/DynamicTable";
import { Sidebar } from "./components/Sidebar";
import { ColorConditionBuilder } from "./components/DynamicTable/ColorConditionBuilder";
import { ColorConditionsView } from "./components/DynamicTable/ColorConditionsView";
import { Button } from "./components/Button";

export function DynamicTableDemo(props: {}) {
  const commentConditions = (row: Person) => {
    const ageCondition = row.age < 18;
    const lastnameCondition = row.lastname;

    let comment = "";

    if (ageCondition) {
      comment += "Age is less than 18. ";
    }
    if (!lastnameCondition) {
      comment += "There is no lastname.";
    }
    return comment;
  };

  const [selectedPerson, setSelectedPerson] = useState<Person>();
  const [selectedColumn, setSelectedColumn] = useState<TableColumn>();
  const [currentJSON, setCurrentJSON] = useState<TableData<Person>>(undefined);
  const [downloadDataFilePath, setDownloadDataFilePath] = useState<string>(
    "/Users/xxx/Desktop/Test/data.json"
  );
  const [tableFilePath, setTableFilePath] = useState<string>("");
  const [fullScreenTable, setFullScreenTable] = useState<boolean>(false);
  const [conditions, setConditions] = useState<ConditionElement[]>([]);

  function handleChange(event: FormEvent<HTMLTextAreaElement>) {
    let newJSON = undefined;
    try {
      newJSON = JSON.parse(event.currentTarget.value);
    } catch (e) {}
    if (newJSON) {
      setCurrentJSON(newJSON);
    }
  }
  function downloadPerson() {
    window.electron.ipcRenderer.send("download", {
      path: downloadDataFilePath,
      data: JSON.stringify(selectedPerson),
    });
  }
  async function getTableData(filePath: string) {
    const result = await window.electron.ipcRenderer.invoke("get-data", {
      path: filePath,
    });
    setCurrentJSON(JSON.parse(result) as TableData<Person>);
    const input = document.getElementById("json-input") as HTMLTextAreaElement;
    if (input) {
      input.value = JSON.stringify(JSON.parse(result), null, 2);
    }
  }
  async function saveToFile() {
    const save = await window.tableAPI.alert.question("Save", "Save Data?");
    if (save) {
      window.electron.ipcRenderer.send("save-data", {
        path: "/Users/xxx/Desktop/Test/table.json",
        data: JSON.stringify(currentJSON),
      });
    }
  }

  async function importTable() {
    const filePath = await window.tableAPI.alert.fileSelection();
    if (filePath) {
      setTableFilePath(filePath);
      getTableData(filePath);
    }
  }

  return (
    <div className="dynamic-table-demo">
      <Sidebar open={!fullScreenTable}>
        <h2>Enter JSON here:</h2>
        <Button tooltip="Open table from JSON file" onClick={importTable}>
          Open Table
        </Button>
        <Button
          tooltip="Saves table to selected JSON file"
          onClick={saveToFile}
        >
          Save Table
        </Button>
        <p>Selected file: {tableFilePath}</p>
        <textarea
          className="json-input"
          id="json-input"
          defaultValue={JSON.stringify(currentJSON, null, 2)}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.metaKey && e.key == "s") {
              saveToFile();
            }
          }}
        />
      </Sidebar>

      {currentJSON ? (
        <div className="main-demo">
          <h1>Dynamic Table Demo</h1>
          <div className="test-table">
            <div>
              <h2>Table</h2>
              <DynamicTable
                data={currentJSON}
                conditions={conditions}
                fullScreen={fullScreenTable}
                onClick={(row: Person, column: TableColumn) => {
                  setSelectedPerson(row);
                  setSelectedColumn(column);
                }}
                comment={commentConditions}
              ></DynamicTable>
              <h3>Create Conditions</h3>
              <ColorConditionBuilder
                columns={currentJSON.columns}
                onAddCondition={(condition: ConditionElement) => {
                  setConditions([...conditions, condition]);
                }}
                onImportConditions={(cs: ConditionElement[]) => {
                  setConditions(cs);
                }}
                conditionChange={(c: ConditionElement) => {
                  const filtered = conditions.filter((c) => {
                    if (c.id !== 0) {
                      return true;
                    }
                    return false;
                  });
                  setConditions([...filtered, c]);
                }}
              ></ColorConditionBuilder>
              <br></br>
              <h3>Active Conditions</h3>
              <ColorConditionsView
                conditions={conditions.filter((c) => c.id !== 0)}
                onRemoveCondition={(c) => {
                  setConditions(conditions.filter((cc) => cc.id !== c.id));
                }}
              ></ColorConditionsView>
            </div>
            {selectedPerson && (
              <div className="selected-table-row">
                <h2>Selected</h2>
                {currentJSON.columns.map((column) => {
                  return (
                    <p
                      key={column.key}
                      className={
                        selectedColumn?.key == column.key
                          ? "co-" +
                            BaseColor.Blue +
                            "-" +
                            ColorBrightness.Light +
                            " selected"
                          : "co-" +
                            BaseColor.White +
                            "-" +
                            ColorBrightness.Light
                      }
                    >
                      {column.title +
                        ": " +
                        (selectedPerson[column.key as keyof Person] || "---")}
                    </p>
                  );
                })}
                <h4>Download</h4>
                <input
                  style={{ width: "300px" }}
                  type={"text"}
                  onChange={(v: ChangeEvent<HTMLInputElement>) => {
                    setDownloadDataFilePath(v.target.value);
                  }}
                  defaultValue={
                    "/Users/xxx/Desktop/Test/data.json"
                  }
                ></input>
                <br></br>
                <br></br>
                <Button
                  tooltip="Download this entry as JSON file"
                  onClick={downloadPerson}
                >
                  Download
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

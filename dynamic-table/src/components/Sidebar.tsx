import React, { useEffect, useState } from "react";
import { Button } from "./Button";

export function Sidebar(props: {
  children: React.ReactNode | React.ReactNode[];
  open?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const [lastWidth, setLastWidth] = useState(200);

  useEffect(() => {
    setOpen(props.open ?? true);
  }, [props.open]);

  function handleOnMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    const rh = document.getElementById("resize-handle-id");

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  }

  function stopResize(e: MouseEvent) {
    window.removeEventListener("mousemove", resize);
    setLastWidth(e.clientX - 30);
  }

  function resize(e: MouseEvent) {
    let resizable = document.getElementById("resizable");
    resizable.style.width = e.clientX - 30 + "px";
  }

  function handleSidebarClose() {
    let resizable = document.getElementById("resizable");
    resizable.style.removeProperty("width");
    setOpen(false);
  }

  function handleSidebarOpen() {
    setOpen(true);
  }

  return open ? (
    <div className={"sidebar"} id={"resizable"}>
      <Button
        onClick={handleSidebarClose}
        tooltip={"Hide Sidebar"}
        className="sidebar-toggle"
      >
        ⬅️
      </Button>

      {props.children}
      <div
        className="resize-handle"
        id="resize-handle-id"
        onMouseDown={handleOnMouseDown}
      ></div>
    </div>
  ) : (
    <div className={"sidebar-closed"}>
      <Button
        onClick={handleSidebarOpen}
        tooltip={"Show Sidebar"}
        className="sidebar-toggle"
      >
        ➡️
      </Button>
    </div>
  );
}

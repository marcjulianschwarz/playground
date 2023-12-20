import React, { useEffect, useRef, useState } from "react";

export function Tooltip(props: { text: string; children: React.ReactNode }) {
  const tooltip = useRef(null);

  const [mouseOnElement, setMouseOnElement] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [timeOutId, setTimeOutId] = useState(undefined);

  useEffect(() => {
    if (mouseOnElement) {
      const id = setTimeout(() => {
        showToolTip();
      }, 1000);
      setTimeOutId(id);
    } else {
      clearTimeout(timeOutId);
      setTimeout(() => {
        hideToolTip();
      }, 200);
    }
  }, [mouseOnElement]);

  function showToolTip() {
    if (mouseOnElement) {
      //let tooltip = document.getElementById(props.id);
      tooltip.current.style.display = "block";
      tooltip.current.style.left = mousePosition.x + 10 + "px";
      tooltip.current.style.top = mousePosition.y + -10 + "px";
    }
  }

  function hideToolTip() {
    //let tooltip = document.getElementById(props.id);
    tooltip.current.style.display = "none";
  }

  return (
    <React.Fragment>
      <div className="tooltip" ref={tooltip}>
        {props.text}
      </div>
      <span
        onMouseEnter={(e) => {
          setMouseOnElement(true);
          setMousePosition({ x: e.pageX, y: e.pageY });
        }}
        onMouseLeave={() => {
          setMouseOnElement(false);
        }}
      >
        {props.children}
      </span>
    </React.Fragment>
  );
}

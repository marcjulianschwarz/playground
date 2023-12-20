import {
  BaseColor,
  Color,
  ColorBrightness,
  Person,
  TableColumn,
} from "../../utils/interfaces";
import { getColorClassName, openLink } from "../../utils/utils";

interface TableEntryProps<P> {
  color: Color;
  className?: string;
  row: P;
  column: TableColumn;
  children: React.ReactNode;
  onClick?: (row: P, column: TableColumn) => void;
}

export function DynamicTableEntry<P>(props: TableEntryProps<P>) {
  const { row, column, children, className, onClick } = props;

  const childrenExist = children !== null && children !== undefined;
  let color = childrenExist
    ? props.color
    : { base: BaseColor.Gray, brightness: ColorBrightness.Light };

  return (
    <td
      onClick={() => {
        if (onClick) {
          onClick(row, column);
        }
      }}
      className={getColorClassName(color) + " " + className ?? ""}
    >
      {childrenExist ? children : "---"}
    </td>
  );
}

export function DynamicTableEntryPhone<P extends Person>(
  props: TableEntryProps<P>
) {
  let { row, column, color, children, onClick } = props;

  let phoneNumberValid = true;

  if (row.phone.length < 10) {
    color = { base: BaseColor.Gray, brightness: ColorBrightness.Light };
    phoneNumberValid = false;
  }

  function handleClick() {
    if (onClick) {
      onClick(row, column);
    }
    if (phoneNumberValid) {
      openLink("https://www.google.com/search?q=" + row.phone);
    }
  }

  const className = !phoneNumberValid ? "strikethrough" : "";
  children = phoneNumberValid ? "☎️ " + children : children;

  return (
    <DynamicTableEntry
      onClick={handleClick}
      color={color}
      className={className}
      row={row}
      column={column}
      children={children}
    />
  );
}

export function DynamicTableEntryAge<P extends Person>(
  props: TableEntryProps<P>
) {
  let { row, column, color, children, onClick } = props;

  if (row.age < 18) {
    color = { base: BaseColor.Red, brightness: ColorBrightness.Light };
  }

  children = "📆 " + children;

  return (
    <DynamicTableEntry
      onClick={onClick}
      color={color}
      row={row}
      column={column}
      children={children}
    />
  );
}

export const entries: {
  [table: string]: <P extends Person>(props: TableEntryProps<P>) => JSX.Element;
} = {
  phone: DynamicTableEntryPhone,
  age: DynamicTableEntryAge,
};

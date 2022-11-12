import { MouseEvent } from "react";
import { css } from "@emotion/react";
import { TypeCell } from "./types";

const valueStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  background: "none",
  height: "90%",
  width: "90%",
  fontSize: "1.5em",
  fontWeight: "bold",
  color: "red",
  " &:hover": { background: "gray" },
});

const paddings = [
  "0",
  "0 0.2px",
  "0",
  "0.2px 0 0 0",
  "0.2px 0.2px 0",
  "0.2px 0 0 0",
  "0.2px 0 0 0",
  "0.2px 0.2px 0",
  "0.2px 0 0 0",
];

type Props = {
  cell: TypeCell;
  onClick: (e: MouseEvent<HTMLInputElement>) => void;
};

function Cell(props: Props) {
  const { cell, onClick } = props;
  return (
    <div
      css={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0em",
        border: "solid",
        borderWidth: `${paddings[cell.index - 1]}`,
        borderColor: "linear-gradient(to bottom right ,blue, black);",
        width: "100px",
        height: "100px",
      })}
    >
      <input
        id={cell.index.toString()}
        type="button"
        css={valueStyle}
        value={cell.value}
        onClick={(e) => onClick(e)}
      />
    </div>
  );
}

export default Cell;

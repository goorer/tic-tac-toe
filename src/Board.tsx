import { MouseEvent, useState } from "react";
import { css } from "@emotion/react";
import Cell from "./Cell";

const boardStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

const rowStyle = css({
  display: "flex",
  flexDirection: "row",
});

function Board() {
  const cellNumber = [...Array(3).keys()];
  const rowNumber = [...Array(3).keys()].map((v) => v + 1);
  const [cellValues, setCellValues] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState(true);

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    // console.log("handleClick");
    setCellValues(
      cellValues.map((value: string, index: number) => {
        // https://eslint.org/docs/latest/rules/no-nested-ternary
        if (index === parseInt(e.currentTarget.id, 10) - 1) {
          return turn ? "O" : "X";
        }
        return value;
      })
    );
    setTurn(!turn);
  };
  return (
    <div css={boardStyle}>
      {cellNumber.map((v) => (
        <div css={rowStyle} key={v.toString()}>
          {rowNumber.map((v2) => (
            <Cell
              key={(v2 + v * 3).toString()}
              index={v2 + v * 3}
              value={cellValues[v2 + v * 3 - 1]}
              onClick={handleClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

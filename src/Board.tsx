import { MouseEvent, useState, useEffect } from "react";
import { css } from "@emotion/react";
import Cell from "./Cell";
import Menu from "./Menu";
import { TypeCell, TypeHistory } from "./types";

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

const initialCellValue: Array<TypeCell> = [
  {
    index: 1,
    value: "",
    edit: true,
  },
  {
    index: 2,
    value: "",
    edit: true,
  },
  {
    index: 3,
    value: "",
    edit: true,
  },
  {
    index: 4,
    value: "",
    edit: true,
  },
  {
    index: 5,
    value: "",
    edit: true,
  },
  {
    index: 6,
    value: "",
    edit: true,
  },
  {
    index: 7,
    value: "",
    edit: true,
  },
  {
    index: 8,
    value: "",
    edit: true,
  },
  {
    index: 9,
    value: "",
    edit: true,
  },
];

function Board() {
  const columnNumber = [...Array(3).keys()];
  const rowNumber = [...Array(3).keys()];
  const [cellValues, setCellValues] =
    useState<Array<TypeCell>>(initialCellValue);
  const [turn, setTurn] = useState<boolean>(true);
  const [history, setHistory] = useState<Array<TypeHistory>>([]);

  useEffect(() => {}, []);

  const handleClickInitilaze = () => {
    setCellValues(initialCellValue);
    setTurn(true);
    setHistory([]);
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    const targetIndex = parseInt(e.currentTarget.id, 10);
    const targetCell = cellValues.find(
      (cell: TypeCell) => cell.index === targetIndex
    );

    if (targetCell?.edit) {
      const newHistory = history.concat({ cellValues, turn });
      setHistory(newHistory);
      setCellValues(
        cellValues.map((cell: TypeCell) => {
          if (cell.index === targetIndex) {
            return {
              index: cell.index,
              value: turn ? "O" : "X",
              edit: false,
            };
          }
          return cell;
        })
      );
      setTurn(!turn);
    } else {
      // eslint-disable-next-line no-alert
      alert("No Selected");
    }
  };

  // const handleClickRewind = (e: MouseEvent<HTMLInputElement>) => {
  //   const index = parseInt(e.currentTarget.id, 10);
  //   const targetIndex = history[index];
  //   setCellValues(targetIndex.cellValues);
  //   setTurn(targetIndex.turn);
  // };

  return (
    <div css={boardStyle}>
      {rowNumber.map((v) => (
        <div css={rowStyle} key={v.toString()}>
          {columnNumber.map((v2) => (
            <Cell cell={cellValues[v + v2 + v * 2]} onClick={handleClick} />
          ))}
        </div>
      ))}
      <Menu history={history} onClickResset={handleClickInitilaze} />
    </div>
  );
}

export default Board;

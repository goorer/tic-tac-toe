import { MouseEvent, useState, useEffect } from "react";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
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

const modalChildStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5em",
  position: "absolute",
  top: "50%",
  left: "50%",
  padding: "1em",
  transform: "translate(-50%, -50%)",
  width: "600",
  background: "white",
  border: "2px solid #000",
});

const buttonStyle = css({
  width: "200px",
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

const victoryPattern = [
  { a: 0, b: 1, c: 2 },
  { a: 0, b: 4, c: 8 },
  { a: 0, b: 3, c: 6 },
  { a: 1, b: 4, c: 7 },
  { a: 2, b: 4, c: 6 },
  { a: 2, b: 5, c: 8 },
  { a: 3, b: 4, c: 5 },
  { a: 6, b: 7, c: 8 },
];

function Board() {
  const columnNumber = [...Array(3).keys()];
  const rowNumber = [...Array(3).keys()];
  const [cellValues, setCellValues] =
    useState<Array<TypeCell>>(initialCellValue);
  const [turn, setTurn] = useState<boolean>(true);
  const [histories, setHistories] = useState<Array<TypeHistory>>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    victoryPattern.forEach((pattern): void => {
      const { a, b, c } = pattern;
      if (
        cellValues[a].value !== "" &&
        cellValues[b].value !== "" &&
        cellValues[c].value !== ""
      ) {
        if (
          cellValues[a].value === cellValues[b].value &&
          cellValues[b].value === cellValues[c].value
        ) {
          setOpen(true);
        }
      }
    });
  }, [cellValues]);

  const initilaze = () => {
    setCellValues(initialCellValue);
    setTurn(true);
    setHistories([]);
    setOpen(false);
  };

  const handleClickClose = () => {
    setOpen(false);
    initilaze();
  };

  const handleClickInitilaze = () => {
    initilaze();
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    const targetIndex = parseInt(e.currentTarget.id, 10);
    const targetCell = cellValues.find(
      (cell: TypeCell) => cell.index === targetIndex
    );

    if (targetCell?.edit) {
      const newHistories = histories.concat({ cellValues, turn });
      setHistories(newHistories);
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

  const handleClickRewind = (e: MouseEvent<HTMLInputElement>) => {
    const targetIndex = parseInt(e.currentTarget.id, 10);
    const targetHistory = histories[targetIndex];
    setCellValues(targetHistory.cellValues);
    setTurn(targetHistory.turn);
    const newHistories = histories
      .map((history, index) => {
        if (index === targetIndex) {
          return targetHistory;
        }
        return history;
      })
      .slice(0, targetIndex);
    setHistories(newHistories);
  };

  return (
    <div css={boardStyle}>
      <Modal
        open={open}
        onClose={handleClickClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box css={modalChildStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${!turn ? "O" : "X"} Win`}
          </Typography>
          <div
            css={css({ display: "flex", flexDirection: "row", gap: "0.5em" })}
          >
            <Button
              variant="outlined"
              css={buttonStyle}
              onClick={handleClickClose}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
      {rowNumber.map((v) => (
        <div css={rowStyle} key={v.toString()}>
          {columnNumber.map((v2) => (
            <Cell cell={cellValues[v + v2 + v * 2]} onClick={handleClick} />
          ))}
        </div>
      ))}
      <Menu
        histories={histories}
        onClickResset={handleClickInitilaze}
        onClickRewind={handleClickRewind}
      />
    </div>
  );
}

export default Board;

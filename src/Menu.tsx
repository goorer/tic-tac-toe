import { MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { css } from "@emotion/react";
import { TypeHistory } from "./types";

const menuStyle = css({
  display: "flex",
  flexDirection: "column",
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

export type Prop = {
  histories: Array<TypeHistory>;
  onClickResset: () => void;
  onClickRewind: (e: MouseEvent<HTMLInputElement>) => void;
};

function Menu(props: Prop) {
  const { histories, onClickResset, onClickRewind } = props;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClickClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box css={modalChildStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reset Game ?
          </Typography>
          <div
            css={css({ display: "flex", flexDirection: "row", gap: "0.5em" })}
          >
            <Button
              variant="contained"
              css={buttonStyle}
              onClick={onClickResset}
            >
              Reset
            </Button>
            <Button
              variant="outlined"
              css={buttonStyle}
              onClick={handleClickClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
      <div css={menuStyle}>
        <Box>
          <Typography variant="h6">History</Typography>
          <List
            id="list"
            css={css({
              overflowY: "scroll",
              height: "100px",
              width: "300px",
              display: `${histories.length === 0 ? "none" : "block"}`,
            })}
          >
            {histories.map((history, index) => (
              <ListItem disablePadding>
                <ListItemButton id={index.toString()} onClick={onClickRewind}>
                  <ListItemText
                    primary={`TURN ${index + 1}: ${history.turn ? "O" : "X"}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Button variant="text" onClick={handleClickOpen}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Menu;

import CssBaseline from "@mui/material/CssBaseline";
import { Global, css } from "@emotion/react";
import Board from "./Board";

function App() {
  return (
    <>
      <Global
        styles={css`
          fontfamily: "Roboto", sans-serif;
        `}
      />
      <CssBaseline />
      <Board />
    </>
  );
}

export default App;

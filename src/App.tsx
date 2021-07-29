import { useEffect, useState } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Journal from "./Journal/Journal";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setDarkMode] = useState(prefersDarkMode);

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: red["100"],
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      background: {
        default: "#e3f2fd",
      },
    },
  });

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline>
        <Journal isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

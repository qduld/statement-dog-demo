// src/theme.ts
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";

export function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // 自定义主色
    },
    secondary: {
      main: "#dc004e", // 自定义辅色
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;

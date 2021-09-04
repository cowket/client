import type { AppProps } from "next/app";
import { ThemeProvider, Theme } from "@emotion/react";
import { AuthLayout } from "components/Layout/AuthLayout";
import { palette } from "styles/color";
import { viewportSize } from "styles/size";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const theme: Theme = {
    palette,
    viewportSize,
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    </ThemeProvider>
  );
}
export default MyApp;

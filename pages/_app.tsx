import type { AppProps } from "next/app";
import { ThemeProvider, Theme } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthLayout } from "components/Layout/AuthLayout";
import { palette } from "styles/color";
import { viewportSize } from "styles/size";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const theme: Theme = {
    palette,
    viewportSize,
  };

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "../themes/material-ui";
import Head from "next/head";
import "mapbox-gl/dist/mapbox-gl.css";
// redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import MainLayout from "../layouts/main/mainLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainLayout {...pageProps}>
              <Component {...pageProps} />
            </MainLayout>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

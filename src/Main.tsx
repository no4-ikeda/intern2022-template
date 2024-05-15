import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import MainPage from "./MainPage";
import "./index.css";
import ContextWrapper from "./context/ContextWrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ContextWrapper>
        <MainPage />
      </ContextWrapper>
    </ChakraProvider>
  </React.StrictMode>
);

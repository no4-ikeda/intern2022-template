import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { MainPageContainer } from "./components/MainPage/MainPageContainer";
import "./css/index.css";
import { ContextWrapper } from "./contexts/ContextWrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ContextWrapper>
        <MainPageContainer />
      </ContextWrapper>
    </ChakraProvider>
  </React.StrictMode>
);

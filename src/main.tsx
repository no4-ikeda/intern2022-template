import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { MainPageContainer } from "./components/MainPage/MainPageContainer";
import "./css/index.css";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RecoilRoot>
        <MainPageContainer />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>
);

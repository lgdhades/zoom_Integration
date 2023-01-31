import logo from "./logo.svg";
import "./App.css";
import { Routes } from "./route/Routes.js";
import { useRoutes } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
function App() {
  const content = useRoutes(Routes);
  return <ProSidebarProvider>{content}</ProSidebarProvider>;
}

export default App;

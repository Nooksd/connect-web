import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/login/login";
import { MobileDownload } from "@/pages/download/download";
import ProtectedRouter from "./protected";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/download-mobile" element={<MobileDownload />} />
        <Route path="*" element={<ProtectedRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/store/slicers/authSlicer";
import { Link, useNavigate } from "react-router-dom";

import { NavbarContentContainer } from "@/styles/global";
import Header from "@/pages/components/header/header";
import Toast from "@/pages/components/toast/toast";
import Modal from "@/pages/components/modal/modal";
import GoToTop from "../pages/components/goToTop/gototop";

import { Error404 } from "@/pages/error404/404";

import { mainModule } from "@/routes/mainModule";
import { profileModule } from "@/routes/profileModule";
import { adminModule } from "@/routes/adminModule";

const ProtectedRouter = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { "*": wildcard } = useParams();
  const currentPath = wildcard?.split(":") || [];
  const [basePath, param] = currentPath;

  const [isLoading, setIsLoading] = useState(true);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [toastMessage, setToastMessage] = useState({
    danger: false,
    message: "",
    title: "",
  });
  const [modalMessage, setModalMessage] = useState({
    response: null,
    event: null,
    userInput: null,
    message: "",
    title: "",
    hintText: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  const pages = [...mainModule, ...profileModule];

  if (user?.userType === "ADMIN") pages.push(...adminModule);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", () => {
      checkScreenSize;
      setWindowHeight(window.innerHeight);
    });

    if (isMobile) {
      navigate("/download-mobile");
    }

    return () =>
      window.removeEventListener("resize", () => {
        checkScreenSize;
        setWindowHeight(window.innerHeight);
      });
  }, [isMobile, navigate]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (isAuthenticated) {
        setIsLoading(false);
        return;
      }
      try {
        dispatch(getCurrentUser());
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, [dispatch, isAuthenticated]);

  const renderPageContent = () => {
    const page = pages.find((p) => p.path === basePath);

    if (!page) return <Error404 />;

    if (page.admin && user?.userType !== "ADMIN") return <Error404 />;

    return React.cloneElement(page.component, {
      param,
      windowHeight,
      toastMessage: setToastMessage,
      modalMessage: setModalMessage,
      modalInfo: modalMessage,
    });
  };

  if (isLoading || loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/" />;

  const currentPage = pages.find((p) => p.path === basePath);

  return (
    <NavbarContentContainer>
      <Toast toastContent={toastMessage} setToastContent={setToastMessage} />
      <Modal modalMessage={modalMessage} setModalMessage={setModalMessage} />
      <Header
        pages={pages}
        page={currentPage?.name}
        icon={currentPage?.icon}
        logged={true}
        selectedPage={basePath}
      />
      {renderPageContent()}
      <GoToTop />
    </NavbarContentContainer>
  );
};

export default ProtectedRouter;

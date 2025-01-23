import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserFromStorage } from "@/store/slicers/userSlicer";

import { NavbarContentContainer } from "@/styles/global";

import Header from "@/pages/components/header/header";
import Toast from "@/pages/components/toast/toast";
import Modal from "@/pages/components/modal/modal";

import { Error404 } from "@/pages/Secundary/error404/404";
import { Feed } from "@/pages/feed/feed";
import SVGFeed from "../assets/icons/page_icons/feed";
import SVGMissions from "../assets/icons/page_icons/missions";
import SVGShop from "../assets/icons/page_icons/shop";
import SVGEvents from "../assets/icons/page_icons/events";
import SVGContacts from "../assets/icons/page_icons/contacts";
import SVGBirthdays from "../assets/icons/page_icons/birthdays";
import { Missions } from "../pages/missions/missions";
import { Shop } from "../pages/shop/shop";
import { Events } from "../pages/events/events";
import { Contacts } from "../pages/contacts/contacts";
import { Birthdays } from "../pages/birthdays/birthdays";

const ProtectedRouter = () => {
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
    message: "",
    title: "",
  });

  const dispatch = useDispatch();
  const location = useLocation();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const normalizeString = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");
  };

  const pages = [
    {
      path: "feed",
      name: "Feed",
      isRestricted: true,
      component: (
        <Feed
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <SVGFeed width="30px" />,
    },
    {
      path: "missoes",
      name: "Missões",
      isRestricted: true,
      component: (
        <Missions
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <SVGMissions width="30px" />,
    },
    {
      path: "beneficios",
      name: "Benefícios",
      isRestricted: true,
      component: (
        <Shop
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <SVGShop width="30px" />,
    },
    {
      path: "eventos",
      name: "Eventos",
      isRestricted: true,
      component: (
        <Events
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <SVGEvents width="30px" />,
    },
    {
      path: "contatos",
      name: "Contaos",
      isRestricted: true,
      component: (
        <Contacts
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <SVGContacts width="30px" />,
    },
    {
      path: "aniversarios",
      name: "Aniversários",
      isRestricted: true,
      component: (
        <Birthdays
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <SVGBirthdays width="30px" />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (isAuthenticated === true) {
        setIsLoading(false);
        return;
      }
      try {
        dispatch(setUserFromStorage());
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, [dispatch, isAuthenticated]);

  const renderPageContent = () => {
    const currentPage = normalizeString(
      location.pathname.substring(1).toLowerCase()
    );

    const page = pages.find((p) => normalizeString(p.path) === currentPage);

    if (!page) return <Error404 />;

    return page.component;
  };

  const getPageData = () => {
    const currentPage = normalizeString(
      location.pathname.substring(1).toLowerCase()
    );
    return pages.find((p) => normalizeString(p.path) === currentPage);
  };

  if (isLoading || loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  const pageData = getPageData();

  const currentPage = normalizeString(
    location.pathname.substring(1).toLowerCase()
  );

  return (
    <NavbarContentContainer>
      <Toast toastContent={toastMessage} setToastContent={setToastMessage} />
      <Modal modalMessage={modalMessage} setModalMessage={setModalMessage} />
      <Header
        pages={pages}
        page={pageData.name}
        icon={pageData.icon}
        logged={true}
        selectedPage={currentPage}
      />
      {renderPageContent()}
    </NavbarContentContainer>
  );
};

export default ProtectedRouter;

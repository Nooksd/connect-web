import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/store/slicers/authSlicer";

import { NavbarContentContainer } from "@/styles/global";

import Header from "@/pages/components/header/header";
import Toast from "@/pages/components/toast/toast";
import Modal from "@/pages/components/modal/modal";

import icons from "@/assets/icons";

import { Missions } from "../pages/missions/missions";
import { Error404 } from "@/pages/error404/404";
import { Feed } from "@/pages/posts/feed";
import { Shop } from "../pages/shop/shop";
import { Events } from "../pages/events/events";
import { Contacts } from "../pages/contacts/contacts";
import { Birthdays } from "../pages/birthdays/birthdays";
import { Profile } from "../pages/profile/profile";
import { Notifications } from "../pages/notifications/notifications";
import { Settings } from "../pages/settings/settings";
import { ProfileSettings } from "../pages/settings/profile/profile";
import { Post } from "../pages/posts/post/post";

const ProtectedRouter = () => {
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

  const dispatch = useDispatch();
  const location = useLocation();

  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

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
      component: (
        <Feed
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGFeed width="30px" />,
    },
    {
      path: "post/",
      name: "Postagem",
      hidden: true,
      component: (
        <Post
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGFeed width="30px" />,
    },
    {
      path: "missoes",
      name: "Missões",
      component: (
        <Missions
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGMissions width="30px" />,
    },
    {
      path: "beneficios",
      name: "Benefícios",
      hidden: true,
      component: (
        <Shop
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGShop width="30px" />,
    },
    {
      path: "eventos",
      name: "Eventos",
      hidden: true,
      component: (
        <Events
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGEvents width="30px" />,
    },
    {
      path: "contatos",
      name: "Contaos",
      component: (
        <Contacts
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGContacts width="30px" />,
    },
    {
      path: "aniversarios",
      name: "Aniversários",
      component: (
        <Birthdays
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGBirthdays width="30px" />,
    },
    {
      path: "perfil",
      name: "Perfil",
      hidden: true,
      component: (
        <Profile
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGProfile width="30px" />,
    },
    {
      path: "notificacoes",
      name: "Notificações",
      hidden: true,
      component: (
        <Notifications
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGProfile width="30px" />,
    },
    {
      path: "configuracoes",
      name: "Configurações",
      hidden: true,
      component: (
        <Settings
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGProfile width="30px" />,
    },
    {
      path: "configuracoes/perfil",
      name: "Configurações do perfil",
      hidden: true,
      component: (
        <ProfileSettings
          windowHeight={windowHeight}
          toastMessage={setToastMessage}
          modalMessage={setModalMessage}
          modalInfo={modalMessage}
        />
      ),
      icon: <icons.SVGProfile width="30px" />,
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
        dispatch(getCurrentUser());
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, [dispatch, isAuthenticated]);

  const renderPageContent = () => {
    const page = pages.find((p) => p.path === basePath);

    console.log(basePath, param);

    if (!page) return <Error404 />;


    return React.cloneElement(page.component, { param });
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
        page={pageData?.name}
        icon={pageData?.icon}
        logged={true}
        selectedPage={currentPage}
      />
      {renderPageContent()}
    </NavbarContentContainer>
  );
};

export default ProtectedRouter;

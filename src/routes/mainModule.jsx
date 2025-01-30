import { Feed } from "../pages/posts/feed";
import { Missions } from "../pages/missions/missions";
import { Events } from "../pages/events/events";
import { Contacts } from "../pages/contacts/contacts";
import { Birthdays } from "../pages/birthdays/birthdays";
import { Shop } from "../pages/shop/shop";
import { Post } from "../pages/posts/post/post";

import icons from "@/assets/icons";

export const mainModule = [
  {
    path: "feed",
    name: "Feed",
    component: <Feed />,
    icon: <icons.SVGFeed width="30px" />,
  },
  {
    path: "post/",
    name: "Postagem",
    hidden: true,
    component: <Post />,
    icon: <icons.SVGFeed width="30px" />,
  },
  {
    path: "missoes",
    name: "Missões",
    component: <Missions />,
    icon: <icons.SVGMissions width="30px" />,
  },
  {
    path: "eventos",
    name: "Eventos",
    hidden: true,
    component: <Events />,
    icon: <icons.SVGEvents width="30px" />,
  },
  {
    path: "contatos",
    name: "Contatos",
    component: <Contacts />,
    icon: <icons.SVGContacts width="30px" />,
  },
  {
    path: "aniversarios",
    name: "Aniversários",
    component: <Birthdays />,
    icon: <icons.SVGBirthdays width="30px" />,
  },
  {
    path: "beneficios",
    name: "Benefícios",
    hidden: true,
    component: <Shop />,
    icon: <icons.SVGShop width="30px" />,
  },
];

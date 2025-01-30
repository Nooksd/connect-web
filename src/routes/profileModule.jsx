import { Profile } from "../pages/profile/profile";
import { Settings } from "../pages/settings/settings";
import { ProfileSettings } from "../pages/settings/profile/profile";

import icons from "@/assets/icons";

export const profileModule = [
  {
    path: "perfil",
    name: "Perfil",
    hidden: true,
    component: (<Profile />),
    icon: (<icons.SVGProfile width="30px" />),
  },
  {
    path: "configuracoes",
    name: "Configurações",
    hidden: true,
    component: <Settings />,
    icon: <icons.SVGProfile width="30px" />,
  },
  {
    path: "configuracoes/perfil",
    name: "Configurações do perfil",
    hidden: true,
    component: <ProfileSettings />,
    icon: <icons.SVGProfile width="30px" />,
  }
];

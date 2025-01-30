import { Adm } from "../pages/adm/adm";
import { ProfileSettings } from "../pages/settings/profile/profile";
import icons from "@/assets/icons";

export const adminModule = [
  {
    path: "admin",
    name: "Administrador",
    admin: true,
    component: <Adm />,
    icon: <icons.SVGProfile width="30px" />,
  }
];

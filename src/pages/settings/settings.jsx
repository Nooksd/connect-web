import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/slicers/authSlicer.js";
import { useNavigate } from "react-router-dom";

import * as styled from "./settingsStyles.js";

export const Settings = ({ windowHeight, toastMessage }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (e) {
      console.error("Falha no Logout", e);
    }
  };

  return (
    <styled.Main>
      <styled.Container $height={windowHeight}>
        <styled.ListBox>
          <styled.ListTile
            onClick={() => {
              toastMessage({
                danger: true,
                title: "Em desenvolvimento",
                message: "Página em desenvolvimento",
              });
            }}
          >
            <styled.TileLeading>
              <styled.icon className="icon-theme" />
            </styled.TileLeading>
            <styled.TileContent>
              <styled.TileTitle>Tema</styled.TileTitle>
            </styled.TileContent>
            <styled.icon
              className="icon-arrow"
              style={{ transform: "rotate(270deg)", fontSize: "14px" }}
            />
          </styled.ListTile>
          <styled.ListTile onClick={() => navigate("/configuracoes/perfil")}>
            <styled.TileLeading>
              <styled.icon className="icon-profile" />
            </styled.TileLeading>
            <styled.TileContent>
              <styled.TileTitle>Perfil</styled.TileTitle>
            </styled.TileContent>
            <styled.icon
              className="icon-arrow"
              style={{ transform: "rotate(270deg)", fontSize: "14px" }}
            />
          </styled.ListTile>
          <styled.ListTile
            onClick={() => {
              toastMessage({
                danger: true,
                title: "Em desenvolvimento",
                message: "Página em desenvolvimento",
              });
            }}
          >
            <styled.TileLeading>
              <styled.icon className="icon-bell" />
            </styled.TileLeading>
            <styled.TileContent>
              <styled.TileTitle>Notificações</styled.TileTitle>
            </styled.TileContent>
            <styled.icon
              className="icon-arrow"
              style={{ transform: "rotate(270deg)", fontSize: "14px" }}
            />
          </styled.ListTile>
          <styled.ListTile
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send/?phone=%2B5534992710321&text=Ol%C3%A1%2C+tudo+bem%3F+Estou+com+problemas+para+fazer+login&type=phone_number&app_absent=0",
                "_blank"
              )
            }
          >
            <styled.TileLeading>
              <styled.icon className="icon-support" />
            </styled.TileLeading>
            <styled.TileContent>
              <styled.TileTitle>Tema</styled.TileTitle>
            </styled.TileContent>
          </styled.ListTile>
          <styled.ListTile onClick={() => logout()}>
            <styled.TileLeading>
              <styled.icon className="icon-exit" />
            </styled.TileLeading>
            <styled.TileContent>
              <styled.TileTitle>Sair</styled.TileTitle>
            </styled.TileContent>
          </styled.ListTile>
        </styled.ListBox>
      </styled.Container>
    </styled.Main>
  );
};

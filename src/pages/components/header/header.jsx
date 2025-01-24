import { useEffect, useState } from "react";
import * as styled from "./headerStyles.js";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/store/slicers/authSlicer.js";
import { Link, useNavigate } from "react-router-dom";

import { Loading } from "@/styles/global.js";

import SVGlogowhite from "@/assets/logo/innova_logo_white.jsx";
import SVGQuestionmark from "@/assets/icons/header/Question_icon.jsx";
import SVGEngine from "@/assets/icons/header/Engine_icon.jsx";
import SVGArrowDown from "@/assets/icons/header/Arrow_icon.jsx";
import SVGExit from "@/assets/icons/header/Exit_icon.jsx";
import SVGProfile from "@/assets/icons/header/Profile_icon.jsx";

import coinImage from "@/assets/img/Innova_Coin.png";
import SVGBell from "../../../assets/icons/header/Bell_icon.jsx";

const Header = ({ pages, logged, page, icon, selectedPage }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [coins, setCoins] = useState(0);

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

  useEffect(() => {
    if (user) {
      setName(user.name);
      setCoins(user.pCurrent);
    }
  }, [user]);

  return (
    <styled.NavBar>
      <styled.NavBar1>
        <styled.NavItem1>
          {icon}
          <styled.NavTitle>{page}</styled.NavTitle>
        </styled.NavItem1>
        <styled.NavItem2>
          {logged && (
            <>
              <Link to="/notificacoes">
                <styled.RoundButton>
                  <SVGBell width="11" height="16" />
                </styled.RoundButton>
              </Link>
              <Link to="/ajuda">
                <styled.RoundButton>
                  <SVGQuestionmark width="10" height="17" />
                </styled.RoundButton>
              </Link>
              <Link to="/configuracoes">
                <styled.RoundButton>
                  <SVGEngine width="15" height="15" />
                </styled.RoundButton>
              </Link>
              <styled.Division />
              <styled.Name>{name || <Loading />}</styled.Name>
              <styled.openMenu>
                <SVGArrowDown
                  width="25"
                  fill="#fff"
                  open={open}
                  onClick={() => setOpen((prev) => !prev)}
                />
                <styled.Menu $show={open}>
                  <Link to="/perfil">
                    <styled.MenuItem>
                      <SVGProfile width="15" height="15" />
                      Perfil
                    </styled.MenuItem>
                  </Link>
                  <Link to="/configuracoes/perfil">
                    <styled.MenuItem>
                      <SVGEngine width="15" height="15" />
                      Configurações
                    </styled.MenuItem>
                  </Link>
                  <styled.MenuItem onClick={() => logout()}>
                    <SVGExit width="15" height="15" />
                    Sair
                  </styled.MenuItem>
                </styled.Menu>
              </styled.openMenu>
              <styled.InnovaCoin>
                {coins || <Loading />}{" "}
                <img
                  src={coinImage}
                  alt="Coins"
                  loading="lazy"
                  width="18"
                  height="18"
                />
              </styled.InnovaCoin>
              <styled.Division />
            </>
          )}
          <Link to="/home">
            <SVGlogowhite width="170" fill="#fff" />
          </Link>
        </styled.NavItem2>
      </styled.NavBar1>
      <styled.NavBar2>
        {pages.map((page, index) => {
          if(page.hidden) return null;
          return (
            <Link to={"/" + page.path} key={index}>
              <styled.pageButton $selected={selectedPage === page.path}>
                {page.icon}
                {page.name}
              </styled.pageButton>
            </Link>
          );
        })}
      </styled.NavBar2>
    </styled.NavBar>
  );
};

export default Header;

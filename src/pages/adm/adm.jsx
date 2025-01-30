import { useEffect, useState } from "react";
import * as styled from "./admStyles.js";
import Users from "./users/users.jsx";
import AddUser from "./users/addUser/addUser.jsx";
import SVGArrowRight from "../../assets/icons/ArrowRight_icon.jsx";

export const Adm = ({
  windowHeight,
  toastMessage,
  modalMessage,
  modalInfo,
}) => {
  const [pageTrail, setPageTrail] = useState(
    JSON.parse(localStorage.getItem("PageTrail")) || ["Administrativo"]
  );
  const [editData, setEditData] = useState(
    localStorage.getItem("editData") || ""
  );

  const handleSelectPage = (page, index = null, editId = "") => {
    let newPageTrail = [];

    if (editId) {
      setEditData(editId);
      localStorage.setItem("editData", editId);
    } else {
      setEditData("");
      localStorage.removeItem("editData");
    }

    if (index !== null && index < pageTrail.length) {
      newPageTrail = pageTrail.slice(0, index);
      newPageTrail[index] = page;
    } else {
      newPageTrail = [...pageTrail, page];
    }

    setPageTrail(newPageTrail);
    localStorage.setItem("PageTrail", JSON.stringify(newPageTrail));
  };

  const pageSelector = () => {
    switch (pageTrail[pageTrail.length - 1]) {
      case "Usuários":
        return (
          <Users
            toastMessage={toastMessage}
            modalMessage={modalMessage}
            openPage={handleSelectPage}
            modalInfo={modalInfo}
          />
        );
      case "Adicionar Usuário":
      case "Editar Usuário":
        return <AddUser toastMessage={toastMessage} editData={editData} />;
      default:
        alert("Página em construção");
        setPageTrail(["Administrativo"]);
        localStorage.setItem("PageTrail", JSON.stringify(["Administrativo"]));
    }
  };

  return (
    <styled.contentDiv $windowHeight={windowHeight}>
      {pageTrail[pageTrail.length - 1] === "Administrativo" ? (
        <>
          <styled.content>
            <styled.optionsBlockDiv>
              <styled.optionsTitleDiv>
                Controle da aplicação
              </styled.optionsTitleDiv>

              <styled.optionButton
                onClick={() => handleSelectPage("Usuários", 1)}
              >
                <styled.Icon className="icon-user" />
                <span>Usuários</span>
              </styled.optionButton>

              <styled.optionButton
                onClick={() => handleSelectPage("Missões", 1)}
              >
                <styled.Icon className="icon-mission" />
                <span>Missões</span>
              </styled.optionButton>

              <styled.optionButton
                onClick={() => handleSelectPage("Validação", 1)}
              >
                <styled.Icon className="icon-mission" />
                <span>Validação</span>
              </styled.optionButton>
            </styled.optionsBlockDiv>
          </styled.content>
        </>
      ) : (
        <>
          <styled.pageTrailDiv>
            {pageTrail.map((page, index) => (
              <span key={index}>
                <SVGArrowRight width="20" height="20" />
                <span onClick={() => handleSelectPage(page, index)}>
                  {page}
                </span>
              </span>
            ))}
          </styled.pageTrailDiv>
          <styled.pageContent>{pageSelector()}</styled.pageContent>
        </>
      )}
    </styled.contentDiv>
  );
};

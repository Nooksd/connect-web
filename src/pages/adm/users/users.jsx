import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUsers } from "@/store/slicers/userSlicer.js";
import { deleteUser } from "@/store/slicers/admSlicer.js";

import * as styled from "./usersStyles.js";

const Users = ({ toastMessage, modalMessage, modalInfo, openPage }) => {
  const { users } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const [whatDelete, setWhatDelete] = useState("");

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers(search));
    }
  }, [dispatch]);

  useEffect(() => {
    if (modalInfo.response !== null) {
      switch (modalInfo.event) {
        case "deleteUser":
          if (modalInfo.response) handleDeleteUser();
          break;
      }
      modalMessage({
        title: "",
        message: "",
        response: null,
        event: null,
      });
    }
  }, [modalInfo.response]);

  const handleAddOne = () => {
    openPage("Adicionar Usuário", 2);
  };

  const handleSearch = async () => {
    if (search !== "") {
      dispatch(fetchUsers(search));
    }
  };

  const handleDeleteButtonClick = async (userId, userNome) => {
    setWhatDelete(userId);

    modalMessage({
      response: null,
      event: "deleteUser",
      title: "Confirmação",
      message: `Deseja excluir o usuário ${userNome} (Ação Permanente)?`,
    });
  };

  const handleEditButtonClick = (userId) => {
    openPage("Editar Usuário", 2, userId);
  };

  function handleDeleteUser() {
    const newUsers = users.filter((user) => user.id !== whatDelete);

    dispatch(updateUsers(newUsers));

    dispatch(deleteUser(whatDelete)).then((result) => {
      if (!result.meta.rejectedWithValue) {
        toastMessage({
          danger: false,
          title: "Sucesso",
          message: "Usuário excluído com sucesso",
        });
      } else {
        toastMessage({
          danger: true,
          title: "Error",
          message: "Não foi possível excluir o usuário",
        });
      }
    });
    setWhatDelete("");
  }

  const RenderResultsOnPege = () => {
    return users.map((user, index) => {
      return (
        <styled.UserDiv $isEven={(index + 1) % 2 == 0} key={index}>
          <styled.userIndexSpan>{`#${index + 1}`}</styled.userIndexSpan>
          <styled.userAvatarImg src={user.profilePictureUrl} />
          <styled.userDataSpan>{user.name}</styled.userDataSpan>
          <styled.userDataSpan>{user.email}</styled.userDataSpan>
          <styled.controllButtonsDiv>
            <styled.EditButton onClick={() => handleEditButtonClick(user.id)}>
              <styled.IconEdit className="icon-pen" />
            </styled.EditButton>
            <styled.DeleteButton
              onClick={() => handleDeleteButtonClick(user.id, user.name)}
            >
              <styled.IconDelete className="icon-trash" />
            </styled.DeleteButton>
          </styled.controllButtonsDiv>
        </styled.UserDiv>
      );
    });
  };



  return (
    <>
      <styled.headerUsersDiv>Controle de Usuários</styled.headerUsersDiv>
      <styled.filterOptionsDiv>
        <styled.addNewOneDiv>
          <styled.addNewOneButton onClick={() => handleAddOne()}>
            <span>+</span> Novo usuário
          </styled.addNewOneButton>
        </styled.addNewOneDiv>
        <styled.filterAndInfoDiv>
          <styled.filterPartDiv>
            <div />
            <div>
              <styled.searchInput
                name="search"
                placeholder="Pesquisar por Nome"
                onChange={(e) => setSearch(e.target.value)}
              />
              <styled.searchButton onClick={() => handleSearch(true)}>
                <styled.Icon className="icon-search" />
                Buscar
              </styled.searchButton>
            </div>
          </styled.filterPartDiv>
          <styled.infoPartDiv>
            <span>Index</span>
            <span>Foto</span>
            <span>Nome</span>
            <span>Email</span>
            <span>Controles</span>
          </styled.infoPartDiv>
        </styled.filterAndInfoDiv>
      </styled.filterOptionsDiv>
      <styled.resultsDiv>
        {users.length > 0 && RenderResultsOnPege()}
      </styled.resultsDiv>
    </>
  );
};

export default Users;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/slicers/userSlicer.js";
import { useNavigate } from "react-router-dom";

import * as styled from "./contactsStyles.js";
import icons from "@/assets/icons";

export const Contacts = ({ windowHeight }) => {
  const { users } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers(search));
  }, [dispatch]);
  return (
    <styled.Main>
      <styled.Container $height={windowHeight}>
        <styled.SearchBox>
          <styled.SearchIcon>
            <icons.SVGSearch />
          </styled.SearchIcon>
          <styled.SearchInput placeholder="Procurar pessoas" />
        </styled.SearchBox>
        <styled.filterBox>
          <icons.SVGFilter />
          <styled.fillterText>Filtrar contatos</styled.fillterText>
        </styled.filterBox>
        <styled.contactsBox>
          <styled.ContactListWrapper>
            {users.map((user, index) => (
              <styled.ListTile key={index} onClick={() => navigate(`/perfil/${user.uid}`)}>
                <styled.TileLeading>
                  <styled.avatar src={user.profilePictureUrl} />
                </styled.TileLeading>
                <styled.TileContent>
                  <styled.TileTitle>{user.name}</styled.TileTitle>
                  <styled.TileSubtitle>
                    {user.role}
                  </styled.TileSubtitle>
                </styled.TileContent>
              </styled.ListTile>
            ))}
          </styled.ContactListWrapper>
        </styled.contactsBox>
      </styled.Container>
    </styled.Main>
  );
};

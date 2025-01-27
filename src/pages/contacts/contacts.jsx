import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/slicers/userSlicer.js";
import { useNavigate } from "react-router-dom";

import * as styled from "./contactsStyles.js";
import icons from "@/assets/icons";
import { Profile } from "../profile/profile.jsx";

export const Contacts = ({ windowHeight }) => {
  const { users } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers(search));
  }, [dispatch]);

  const searchUser = (e) => {
    e.preventDefault();
    dispatch(fetchUsers(search));
    console.log(search);
  };

  return (
    <styled.Main>
        <styled.Container $height={windowHeight}>
          <styled.SearchBox onSubmit={(e) => searchUser(e)}>
            <styled.SearchIcon>
              <icons.SVGSearch />
            </styled.SearchIcon>
            <styled.SearchInput
              placeholder="Procurar pessoas"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </styled.SearchBox>
          <styled.filterBox>
            <icons.SVGFilter />
            <styled.fillterText>Filtrar contatos</styled.fillterText>
          </styled.filterBox>
          <styled.contactsBox>
            <styled.ContactListWrapper>
              {users &&
                users.map((user, index) => (
                  <styled.ListTile
                    key={index}
                    $selected={selectedUser === user.uid}
                    onClick={() => setSelectedUser(user.uid)}
                  >
                    <styled.TileLeading>
                      <styled.avatar
                        src={`${
                          user.profilePictureUrl
                        }?=${new Date().getDate()}`}
                      />
                    </styled.TileLeading>
                    <styled.TileContent>
                      <styled.TileTitle>{user.name}</styled.TileTitle>
                      <styled.TileSubtitle>{user.role}</styled.TileSubtitle>
                    </styled.TileContent>
                  </styled.ListTile>
                ))}
            </styled.ContactListWrapper>
          </styled.contactsBox>
        </styled.Container>
      {selectedUser && (
        <Profile windowHeight={windowHeight} param={selectedUser} />
      )}
    </styled.Main>
  );
};

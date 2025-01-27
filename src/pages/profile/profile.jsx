import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/slicers/userSlicer.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import * as styled from "./profileStyles.js";
import icons from "@/assets/icons";

export const Profile = ({ param, windowHeight }) => {
  const [profile, setProfile] = useState({});
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (param) {
      dispatch(fetchUser(param)).then((result) => {
        setProfile(result.payload);
        console.log(result.payload);
      });
    } else {
      setProfile(user);
    }
  }, [dispatch, param]);

  const formatDate = (timestamp) =>
    format(new Date(timestamp), "dd/MM/yyyy", { locale: ptBR });

  const formatDateExtended = (timestamp) =>
    format(new Date(timestamp), "dd 'de' MMMM", { locale: ptBR });

  return (
    <styled.Main>
      <styled.Container $height={windowHeight}>
        <styled.Content>
          <styled.Leading>
            <styled.Avatar
              src={`${profile.profilePictureUrl}?=${new Date().getDate()}`}
            />
          </styled.Leading>
          {profile.name}
          <styled.Subtitle>{profile.role}</styled.Subtitle>
          <styled.ContactInfo>
            <styled.userInfoColumns>
              <styled.title>Contatos</styled.title>
              <div />
              <styled.ListTile>
                <styled.TileLeading>
                  <icons.SVGEmail height="22" />
                </styled.TileLeading>
                <styled.TileContent>
                  <styled.TileTitle>Email</styled.TileTitle>
                  <styled.TileSubtitle>{profile.email}</styled.TileSubtitle>
                </styled.TileContent>
              </styled.ListTile>
              <styled.ListTile>
                <styled.TileLeading>
                  <icons.SVGPhone height="25" />
                </styled.TileLeading>
                <styled.TileContent>
                  <styled.TileTitle>Telefone</styled.TileTitle>
                  <styled.TileSubtitle>
                    {profile.phoneNumber}
                  </styled.TileSubtitle>
                </styled.TileContent>
              </styled.ListTile>
              <styled.ListTile>
                <styled.TileLeading>
                  <icons.SVGRole height="25" />
                </styled.TileLeading>
                <styled.TileContent>
                  <styled.TileTitle>Cargo</styled.TileTitle>
                  <styled.TileSubtitle>{profile.role}</styled.TileSubtitle>
                </styled.TileContent>
              </styled.ListTile>
              <styled.ListTile>
                <styled.TileLeading>
                  <icons.SVGDate height="25" />
                </styled.TileLeading>
                <styled.TileContent>
                  <styled.TileTitle>Data de admissão</styled.TileTitle>
                  <styled.TileSubtitle>
                    {formatDate(profile.entryDate ?? Date.now())}
                  </styled.TileSubtitle>
                </styled.TileContent>
              </styled.ListTile>
              <styled.ListTile>
                <styled.TileLeading>
                  <icons.SVGBirthdays height="27" width="30" />
                </styled.TileLeading>
                <styled.TileContent>
                  <styled.TileTitle>Data de nascimento</styled.TileTitle>
                  <styled.TileSubtitle>
                    {formatDateExtended(profile.birthday ?? Date.now())}
                  </styled.TileSubtitle>
                </styled.TileContent>
              </styled.ListTile>

              <div />
              <styled.title>Links</styled.title>
              <div />
              <styled.ListTile>
                <styled.TileLeading>
                  <icons.SVGLinkedin height="27" width="30" />
                </styled.TileLeading>
                <styled.TileContent>
                  <styled.TileTitle>Linkedin</styled.TileTitle>
                  <styled.TileSubtitle>
                    {profile.linkedinUrl}
                  </styled.TileSubtitle>
                </styled.TileContent>
              </styled.ListTile>
              <styled.ListTile>
                <styled.TileLeading>
                  <icons.SVGInstagram height="27" width="30" />
                </styled.TileLeading>
                <styled.TileContent>
                  <styled.TileTitle>Instagram</styled.TileTitle>
                  <styled.TileSubtitle>
                    {profile.instagramUrl}
                  </styled.TileSubtitle>
                </styled.TileContent>
              </styled.ListTile>
              <styled.ListTile>
                <styled.TileLeading>
                  <icons.SVGFacebook height="27" width="30" />
                </styled.TileLeading>
                <styled.TileContent>
                  <styled.TileTitle>Facebook</styled.TileTitle>
                  <styled.TileSubtitle>
                    {profile.facebookUrl}
                  </styled.TileSubtitle>
                </styled.TileContent>
              </styled.ListTile>
            </styled.userInfoColumns>
          </styled.ContactInfo>
        </styled.Content>
      </styled.Container>
    </styled.Main>
  );
};

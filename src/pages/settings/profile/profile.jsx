import { useState } from "react";
import * as styled from "./profileStyles.js";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUser } from "@/store/slicers/authSlicer.js";
import { uploadAvatar } from "@/store/slicers/imageSlicer.js";

export const ProfileSettings = ({ windowHeight, toastMessage }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [instagramUrl, setInstagramUrl] = useState(user.instagramUrl);
  const [facebookUrl, setFacebookUrl] = useState(user.facebookUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(user.linkedinUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user.profilePictureUrl);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedFile) {
      dispatch(uploadAvatar({ file: selectedFile, userId: user.id })).then(
        (result) => {
          if (!result.meta.rejectedWithValue) {
            dispatch(
              updateCurrentUser({
                id: user.id,
                profilePictureUrl: result.payload.url,
                instagramUrl,
                facebookUrl,
                linkedinUrl,
              })
            ).then((result) => {
              if (!result.meta.rejectedWithValue) {
                toastMessage({
                  danger: false,
                  title: "Sucesso",
                  message: "Perfil atualizado com sucesso",
                });
              }
            })
          }
        }
      );
    } else {
      dispatch(
        updateCurrentUser({
          id: user.id,
          instagramUrl,
          facebookUrl,
          linkedinUrl,
        })
      ).then((result) => {
        if (!result.meta.rejectedWithValue) {
          toastMessage({
            danger: false,
            title: "Sucesso",
            message: "Perfil atualizado com sucesso",
          });
        }
      });
    }
  };

  return (
    <styled.Main>
      <styled.Container $height={windowHeight}>
        <label>
          <styled.BigAvatar src={previewUrl} />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </label>
        <styled.ListBox onSubmit={(e) => handleSubmit(e)}>
          <styled.ListTile>
            <styled.TileLeading>
              <styled.icon className="icon-linkedin" />
            </styled.TileLeading>
            <styled.TileContent>
              <styled.TileTitle>LinkedIn</styled.TileTitle>
              <styled.TileInput
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
            </styled.TileContent>
          </styled.ListTile>
          <styled.ListTile>
            <styled.TileLeading>
              <styled.icon className="icon-facebook" />
            </styled.TileLeading>
            <styled.TileContent>
              <styled.TileTitle>Facebook</styled.TileTitle>
              <styled.TileInput
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
              />
            </styled.TileContent>
          </styled.ListTile>
          <styled.ListTile>
            <styled.TileLeading>
              <styled.icon className="icon-instagram" />
            </styled.TileLeading>
            <styled.TileContent>
              <styled.TileTitle>Instagram</styled.TileTitle>
              <styled.TileInput
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
              />
            </styled.TileContent>
          </styled.ListTile>
          <styled.ListTile>
            <span />
            <styled.TileButton>Salvar</styled.TileButton>
          </styled.ListTile>
        </styled.ListBox>
      </styled.Container>
    </styled.Main>
  );
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMissions,
  verifyCompletion,
  validationCreate,
} from "@/store/slicers/missionsSlicer.js";
import { marked } from "marked";

import * as styled from "./missionsStyles.js";
import icons from "@/assets/icons";

import innovaCoin from "@/assets/img/Innova_Coin.png";

export const Missions = ({
  windowHeight,
  toastMessage,
  modalMessage,
  modalInfo,
}) => {
  const { missions, isLoading } = useSelector((state) => state.missions);
  const { user } = useSelector((state) => state.auth);
  const [missionId, setMissionId] = useState("");
  const appMissions = ["FEEDPOST", "FEEDHASHTAG", "FEEDIMAGE"];

  const dispatch = useDispatch();

  useEffect(() => {
    if (missions && missions.length === 0) {
      dispatch(fetchMissions());
    }
  }, [dispatch]);

  useEffect(() => {
    if (modalInfo.response !== null) {
      switch (modalInfo.event) {
        case "url":
          if (modalInfo.userInput && modalInfo.response) createValidation(modalInfo.userInput);
          break;
      }
      modalMessage({
        title: "",
        message: "",
        response: null,
        event: null,
        userInput: null,
        hintText: "",
      });
    }
  }, [modalInfo.response]);

  const formatTimeLeft = (endDate) => {
    const now = new Date();
    const targetDate = new Date(endDate);
    const diff = targetDate - now;

    if (diff <= 0) return "0s";

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 && parts.length < 2) parts.push(`${minutes}m`);
    if (seconds > 0 && parts.length < 2) parts.push(`${seconds}s`);

    return parts.join(" ");
  };

  const verifyMissionCompletion = (missionId, missionType) => {
    if (appMissions.includes(missionType)) {
      dispatch(verifyCompletion(missionId)).then((result) => {
        if (!result.meta.rejectedWithValue) {
          dispatch(fetchMissions());
          toastMessage({
            danger: false,
            title: "Sucesso",
            message: "Missão concluida com sucesso",
          });
        } else {
          toastMessage({
            danger: true,
            title: "Erro",
            message: "Erro ao concluir missão",
          });
        }
      });
    } else {
      setMissionId(missionId);
      modalMessage({
        response: null,
        event: "url",
        title: "Confirmação",
        hintText: "Link para validação",
        message: `Envie o link para validação:`,
      });
    }
  };

  const createValidation = (url) => {
    const body = {
      missionId: missionId,
      url: url,
    };
    dispatch(validationCreate(body)).then((result) => {
      if (!result.meta.rejectedWithValue) {
        toastMessage({
          danger: false,
          title: "Sucesso",
          message: "Missão enviada para ser verificada",
        });
      } else {
        toastMessage({
          danger: true,
          title: "Erro",
          message: "Erro ao enviar missão para validação",
        });
      }
    });
  };

  function Message({ text }) {
    return <span dangerouslySetInnerHTML={{ __html: marked(text) }} />;
  }

  if (isLoading) {
    return (
      <styled.Main>
          <styled.SectionTitle>Carregando...</styled.SectionTitle>
      </styled.Main>
    );
  }

  return (
    <styled.Main>
      <styled.Section $height={windowHeight}>
        <styled.SectionTitle>Missões</styled.SectionTitle>
        <styled.Container>
          <styled.Box>
            <styled.ListWrapper>
              {missions &&
                missions.map((mission, index) => {
                  if (mission.completed.includes(user.uid)) return null;
                  return (
                    <styled.ListTile
                      key={index}
                      onClick={() =>
                        verifyMissionCompletion(mission.id, mission.missionType)
                      }
                    >
                      <styled.TileLeading>
                        <icons.SVGTime width="20" />
                        {formatTimeLeft(mission.endDate)}
                      </styled.TileLeading>
                      <styled.TileContent>
                        <styled.TileTitle>
                          <Message text={mission.text} />
                        </styled.TileTitle>
                      </styled.TileContent>
                      <styled.TileSubtitle>
                        {`+${mission.value}`}
                        <img src={innovaCoin} width="20" />
                      </styled.TileSubtitle>
                    </styled.ListTile>
                  );
                })}
            </styled.ListWrapper>
          </styled.Box>
        </styled.Container>
      </styled.Section>
      <styled.Container2>
        <styled.bigAvatar src={user.profilePictureUrl} />
        <styled.Content1>
          <styled.userData>
            <h1>{user.name}</h1>
            <h4>{user.role}</h4>
          </styled.userData>
        </styled.Content1>
        <styled.Content2>
          <styled.PointsListTile>
            <styled.PointsTileLeading>
              <icons.SVGMedal />
            </styled.PointsTileLeading>
            <styled.TileContent>
              <styled.PointsTileTitle>Pontos ganhos</styled.PointsTileTitle>
              <styled.PointsTileSubtitle>
                {user.pTotal}
              </styled.PointsTileSubtitle>
            </styled.TileContent>
          </styled.PointsListTile>
          <styled.PointsListTile>
            <styled.PointsTileLeading>
              <icons.SVGTrophy />
            </styled.PointsTileLeading>
            <styled.TileContent>
              <styled.PointsTileTitle>Pontos gastos</styled.PointsTileTitle>
              <styled.PointsTileSubtitle>
                {user.pSpent}
              </styled.PointsTileSubtitle>
            </styled.TileContent>
          </styled.PointsListTile>
          <styled.PointsListTile>
            <styled.PointsTileLeading>
              <img src={innovaCoin} width="25" />
            </styled.PointsTileLeading>
            <styled.TileContent>
              <styled.PointsTileTitle>Pontos atuais</styled.PointsTileTitle>
              <styled.PointsTileSubtitle>
                {user.pCurrent}
              </styled.PointsTileSubtitle>
            </styled.TileContent>
          </styled.PointsListTile>
        </styled.Content2>
      </styled.Container2>
    </styled.Main>
  );
};

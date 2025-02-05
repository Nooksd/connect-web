import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMissions,
  fetchMissions,
} from "@/store/slicers/missionsSlicer.js";
import { deleteMission } from "@/store/slicers/admSlicer.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { marked } from "marked";

import * as styled from "./missionsStyles.js";

const Missions = ({ toastMessage, modalMessage, modalInfo, openPage }) => {
  const { missions } = useSelector((state) => state.missions);
  const [whatDelete, setWhatDelete] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (missions && missions.length === 0) {
      dispatch(fetchMissions());
    }
  }, [dispatch]);

  useEffect(() => {
    if (modalInfo.response !== null) {
      if (modalInfo.event === "deleteMission" && modalInfo.response) {
        handleDeleteMission();
      }
      modalMessage({ title: "", message: "", response: null, event: null });
    }
  }, [modalInfo.response]);

  const handleAddMission = () => {
    openPage("Adicionar Missão", 2);
  };

  const handleDeleteButtonClick = (missionId, missionText) => {
    setWhatDelete(missionId);

    modalMessage({
      response: null,
      event: "deleteMission",
      title: "Confirmação",
      message: `Deseja excluir a missão "${missionText}" (Ação Permanente)?`,
    });
  };

  function handleDeleteMission() {
    const newMissions = missions.filter((mission) => mission.id !== whatDelete);

    dispatch(updateMissions(newMissions));

    dispatch(deleteMission(whatDelete)).then((result) => {
      if (!result.meta.rejectedWithValue) {
        toastMessage({
          danger: false,
          title: "Sucesso",
          message: "Missão excluída com sucesso",
        });
      } else {
        toastMessage({
          danger: true,
          title: "Erro",
          message: "Não foi possível excluir a missão",
        });
      }
    });
    setWhatDelete("");
  }

  const formatDate = (timestamp) =>
    format(new Date(timestamp), "dd 'de' MMMM 'as' HH:mm", { locale: ptBR });

  const RenderResultsOnPage = () => {
    return missions.map((mission, index) => {
      return (
        <styled.MissionDiv $isEven={(index + 1) % 2 == 0} key={index}>
          <styled.missionIndexSpan>{`#${index + 1}`}</styled.missionIndexSpan>
          <styled.missionDataSpan>
            <Message text={mission.text ?? ""} />
          </styled.missionDataSpan>
          <styled.missionDataSpan>{mission.value}</styled.missionDataSpan>
          <styled.missionDataSpan>
            {formatDate(mission.endDate)}
          </styled.missionDataSpan>
          <styled.missionDataSpan>
            {mission.completed.length}
          </styled.missionDataSpan>
          <styled.controllButtonsDiv>
            <styled.DeleteButton
              onClick={() => handleDeleteButtonClick(mission.id, mission.text)}
            >
              <styled.IconDelete className="icon-trash" />
            </styled.DeleteButton>
          </styled.controllButtonsDiv>
        </styled.MissionDiv>
      );
    });
  };

  function Message({ text }) {
    return <span dangerouslySetInnerHTML={{ __html: marked(text) }} />;
  }

  return (
    <>
      <styled.headerMissionsDiv>Controle de Missões</styled.headerMissionsDiv>
      <styled.filterOptionsDiv>
        <styled.addNewOneDiv>
          <styled.addNewOneButton onClick={() => handleAddMission()}>
            <span>+</span> Nova Missão
          </styled.addNewOneButton>
        </styled.addNewOneDiv>
        <styled.filterAndInfoDiv>
          <styled.infoPartDiv>
            <span>Index</span>
            <span>Descrição</span>
            <span>Valor</span>
            <span>Expira em</span>
            <span>Quantos completaram</span>
            <span>Controles</span>
          </styled.infoPartDiv>
        </styled.filterAndInfoDiv>
      </styled.filterOptionsDiv>
      <styled.resultsDiv>{missions && RenderResultsOnPage()}</styled.resultsDiv>
    </>
  );
};

export default Missions;

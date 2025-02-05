import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMission } from "@/store/slicers/admSlicer.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as styled from "./addMissionStyles.js";

const AddMission = ({ toastMessage }) => {
  const [textError, setTextError] = useState(false);
  const [missionTypeError, setMisionTypeError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [durationError, setDurationError] = useState(false);

  const [missionInfo, setMissionInfo] = useState({
    text: "",
    missionType: "",
    value: 0,
    duration: 0,
  });

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMissionInfo({ ...missionInfo, [name]: value });
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setMissionInfo({ ...missionInfo, [name]: Number(value) });
  };

  const handleSubmit = async () => {
    if (fieldValidator()) {
      dispatch(createMission(missionInfo)).then((result) => {
        if (!result.meta.rejectedWithValue) {
          toastMessage({
            success: true,
            title: "Sucesso",
            message: "Missão criada com sucesso",
          });
        } else {
          toastMessage({
            danger: true,
            title: "Error",
            message: "Erro ao criar missão",
          });
        }
      });
    } else {
      toastMessage({
        danger: true,
        title: "Aviso",
        message: "Campos necessários não preenchidos",
      });
    }
  };

  const handleDateChange = (date) => {
    const now = new Date();
    const newDate = new Date(date);

    newDate.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    setMissionInfo({ ...missionInfo, duration: newDate - Date.now() });
  };

  function fieldValidator() {
    let isValid = true;

    if (!missionInfo.text || missionInfo.text.length < 7) {
      setTextError(true);
      isValid = false;
    } else {
      setTextError(false);
    }
    if (missionInfo.missionType === "") {
      setMisionTypeError(true);
      isValid = false;
    } else {
      setMisionTypeError(false);
    }
    if (missionInfo.value <= 0) {
      setValueError(true);
      isValid = false;
    } else {
      setValueError(false);
    }
    if (missionInfo.duration < 86400000) {
      setDurationError(true);
      isValid = false;
    } else {
      setDurationError(false);
    }

    return isValid;
  }

  return (
    <>
      <styled.formTitle>Adicionar Missão</styled.formTitle>
      <styled.formContainer>
        <styled.formDiv $required={true}>
          <styled.formLabel>Descrição</styled.formLabel>
          <styled.formArea
            name="text"
            $error={textError}
            value={missionInfo.text}
            onChange={(e) => {
              handleInputChange(e);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
        </styled.formDiv>

        <styled.formDiv $required={true}>
          <styled.formLabel>Tipo de Missão</styled.formLabel>
          <styled.formSelect
            name="missionType"
            $error={missionTypeError}
            value={missionInfo.missionType}
            onChange={handleInputChange}
          >
            <option value="">Selecione...</option>
            <option value="FEEDPOST">Postar no Feed</option>
            <option value="FEEDHASHTAG">Postar no Feed com Hashtag</option>
            <option value="FEEDIMAGE">Postar no Feed com Imagem</option>
            <option value="INSTAGRAMPOST">Postar no Instagram</option>
            <option value="FACEBOOKPOST">Postar no FaceBook</option>
          </styled.formSelect>
        </styled.formDiv>

        <styled.formDiv $required={true}>
          <styled.formLabel>Valor</styled.formLabel>
          <styled.formInput
            type="number"
            name="value"
            $error={valueError}
            value={missionInfo.value === 0 ? "" : missionInfo.value}
            onChange={handleValueChange}
          />
        </styled.formDiv>

        <styled.formDiv $required={true}>
          <styled.formLabel>Data de Expiração</styled.formLabel>
          <DatePicker
            selected={
              missionInfo.duration
                ? new Date(Date.now() + missionInfo.duration)
                : null
            }
            onChange={(date) => handleDateChange(date)}
            dateFormat="dd/MM/yyyy HH:mm"
            minDate={new Date()}
            customInput={<styled.formInput $error={durationError} />}
          />
        </styled.formDiv>

        <styled.formManagerAndSubmitButtonDiv>
          <styled.formSubmitButton onClick={handleSubmit}>
            Enviar
          </styled.formSubmitButton>
        </styled.formManagerAndSubmitButtonDiv>
      </styled.formContainer>
    </>
  );
};

export default AddMission;

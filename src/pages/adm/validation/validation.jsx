import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchValidations,
  acceptValidation,
  rejectValidation,
} from "@/store/slicers/admSlicer.js";

import * as styled from "./validationStyles.js";

const Validations = ({ toastMessage, modalMessage, modalInfo }) => {
  const { validations } = useSelector((state) => state.adm);

  const dispatch = useDispatch();

  const [whatAccept, setWhatAccept] = useState("");
  const [whatReject, setWhatReject] = useState("");

  useEffect(() => {
    if (validations && validations.length === 0) {
      dispatch(fetchValidations());
    }
  }, [dispatch]);

  useEffect(() => {
    if (modalInfo.response !== null) {
      switch (modalInfo.event) {
        case "acceptValidation":
          if (modalInfo.response) AcceptValidation();
          break;
        case "rejectValidation":
          if (modalInfo.response) RejectValidation();
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

  function handleAcceptValidation(validationId) {
    setWhatAccept(validationId);

    modalMessage({
      title: "Aceitar validação",
      message: "Tem certeza que deseja aceitar essa validação?",
      response: null,
      event: "acceptValidation",
    });
  }

  function handleRejectValidation(validationId) {
    setWhatReject(validationId);

    modalMessage({
      title: "Rejeitar validação",
      message: "Tem certeza que deseja rejeitar essa validação?",
      response: null,
      event: "rejectValidation",
    });
  }

  const AcceptValidation = () => {
    dispatch(acceptValidation(whatAccept)).then((result) => {
      if (result.meta.rejectedWithValue) {
        toastMessage({
          danger: true,
          title: "Falha",
          message: "Falha ao aceitar validação",
        });
      } else {
        toastMessage({
          danger: false,
          title: "Sucesso",
          message: "Validação aceita com sucesso!",
        });
      }
    });
  };

  const RejectValidation = () => {
    dispatch(rejectValidation(whatReject)).then((result) => {
      if (result.meta.rejectedWithValue) {
        toastMessage({
          danger: true,
          title: "Falha",
          message: "Falha ao rejeitar validação",
        });
      } else {
        toastMessage({
          danger: false,
          title: "Sucesso",
          message: "Validação rejeitada com sucesso!",
        });
      }
    });
  };

  return (
    <>
      <styled.headerUsersDiv>Validações de missões</styled.headerUsersDiv>
      <styled.Main>
        {validations &&
          validations.map((validation, index) => (
            <styled.Container key={index}>
              <styled.bigAvatar src={validation.user.profilePictureUrl} />
              <styled.UserInfo>
                <styled.UserName>{validation.user.name}</styled.UserName>
                <styled.UserRole>{validation.user.role}</styled.UserRole>
              </styled.UserInfo>

              <styled.PostContent>
                <styled.UserName style={{ alignSelf: "flex-start" }}>
                  Missão:
                </styled.UserName>
                <styled.PostText>{validation.mission.text}</styled.PostText>
                <styled.UserName
                  style={{ alignSelf: "flex-start", marginTop: "30px" }}
                >
                  Post enviado:
                </styled.UserName>
                <a
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "blue",
                  }}
                  href={validation.url}
                  target="_blank"
                >
                  <styled.PostText>Clique aqui!</styled.PostText>
                </a>
              </styled.PostContent>

              <styled.ButtonBox>
                <styled.AcceptButton
                  onClick={() => {
                    handleAcceptValidation(validation._id);
                  }}
                >
                  Aceitar
                </styled.AcceptButton>
                <styled.DeclineButton
                  onClick={() => {
                    handleRejectValidation(validation._id);
                  }}
                >
                  Rejeitar
                </styled.DeclineButton>
              </styled.ButtonBox>

              <styled.PostFooter>
                <styled.PostTime>
                  {new Date(validation.submittedAt).toLocaleString("pt-BR")}
                </styled.PostTime>
              </styled.PostFooter>
            </styled.Container>
          ))}
      </styled.Main>
    </>
  );
};

export default Validations;

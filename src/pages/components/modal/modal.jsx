import SVGAlert from "@/assets/icons/modal/Alert_icon.jsx";
import * as styled from "./modalStyles.js";
import { useEffect } from "react";

const Modal = ({ modalMessage, setModalMessage }) => {
  if (!modalMessage.message) return null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add("no-scroll");
  }, []);

  const handleSendResponse = (response) => {
    document.body.classList.remove("no-scroll");
    setModalMessage({
      title: "",
      event: modalMessage.event,
      message: "",
      hintText: "",
      userInput: response.input,
      response: response.confirmed,
    });
  };

  const handleInputChange = (e) => {
    setModalMessage((prev) => ({
      ...prev,
      userInput: e.target.value,
    }));
  };

  return (
    <styled.modalBackgroundDiv onClick={() => handleSendResponse({ confirmed: false })}>
      <styled.modalContainerDiv onClick={(e) => e.stopPropagation()}>
        <styled.modalAlertSvgDiv>
          <SVGAlert width="100%" height="100%" />
        </styled.modalAlertSvgDiv>
        <styled.modalTitleDiv>{modalMessage.title}</styled.modalTitleDiv>
        <styled.modalContentDiv>{modalMessage.message}</styled.modalContentDiv>
        {modalMessage.hintText && (
          <styled.inputWrapper>
            <styled.inputField
              placeholder={modalMessage.hintText}
              value={modalMessage.userInput || ""}
              onChange={handleInputChange}
            />
          </styled.inputWrapper>
        )}
        <styled.responseButtonDiv>
          <styled.responseButton onClick={() => handleSendResponse({ confirmed: false })}>
            Cancelar
          </styled.responseButton>
          <styled.responseButton
            onClick={() => handleSendResponse({ confirmed: true, input: modalMessage.userInput })}
          >
            Confirmar
          </styled.responseButton>
        </styled.responseButtonDiv>
      </styled.modalContainerDiv>
    </styled.modalBackgroundDiv>
  );
};

export default Modal;

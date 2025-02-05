import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/slicers/userSlicer.js";
import { updateUser, createUser } from "@/store/slicers/admSlicer.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as styled from "./addUserStyles.js";

const AddUser = ({ toastMessage, editData }) => {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    userType: "USER",
    phoneNumber: "",
    role: "",
    entryDate: null,
    birthday: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (editData) {
      dispatch(fetchUser(editData)).then((result) => {
        setUserInfo({
          name: result.payload.name,
          email: result.payload.email,
          password: "",
          userType: result.payload.userType || "USER",
          phoneNumber: result.payload.phoneNumber || "",
          role: result.payload.role || "",
          entryDate: result.payload.entryDate
            ? new Date(result.payload.entryDate)
            : null,
          birthday: result.payload.birthday
            ? new Date(result.payload.birthday)
            : null,
        });
      });
    }
  }, [dispatch, editData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async () => {
    if (fieldValidator()) {
      if (editData) {
        const body = {
          uid: editData,
          user: userInfo,
        };
        dispatch(updateUser(body)).then((result) => {
          if (!result.meta.rejectedWithValue) {
            toastMessage({
              success: true,
              title: "Sucesso",
              message: "Usuário atualizado com sucesso",
            });
          } else {
            toastMessage({
              danger: true,
              title: "Error",
              message: result.payload,
            });
          }
        });
      } else {
        dispatch(createUser(userInfo)).then((result) => {
          if (!result.meta.rejectedWithValue) {
            toastMessage({
              success: true,
              title: "Sucesso",
              message: "Usuário criado com sucesso",
            });
          } else {
            toastMessage({
              danger: true,
              title: "Error",
              message: result.payload,
            });
          }
        });
      }
    } else {
      toastMessage({
        danger: true,
        title: "Aviso",
        message: "Campos necessários não preenchidos",
      });
    }
  };

  function fieldValidator() {
    let isValid = true;

    if (!userInfo.name) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }
    if (!userInfo.email) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }
    if ((!userInfo.password || userInfo.password.length < 5) && !editData) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    return isValid;
  }

  return (
    <>
      <styled.formTitle>
        {editData ? "Editar" : "Adicionar"} Usuário
      </styled.formTitle>
      <styled.formContainer>
        <styled.formDiv $required={true}>
          <styled.formLabel>Nome do usuário</styled.formLabel>
          <styled.formInput
            name="name"
            $error={nameError}
            value={userInfo.name}
            onChange={handleInputChange}
          />
        </styled.formDiv>
        <styled.formDiv $required={true}>
          <styled.formLabel>Email</styled.formLabel>
          <styled.formInput
            name="email"
            $error={emailError}
            value={userInfo.email}
            onChange={handleInputChange}
          />
        </styled.formDiv>
        <styled.formDiv $required={true}>
          <styled.formLabel>Senha</styled.formLabel>
          <styled.formInput
            name="password"
            $error={passwordError}
            value={userInfo.password}
            onChange={handleInputChange}
          />
        </styled.formDiv>

        {/* Novo campo: Phone Number */}
        <styled.formDiv>
          <styled.formLabel>Telefone</styled.formLabel>
          <styled.formInput
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleInputChange}
          />
        </styled.formDiv>

        {/* Novo campo: Role */}
        <styled.formDiv>
          <styled.formLabel>Cargo</styled.formLabel>
          <styled.formInput
            name="role"
            value={userInfo.role}
            onChange={handleInputChange}
          />
        </styled.formDiv>

        {/* Novo campo: UserType Selector */}
        <styled.formDiv>
          <styled.formLabel>Tipo de Usuário</styled.formLabel>
          <styled.formSelect
            name="userType"
            value={userInfo.userType}
            onChange={handleInputChange}
          >
            <option value="USER">Usuário</option>
            <option value="ADMIN">Administrador</option>
          </styled.formSelect>
        </styled.formDiv>

        <styled.formDiv>
          <styled.formLabel>Data de Admissão</styled.formLabel>
          <DatePicker
            selected={userInfo.entryDate}
            onChange={(date) => setUserInfo({ ...userInfo, entryDate: date })}
            dateFormat="dd/MM/yyyy"
            customInput={<styled.formInput />}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            maxDate={new Date()}
          />
        </styled.formDiv>

        <styled.formDiv>
          <styled.formLabel>Data de Nascimento</styled.formLabel>
          <DatePicker
            selected={userInfo.birthday}
            onChange={(date) => setUserInfo({ ...userInfo, birthday: date })}
            dateFormat="dd/MM/yyyy"
            customInput={<styled.formInput />}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            maxDate={new Date()}
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

export default AddUser;

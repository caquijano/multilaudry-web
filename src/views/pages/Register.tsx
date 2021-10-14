import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { toast } from "react-toastify";
import config from "../../config";
import jwt from "jsonwebtoken";
import { collection, addDoc, getFirestore } from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";
import "firebase/firestore";
import "firebase/auth";

const Register = () => {
  const auth = getAuth();
  const db = getFirestore();

  const initialState = {
    name: "",
    email: "",
    roles: "admin",
    password: "",
    repeatPassword: "",
  };
  const [large, setLarge] = useState(false);
  const [user, setUser] = useState<any>(initialState);
  const [codigo, setCodigo] = useState({
    codeVerify: 0,
  });

  const handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlerInputChange2 = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setCodigo({ ...codigo, [e.target.name]: e.target.value });
  };

  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      user.name &&
      user.email &&
      user.password &&
      user.repeatPassword
    ) {
      saveUser();
    } else {
      toast.error("Todos los campos son requeridos");
    }
  };

  const saveUser = async () => {
    let userId: any;
    let userEmail: any;
    let token: any;

    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        
        token = jwt.sign(
          {
            id: userId,
            email: userEmail,
          },
          config.SECRET,
          { expiresIn: 86400 }
        );
      })
      .catch((e) => {
        return toast.error(e);
      });

    await auth.onAuthStateChanged((response: any) => {
      userId = response.uid;
      userEmail = response.email;
      console.log(userEmail);
    });

    await addDoc(collection(db,"users"),{
      Email: user.email,
      Nombre: user.name,
      UserId: userId
    }) 
      .then(() => {
        window.localStorage.setItem("loggedSoccerUser", JSON.stringify(token));
        window.location.href = "/";
        toast.success("Bienvenido");
      })
      .catch(() => {
        toast.error("Upps ocurrieron problemas");
      });
  };
  
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handlSubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      name="name"
                      onChange={handlerInputChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      onChange={handlerInputChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      onChange={handlerInputChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="repeatPassword"
                      onChange={handlerInputChange}
                    />
                  </CInputGroup>
                  <CButton type="submit" color="success" block>
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block>
                      <span>facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <CModal show={large} onClose={() => setLarge(!large)} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Verificación de Cuenta</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Por favor revisa el correo electronico que ingresaste, allí te llegara
          un codigo que debes colocar en el siguiente campo.
          <input
            placeholder="Codigo de verificación "
            type="number"
            name="codeVerify"
            onChange={handlerInputChange2}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setLarge(!large)}>
            Do Something
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setLarge(!large)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Register;

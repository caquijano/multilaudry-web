import React, { useState, FormEvent, ChangeEvent } from 'react'
import config from "../../config";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import {getAuth, signInWithEmailAndPassword}  from 'firebase/auth'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  const auth = getAuth()

  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState<any>(initialState);
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement >
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello")
    if (user.email && user.password) {
      await signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential)=>{
        console.log(userCredential)
        tokenAuth()

      }).catch((e) => {
        console.log(e)
        toast.error("Error de credenciales");
        //toast
      })
      
    } else {
      
      toast.error("Todos los campos son requeridos :(");
    }
  };

  const tokenAuth = async () => {
    let userId:any;
    let userEmail:any;
    auth.onAuthStateChanged((response:any) => {
      userId = response.uid
      userEmail = response.email })
        console.log(userId, userEmail)
        const token:any = jwt.sign(
            {
                id: userId,
                email: userEmail
            },
            config.SECRET,
            { expiresIn: 86400 }
        )
        window.localStorage.setItem("loggedLaundryUser", JSON.stringify(token));
        window.localStorage.setItem("emailUser", JSON.stringify(userEmail));
        window.location.href = "/";
        toast.success("Bienvenido");
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handlSubmit}>
                    <h1>Inicio de Sesión</h1>
                    <p className="text-muted">Inicia sesión con tu cuenta.</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" autoComplete="email" name="email" onChange={handlerInputChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Contraseña" autoComplete="password" name="password" onChange={handlerInputChange} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">Ingresar</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton onClick={()=>(window.location.href = `/register`)} color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Registrate</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Registrate ahora!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

import React, { FormEvent, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
} from "@coreui/react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

function Form() {
  const db = getFirestore();
  const initialState = {
    name: "",
    address: "",
    phone: "",
  };
  const [client, setClient] = useState(initialState);
  const addClient = async () => {
    await addDoc(collection(db, "clients"), {
      Nombre: client.name,
      Direccion: client.address,
      Telefono: client.phone,
    })
      .then(() => {

        toast.success(
          "Se ha creado el cliente " + client.name + " satisfactoriamente"
        );
        window.location.href = "/clientlist";
      })
      .catch((e) => {
        toast.error("Ha ocurrido un error");
        console.log(e);
      });
  };

  const handleChange = (e: any) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (client.name && client.address && client.phone) {
      addClient();
    } else {
        toast.warning("Todos los campos son obligatorios")
    }
  };
  return (
    <div className="mx-5">
      <CCard>
        <CCardHeader>
          <h4>Cliente</h4>
          <small> nuevo</small>
        </CCardHeader>
        <CForm onSubmit={handleSubmit}>
          <CCardBody className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Nombre:</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="text"
                  name="name"
                  placeholder="Nombre..."
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel>Dirección:</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="text"
                  name="address"
                  placeholder="Dirección..."
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel>Telefono:</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="number"
                  name="phone"
                  placeholder="Telefono..."
                  onChange={handleChange}
                />
              </CCol>
            </CFormGroup>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary">
              {" "}
              Agregar Contacto
            </CButton>
          </CCardFooter>
        </CForm>
      </CCard>
    </div>
  );
}

export default Form;

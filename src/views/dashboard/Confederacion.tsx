import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "../../reusable";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFirebaseApp } from "reactfire";
import { IoCheckmarkSharp } from "react-icons/io5";


function Confederacion() {
  const db = getFirestore(useFirebaseApp());
  const storage = getStorage();
  const initialState = {
    name: "",
    tipo: "",
    logo: "",
  };
  const [image, setImage] = useState<any>();
  const [confederacion, setConfederacion] = useState(initialState);

  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setConfederacion({ ...confederacion, [e.target.name]: e.target.value });
  };

  const handlerPhotoChange = (e: any) => {
    setConfederacion({ ...confederacion, [e.target.name]: e.target.value });
    setImage(e.target.files[0]);
  };

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confederacion.name && confederacion.tipo && confederacion.logo) {
      const path =  await uploadImage();
      await addDoc(collection(db, "confederacion"), {
        Nombre: confederacion.name,
        Tipo: confederacion.tipo,
        Logo: path,
      })
        .then(() => {
          toast.success(confederacion.name+" ha sido registrada con exito")
        })
        .catch((e) => {
          toast.error("Ha ocurrido un error", e);
        });
    } else {
      toast.error("Todos los campos son requeridos");
    }
  };

  const uploadImage = async () => {
    try {
      const archivoRef: any = ref(storage, `logoConfederacion/${image.name}`); // nombre del archivo
      console.log(archivoRef);
      await uploadBytes(archivoRef, image);
      return getDownloadURL(archivoRef)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <CCard style={{ width: "80%", marginInline: "10%" }}>
        <CCardHeader>
          Confederación
          <small> Formulario</small>
          <DocsLink name="-Input" />
        </CCardHeader>
        <CCardBody>
          <CForm id="form" onSubmit={handlerSubmit} className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-name">Nombre: </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="text"
                  id="hf-name"
                  name="name"
                  placeholder="Nombre confederación..."
                  autoComplete="name"
                  onChange={handlerInputChange}
                />
                <CFormText className="help-block">
                  Por favor ingresa el nombre de tu confederación.
                </CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Magnitud: </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect name="tipo" id="select" onChange={handlerInputChange}>
                  <option value="0">Please select</option>
                  <option value="Nacional">Nacional</option>
                  <option value="Regional">Regional</option>
                  <option value="Local">Local</option>
                </CSelect>
                <CFormText className="help-block">
                  Por favor selecciona la magnitud de tu confederación.
                </CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-password">Logo: </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="file"
                  id="hf-logo"
                  name="logo"
                  placeholder="Logo.jgp"
                  autoComplete="current-logo"
                  onChange={handlerPhotoChange}
                />
                <CFormText className="help-block">
                  Por favor carga el logo de tu confederación.
                </CFormText>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton form="form" type="submit" size="sm" color="primary">
            <IoCheckmarkSharp/> Confirmar
          </CButton>
        </CCardFooter>
      </CCard>
    </div>
  );
}

export default Confederacion;

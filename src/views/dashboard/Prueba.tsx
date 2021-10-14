import React, { ChangeEvent, FormEvent, useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import {
    getAuth,
  } from "firebase/auth";
import "firebase/firestore";
import "firebase/auth";
import { useFirebaseApp } from "reactfire";



function Prueba() {
  const initialState = {
    email: "",
    password: "",
  };
  const [prueba, setPrueba] = useState(initialState);
  const db = getFirestore(useFirebaseApp());
  const auth = getAuth(useFirebaseApp())

  console.log(auth.currentUser?.uid)

  const handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrueba({ ...prueba, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prueba.email && prueba.password) {
      await addDoc(collection(db, "prueba"), {
        Email: prueba.email,
        Nombre: prueba.password,
      })
        .then((response: any) => {
          console.log("ok", response);
          toast.success("todo ok")
        })
        .catch((error: any) => {
          console.log("error", error);
          toast.error("ha ocurrido un error")
        });
    }else{
        console.log("llena todos los campos")
        toast.info("llena todos los campos")
    }
  };
  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
              onChange={handlerInputChange}
              type="text"
              className="form-control"
              id="staticEmail"
              name="email"
           
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              onChange={handlerInputChange}
              type="password"
              name="password"
              className="form-control"
              id="inputPassword"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" title="submit" />
      </form>
    </div>
  );
}

export default Prueba;

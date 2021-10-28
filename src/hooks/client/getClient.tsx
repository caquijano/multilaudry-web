import React, { useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";

function getClient() {
  const db = getFirestore();
  const initialState = {
    Nombre: "",
    Direccion: "",
    Telefono: "",
  };
  const [dataClient, setDataClient] = useState(initialState);

  const useClients = async () => {
    const Clients = await getDocs(collection(db, "clients"));
    Clients.forEach((element:any) => {
        setDataClient(element.data())
    });
  };
    useClients();
  return dataClient;
}

export default getClient;

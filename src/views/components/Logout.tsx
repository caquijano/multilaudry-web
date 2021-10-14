import React from 'react'
import { toast } from 'react-toastify';

function Logout() {

    const handleLogout = () => {
        window.localStorage.clear();
      };

    handleLogout()
    return toast.info("Sesion cerrada satisfactoriamente")
}

export default Logout

import React, { Component } from "react";
import { HashRouter, BrowserRouter } from "react-router-dom";
import PrivateRoutes from "./router/PrivateRoutes";
import PublicRoutes from "./router/PublicRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./scss/style.scss";
import'bootswatch/dist/flatly/bootstrap.css';


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <BrowserRouter>
            {!window.localStorage.getItem("loggedSoccerUser") ? (
              <PublicRoutes />
            ) : (
              <>
                <PrivateRoutes />
              </>
            )}
            <ToastContainer/>
          </BrowserRouter>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;

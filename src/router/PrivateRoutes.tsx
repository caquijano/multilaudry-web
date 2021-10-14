import React from "react";
import { Route, Switch } from "react-router-dom";
import "../scss/style.scss";
import verifyToken from "../utils/verifyToken"
import { getAuth } from "firebase/auth";

  


// Containers
const TheLayout = React.lazy(() => import("../containers/TheLayout"));

const Page404 = React.lazy(() => import("../views/pages/Page404"));
const Page500 = React.lazy(() => import("../views/pages/Page500"));

function PrivateRoutes() {
  verifyToken();
getAuth();
  return (
    <Switch>
      <Route
        exact
        path="/404"
        render={(props:any) => <Page404 {...props} />}
      />
      <Route
        exact
        path="/500"
        render={(props:any) => <Page500 {...props} />}
      />
      <Route
        path="/"
        render={(props:any) => <TheLayout {...props} />}
      />
    </Switch>
  );
}

export default PrivateRoutes;

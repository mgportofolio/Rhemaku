import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  homeOutline,
  documentTextOutline,
  shuffleOutline,
  personCircleOutline,
  searchOutline,
} from "ionicons/icons";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Shuffle from "./pages/Shuffle";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import EditProfile from "./pages/Auth/EditProfile";

import useAuth from "../src/hooks/useAuth";
import UserContext from "../src/context/UserContext";
import Post from "./pages/Post";

const App: React.FC = () => {
  const { authUser, setAuthUser } = useAuth();
  //console.log(authUser, setAuthUser);
  return (
    <IonApp>
      <IonReactRouter>
        <UserContext.Provider value={[authUser, setAuthUser]}>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/write" component={Write} exact={true} />
              <Route path="/post/:postId" component={Post} />
              <Route path="/shuffle" component={Shuffle} exact={true} />
              <Route path="/search" component={Search} exact={true} />
              <Route path="/profile" component={Profile} exact={true} />
              <Route path="/EditProfile" component={EditProfile} exact={true} />
              <Route path="/register" component={Signup} exact={true} />
              <Route path="/login" component={Login} exact={true} />
              <Route
                path="/forgotpassword"
                component={ForgotPassword}
                exact={true}
              />

              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline}></IonIcon>
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="write" href="/write">
                <IonIcon icon={documentTextOutline}></IonIcon>
                <IonLabel>Write</IonLabel>
              </IonTabButton>
              <IonTabButton tab="shuffle" href="/shuffle">
                <IonIcon icon={shuffleOutline}></IonIcon>
                <IonLabel>Shuffle</IonLabel>
              </IonTabButton>
              <IonTabButton tab="search" href="/search">
                <IonIcon icon={searchOutline}></IonIcon>
                <IonLabel>Search</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personCircleOutline}></IonIcon>
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </UserContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

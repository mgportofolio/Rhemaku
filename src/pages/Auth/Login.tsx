import React from "react";
import NavHeader from "../../components/Headers/NavHeader";
import {
  IonPage,
  IonContent,
  IonRow,
  IonCol,
  IonLoading,
  IonGrid,
} from "@ionic/react";

import { toast } from "../../helpers/toast";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase/firebase";
import validateAuth from "../../validators/validateAuth";
import { LOGIN } from "../../enum/authenticationEnum";
import LoginComponent from "../../components/Authentication/LoginComponent";
import BaseComponent from "../../components/Commons/BaseComponent";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login: React.FC<any> = (props: any) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateAuth,
    authenticateUser,
    LOGIN
  );

  const [busy, setBusy] = React.useState(false);

  async function authenticateUser() {
    const { email, password } = values;
    setBusy(true);
    try {
      await firebase.login(email, password);
      toast("You have Login successfully");
      props.history.push("/");
    } catch (err) {
      console.error("Authentication Error! Login Failed!", err);
      toast(err.message);
    } finally {
      setBusy(false);
    }
  }

  function handleKeyPress(event: any) {
    if (event.key === "Enter") {
      const { email, password } = values;
      handleSubmit();
    }
  }

  return (
    <IonPage>
      <NavHeader title="Login" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <BaseComponent>
          <LoginComponent
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            values={values}
            handleKeyPress={handleKeyPress}
          />
        </BaseComponent>
      </IonContent>
    </IonPage>
  );
};

export default Login;

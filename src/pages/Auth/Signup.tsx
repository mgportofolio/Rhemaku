import React from "react";
import NavHeader from "../../components/Headers/NavHeader";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonLoading,
  IonGrid,
} from "@ionic/react";

import { toast } from "../../helpers/toast";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase/firebase";
import validateAuth from "../../validators/validateAuth";
import { REGISTRATION } from "../../enum/authenticationEnum";
import SignupComponent from "../../components/Authentication/SignupComponent";
import BaseComponent from "../../components/Commons/BaseComponent";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const Signup: React.FC<any> = (props: any) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateAuth,
    authenticateUser,
    REGISTRATION
  );

  const [busy, setBusy] = React.useState(false);

  async function authenticateUser() {
    const { name, email, password } = values;
    setBusy(true);
    try {
      await firebase.register(name, email, password);
      toast("You have signed up successfully");
      props.history.push("/");
    } catch (err) {
      console.error("Authentication Error! Signup Failed!", err);
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
      <NavHeader title="Sign Up" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <BaseComponent>
          <SignupComponent
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

export default Signup;

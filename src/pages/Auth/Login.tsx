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
  IonRouterLink,
  IonLoading,
} from "@ionic/react";

import { toast } from "../../helpers/toast";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase/firebase";
import validateAuth from "../../validators/validateAuth";
import { LOGIN } from "../../enum/authenticationEnum";

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
    try {
      setBusy(true);
      await firebase.login(email, password);
      toast("You have signed up successfully");
      props.history.push("/");
    } catch (err) {
      console.error("Authentication Error", err);
      toast(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <IonPage>
      <NavHeader title="Login" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="text"
            value={values.email}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            name="password"
            type="password"
            value={values.password}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Login
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class="ion-text-center ion-padding-vertical">
            <IonRouterLink routerLink={"/forgotpassword"}>
              Forgot Password?
            </IonRouterLink>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;

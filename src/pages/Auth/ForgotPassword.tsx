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
} from "@ionic/react";

import { toast } from "../../helpers/toast";
import firebase from "../../firebase/firebase";
import useForm from "../../hooks/useForm";
import validateAuth from "../../validators/validateAuth";
import { FORGOT_PASSWORD } from "../../enum/authenticationEnum";

const INITIAL_STATE = {
  email: "",
};

const ForgotPassword: React.FC<any> = (props: any) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateAuth,
    authenticateUser,
    FORGOT_PASSWORD
  );

  const [busy, setBusy] = React.useState(false);

  async function authenticateUser() {
    const email = values;
    try {
      setBusy(true);
      await firebase.resetPassword(email);
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
      <NavHeader title="Password Reset" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
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
              Send Reset Link
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;

import React from "react";
import {
  IonPage,
  IonContent,
  IonLoading,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import NavHeader from "../../components/Headers/NavHeader";
import UserContext from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import validateAuth from "../../validators/validateAuth";
import { EDIT_PROFILE } from "../../enum/authenticationEnum";
import firebase from "../../firebase";
import { toast } from "../../helpers/toast";

const EditProfile: React.FC<any> = (props: any) => {
  const [user, setUser] = React.useContext(UserContext);
  const INITIAL_STATE = {
    name: user && user.displayName,
    email: user && user.email,
    currentPassword: "",
    newPassword: "",
  };

  const {
    handleSubmit,
    handleChange,
    setValues,
    values,
    isSubmitting,
  } = useForm(INITIAL_STATE, validateAuth, authenticateUser, EDIT_PROFILE);

  const [busy, setBusy] = React.useState(false);

  async function reauthenticateUser(email: string, password: string) {
    const credential = firebase.app.auth.EmailAuthProvider.credential(
      email,
      password
    );
    try {
      await user.reauthenticateWithCredential(credential);
      console.log("Reauthentication Successfull");
    } catch (err) {
      console.error("Profile Update Error ", err);
      toast(err.message);
    }
  }

  async function updateProfileItems(
    name: string,
    email: string,
    password: string
  ) {
    await user.updateProfile({
      displayName: name,
    });
    await user.updateEmail(email);
    if (password) {
      await user.updatePassword(password);
    }
  }

  async function authenticateUser() {
    setBusy(true);
    const { name, email, currentPassword, newPassword } = values;
    try {
      await reauthenticateUser(email, currentPassword);
      await updateProfileItems(name, email, newPassword);
      const result = await firebase.login(
        email,
        newPassword || currentPassword
      );
      setValues({
        name: user[0] && user[0].displayName,
        email: user[0] && user[0].email,
        newPassword: "",
        currentPassword: "",
      });
      setUser(result.user);
      toast("You have updated your profile successfully");
      props.history.push("/profile");
    } catch (err) {
      console.error("Profile Update Error", err);
      toast(err.message);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Edit Profile" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            name="username"
            type="text"
            value={values.name}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
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
          <IonLabel position="floating">New Password</IonLabel>
          <IonInput
            name="newPassword"
            type="password"
            value={values.newPassword}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Current Password</IonLabel>
          <IonInput
            name="currentPassword"
            type="password"
            value={values.currentPassword}
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
              Save
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;

import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import { toast } from "../helpers/toast";
import firebase from "../firebase/firebase";
import UserContext from "../context/UserContext";
import SmallHeader from "../components/Headers/SmallHeader";
import LargeHeader from "../components/Headers/LargeHeader";
import AuthComponent from "../components/Authentication/AuthComponent";
import { personCircleOutline, mailOutline } from "ionicons/icons";
import BaseComponent from "../components/Commons/BaseComponent";

const Profile: React.FC<any> = (props: any) => {
  const user = React.useContext(UserContext);
  async function logout() {
    try {
      await firebase.logout();
      props.history.push("/");
      toast("You have logged out successfully");
    } catch (err) {
      console.error("Logout Error", err);
      toast(err.message);
    }
  }

  return (
    <IonPage>
      <SmallHeader title="Profile" />
      <IonContent fullscreen>
        <LargeHeader title="Profile" />
        {user[0] ? (
          <>
            <IonCard>
              <IonCardContent>
                <IonList lines="none">
                  <IonItem>
                    <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user[0].displayName}</strong>
                      <p>Username</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user[0].email}</strong>
                      <p>Email</p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/editProfile"}
                  color="primary"
                  fill="outline"
                >
                  Edit Profile
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={logout}>
                  Log Out
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <BaseComponent>
            <AuthComponent />
          </BaseComponent>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;

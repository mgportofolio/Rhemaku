import React from "react";
import {
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";

const AuthComponent: React.FC = () => {
  return (
    <IonCard>
      <IonCardContent>
        <IonRow>
          <IonCol>
            <IonButton
              expand="block"
              routerLink={"/login"}
              shape="round"
              color="primary"
            >
              Login
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton
              expand="block"
              routerLink={"/register"}
              shape="round"
              fill="outline"
              color="primary"
            >
              Sign Up
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default AuthComponent;

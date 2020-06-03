import React from "react";
import {
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonRouterLink,
} from "@ionic/react";

const LoginComponent: React.FC<any> = (props: any) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="text"
            value={props.values.email}
            onIonChange={props.handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            name="password"
            type="password"
            value={props.values.password}
            onIonChange={props.handleChange}
            onKeyPress={props.handleKeyPress}
            required
          ></IonInput>
        </IonItem>
        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={props.handleSubmit}
              disabled={props.isSubmitting}
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
      </IonCardContent>
    </IonCard>
  );
};

export default LoginComponent;

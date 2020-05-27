import React from "react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from "@ionic/react";

interface Props {
  title: string;
}

const NavHeader: React.FC<Props> = (props: Props) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>{props.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavHeader;

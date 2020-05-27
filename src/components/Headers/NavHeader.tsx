import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonBackButton,
} from "@ionic/react";
import React from "react";

interface Props {
  title: string;
}

const NavHeader: React.FC<Props> = (props: Props) => {
  return (
    <IonHeader collapse="condense">
      <IonToolbar color="primary">
        <IonButton slot="start">
          <IonBackButton defaultHref="/" />
        </IonButton>
        <IonTitle>{props.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavHeader;

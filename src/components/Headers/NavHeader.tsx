import React from "react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import TopBaseComponent from "../Commons/TopBaseComponent";

interface Props {
  title: string | null;
  option?: boolean | null;
  icon?: any | null;
  action?: any | null;
}

const NavHeader: React.FC<Props> = (props: Props) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        {props.option && (
          <IonButtons slot="primary">
            <IonButton onClick={props.action}>
              <IonIcon slot="icon-only" icon={props.icon} />
            </IonButton>
          </IonButtons>
        )}
        <IonTitle>{props.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavHeader;

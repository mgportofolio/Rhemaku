import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

interface Props {
  title: string;
}

const SmallHeader: React.FC<Props> = (props: Props) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle size="large">{props.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default SmallHeader;

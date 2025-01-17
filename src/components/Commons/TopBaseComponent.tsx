import React from "react";
import { IonRow, IonCol, IonGrid } from "@ionic/react";

const TopBaseComponent: React.FC<any> = (props: any) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol pushSm="1" pushMd="2" sizeXs="12" sizeSm="10" sizeMd="8">
          {props.children}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default TopBaseComponent;

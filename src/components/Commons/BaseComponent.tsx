import React from "react";
import { IonRow, IonCol, IonGrid } from "@ionic/react";

const BaseComponent: React.FC<any> = (props: any) => {
  return (
    <IonGrid
      style={{
        height: "100%",
      }}
    >
      <IonRow
        style={{
          display: "flex",
          "align-items": "center",
          height: "100%",
        }}
      >
        <IonCol
          pushSm="1"
          pushMd="2"
          pushLg="3"
          pushXl="4"
          sizeXs="12"
          sizeSm="10"
          sizeMd="8"
          sizeLg="6"
          sizeXl="4"
        >
          {props.children}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default BaseComponent;

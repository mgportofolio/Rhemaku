import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import NavHeader from "../../components/Headers/NavHeader";

const EditProfile: React.FC = () => {
  return (
    <IonPage>
      <NavHeader title="Edit Profile" />
      <IonContent></IonContent>
    </IonPage>
  );
};

export default EditProfile;

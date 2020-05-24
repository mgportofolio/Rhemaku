import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import SmallHeader from "../components/Headers/SmallHeader";
import LargeHeader from "../components/Headers/LargeHeader";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <SmallHeader title="Home" />
      <IonContent fullscreen>
        <LargeHeader title="Home" />
      </IonContent>
    </IonPage>
  );
};

export default Home;

import { IonContent, IonPage, IonCard, IonCardContent } from "@ionic/react";
import React from "react";
import SmallHeader from "../components/Headers/SmallHeader";
import LargeHeader from "../components/Headers/LargeHeader";
import "./Home.css";
import PostList from "../components/Post/PostList";

const Home: React.FC<any> = (props: any) => {
  return (
    <IonPage>
      <SmallHeader title="Rhemaku" />
      <IonContent fullscreen>
        <LargeHeader title="Rhemaku" />
        <PostList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default Home;

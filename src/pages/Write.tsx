import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonCardContent,
  IonCard,
  IonRouterLink,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import "./Home.css";
import SmallHeader from "../components/Headers/SmallHeader";
import LargeHeader from "../components/Headers/LargeHeader";
import UserContext from "../context/UserContext";
import useForm from "../hooks/useForm";
import firebase from "../firebase/firebase";
import validatePost from "../validators/validatePost";
import { RHEMA } from "../enum/postEnum";

const INITIAL_STATE = {
  title: "",
  verse: "",
  rhema: "",
};

const Write: React.FC<any> = (props: any) => {
  const user = React.useContext(UserContext);
  const { handleSubmit, handleChange, values } = useForm(
    INITIAL_STATE,
    validatePost,
    handlePost,
    RHEMA
  );
  function handlePost() {
    if (!user[0]) {
      props.history.push("/");
    } else {
      console.log("val " + values);
      const { title, verse, rhema } = values;
      const newPost = {
        title,
        verse,
        rhema,
        postedBy: {
          id: user[0].uid,
          name: user[0].displayName,
        },
        voteCount: 1,
        category: {
          id: 1,
          name: RHEMA,
        },
        votes: [],
        comments: [],
        created: Date.now(),
      };
      firebase.db.collection("posts").add(newPost);
      props.history.push("/");
    }
  }
  return (
    <IonPage>
      <SmallHeader title="Rhemaku - Post" />
      <IonContent fullscreen>
        <LargeHeader title="Rhemaku - Post" />
        {user[0] ? (
          <IonCard>
            <IonCardContent>
              <IonList lines="none">
                <IonItem lines="full">
                  <IonLabel position="floating">Judul</IonLabel>
                  <IonInput
                    name="title"
                    value={values.title}
                    type="text"
                    onIonChange={handleChange}
                    required
                  ></IonInput>
                </IonItem>
                <IonItem lines="full">
                  <IonLabel position="floating">Ayat</IonLabel>
                  <IonTextarea
                    name="verse"
                    value={values.verse}
                    onIonChange={handleChange}
                    rows={3}
                    required
                  ></IonTextarea>
                </IonItem>
                <IonItem lines="full">
                  <IonLabel position="floating">Rhema</IonLabel>
                  <IonTextarea
                    name="rhema"
                    value={values.rhema}
                    onIonChange={handleChange}
                    rows={7}
                    required
                  ></IonTextarea>
                </IonItem>
                <IonRow>
                  <IonCol>
                    <IonButton
                      type="submit"
                      color="primary"
                      expand="block"
                      onClick={handleSubmit}
                    >
                      Post
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonList>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonCard>
            <IonCardContent>
              <IonList lines="none">
                <IonRow>
                  <IonCol class="ion-text-center ion-padding-vertical">
                    <IonLabel position="floating">
                      <h1>
                        Authenticated User Required! Please Signup or Signin
                        first!
                      </h1>
                    </IonLabel>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol class="ion-text-center ion-padding-vertical">
                    <IonRouterLink routerLink={"/profile"}>
                      <h2>Signup or Signin</h2>
                    </IonRouterLink>
                  </IonCol>
                </IonRow>
              </IonList>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Write;

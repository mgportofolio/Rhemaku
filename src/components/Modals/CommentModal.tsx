import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonTextarea,
} from "@ionic/react";

interface Props {
  isOpen: boolean;
  title: string;
  sendAction: any;
  closeAction: any;
  comment: string;
}

const CommentModal: React.FC<Props> = (props: Props) => {
  const [commentText, setCommentText] = React.useState(
    props.comment ? props.comment : ""
  );

  function handleSendAction(item: string) {
    props.sendAction(item);
    setCommentText("");
  }

  function handleCloseAction() {
    setCommentText("");
    props.closeAction();
  }

  return (
    <IonModal isOpen={props.isOpen} onDidDismiss={props.closeAction}>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle class="ion-text-center">{props.title}</IonTitle>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                handleCloseAction();
              }}
            >
              Close
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => handleSendAction(commentText)}>
              Send
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonTextarea
          rows={5}
          cols={5}
          placeholder="Your Comment"
          value={commentText}
          onIonChange={(e: any) => {
            setCommentText(e.target.value);
          }}
        />
      </IonContent>
    </IonModal>
  );
};

export default CommentModal;

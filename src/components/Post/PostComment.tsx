import React from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../firebase";
import CommentModal from "../Modals/CommentModal";
import {
  IonCardContent,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { formatDistanceToNow } from "date-fns";

const PostComment: React.FC<any> = (props: any) => {
  const user = React.useContext(UserContext);
  const [showModal, setShowModal] = React.useState(false);
  let postedByAuthor = false;
  let timestamp = formatDistanceToNow(props.comment.created);
  console.log(props.comment.created);
  console.log(props.comment.updated);

  if (user[0] != null) {
    postedByAuthor = user[0] && user[0].uid === props.comment.postedBy.id;
  }

  if (props.comment.updated !== undefined) {
    timestamp = "updated " + formatDistanceToNow(props.comment.updated);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleEditComment(commentText: string) {
    const postRef = firebase.db.collection("posts").doc(props.post.id);
    postRef.get().then((doc) => {
      if (doc.exists) {
        const previousComments = doc.data()?.comments;
        console.log(props.comment.text);

        const commentBefore = previousComments.filter(
          (Q: any) => Q.text === props.comment.text
        );
        console.log(commentBefore);
        const newComment = {
          postedBy: { id: user[0].uid, name: user[0].displayName },
          updated: Date.now(),
          created: commentBefore[0].created,
          text: commentText,
        };
        const updatedComments = previousComments.map((item: any) => {
          if (item.created === props.comment.created) {
            return newComment;
          }
          return item;
        });
        postRef.update({ comments: updatedComments });
        props.setPost((prevState: any) => ({
          ...prevState,
          comments: updatedComments,
        }));
      }
    });
    setShowModal(false);
  }

  function handleDeleteComment() {
    const postRef = firebase.db.collection("posts").doc(props.post.id);
    postRef.get().then((doc) => {
      if (doc.exists) {
        const previousComments = doc.data()?.comments;
        const updatedComments = previousComments.filter((item: any) => {
          return item.created !== props.comment.created;
        });
        postRef.update({ comments: updatedComments });
        props.setPost((prevState: any) => ({
          ...prevState,
          comments: updatedComments,
        }));
      }
    });
    setShowModal(false);
  }

  return (
    <>
      <CommentModal
        isOpen={showModal}
        title="Edit Comment"
        sendAction={handleEditComment}
        closeAction={handleCloseModal}
        comment={props.comment.text}
      />
      <IonCard>
        <IonCardContent>
          <IonList lines="none">
            <IonItem>
              <IonLabel class="ion-text-wrap">
                <p
                  style={{
                    alignItems: "center",
                    fontSize: "0.8rem",
                    fontWeight: "normal",
                  }}
                >
                  {props.comment.postedBy.name} {" said | "} {timestamp}
                </p>
                <div className="ion-padding-vertical">{props.comment.text}</div>
                {postedByAuthor && (
                  <IonButton size="small" onClick={() => setShowModal(true)}>
                    Edit
                  </IonButton>
                )}
                {postedByAuthor && (
                  <IonButton size="small" onClick={() => handleDeleteComment()}>
                    Delete
                  </IonButton>
                )}
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default PostComment;

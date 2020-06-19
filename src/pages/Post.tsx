import React from "react";
import UserContext from "../context/UserContext";
import firebase from "../firebase";
import {
  IonPage,
  IonContent,
  IonButton,
  IonCardContent,
  IonCard,
  IonIcon,
  IonText,
  IonButtons,
} from "@ionic/react";
import NavHeader from "../components/Headers/NavHeader";
import {
  closeCircleOutline,
  checkmarkCircleOutline,
  chatbubbleOutline,
} from "ionicons/icons";
import PostDetail from "../components/Post/PostDetail";
import TopBaseComponent from "../components/Commons/TopBaseComponent";
import CommentModal from "../components/Modals/CommentModal";
import { toast } from "../helpers/toast";
import PostComment from "../components/Post/PostComment";

const Post: React.FC<any> = (props: any) => {
  const user = React.useContext(UserContext);
  const [post, setPost] = React.useState<any>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const postId = props.match.params.postId;
  const postRef = firebase.db.collection("posts").doc(postId);
  var title: string = "Post";
  var canDelete: boolean = false;

  function postedByAuthor(post: any) {
    if (user[0] == null) {
      return false;
    }
    return post && user[0].uid === post.postedBy.id;
  }

  React.useEffect(() => {
    getPost();
  }, [postId]);

  function getPost() {
    postRef.get().then((doc) => {
      setPost({ ...doc.data(), id: doc.id });
    });
  }

  function handleAddVote() {
    if (!user[0]) {
      toast("You must login first to Upvote");
    } else {
      postRef.get().then((doc) => {
        if (doc.exists) {
          const previousVotes = doc.data()?.votes;
          var isVoted = previousVotes.find(
            (vote: any) => vote.votedBy.id === user[0].uid
          );
          if (isVoted) {
            toast("You already voted");
          } else {
            const vote = {
              votedBy: { id: user[0].uid, name: user[0].displayName },
            };
            const updatedVotes = [...previousVotes, vote];
            const voteCount = updatedVotes.length;
            postRef.update({ votes: updatedVotes, voteCount });
            setPost((prevState: any) => ({
              ...prevState,
              votes: updatedVotes,
              voteCount: voteCount,
            }));
          }
        }
      });
    }
  }

  function handleOpenModal() {
    if (!user[0]) {
      toast("You must login first before comment");
    } else {
      setShowModal(true);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleAddComment(commentText: string) {
    console.log(commentText);
    if (!user[0]) {
      toast("You must login first before comment");
    } else {
      postRef.get().then((doc: any) => {
        if (doc.exists) {
          const previousComments = doc.data().comments;
          const newComment = {
            postedBy: { id: user[0].uid, name: user[0].displayName },
            created: Date.now(),
            text: commentText,
          };
          const updatedComments = [...previousComments, newComment];
          postRef.update({ comments: updatedComments });
          setPost((prevState: any) => ({
            ...prevState,
            comments: updatedComments,
          }));
        }
      });
      setShowModal(false);
    }
  }

  function handleDeletePost() {
    postRef
      .delete()
      .then(() => {
        console.log(`Document with ID ${postId} has been deleted`);
      })
      .catch((err: any) => {
        console.error("Error while deleting document", err);
      });
    props.history.push("/");
  }

  if (post != null) {
    title += " by " + post.postedBy.name;
    canDelete = post && postedByAuthor(post);
  }

  return (
    <IonPage>
      <NavHeader
        title={title}
        option={canDelete}
        icon={closeCircleOutline}
        action={handleDeletePost}
      />
      <IonContent>
        <CommentModal
          isOpen={showModal}
          title="New Comment"
          sendAction={handleAddComment}
          closeAction={handleCloseModal}
          comment={""}
        ></CommentModal>
        {post && (
          <>
            <TopBaseComponent>
              <PostDetail post={post} />
              <IonCard>
                <IonCardContent>
                  <IonButton
                    onClick={() => {
                      handleAddVote();
                    }}
                    size="small"
                    color="tertiary"
                  >
                    <IonIcon
                      icon={checkmarkCircleOutline}
                      style={{ verticalAlign: "middle" }}
                    />
                    <IonText style={{ verticalAlign: "middle" }}>
                      &nbsp;Upvote
                    </IonText>
                  </IonButton>
                  &nbsp;
                  <IonButton
                    onClick={() => {
                      handleOpenModal();
                    }}
                    size="small"
                  >
                    <IonIcon
                      icon={chatbubbleOutline}
                      style={{ verticalAlign: "middle" }}
                    />
                    &nbsp;Give Comment
                  </IonButton>
                  {/* <IonButtons>
                    <IonButton
                      onClick={() => {
                        handleAddVote();
                      }}
                      size="small"
                    >
                      <IonIcon
                        icon={checkmarkCircleOutline}
                        style={{ verticalAlign: "middle" }}
                      />
                      <IonText style={{ verticalAlign: "middle" }}></IonText>
                    </IonButton>
                    <IonButton
                      onClick={() => {
                        handleOpenModal();
                      }}
                      size="small"
                    >
                      <IonIcon
                        icon={chatbubbleOutline}
                        style={{ verticalAlign: "middle" }}
                      />
                    </IonButton>
                  </IonButtons> */}
                </IonCardContent>
              </IonCard>

              {/* <div
                className="ion-padding-vertical ion-text-wrap"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                <strong style={{ fontSize: "1rem", opacity: "1" }}>
                  Comment(s)
                </strong>
              </div> */}

              {post.comments.map((comment: any, index: number) => {
                var url = `/post/${post.id}`;
                return (
                  <PostComment
                    post={post}
                    comment={comment}
                    key={index}
                    setPost={setPost}
                  />
                );
              })}
            </TopBaseComponent>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Post;

import React from "react";
import {
  IonCardContent,
  IonCard,
  IonList,
  IonItem,
  IonBadge,
  IonLabel,
  IonText,
} from "@ionic/react";
import { IonIcon } from "@ionic/react";
import {
  chevronUpCircleOutline,
  personCircleOutline,
  timeOutline,
  chatbubbleEllipsesOutline,
} from "ionicons/icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const PostDetail: React.FC<any> = (props: any) => {
  return (
    <IonCard routerLink={props.url} button>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            <IonBadge style={{ verticalAlign: "middle" }} slot="start">
              {props.index && props.showCount}
            </IonBadge>
            <IonLabel>
              <p
                style={{
                  alignItems: "center",
                  fontSize: "1.2rem",
                  fontWeight: "normal",
                }}
              >
                <IonIcon
                  icon={personCircleOutline}
                  style={{ verticalAlign: "middle" }}
                />{" "}
                <IonText style={{ verticalAlign: "middle" }}>
                  {props.post.postedBy.name}
                </IonText>
              </p>

              <div className="ion-padding-vertical ion-text-wrap">
                <strong style={{ fontSize: "1.5rem" }}>
                  {props.post.title}
                </strong>
              </div>
              <p
                className="ion-text-wrap"
                style={{
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: "normal",
                }}
              >
                <strong>Ayat Bacaan</strong>
                <br />
                <IonText>{props.post.verse}</IonText>
              </p>
              <br />
              <p
                className="ion-text-wrap"
                style={{
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: "normal",
                }}
              >
                <strong>Rhema</strong>
                <br />
                <IonText>{props.post.rhema}</IonText>
              </p>
              <br />
              <p
                style={{
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: "normal",
                }}
              >
                <IonIcon
                  icon={chevronUpCircleOutline}
                  style={{ verticalAlign: "middle" }}
                />{" "}
                <IonText style={{ verticalAlign: "middle" }}>
                  {props.post.voteCount} points
                </IonText>
                {" | "}
                <IonIcon
                  icon={timeOutline}
                  style={{ verticalAlign: "middle" }}
                />{" "}
                <IonText style={{ verticalAlign: "middle" }}>
                  {formatDistanceToNow(props.post.created)} ago
                </IonText>
                {props.post.comments.length > 0 && (
                  <>
                    {" | "}
                    <IonIcon
                      icon={chatbubbleEllipsesOutline}
                      style={{ verticalAlign: "middle" }}
                    />{" "}
                    <IonText style={{ verticalAlign: "middle" }}>
                      {props.post.comments.length} comments
                    </IonText>
                  </>
                )}
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default PostDetail;

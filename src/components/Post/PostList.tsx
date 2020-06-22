import React from "react";
import firebase from "../../firebase/firebase";
import PostItem from "./PostItem";
import TopBaseComponent from "../Commons/TopBaseComponent";
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter,
} from "@ionic/react";

const PostList: React.FC<any> = (props: any) => {
  const [posts, setPosts] = React.useState<any>([]);
  const [disableScroll, setDisableScroll] = React.useState(false);
  const [lastVisible, setLastVisible] = React.useState(null);
  const isPopular = props.location.pathname.includes("trending");
  const limit = 5;

  useIonViewWillEnter(async () => {
    await getPosts();
  });

  React.useEffect(() => {
    getPosts();
  }, [isPopular]);

  async function getPosts() {
    if (isPopular) {
      if (lastVisible != null) {
        return firebase.db
          .collection("posts")
          .orderBy("voteCount", "desc")
          .startAfter(lastVisible)
          .limit(limit)
          .onSnapshot(handleSnapshot);
      }
      return firebase.db
        .collection("posts")
        .orderBy("voteCount", "desc")
        .limit(limit)
        .onSnapshot(handleSnapshot);
    }

    if (lastVisible != null) {
      return firebase.db
        .collection("posts")
        .orderBy("created", "desc")
        .startAfter(lastVisible)
        .limit(limit)
        .onSnapshot(handleSnapshot);
    }

    return firebase.db
      .collection("posts")
      .orderBy("created", "desc")
      .limit(limit)
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot: any) {
    const freshPosts = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    setLastVisible(snapshot.docs[snapshot.docs.length - 1].data().created);
    setDisableScroll(freshPosts.length < limit);
    if (posts.length === 0) {
      setPosts(freshPosts);
    } else {
      //setPosts((posts: any[]) => [...posts, freshPosts]);
      setPosts((posts: any[]) => posts.concat(freshPosts));
    }
  }

  return (
    <TopBaseComponent>
      {posts.map((post: any, index: number) => {
        var url = `/post/${post.id}`;
        return (
          <PostItem
            key={post.id}
            showCount={true}
            url={url}
            post={post}
            index={index + 1}
          />
        );
      })}
      <IonInfiniteScroll
        threshold={"100px"}
        disabled={disableScroll}
        onIonInfinite={async () => await getPosts()}
      >
        <IonInfiniteScrollContent loadingText="Loading..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </TopBaseComponent>
  );
};

export default PostList;

import React from "react";
import firebase from "../../firebase/firebase";
import PostItem from "./PostItem";
import TopBaseComponent from "../Commons/TopBaseComponent";

const PostList: React.FC<any> = (props: any) => {
  const [posts, setPosts] = React.useState([]);
  const isPopular = props.location.pathname.includes("trending");

  React.useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isPopular]);

  function getLinks() {
    if (isPopular) {
      return firebase.db
        .collection("posts")
        .orderBy("voteCount", "desc")
        .onSnapshot(handleSnapshot);
    }
    return firebase.db
      .collection("posts")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot: any) {
    const posts = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    setPosts(posts);
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
    </TopBaseComponent>
  );
};

export default PostList;

import { IonContent, IonPage, IonSearchbar } from "@ionic/react";
import React from "react";
import "./Home.css";
import SmallHeader from "../components/Headers/SmallHeader";
import LargeHeader from "../components/Headers/LargeHeader";

import firebase from "../firebase";
import PostItem from "../components/Post/PostItem";
import TopBaseComponent from "../components/Commons/TopBaseComponent";

const Search: React.FC = () => {
  const [posts, setPosts] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [filteredPost, setFilteredPost] = React.useState([]);

  React.useEffect(() => {
    getInitialPost();
  }, []);

  React.useEffect(() => {
    handleSearch();
  }, [filter]);

  function getInitialPost() {
    firebase.db
      .collection("posts")
      .get()
      .then((snapshot: any) => {
        const posts = snapshot.docs.map((doc: any) => {
          return { id: doc.id, ...doc.data() };
        });
        console.log(posts);
        setPosts(posts);
      });
  }

  function handleChange(evt: any) {
    if (evt.key === "Enter") {
      setFilter(evt.target.value);
    }
  }

  function handleSearch() {
    const query = filter.toLowerCase();
    const matchedPosts = posts.filter((post: any) => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.rhema.toLowerCase().includes(query) ||
        post.verse.toLowerCase().includes(query) ||
        post.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredPost(matchedPosts);
  }

  return (
    <IonPage>
      <SmallHeader title="Search" />
      <IonContent fullscreen>
        <LargeHeader title="Search" />
        <TopBaseComponent>
          <IonSearchbar
            placeholder="Search"
            spellcheck={false}
            type="url"
            value={filter}
            onKeyPress={handleChange}
            animated
          />
          {filteredPost.map((filteredPost: any, index: any) => {
            var url = `/post/${filteredPost.id}`;
            return (
              <PostItem
                key={filteredPost.id}
                showCount={false}
                post={filteredPost}
                index={index + 1}
                url={url}
              />
            );
          })}
        </TopBaseComponent>
      </IonContent>
    </IonPage>
  );
};

export default Search;

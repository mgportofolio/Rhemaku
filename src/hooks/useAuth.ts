import React from "react";
import firebase from "../firebase/firebase";

function useAuth() {
  const [authUser, setAuthUser] = React.useState<any>(null);

  React.useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return { authUser, setAuthUser };
}

export default useAuth;

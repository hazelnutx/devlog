import {
  signInWithPopup,
  GithubAuthProvider,
  setPersistence,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const provider = new GithubAuthProvider();

// TODO: make a context ,where I look for authStateChange and check if there is a user.

export const signWithGithub = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      const user = result.user;

      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);

      console.log(errorCode, errorMessage);
    });
};

export const signOut = () => auth.signOut();

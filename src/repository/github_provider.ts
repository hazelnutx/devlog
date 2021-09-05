import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth, firestore } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";

const provider = new GithubAuthProvider();

// TODO: make a context ,where I look for authStateChange and check if there is a user.

export const signWithGithub = async () => {
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = await GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      const user = result.user;

      await setDoc(
        doc(firestore, "users", `${user.uid}`),
        {
          uid: user.uid,
          email: user.email,
          username: user.displayName,
        },
        { merge: true }
      );

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

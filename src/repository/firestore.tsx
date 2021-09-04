import {
  doc,
  setDoc,
  getDoc,
  FirestoreError,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { auth, firestore } from "../utils/firebase";

const user = auth.currentUser;

export const storeMarkdownData = async (markdown: any) => {
  try {
    // Verify if there's a logged in user
    await auth.onAuthStateChanged(async (user) => {
      // if there a user, go ahead and store my markdown text
      if (user) {
        await setDoc(
          doc(firestore, "markdown", `${user.uid}`),
          {
            body: markdown,
          },
          { merge: true }
        );
      } else {
      }
    });
  } catch (error) {
    const errorName = FirestoreError.name;

    console.log(errorName);
  }
};

// export const readMarkdownData = () => {
//   const user = auth.currentUser;

//   onSnapshot(
//     doc(firestore, "markdown", `${user?.uid}`),
//     (doc) => {
//       const data = doc.data();
//       return data?.body;
//     }
//   );
// };

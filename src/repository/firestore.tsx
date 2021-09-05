import {
  doc,
  setDoc,
  getDoc,
  FirestoreError,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { auth, firestore } from "../utils/firebase";
import { v4 as uuid } from "uuid";

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

export const createProject = (projectName: string) => {
  const uid = uuid();

  try {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await setDoc(doc(firestore, "projects", `${uid}`), {
            projectId: uid,
            userId: user.uid,
            projectName: projectName,
          });
        } catch (error) {
          console.error("Create project thrown with " + error);
        }
      }
    });
  } catch (error) {
    const errorName = FirestoreError.name;
    console.log(errorName);
  }
};

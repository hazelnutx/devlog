import {
  doc,
  setDoc,
  FirestoreError,
  updateDoc,
  arrayUnion,
  query,
  collection,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../utils/firebase";
import { v4 as uuid } from "uuid";

export const storeMarkdownData = async (markdown: any, projectId: string) => {
  try {
    // Verify if there's a logged in user
    await auth.onAuthStateChanged(async (user) => {
      // if there a user, go ahead and store my markdown text
      if (user) {
        await setDoc(doc(firestore, "markdown", `${projectId}`), {
          projectId: projectId,
          userId: user.uid,
          body: markdown,
        });
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
          await setDoc(doc(firestore, "todos", `${uid}`), {
            projectId: uid,
            userId: user.uid,
            projectName: projectName,
            todos: [],
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

export const addTodo = async (todo: string, projectId: string) => {
  const todoId = uuid();
  const ref = doc(firestore, "todos", `${projectId}`);
  await updateDoc(ref, {
    todos: arrayUnion({ id: todoId, text: todo, completed: false }),
  });
};

// export const completeTodo = async (
//   tid: string,
//   projectId: string,
//   complete: boolean
// ) => {
//   const todosRef = collection(firestore, "todos", `${projectId}`, "todos");
//   const ref = query(todosRef, where("todoId", "==", tid));

//   await setDoc(ref, {})

//   // await updateDoc(ref, {
//   //   todos: {
//   //     complete: complete,
//   //   },
//   // });
// };

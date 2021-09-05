import React, { KeyboardEvent } from "react";
import styled from "@emotion/styled";
import { collection, where, query, onSnapshot } from "firebase/firestore";

import { addTodo } from "../repository/firestore";
import { firestore } from "../utils/firebase";

import { TodoItem } from "./TodoItem";

interface Props {
  projectId: string;
}

interface TodoProps {
  id: string;
  text: string;
  completed: boolean;
}

// TODO: We'll need to make it so, I can watch the completed todos also.
// either via a button, like the preview, or underneath the current todo, I don't know yet.

export const Todo = ({ projectId }: Props) => {
  const [todoText, setTodoText] = React.useState<string>("");

  const [todosList, setTodosList] = React.useState<TodoProps[]>();

  const saveOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTodo(todoText, projectId);
      setTodoText("");
    }
  };

  const getTodos = async (projectId: string) => {
    const q = query(
      collection(firestore, "todos"),
      where("projectId", "==", projectId)
    );

    onSnapshot(q, (snapshot) => {
      let items: any;

      snapshot.docs.forEach((doc) => {
        items = doc.data().todos;
      });

      setTodosList(items);
    });
  };

  React.useEffect(() => {
    getTodos(projectId);
  }, [projectId]);

  return (
    <Wrapper>
      <div className="todo-list_container">
        <p className="todo-list_title">Project Todo</p>
        {todosList?.map((todo) => (
          <TodoItem
            todo_text={todo.text}
            key={todo.id}
            todo_id={todo.id}
            projectId={projectId}
          />
        ))}
        <input
          className="todo-input"
          placeholder="Add project todo..."
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onKeyPress={(e) => saveOnEnter(e)}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid #000;
  box-shadow: 4px 4px 0 0 #000;

  .todo-list_container {
    display: flex;
    flex-direction: column;
    align-items: center;

    word-wrap: break-word;

    .todo-list_title {
      margin: 20px 0 20px 0;
      font-size: 30px;
      font-weight: 800;
      font-family: "Inconsolata";
    }
    .todo-input {
      width: 80%;
      margin: 20px auto;
      border: 2px solid #000;
      box-shadow: 4px 4px 0 0 #000;
      border-radius: 8px;
      padding: 10px 10px;

      :focus {
        border: 2px solid #925bff;
        outline: #925bff;
      }
    }
  }
`;

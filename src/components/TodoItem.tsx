import styled from "@emotion/styled";
import { query } from "firebase/firestore";
import React from "react";
// import { completeTodo } from "../repository/firestore";
import { firestore } from "../utils/firebase";

interface Props {
  todo_text: string;
  todo_id: string;
  projectId: string;
}
export const TodoItem = (props: Props) => {
  const [complete, setComplete] = React.useState<boolean>(false);

  const handleComplete = async (tid: string) => {
    // completeTodo(tid, props.projectId, complete);
  };

  return (
    <Wrapper>
      <div className="todo-container">
        <input
          type="checkbox"
          className="todo-checkbox"
          onClick={() => {
            setComplete(!complete);
            handleComplete(props.todo_id);
          }}
        />
        <p className="todo-text">{props.todo_text}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5px 0;
  .todo-container {
    display: flex;
    align-items: center;

    .todo-checkbox {
      width: 20px;
      height: 20px;
      box-shadow: 4px 4px 0 0 #000;

      margin: 0 10px 0 0;

      :focus {
        outline: none;
      }
    }
    .todo-text {
      font-size: 18px;
      font-weight: 700;
    }
  }
`;

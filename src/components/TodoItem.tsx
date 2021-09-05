import styled from "@emotion/styled";
import React from "react";

interface Props {
  todo_text: string;
}
export const TodoItem = (props: Props) => {
  return (
    <Wrapper>
      <div className="todo-container">
        <input type="checkbox" className="todo-checkbox" />
        <p className="todo-text">{props.todo_text}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0;
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

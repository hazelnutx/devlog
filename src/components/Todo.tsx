import React from "react";
import styled from "@emotion/styled";
import { TodoItem } from "./TodoItem";

export const Todo = () => {
  return (
    <Wrapper>
      <div className="todo-list_container">
        <p className="todo-list_title">Project Todo</p>
        <TodoItem />
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

    .todo-list_title {
      font-size: 30px;
      font-weight: 800;
      font-family: "Inconsolata";
    }
  }
`;

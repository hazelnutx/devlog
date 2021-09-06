import styled from "@emotion/styled";
import { deleteDoc, doc } from "firebase/firestore";
import { Trash } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";
import { firestore } from "../utils/firebase";

interface Props {
  projectName: string;
  projectId: string;
}

export const ProjectCard = (props: Props) => {
  const deleteProject = async () => {
    const ref = doc(firestore, "projects", `${props.projectId}`);

    await deleteDoc(ref);
  };

  return (
    <Wrapper>
      <Link to={`/dashboard/project/${props.projectId}`} className="container">
        <p className="title">{props.projectName}</p>
        <div className="lower-half-container"></div>
      </Link>
      <button className="button" type="submit" onClick={deleteProject}>
        <Trash size={30} style={{ color: "white" }} />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: max-content;
  height: max-content;

  display: flex;
  align-items: center;

  .button {
    width: 50px;
    height: 40px;
    background-color: #b83c3c;
    border: 2px solid #000;
    box-shadow: 4px 4px 0 0;

    margin: 0 15px 0 10px;
  }
  .container {
    width: 600px;
    height: 80px;

    border-radius: 8px;
    box-shadow: 4px 4px 0 0 #000;

    border: 2px solid #000;

    cursor: pointer;

    display: flex;
    flex-direction: column;

    text-decoration: none;

    .lower-half-container {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      z-index: 999;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
    }
  }
`;

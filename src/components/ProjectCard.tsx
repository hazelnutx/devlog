import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  projectName: string;
  projectId: string;
}

export const ProjectCard = (props: Props) => {
  return (
    <Wrapper>
      <Link to={`/dashboard/project/${props.projectId}`} className="container">
        <p className="title">{props.projectName}</p>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
    }
  }
`;

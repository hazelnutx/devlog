import React from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router";

import { signWithGithub } from "../repository/github_provider";

export const SignIn = () => {
  const history = useHistory();

  const signIn = async () => {
    try {
      await signWithGithub().then((u) => {
        if (u) {
          history.push("/dashboard");
        }
      });
    } catch (e) {
      console.error("Sign in Error " + e);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <button className="button" type="submit" onClick={signIn}>
          Sign In
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #925bff;
  height: 100vh;

  .container {
    display: flex;
    flex-direction: column;
    width: min(90%, 500px);
    height: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;

    & .button {
      border: none;
      height: 64px;
      padding: 0 48px 0 48px;
      background-color: #fff;
      color: #000;
      cursor: pointer;
      border-radius: 8px;
      font-weight: 800;
      font-size: 20px;
      line-height: 30px;
      box-sizing: border-box;
      box-shadow: 4px 4px 0 0 #000;
      transform: translate(0);
      border: 2px solid #000;

      transition: all 0.2s ease;
      user-select: none;

      :hover {
        background-color: #f1f1f1;
      }
    }
  }
`;

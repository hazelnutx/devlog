import React from "react";
import styled from "@emotion/styled";
import { SignOut } from "phosphor-react";
import { signOut } from "../repository/github_provider";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const history = useHistory();

  const logOut = () => {
    signOut().then(() => history.push("/"));
  };
  return (
    <Wrapper>
      <nav>
        <div className="nav-container">
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
            }}
          >
            <h1>DEVLOG v1.0.0</h1>
          </Link>
          <div style={{ display: "flex" }}>
            <button
              className="button"
              type="submit"
              onClick={() => {}}
              style={{ marginRight: 20 }}
            >
              {/* TODO: Automated avatars from dicebear avatars */}
            </button>
            <button className="button" type="submit" onClick={logOut}>
              <SignOut size={24} weight="duotone" />
            </button>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  nav {
    width: 100%;
    height: 80px;
    background-color: #925bff;

    display: flex;

    box-shadow: 4px 4px 0 0 #000;

    .nav-container {
      width: 100%;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-size: 20px;
        color: #fff;
        font-weight: 800px;
        line-height: 30px;
        text-shadow: 4px 3px 10px #000;
        flex-grow: 1;
      }

      & .button {
        border: none;
        height: 40px;
        width: 40px;
        background-color: #fff;
        color: #000;
        cursor: pointer;
        border-radius: 50%;
        font-weight: 800;
        font-size: 20px;
        line-height: 30px;
        box-sizing: border-box;
        box-shadow: 4px 4px 0 0 #000;
        transform: translate(0);
        border: 2px solid #000;

        transition: all 0.2s ease;
        user-select: none;

        display: flex;
        justify-content: center;
        align-items: center;

        :hover {
          background-color: #f1f1f1;
        }
      }
    }
  }
`;

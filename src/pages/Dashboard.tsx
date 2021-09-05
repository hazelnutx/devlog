import React from "react";
import styled from "@emotion/styled";
import { auth, firestore } from "../utils/firebase";
import { useHistory } from "react-router";

import { onSnapshot, collection, query, where } from "@firebase/firestore";
import { Plus } from "phosphor-react";

import { createProject } from "../repository/firestore";

import { Navigation } from "../components/Navigation";
import { ProjectCard } from "../components/ProjectCard";
import { User } from "@firebase/auth";

export const Dashboard = () => {
  const history = useHistory();

  const [user, setUser] = React.useState<any>();
  const [projectName, setProjectName] = React.useState<string>("");
  const [projects, setProjects] = React.useState<any[]>([]);

  const getProjects = async (user: User) => {
    const q = query(
      collection(firestore, "projects"),
      where("userId", "==", user.uid)
    );

    onSnapshot(q, (snapshot) => {
      const items: any[] = [];

      snapshot.docs.forEach((doc) => {
        items.push(doc.data());
      });

      setProjects(items);
    });
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        getProjects(user);
      } else {
        history.push("/");
      }
    });
  }, [user, history]);

  return (
    <Wrapper>
      <Navigation />
      <div className="container">
        <div className="create-box">
          <input
            className="create-box-input"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Create project..."
          />
          <div
            className="create-box-add"
            onClick={() => {
              createProject(projectName);
              setProjectName("");
            }}
          >
            <Plus size={30} />
          </div>
        </div>
        <div className="projects">
          {projects.map((p: any) => (
            <ProjectCard
              projectName={p.projectName}
              key={p.projectId}
              projectId={p.projectId}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff;

  .container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    transition: all 1.2s ease;

    .create-box {
      display: flex;

      justify-content: center;
      align-items: center;

      margin: 30px 0 0 0;

      .create-box-input {
        width: 300px;
        height: 30px;
        padding: 10px 20px;

        color: #000;

        box-shadow: 4px 4px 0 0 #000;
        border-radius: 8px;

        margin: 0 20px 0 0;
      }

      .create-box-add {
        width: 50px;
        height: 50px;
        box-shadow: 4px 4px 0 0 #000;
        border-radius: 8px;
        border: 2px solid #000;

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .projects {
      margin: 50px 0 0 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

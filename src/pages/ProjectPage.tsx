import styled from "@emotion/styled";
import { onSnapshot, query, collection, where } from "@firebase/firestore";
import { FloppyDisk, ProjectorScreenChart } from "phosphor-react";
import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { RouteComponentProps, useHistory, withRouter } from "react-router";
import remarkGfm from "remark-gfm";
import { Navigation } from "../components/Navigation";
import { Todo } from "../components/Todo";
import { storeMarkdownData } from "../repository/firestore";
import { auth, firestore } from "../utils/firebase";

interface Props {
  id: string;
}

const ProjectPage = (props: RouteComponentProps<Props>) => {
  const bodyRef = useRef<any>();
  const history = useHistory();

  const projectId = props.match.params.id;

  const [user, setUser] = React.useState<any>();
  const [isPreview, setIsPreview] = React.useState<boolean>(false);
  const [markdownBody, setMarkdownBody] = React.useState("");

  const handleMarkdownSave = async (markdown: string, projectId: string) => {
    await storeMarkdownData(markdown, projectId);
  };

  const retrieveMarkdownData = (projectId: string) => {
    const q = query(
      collection(firestore, "markdown"),
      where("projectId", "==", projectId)
    );

    onSnapshot(q, (snapshot) => {
      let markdownData: any;

      snapshot.forEach((doc) => {
        markdownData = doc.data();
      });

      setMarkdownBody(markdownData?.body);
      bodyRef.current = markdownData?.body;
    });
  };

  React.useEffect(() => {
    retrieveMarkdownData(projectId);

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        history.push("/");
      }
    });
  }, [user, history, projectId]);

  return (
    <Wrapper isPreview={isPreview}>
      <Navigation />
      <div className="container">
        <div className="devlog-container">
          <div
            className="show-preview"
            onClick={() => handleMarkdownSave(markdownBody, projectId)}
          >
            <FloppyDisk size={30} />
          </div>
          <div
            className="show-preview"
            onClick={() => setIsPreview(!isPreview)}
          >
            <ProjectorScreenChart size={30} />
          </div>
          <textarea
            className="form-control"
            placeholder="Type something..."
            value={markdownBody}
            ref={bodyRef}
            onChange={(e) => console.log(setMarkdownBody(e.target.value))}
          />
          {isPreview && (
            <ReactMarkdown
              children={markdownBody}
              plugins={[remarkGfm]}
              className="react-markdown"
            />
          )}
        </div>
        <div className="todos-container">
          <Todo />
        </div>
      </div>
    </Wrapper>
  );
};

interface IStyle {
  isPreview: boolean;
}

const Wrapper = styled.div<IStyle>`
  background-color: #fff;

  .container {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: auto;
    column-gap: 20px;

    transition: all 1.2s ease;

    .devlog-container {
      grid-column-start: 1;
      grid-column-end: 9;
      padding: 0 20px;
      height: 100%;

      margin-top: 20px;

      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-auto-flow: row;

      align-content: flex-end;

      transition: all 1.2s ease;

      .show-preview {
        margin: 0 0 10px 0;
        height: 40px;
        width: 40px;
        padding: 0 10px 0 10px;
        border: 2px solid #000;
        border-radius: 8px;
        box-shadow: 4px 4px 0 0 #000;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: all 0.2s ease;

        cursor: pointer;

        :hover {
          box-shadow: 3px 3px 0 0 #000;
        }
      }

      .react-markdown {
        width: 100%;
        height: 100%;
        grid-column-start: ${(props) => (props.isPreview ? 5 : 0)};
        grid-column-end: ${(props) => (props.isPreview ? 9 : 0)};
        word-wrap: break-word;
        padding: 0 10px;
      }

      .form-control {
        height: 800px;

        grid-column-start: 1;
        grid-column-end: ${(props) => (props.isPreview ? 5 : 9)};
        border: 2px solid #000;
        resize: none;
        font-family: Inconsolata;
        font-weight: 600;

        :focus {
          outline: none;
        }
      }
    }

    .todos-container {
      grid-column-start: 9;
      grid-column-end: 12;
      height: 100%;
      margin: 30px 20px 0 0;
    }
  }
`;

export default withRouter(ProjectPage);

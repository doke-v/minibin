import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useStoreActions, useStoreState } from "easy-peasy";
import useEffectAfterMount from "../hooks/useEffectAfterMount";
import * as styles from "react-syntax-highlighter/dist/esm/styles/hljs/";

import Sidebar from "./sidebar";
import githubLogo from "../assets/icons/GitHub-Mark-32px.png";
import close from "../assets/icons/close.png";


function ViewPaste(props) {
  const pasteText = useStoreState(state => state.paste.pasteText);
  const getPaste = useStoreActions(actions => actions.paste.getPaste);
  const currentUser = useStoreState(state => state.paste.currentUserFromLS);
  const getNextStyle = useStoreActions(actions => actions.style.getNextStyle);
  const getPreviousStyle = useStoreActions(actions => actions.style.getPreviousStyle);
  const currentStyleName = useStoreState(state => state.style.currentStyleName);
  const setDeletePaste = useStoreActions(actions => actions.paste.setPasteToBeDeleted);
  const deletePaste = useStoreActions(actions => actions.paste.deletePaste);
  const [styleNameVisible, setStyleNameVisible] = useState(false);

  const id = props.match.params.id;
  const hash = props.location.hash.substring(1);

  useEffect(() => {
    getPaste(id);
  }, [id, getPaste]);

  useEffectAfterMount(() => {
    setStyleNameVisible(true);
    let timer = setTimeout(() => {
      setStyleNameVisible(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStyleName]);

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === "ArrowRight") {
        getNextStyle();
      }
      if (e.key === "ArrowLeft") {
        getPreviousStyle();
      }
    }
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [getNextStyle, getPreviousStyle]);

  if (hash === "raw") {
    return (
      <pre className="raw">
        <code>{pasteText}</code>
      </pre>
    );
  }

  const isUserEligibleToDelete = () => {

    if (localStorage.getItem("minibinUser") === currentUser) {
      return true;
    }
  }

  const handleDeleteUser = () => {
    var confirmation = window.confirm("Are you sure you want to delete this paste?");
    if (confirmation) {
      deletePaste(id)
    } else {
      return
    }
  }

  return (
    <>
      <div className={styleNameVisible ? "current-style" : "current-style hidden"}>{currentStyleName}</div>
      <Sidebar>
        {isUserEligibleToDelete() &&
          <div className="tooltip" onClick={handleDeleteUser}>
            <img src={close}></img>
            <span class="tooltiptext">delete paste</span>
          </div>
        }

        <div className="tooltip">
          <img src={githubLogo} >
          </img>
          <span className="tooltiptext">minibin on github</span>
        </div>

      </Sidebar>
      <SyntaxHighlighter
        language={hash}
        showLineNumbers
        lineNumberStyle={{ opacity: "0.3", userSelect: "none" }}
        customStyle={{ height: "100%", margin: 0 }}
        style={styles[currentStyleName]}
      >
        {pasteText}
      </SyntaxHighlighter>
    </>
  );
}

export default ViewPaste;

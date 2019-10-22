import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useStoreActions, useStoreState } from "easy-peasy";
import useEffectAfterMount from "../hooks/useEffectAfterMount";
import * as styles from "react-syntax-highlighter/dist/esm/styles/hljs/";

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
    deletePaste(id)
  }

  return (
    <>
      <div className={styleNameVisible ? "current-style" : "current-style hidden"}>{currentStyleName}</div>
      {isUserEligibleToDelete() && <button className="delete_button" onClick={handleDeleteUser}>X</button>}
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

import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useStoreActions, useStoreState } from "easy-peasy"
import * as styles from "react-syntax-highlighter/dist/esm/styles/hljs/"

let styleList = []
// eslint-disable-next-line
for (let style in styles) {
  styleList.push(style)
}

function ViewPaste(props) {
  const addToStyleIndex = useStoreActions(actions => actions.addToStyleIndex)
  const removeFromStyleIndex = useStoreActions(actions => actions.removeFromStyleIndex)
  const styleIndex = useStoreState(state=>state.styleIndex)
  const setStyleListLength = useStoreActions(actions => actions.setStyleListLength)
  const [data, setData] = useState("");
  const id = props.match.params.id
  let hash = props.location.hash
  hash = hash.substring(1);

  const getData = id => {
    fetch("/bin/api/" + id + "?_=" + new Date().valueOf())
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data.text);
      });
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  useEffect(()=>{
    setStyleListLength(styleList.length)
  }, [setStyleListLength])

  useEffect(()=>{ 
    function handleKeyPress (e) {    
      if(e.key === "ArrowRight") {
        addToStyleIndex()
      }
      if(e.key === "ArrowLeft") {
        removeFromStyleIndex()
      }
    }
      document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [addToStyleIndex, removeFromStyleIndex])
  
  if(hash === "raw") {
    return <pre className="raw"><code>{data}</code></pre>
  }

  return (
    <SyntaxHighlighter
      language={hash}
      showLineNumbers
      lineNumberStyle={{ opacity: "0.3", userSelect: "none" }}
      customStyle={{ height: "100%", margin: 0 }}
      style={styles[styleList[styleIndex]]}
    >
      {data}
    </SyntaxHighlighter>
  );
}

export default ViewPaste;

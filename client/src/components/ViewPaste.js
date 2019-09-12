import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/gruvbox-dark";

function ViewPaste(props) {
  const [data, setData] = useState("");
  const id = props.match.params.id
  const getData = id => {
    fetch("/" + id + "?_=" + new Date().valueOf())
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

  return (
    <SyntaxHighlighter
      showLineNumbers
      lineNumberStyle={{ opacity: "0.3", userSelect: "none" }}
      customStyle={{ height: "100%", margin: 0 }}
      style={style}
    >
      {data}
    </SyntaxHighlighter>
  );
}

export default ViewPaste;

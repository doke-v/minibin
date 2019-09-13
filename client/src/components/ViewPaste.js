import React, { useState, useEffect, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useStoreActions, useStoreState } from "easy-peasy"
import * as styles from "react-syntax-highlighter/dist/esm/styles/hljs/"

function ViewPaste(props) {
  const addToStyleIndex = useStoreActions(actions => actions.style.addToStyleIndex)
  const removeFromStyleIndex = useStoreActions(actions => actions.style.removeFromStyleIndex)
  const currentStyleName = useStoreState(state=>state.style.currentStyleName)
  const [data, setData] = useState("");
  const [styleNameVisible, setStyleNameVisible] = useState(false)

  const id = props.match.params.id
  let hash = props.location.hash.substring(1)

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

  useEffectAfterMount(() => {
    setStyleNameVisible(true)
    let timer = setTimeout(()=>{
      setStyleNameVisible(false)
    }, 100)
    return ()=>clearTimeout(timer)
  }, [currentStyleName]);


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
    <>
    <div className={styleNameVisible?"current-style": "current-style hidden" }>{currentStyleName}</div>
    <SyntaxHighlighter
      language={hash}
      showLineNumbers
      lineNumberStyle={{ opacity: "0.3", userSelect: "none" }}
      customStyle={{ height: "100%", margin: 0 }}
      style={styles[currentStyleName]}
    >
      {data}
    </SyntaxHighlighter>
    </>
  );
}

export default ViewPaste;

function useEffectAfterMount(cb, dependencies) {
  const justMounted = useRef(true);
  useEffect(() => {
    if (!justMounted.current) {
      return cb();
    }
    justMounted.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
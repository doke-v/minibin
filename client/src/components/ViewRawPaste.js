import React, { useState, useEffect } from "react";

function ViewRawPaste(props) {
  const [data, setData] = useState("");
  const id = props.match.params.id
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

  return <div className="raw"><pre><code>{data}</code></pre></div>
}

export default ViewRawPaste;

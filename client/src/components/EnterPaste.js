import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

function EnterPaste() {
  const [text, setText] = useState("");
  const error = useStoreState(state => state.paste.error);
  const count = useStoreState(state => state.paste.count);
  const postPaste = useStoreActions(actions => actions.paste.postPaste);
  const setError = useStoreActions(actions => actions.paste.setError);
  const getCount = useStoreActions(actions => actions.paste.getCount);
  const getUserPastes = useStoreActions(actions => actions.paste.getUserPastes);

  useEffect(() => {
    getCount();
    getUserPastes()
  }, [getCount]);

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (text.length < 1) {
      setError("Paste too short!");
      return;
    }
    if (text.length > 100000) {
      setError("Paste too long!");
      return;
    }
    postPaste(text);
    setText("");
    setError("");
  };

  return (
    <div className="App">
      <div className="header">
        <div className="title">MiniBin</div>
        {error && <div className="error">{error}</div>}
        {count && <div className="total">{"Total pasta: " + count}</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea autoFocus rows="10" className="text-area" value={text} onChange={handleChange} />
        <input type="submit" className="button" value="Submit" />
      </form>
    </div>
  );
}

export default EnterPaste;

import { thunk, action } from "easy-peasy";

let API_ROOT = "/bin/api";

const pasteModel = {
  error: "",
  user: "Anonymous",
  title: "Untitled",
  pasteText: "",
  count: null,
  getCount: thunk(async (actions, _payload) => {
    await fetch(API_ROOT + "/count")
      .then(response => {
        return response.json();
      })
      .then(data => {
        actions.setCount(data.count);
      })
      .catch(_err => {
        actions.setError("Database connection error!");
      });
  }),
  setCount: action((state, payload) => {
    state.count = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  getPaste: thunk(async (actions, payload) => {
    await fetch(API_ROOT + "/" + payload)
      .then(response => {
        return response.json();
      })
      .then(data => {
        actions.setPaste(data.text);
      })
      .catch(_err => {
        actions.setError("Database connection error!");
      });
  }),
  setPaste: action((state, payload) => {
    state.pasteText = payload;
  }),
  postPaste: thunk(async (actions, payload) => {
    await fetch(API_ROOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ text: payload })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        actions.redirect(data.shortid);
      })
      .catch(_err => {
        actions.setError("Database connection error!");
      });
  }),
  redirect: action((_state, payload) => {
    let url = window.location.href + payload;
    window.location.href = url;
  })
};

export default pasteModel;

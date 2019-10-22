import { thunk, action } from "easy-peasy";

let API_ROOT = "/bin/api";

let userID = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
let newUser = userID()

const pasteModel = {
  error: "",
  user: newUser,
  userPastes: null,
  title: "Untitled",
  pasteText: "",
  currentUserFromLS: "",
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
        actions.setCurrentUser(data.user);
      })
      .catch(_err => {
        actions.setError("Database connection error!");
      });
  }),
  setPaste: action((state, payload) => {
    state.pasteText = payload;
  }),
  setCurrentUser: action((state, payload) => {
    state.currentUserFromLS = payload;
  }),
  getUserPastes: thunk(async (actions, _payload) => {
    let currentUser = localStorage.getItem("minibinUser");
    await fetch(API_ROOT + "/user" + currentUser)
      .then(response => {
        return response.json(
        );
      })
      .then(data => {
        actions.setUserPastes(data);
      })
      .catch(_err => {
        actions.setError("Database connection error!");
      });
  }),
  setUserPastes: action((state, payload) => {
    state.userPastes = payload;
  }),
  deletePaste: thunk(async (actions, payload) => {
    return fetch(API_ROOT + '/delete/' + payload, {
      method: 'delete'
    }).then(window.location = "/")

  }),
  postPaste: thunk(async (actions, payload) => {
    let user;
    let currentUser = localStorage.getItem("minibinUser") || null;
    if (!currentUser) { localStorage.setItem('minibinUser', newUser); user = newUser }
    else { user = localStorage.getItem("minibinUser") }

    await fetch(API_ROOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ text: payload, user: user })
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

import { thunk, action } from "easy-peasy";

let API_ROOT = "/bin/api";

let userID = () => {
  let currentUser = localStorage.getItem("minibinUser") || '_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("minibinUser", currentUser)
  return currentUser;
};

const pasteModel = {
  error: "",
  user: userID(),
  canDelete: false,
  userPastes: null,
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
        actions.check(data)
      })
      .catch(_err => {
        actions.setError("Database connection error!");
      });
  }),

  setPaste: action((state, payload) => {
    state.pasteText = payload;
  }),

  getUserPastes: thunk(async (actions, _payload) => {
    const currentUser = localStorage.getItem("minibinUser");
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
    return fetch(API_ROOT + '/' + payload, {
      method: 'delete'
    })
  }),

  check: thunk(async (actions, payload, helpers) => {
    const user = helpers.getState().user
    return fetch(API_ROOT + '/check/' + payload.id + "/" + user).then(response=>{
      return response.json()
    }).then(({message}) => {
      if(message === "ok") {
        actions.setCanDelete(true)
      }
      else {
        actions.setCanDelete(false)
      }
    }).catch(_err => {
      actions.setError("Database connection error!");
    })
  }),

  setCanDelete: action((state, payload) => {
    state.canDelete = payload;
  }),
  
  postPaste: thunk(async (actions, payload, helpers) => {
    const user = helpers.getState().user
    // let user;
    // let currentUser = localStorage.getItem("minibinUser") || null;
    // if (!currentUser) { localStorage.setItem('minibinUser', newUser); user = newUser }
    // else { user = localStorage.getItem("minibinUser") }

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

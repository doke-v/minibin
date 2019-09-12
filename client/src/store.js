import { createStore, thunk, action } from 'easy-peasy';
import {getFromStorage, saveToStorage} from "./utils"
let API_ROOT = "/bin/api"

const store = createStore({
    error: "",
    user: "Anonymous",
    title: "Untitled",
    count: null,
    styleIndex: parseInt(getFromStorage("minibinStyle")) || 47,
    styleListLength: 0,
    addToStyleIndex: action((state, payload)=>{
      if(state.styleIndex < state.stylelistLength - 1) state.styleIndex +=1
      saveToStorage("minibinStyle", state.styleIndex)
    }),
    removeFromStyleIndex: action((state, payload)=>{
      if(state.styleIndex > 0) state.styleIndex -=1
      saveToStorage("minibinStyle", state.styleIndex)
    }),
    setStyleListLength: action((state, payload)=>{
      state.stylelistLength = payload
    }),
    getCount: thunk(async (actions, payload) => {
        await fetch(API_ROOT + "/count")
        .then(response => {
            return response.json();
          })
          .then(data => {
            actions.setCount(data.count);
          })
          .catch(_err => {
            actions.setError("Database connection error!");
          });;
      }),
    setCount: action((state, payload) => {
        state.count = payload;
    }),
    setError: action((state, payload)=>{
        state.error = payload
    }),
    postPaste: thunk(async (actions, payload) => {
        await fetch(API_ROOT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({text: payload})
          }).then(response=>{
            return response.json();
          }).then(data => {
            console.log(data)
            actions.redirect(data.shortid);
          })
          .catch(_err => {
            actions.setError("Database connection error!");
          });;
      }),
    redirect: action((state, payload)=>{
      let url = window.location.href + payload
      window.location.href = url
    })  
  });

  export default store;
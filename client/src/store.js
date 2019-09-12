import { createStore, thunk, action } from 'easy-peasy';
let API_ROOT = "/bin/api"

const store = createStore({
    error: "",
    user: "Anonymous",
    title: "Untitled",
    count: null,
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

//   fetch("/count")
//       .then(response => {
//         return response.json();
//       })
//       .then(data => {
//         this.setState({ count: data.text });
//       })
//       .catch(err => {
//         this.setState({ error: "Database connection error!" });
//       });
import { createStore, thunk, action } from 'easy-peasy';

const store = createStore({
    error: "",
    user: "Anonymous",
    title: "Untitled",
    count: null,
    getCount: thunk(async (actions, payload) => {
        await fetch("/count")
        .then(response => {
            return response.json();
          })
          .then(data => {
            actions.setCount(data.text);
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
        await fetch("/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({text: payload})
          })
      }),
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
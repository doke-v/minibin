import { createStore, thunk, action, computed } from 'easy-peasy';
import {getFromStorage, saveToStorage} from "./utils"
let API_ROOT = "/bin/api"

const store = createStore({
    error: "",
    user: "Anonymous",
    title: "Untitled",
    count: null,
    styleIndex: parseInt(getFromStorage("minibinStyle")) || 46,
    styleList: ["a11yDark", "a11yLight", "agate", "anOldHope", "androidstudio", "arduinoLight", "arta", "ascetic", "atelierCaveDark", "atelierCaveLight", "atelierDuneDark", "atelierDuneLight", "atelierEstuaryDark", "atelierEstuaryLight", "atelierForestDark", "atelierForestLight", "atelierHeathDark", "atelierHeathLight", "atelierLakesideDark", "atelierLakesideLight", "atelierPlateauDark", "atelierPlateauLight", "atelierSavannaDark", "atelierSavannaLight", "atelierSeasideDark", "atelierSeasideLight", "atelierSulphurpoolDark", "atelierSulphurpoolLight", "atomOneDarkReasonable", "atomOneDark", "atomOneLight", "codepenEmbed", "colorBrewer", "darcula", "dark", "darkula", "defaultStyle", "docco", "dracula", "far", "foundation", "githubGist", "github", "gml", "googlecode", "grayscale", "gruvboxDark", "gruvboxLight", "hopscotch", "hybrid", "idea", "irBlack", "isblEditorDark", "isblEditorLight", "kimbieDark", "kimbieLight", "lightfair", "magula", "monoBlue", "monokaiSublime", "monokai", "nord", "obsidian", "ocean", "paraisoDark", "paraisoLight", "pojoaque", "purebasic", "qtcreatorDark", "qtcreatorLight", "railscasts", "rainbow", "routeros", "shadesOfPurple", "solarizedDark", "solarizedLight", "sunburst", "tomorrowNightBlue", "tomorrowNightBright", "tomorrowNightEighties", "tomorrowNight", "tomorrow", "vs", "vs2015", "xcode", "xt256", "zenburn"],
    currentStyleName: computed((state)=>{
      let index = state.styleIndex
      return state.styleList[index]
    }),
    addToStyleIndex: action((state, payload)=>{
      state.styleIndex +=1
      if(state.styleIndex > state.styleList.length - 1) state.styleIndex = 0
      saveToStorage("minibinStyle", state.styleIndex)
    }),
    removeFromStyleIndex: action((state, payload)=>{
      state.styleIndex -=1
      if(state.styleIndex < 0) state.styleIndex = state.styleList.length - 1
      saveToStorage("minibinStyle", state.styleIndex)
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
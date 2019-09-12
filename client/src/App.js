import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ViewPaste from "./components/ViewPaste";
import EnterPaste from "./components/EnterPaste"
import {useStoreActions} from "easy-peasy"

function App(){
  const getCount = useStoreActions(actions => actions.getCount)
  useEffect(()=>{
    getCount()
  }, [])

  return <EnterPaste></EnterPaste>
}

// class App extends Component {
//   componentDidMount(){

//   }
//   render() {
//     return (
//       <Router>
//         <>
//           <Route exact path="/" component={EnterPaste} />
//           <Route path="/:id" component={ViewPaste} />
//         </>
//       </Router>
//     );
//   }
// }
// class EnterPaste extends Component {
//   state = {
//     data: null,
//     text: "",
//     user: "Anonymous",
//     title: "Untitled",
//     error: null,
//     count: null
//   };
//   postData(data) {
//     return fetch("/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8"
//       },
//       body: JSON.stringify(data)
//     })
//       .then(response => response.json())
//       .then(data => {
//         this.setState({ data });
//       });
//   }
//   componentDidMount() {
//     this.getCount();
//   }
//   getCount() {
//     fetch("/count")
//       .then(response => {
//         return response.json();
//       })
//       .then(data => {
//         this.setState({ count: data.text });
//       })
//       .catch(err => {
//         this.setState({ error: "Database connection error!" });
//       });
//   }

//   handleSubmit(evt) {
//     evt.preventDefault();
//     if (this.state.text.length < 1) {
//       this.setState({ error: "Empty paste!" }, () => {
//         if (this.timeout) {
//           clearTimeout(this.timeout);
//           this.timeout = null;
//         }
//         this.timeout = setTimeout(
//           function() {
//             this.setState({ error: false });
//             this.timeout = null;
//           }.bind(this),
//           1000
//         );
//       });
//       return;
//     }
//     this.postData({ text: this.state.text });
//     this.setState({ text: "" });
//   }
//   handleTextChange(evt) {
//     this.setState({ text: evt.target.value });
//   }
//   render() {
//     if (this.state.data) {
//       return <Redirect push to={"/" + this.state.data.shortid} />;
//     } else {
//       return (
//         <div className="App">
//           <div className="header">
//             <div className="title">MiniBin</div>
//             {this.state.error && (
//               <div className="error">{this.state.error}</div>
//             )}
//             {this.state.count && (
//               <div className="total">{"Total pasta: " + this.state.count}</div>
//             )}
//           </div>
//           <form onSubmit={this.handleSubmit.bind(this)}>
//             <textarea
//               autoFocus
//               rows="10"
//               className="text-area"
//               value={this.state.text}
//               onChange={this.handleTextChange.bind(this)}
//             />
//             <input type="submit" className="button" value="Submit" />
//           </form>
//         </div>
//       );
//     }
//   }
// }

export default App;

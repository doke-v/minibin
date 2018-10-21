import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={EnterPaste} />
          <Route path="/:id" component={ViewPaste}/>
        </React.Fragment>
      </Router>
    );
  }
}
class EnterPaste extends React.Component {
  state = {
    data: null,
    text: "",
    user: "Anonymous",
    title: "Untitled",
    error: null,
    count: null
  };
  postData(data) {
   
    return fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      });
  }
  componentDidMount() {
    this.getCount();
  }
  getCount() {
    fetch("/count")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ count: data.text });
      })
      .catch(err => {
        this.setState({ error: "Database connection error!" });
      });
  }

  
  

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.state.text.length < 1) {
      this.setState({error: "Empty paste!"}, ()=>{  
        if (this.timeout) {
          clearTimeout(this.timeout)
          this.timeout = null
        }    
        this.timeout = setTimeout(function() {
          this.setState({error: false})
          this.timeout = null
        }.bind(this), 1000)
      })
      return;
    }
    this.postData({ text: this.state.text });
    this.setState({ text: "" });
  }
  handleTextChange(evt) {
    this.setState({ text: evt.target.value });
  }
  render() {
    if (this.state.data) {
      return <Redirect push to={"/" + this.state.data.shortid} />;
    } else {
      return (
        <div className="App">
          <div className="header">
            <div className="title">MiniBin</div>
            {this.state.error && <div className="error">{this.state.error}</div>}
            {this.state.count && <div className="total">{"Total pasta: " + this.state.count}</div>}
            
          </div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <textarea autoFocus rows="10" className="text-area" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
            <input type="submit" className="button" value="Submit" />
          </form>
        </div>
      );
    }
  }
}
class ViewPaste extends React.Component {
  state = { data: null };
  componentDidMount() {
    this.getData(this.props.match.params.id);
  }
  getData = id => {
    fetch("/" + id)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ data: data.text });
      });
  };
  render() {
    return <div className="raw">{this.state.data}</div>;
  }
}

export default App;

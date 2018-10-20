import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends Component {
  state = {data: null, text: '', user: 'Anonymous', title: 'Untitled', count: null}

  postData(data) {
    return fetch('/', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({data})
      })
  }
  componentDidMount(){
    this.getCount()
  }

  componentDidUpdate(){
    this.getCount()

  }

  getCount(){
    fetch('/count')
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.setState({count: data.text})
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.postData({text: this.state.text})
    this.setState({text: ''})
  }
  handleTextChange(evt) {
    this.setState({text: evt.target.value})
  }
  removeData(){
    this.setState({data: null})
  }
  render() {
    return <Router>
          <React.Fragment>
            <Route
              exact
              path="/"
              render={() =>
                !this.state.data ? (
                  <div className="App">
                  <div className = "header">
                    <div className="title">MiniBin</div>
                    {this.state.count && <div className="total">{"Total pasta: " + this.state.count }</div>}
                  </div> 
                    <form onSubmit={this.handleSubmit.bind(this)}>
                      <textarea autoFocus rows="10" className="text-area" value={this.state.text} onChange={this.handleTextChange.bind(this)}
                      />
                      <input type="submit" className="button" value="Submit" />
                    </form>
                  </div>
                ) : (
                  <Redirect push to={'/' + this.state.data.shortid} />
                )
              }
            />
            <Route path="/:id" render={(props) => <Paste {...props} removeData={this.removeData.bind(this)} />} />
          </React.Fragment>
        </Router>
  }
}

class Paste extends React.Component {
  state = {data: null}
  componentDidMount() {
    this.props.removeData()
    this.getData(this.props.match.params.id)
  }
  getData = id => {
    fetch('/' + id)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({data: data.text})
      })
  }
  render() {
    return <div className="raw">{this.state.data}</div>
  }
}

export default App

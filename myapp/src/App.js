import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var users = [
      {
        'username': 'test1',
        'password': 'pass1'
      },
      {
        'username': 'test2',
        'password': 'pass2'
      }

    ]
    let newUser = {
      'username': `${this.state.username}`,
      'password': `${this.state.password}`
    }
    alert(`Registered with username, password:' ${this.state.username}, ${this.state.password}'redirecting to login page.'`);
    users.push(newUser);
    console.log(users);
    /* let usersJSON = JSON.stringify(users)
    localStorage.setItem('usersJSON', usersJSON);
    console.log(usersJSON); */
    //sending data to server api endpoint, which also sends data to mongodb.
    axios.post('/register', this.state)
      .then((response) => {
        //this.props.history.push('/');
      })
      .catch((error) => {
        console.log('err adding', error);
        //alert(error.response.data.message.split(':').slice(-1)[0].trim());
        //this.setState({errorMsg: error.response.data.message.split(':').slice(-1)[0].trim()})
      });
    this.props.history.push('/login');

  }

  render() {


    return (
      <div className="logo-shift wideFix App-left">
        <h1>Register</h1>
        <br />
        <h4>Welcome to ContactList, a MERN progressive web app to store your contacts.</h4>
        <hr />
        <form>
          <label>Username</label>
          <div className="input-group">
            <input
              type="username"
              name='username'
              className="form-control" 
              id='username'
              placeholder='username'
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <label>Password</label>
          <div className="form-group">
          
          <input
            type="password"
            name='password'
            className="form-control" 
            id='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          </div>
          <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                >
                    Register
                </button>
        </form>
        <br />
        <br />
        <h4>Already have an account? <a href="/login">Login</a> here.</h4><br />
      </div>
    );
  }
}


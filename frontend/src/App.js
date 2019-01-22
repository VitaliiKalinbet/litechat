import React, { Component } from 'react';
import './App.css';
import Chat from './Chat/Chat';
import Login from './Auth/Login';
import Registration from './Auth/Registration';
import socket from "socket.io-client";
import moment from 'moment'
import UserPanel from './UserPanel/UserPanel';

window.socket = socket(window.location.origin, {
    path: "/chat/"
}, {transports: ['websocket']});

class App extends Component {
  
  state = {
    modal: true,
    modalRegistration: false,
    user: '',
    error: false,
    online: 0,
    messages: [],
    usersOnline: [],
    password: '',
    confirmPassword: '',
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleModal = () => {
    if (!this.state.user) {
        this.setState(prev => ({
          error: true,
        }))
    } else {
        this.setState(prev => ({
          modal: false,
        }))
    }
  }

  anotherModal = () => {
    this.setState(prev => ({
      modal: !prev.modal,
      modalRegistration: !prev.modalRegistration,
      user: '',
      password: '',
      confirmPassword: '',
    }))
}

  funcRegistration = () => {
    this.toggleModal();
    let obj = {
      username: this.state.user,
      password: this.state.password,
    }
    // console.log(obj);
    window.socket.emit('register', obj)
  }

  funcLogin = () => {
    this.toggleModal();
    let obj = {
      username: this.state.user,
      password: this.state.password,
    }
    // console.log(obj);
    window.socket.emit('login', obj)
  }

  // onClick = () => {
  //   this.toggleModal()
  //   let obj = {
  //     userName: this.state.user,
  //     userId: this.state.userId,
  //   }
  //   window.socket.emit('send-user-name-to-online-DB', obj)
  // }

  componentWillMount(){ 
    window.socket.on("all-messages", (obj) => {
      // console.log('aaaaaaaaaaaaaa2')
        this.setState({
            messages: obj.docs,
            online: obj.online,
            usersOnline: [...obj.usersOnline],
            userId: obj.clientId,
        })
    })

    let user = {
      data: 'succsess',
    }
    window.socket.emit('new-user', user)
    // console.log('aaaaaaaaaaaaaa1')
  }

  componentDidMount() {
    window.socket.on('register-on-DB', (message) => {
      console.log('register-on-DB', message);
    });

    window.socket.on('login-done', (message) => {
      console.log('login-done', message);
    });

    window.socket.on("change-online", (online) => {
      this.setState({
          online: online,
        })
    })
    window.socket.on("get-user-name", (usersOnline) => {
      this.setState({
        usersOnline: [...usersOnline]
      })
    })
  }

  componentWillUnmount(){
    let user = {
      data: 'succsess',
    }
    window.socket.emit('disconnect', (user))
  }

  // uniqueNames=(arr)=> {
  //   // let  obj = {};
  //   //   for (let i = 0; i < arr.length; i++) {
  //   //   let str = arr[i].author;
  //   //   obj[str] = true; // запомнить строку в виде свойства объекта
  //   // }
  //   // let result = [...Object.keys(obj)];
  //   // if (!result.includes(this.state.user)) {
  //   //   result.push(this.state.user)
  //   // }
  //   this.setState(prev =>({
  //     users: [...prev.users, this.state.user],
  //   }))
  // }
  
  render() {
     const {modal, modalRegistration, online, messages, usersOnline} = this.state
    return (
  
      <div className="App">
        {modal && !modalRegistration ? <Login funcLogin={this.funcLogin} anotherModal={this.anotherModal} closeModal={this.onClick} user={this.state.user} handlerChange={this.handlerChange}error={this.state.error} password={this.state.password}/> 
        : !modal && modalRegistration ? <Registration funcRegistration={this.funcRegistration} anotherModal={this.anotherModal} confirmPassword={this.state.confirmPassword} handlerChange={this.handlerChange} user={this.state.user} password={this.state.password}/> :
        <div className='chatWrapper'>
          <UserPanel users={usersOnline} user={this.state.user}/><Chat user={this.state.user} online={this.state.online} messages={this.state.messages}/> </div>}
      </div>
    );
  }
}

export default App;

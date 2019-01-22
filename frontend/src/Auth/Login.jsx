import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon
} from 'semantic-ui-react';

class Login extends Component {

    // state = {
    //     email: '',
    //     password: '',
    //     errors: [],
    // }

    // handlerChange = (evt) => {
    //     let value = evt.target.value;
    //     let name = evt.target.name;
    //     this.setState({
    //         [name]: value,
    //     }) 
    // }

    // isFormEmpty = ({email, password}) => {
    //     return !email.length > 0 || !password.length > 0
    // }

    // isFormValid = () => {
    //     let errors = [];
    //     let error;
    //     if (this.isFormEmpty(this.state)) {
    //         error = {
    //             message: 'Fill in all fields'
    //         };
    //         this.setState({
    //             errors: errors.concat(error)
    //         })
    //         return false;
    //     } else {
    //         this.setState({
    //             errors: []
    //         })
    //         return true;
    //     }
    // }

    // handleSubmit = (evt) => {
    //     evt.preventDefault();
    //     if (this.isFormValid()) {
    //         firebase
    //         .auth()
    //         .signInWithEmailAndPassword(this.state.email, this.state.password)
    //         .then(signedUser => {
    //             console.log(signedUser);
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             this.setState({ errors: this.state.errors.concat(err)})
    //     })
    //     }
    // }

    // handleInput = (errors, inputName) => {
    //     return errors.some(el => el.message.toLowerCase().includes(inputName)) ? 'error' : '';
    // }

    render() {
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{
                    maxWidth: 450
                }}>
                    <Header as='h2' icon color='green' textAlign='center'>
                        <Icon name='user circle' color='green'/>
                        Login to Chat
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            
                            <Form.Input 
                            fluid
                            name='user'
                            icon='user'
                            iconPosition='left'
                            placeholder="Enter Username"
                            type='text'
                            onChange={this.props.handlerChange}
                            value={this.props.user}
                            required
                            autofocus
                            />

                            <Form.Input
                            fluid
                            name='password'
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={this.props.handlerChange}
                            value={this.props.password}
                            required
                            />

                            <Button onClick={this.props.funcLogin} color='green' fluid size='large'>
                                Login
                            </Button>

                        </Segment>                 
                    </Form>

                    {this.props.error &&
                        <Message>
                        Enter another user name or coorect password, please!
                        {/* <NavLink to='/registration'>&nbsp;Registration</NavLink>  */}
                        </Message> }

                    
                    {/* {this.props.error > 0 && (
                        <Message error>
                            <h3>{this.props.error}</h3>
                            {this.props.error.map(el => <p key={el.message}>{el.message}</p>)}
                        </Message>
                    )} */}

                        {/* <Message>
                            Don't have an account?
                            <NavLink to='/registration'> Registration</NavLink>
                        </Message>       */}

                            <Button onClick={this.props.anotherModal} color='green' fluid size='large'>
                                Registration
                            </Button>
                </Grid.Column>        
            </Grid>
        );
    }
}

export default Login;
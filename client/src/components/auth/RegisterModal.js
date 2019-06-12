import React, { Component } from 'react'
import {
    Alert,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';

class RegisterModal extends Component {
    
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const{ error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            // check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg });
            }else{
                this.setState({msg: null});
            }
        }

        // if Authenticated, close modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () => {
        // clear error
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onsubmit = e => {
        e.preventDefault();

        const {name , email, password} = this.state;

        // create user object
        const newUser = {name,email,password};

        this.props.register(newUser);
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>Register</NavLink>  
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> Register User</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>: null}
                        <Form onSubmit={this.onsubmit}>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Label for='email'>Email</Label>
                                <Input 
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Label for='password'>Password</Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Button color='dark' style={{ marginTop: '2rem'}} block>
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>    
                </Modal>   
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, {register, clearErrors})(RegisterModal)

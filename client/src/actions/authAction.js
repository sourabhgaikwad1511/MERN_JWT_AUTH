import axios from 'axios';
import { returnErrors } from './errorAction';
import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOGOUT_SUCCESS, 
    REGISTER_SUCCESS,
    REGISTER_FAIL 
} from '../actions/types';


// Register
export const register = ({name, email, password}) => dispatch => {
    // headers    
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    };

    // Request body
    const body = JSON.stringify({name, email, password});

    axios.post('/api/user/register', body, config)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err => { 
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
        type: REGISTER_FAIL
        });
    });
}

// login user
export const login = ({email, password}) => dispatch => {
    // headers    
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    };

    // Request body
    const body = JSON.stringify({email, password});

    axios.post('/api/user/auth', body, config)
    .then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err => { 
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
        type: LOGIN_FAIL
        });
    });
}
// setup config, header & token
export const tokenConfig = getState =>{

    // get token from local storage
    const token = getState().auth.token;

    // headers 
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    };

    if(token){
        config.headers['x-auth-token'] = token;
    }
    
}

// check token &  load user
export const loadUser = () => (dispatch, getState) =>{
    // user loading
    dispatch({ type:USER_LOADING });

    axios.get('/api/user', tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload:res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
}

//Logout 
export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    };
};




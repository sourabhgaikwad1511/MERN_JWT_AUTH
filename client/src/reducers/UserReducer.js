import { GET_USER } from '../actions/types';

const initialState ={ 
    user: [
        {id: 1, name:"soga"},
        {id: 2, name:"raja"}
    ]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return{
                ...state
            }
        default:
            return state
    }
}


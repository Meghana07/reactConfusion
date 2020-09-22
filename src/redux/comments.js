import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
        err: null,
        comments: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading : false, err: null, comments: action.payload};
        
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            console.log("Comment: ", comment);
            return {...state, comments : state.comments.concat(comment)};
        
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading : false, err: action.payload, comments: []};

        default : 
            return state;
    }
}
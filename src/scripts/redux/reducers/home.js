import React from 'react'

var initState = {
    items: []
};

export default function home (state = initState, action) {
    
    switch (action.type) {
    
        case 'INPUTE_CHANGE':
            var o = Object.assign({}, state);
            o.items.push({
                id: new Date().getTime(),
                text: action.text
            });
            return o;
        
        default:
            return state;
    }
}
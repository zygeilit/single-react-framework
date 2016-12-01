import React from 'react'
import fetch from 'isomorphic-fetch'

export function inputChange(inputText) {
    return {
        type: 'INPUTE_CHANGE',
        text: inputText
    }
};
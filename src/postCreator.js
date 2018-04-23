import React from "react";
import uuid from "uuid/v4";
import moment from "moment";

import {connect} from "react-redux";
const enterKeyCode = 13
let createElement = React.createElement;

let mapStateToProps = (state) => {
    let newProps = {};
    newProps["text"] = state["postCreatorField"];
    newProps["user"] = state["user"];
    return newProps;
};



let postCreator = ({text, user, dispatch}) => {
    let onTextEntry = (event) =>{
        let newText = event.target.value;
        dispatch({type:"ui/postCreatorField", fieldValue:newText});
    };
    let post = () => {
        let post = {
            author:user,
            id:uuid(),
            timestamp:moment(),
            text:text
        };
        dispatch({type:"post/create",post:post});
    };
    return createElement("div", {className:"editor",key:"editor"},[
        createElement("textarea",{key:"textEntryField",
            value:text, onChange:(event) => {

                if (event.keyCode !== enterKeyCode
                    || (event.keyCode === enterKeyCode && event.shiftKey)){
                    onTextEntry(event);
                }
            },
            onKeyDown:(event) => {
                if (event.keyCode === enterKeyCode && !event.shiftKey){
                    event.preventDefault();
                    post();
                }
            }
        }),
        createElement("input",{key:"postButton",type:"button",
            onClick:post, value:"Post"})
    ]);
};

let connectedCreator = connect(mapStateToProps)(postCreator);
export default connectedCreator;

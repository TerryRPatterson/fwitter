import React, {Component} from "react";
import uuid from "uuid/v4";
import moment from "moment";
// import {connect} from "react-redux";

let createElement = React.createElement;

// let mapStateToProps = (state, props) => {


class postCreator extends Component{
    constructor({state,props, updatePostList, user}){
        super(props);
        this.state = state || {text:""};
        this.user = user;
        this.updatePostList = updatePostList;
    }
    onTextEntry(event){
        let text = event.target.value;
        this.setState({text:text});
    }
    post(){
        let testingData = JSON.parse(window.localStorage.getItem("testingData"));
        let post = {
            author:this.user,
            id:uuid(),
            timestamp:moment(),
            text:this.state["text"]
        };
        testingData.push(post);
        window.localStorage.setItem("testingData",JSON.stringify(testingData));
        this.setState({text:""});
        this.updatePostList(post);
    }
    render(){
        return createElement("form", {className:"editor",key:"editor"},[
            createElement("textarea",{key:"textEntryField",
                onChange:this.onTextEntry.bind(this), value:this.state["text"],
                onKeyDown:(event) => {
                    if (event.keyCode === 13 && !event.shiftKey){
                        this.post();
                    }
                }
            }),
            createElement("input",{key:"postButton",type:"button",
                onClick:this.post.bind(this), value:"Post"})
        ]);
    }
}

export default postCreator;

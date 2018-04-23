import React from "react";
import post from "./post";
import postCreator from "./postCreator";
import loading from "./loading";
import "./postList.css";
import {connect} from "react-redux";

let createElement = React.createElement;
let mapStateToProps = (state) => {
    let newProps = {};
    newProps["user"] = state["user"];
    newProps["postList"] = state["posts"];
    return newProps;
};
let postList =  ({postList,match,user}) => {
    let editable = true;//Change to canPost
    let postCreatorHolder;
    let vDomList;
    if (match){
        if(match["params"]["username"] === user){
            editable = true;
        }
    }
    if (postList && Object.keys(postList).length > 0) {
        vDomList = Object.keys(postList).map((id) => {
            let postInfo = postList[id];
            return createElement(post,Object.assign(postInfo,{id, key:id}));
        });
    } else {
        vDomList = createElement(loading,{key:"loading"});
    }
    if (editable){
        postCreatorHolder = createElement(postCreator,{key:"postCreator",
            user:user});
    }
    let postDisplay = createElement("div",{className:
        postList && Object.keys(postList).length > 0 ? "postList" : "postList loading"
    },vDomList);
    return createElement("div",{className:"postDisplay"}, postDisplay,
        postCreatorHolder);
};

let connectedPostList = connect(mapStateToProps)(postList);
export default connectedPostList;

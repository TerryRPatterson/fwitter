import React, {Component} from "react";
import post from "./post";
import postCreator from "./postCreator";
import loading from "./loading";
import deepClone from "lodash.clonedeep";
import "./postList.css";

let createElement = React.createElement;

class postList extends Component{
    constructor({state, props, match,user}){
        super(props);
        this.state = state || {postList:[]};
        this.state.editable = true;
        this.state.user = user;
        if (match){
            if(match["params"]["username"] === user){
                this.state["editable"] = true;
            }
        }
    }
    render (){
        let list = this.state["postList"];
        let postCreatorHolder;
        let vDomList;
        if (list && list.length > 0) {
            vDomList = list.map((postInfo) => {
                let {id} = postInfo;
                return createElement(post,Object.assign(postInfo,{id, key:id}));
            });
        } else {
            vDomList = createElement(loading,{key:"loading"});
        }
        if (this.state.editable){
            postCreatorHolder = createElement(postCreator,{key:"postCreator",
                updatePostList:this.updatePostList.bind(this),
                user:this.state.user});
        }
        let postDisplay = createElement("div",{className:
            list && list.length > 0 ? "postList" : "postList loading"
        },vDomList);
        return createElement("div",{className:"postDisplay"}, postDisplay,
            postCreatorHolder);
    }
    updatePostList(newPost){
        let newList = deepClone(this.state.postList);
        newList.push(newPost);
        this.setState({postList:newList});
    }
}

export default postList;

import clone from "lodash/cloneDeep";

let createPost = (newState, action) => {
    if (Array.isArray(action["posts"])){
        newState = Object.assign(newState["posts"],action["posts"]);
    }
    else{
        newState["posts"][action["post"]["id"]] = action["post"];
    }
    newState["postCreatorField"] = "";
    return newState;
};
let deletePost = (newState, action) => {
    if (action["ids"]) {
        action["ids"].forEach( (id) => {
            newState[id] = undefined;
        });
    }
    else {
        newState[action["id"]] = undefined;
    }
    return newState;
};
let routes = {
    create:createPost,
    delete:deletePost
};

let postReducer = (oldState, action) => {
    let newState = clone(oldState);
    let type = action["type"].replace("post/","");
    return routes[type](newState,action);
};

export default postReducer;

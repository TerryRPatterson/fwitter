import clone from "lodash/cloneDeep";


let postReducer = (oldState, action) => {
    let newState = clone(oldState);
    let type = action["type"].replace("post/","");
    if (type === "create"){
        newState[action["id"]] = action["post"];
    }
    else if (type === "delete") {
        newState[action["id"]] = undefined;
    }
    else if (type === "createM"){
        newState = Object.assign(newState,action["posts"]);
    }
    else if (type === "deleteM") {
        action["ids"].forEach( (id) => {
            newState[id] = undefined;
        });
    }
    return newState;
};

export default postReducer;

import clone from "lodash/cloneDeep";

let uiReducer = (oldState, action) => {
    let newState = clone(oldState);
    let type = action["type"].replace("ui/","");
    if (type === "postCreatorField") {
        newState["postCreatorField"] = action["fieldValue"];
    }
    return newState;
};

export default uiReducer;

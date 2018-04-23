import React from "react";
import logo from "./logo.svg";
import postList from "./postList";
import "./App.css";
import {createStore} from "redux";
import postReducer from "./postReducer";
import uiReducer from "./uiReducer";
import {Provider} from "react-redux";


const createElement = React.createElement;

const intialTestingState =  {
    user:"Titan",
    postCreatorField:"",
    posts:{"adf80ea7-c250-46d0-a91d-c813f972f4ce":{"author":"Terry","text":"Testing","timestamp":"2018-04-18T15:38:33.227Z","id":"adf80ea7-c250-46d0-a91d-c813f972f4ce"},
        "21852872-e778-4ef9-98a0-3ea7d4b21954":{"author":"Katp","text":"Hello","timestamp":"2018-04-18T15:38:33.229Z","id":"21852872-e778-4ef9-98a0-3ea7d4b21954"},
        "49f72dd9-9b74-4eed-9224-43127c225adb":{"author":"Titan","text":"Anyone avalible for walks","timestamp":"2018-04-18T15:38:33.229Z","id":"49f72dd9-9b74-4eed-9224-43127c225adb"}}};

let reducerRouter = {
    "post/":postReducer,
    "ui/":uiReducer,
    "default":(state) => state
};
let determineReducer = (type) => {
    for (let routePrefix in reducerRouter) {
        if (type.startsWith(routePrefix)) {
            return reducerRouter[routePrefix];
        }
    }
    return reducerRouter["default"];
};


let reducer = (oldState=intialTestingState, action) => {
    let type = action["type"];
    return determineReducer(type)(oldState,action);
};

//                                  /*Make sure to remove in production*/
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());


let App = () => {
    //Make sure to use jwt.decode when implementing backend
    return (
        createElement("section",{className:"App",key:"mainAppDiv"},[
            createElement("header", {className:"App-header",key:"header"},[
                createElement("img",
                    {src:logo, className:"App-logo", alt:"logo", key:"logo"}),
                createElement("h1" ,{className:"App-title", key:"title"},
                    "Welcome to postter")
            ]),
            createElement(Provider,{store:store, key:"Provider"},
                createElement(postList,{key:"screen"})
            )
        ])
    );

};

export default App;

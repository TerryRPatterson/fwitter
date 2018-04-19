import React from "react";
import logo from "./logo.svg";
import postList from "./postList";
import "./App.css";


const createElement = React.createElement;

let reset = () => {
    let testingData = [{"author":"Terry","text":"Testing","timestamp":"2018-04-18T15:38:33.227Z","id":"adf80ea7-c250-46d0-a91d-c813f972f4ce"},
        {"author":"Katp","text":"Hello","timestamp":"2018-04-18T15:38:33.229Z","id":"21852872-e778-4ef9-98a0-3ea7d4b21954"},
        {"author":"Titan","text":"Anyone avalible for walks","timestamp":"2018-04-18T15:38:33.229Z","id":"49f72dd9-9b74-4eed-9224-43127c225adb"}];
    let author = "Titan";
    window.localStorage.setItem("testingData",JSON.stringify(testingData));
    window.localStorage.setItem("currentUser",author);
    window.location.reload();
};
let App = () => {
    let testingData = JSON.parse(window.localStorage.getItem("testingData"));
    //Make sure to use jwt.decode when implementing backend
    let currentUser = window.localStorage.getItem("currentUser");
    return (
        createElement("section",{className:"App",key:"mainAppDiv"},[
            createElement("header", {className:"App-header",key:"header"},[
                createElement("img",
                    {src:logo, className:"App-logo", alt:"logo", key:"logo"}),
                createElement("h1" ,{className:"App-title", key:"title"},
                    ["Welcome to postter",
                        createElement("input",{type:"button", key:"reset",
                            onClick:reset, value:"reset"})
                    ])
            ]),
            createElement(postList,{state:
                {postList:testingData}, user:currentUser, key:"screen"})
        ])
    );

};

export default App;

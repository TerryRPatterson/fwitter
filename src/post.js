import React from "react";
import userPicture from "./userPicture";
import moment from "moment";
import "./post.css";

const createElement = React.createElement;

let post = ({text, author, timestamp, id}) => {
    return createElement("article", {className:"post",key:id}, [
        createElement(userPicture,{name:author, key:"portrait"}, text),
        createElement("div",{className:"post-body",key:"postBody"},[
            createElement("pre", {key:"postBody"}, text),
            createElement("hr",{key:"hr"}),
            createElement("div", {key:"postMetaData"}, [author," | ",
                createElement("time",{dateTime:moment(timestamp)
                    .format("YYYY-MM-DDTHH:mm:ssZ"), key:"time"},
                moment(timestamp).fromNow())
            ])
        ])
    ]);
};

export default post;

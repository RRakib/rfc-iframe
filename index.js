import ReactDOM from 'react-dom';
import React, {useEffect, useRef} from "react";

export const Iframe = ({children, width, height}) => {

    const iframeRef = useRef(null);

    useEffect(() => {
        if(iframeRef.current) {
            const doc = iframeRef.current.contentDocument;
            const createDiv = document.createElement("div");
            doc.body.appendChild(createDiv);
            ReactDOM.render(children, createDiv);
        }
    }, []);

    return(
        <iframe ref={iframeRef} width={width ? width : window.innerWidth} height={height ? height : window.innerHeight} />
    )
}
import ReactDOM from 'react-dom';
import {extractCss} from "goober";
import {useEffect, createElement, useRef} from 'react';
import {useState} from "preact/compat";


export const IFrame = ({
                           children,
                           goober = true,
                           frameAttributes={},
                           skipInterval = false,
                           externalStyleLinks = [],
                           externalScripts = [],
                           mobileSupportEnabled = true,
                           enabledLatencyForSafari = true,
                           enabledLatencyForMozilla = true,
                       }) => {

    let iFrameRef = useRef(null)

    useEffect(() => {
        setupInsert();
        if (skipInterval) {
            setupInsert();
        } else {
            const checkingBody = setInterval(() => {

                setupInsert();

                if (iFrameRef.current.contentDocument.body.firstChild) {
                    clearInterval(checkingBody);
                }

            }, 200);
        }
    });

    const setupInsert = () => {
        if (!iFrameRef.current) {
            return
        }

        if (!iFrameRef.current.contentDocument) {
            return;
        }

        if ((screen.width < 700 && mobileSupportEnabled) || (typeof InstallTrigger !== 'undefined' && enabledLatencyForMozilla) || (typeof window.safari !== 'undefined' && enabledLatencyForSafari)) {
            setTimeout(() => {
                insertIntoDom();
            }, 20)
        } else {
            insertIntoDom();
        }
    }

    const insertIntoDom = () => {
        const doc = iFrameRef.current.contentDocument;
        doc.body.style.display = "none";
        ReactDOM.render(children, iFrameRef.current.contentDocument.body);
        doc.body.style.padding = "0";
        doc.body.style.margin = "0";

        if(goober) {
            gooberStyleCopy();
        }

        insertMetaData(doc);

        if(!doc.body.hasChildNodes()) {
            setStyleLink(doc);
            setExternalScripts(doc);
        };

        doc.body.style.display = "block";
    };

    const insertMetaData = (iFrame) => {
        const hasHeadTag = iFrame.getElementById("viewPortMeta");
        if (mobileSupportEnabled && enabledLatencyForMozilla && enabledLatencyForSafari) {
            iFrame.body.style.height = "100%";
            iFrameRef.current.contentDocument.documentElement.style.setProperty('height', '100%');
        }
        if (!hasHeadTag) {
            const meta = document.createElement("meta")
            meta.content = "width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no";
            meta.name = "viewport";
            meta.id = "viewPortMeta";
            iFrame.head.appendChild(meta);
        }
    };

    const gooberStyleCopy = () => {
        const css = extractCss()
        const style = iFrameRef.current.contentDocument.createElement('style');
        if (!iFrameRef.current.contentDocument.getElementById('__goober')) {
            style.id = '__goober';
            iFrameRef.current.contentDocument.head.appendChild(style);
        }
        iFrameRef.current.contentDocument.getElementById('__goober').innerText = css;
        document.getElementById('_goober').innerText = css;
    };

    const setStyleLink = (doc) => {
        if(externalStyleLinks.length > 0) {
            externalStyleLinks.forEach(item => {
                const domLink = document.createElement("link");
                domLink.rel = "stylesheet";
                domLink.href = item;
                doc.head.appendChild(domLink);
            })
        }
    };

    const setExternalScripts = (doc) => {
        if(externalScripts.length > 0) {
            externalScripts.forEach(item => {
                const domScript = document.createElement("script");
                domScript.src = item;
                domScript.async = true;
                doc.head.appendChild(domScript);
            })
        }
    };

    return createElement("iframe", {...frameAttributes, ref: iFrameRef}, null);
};

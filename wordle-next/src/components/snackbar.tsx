import React, { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

export default function Snackbar({message}:{message:string}){
    return(<>
    <div>{message}</div>
    </>)
}
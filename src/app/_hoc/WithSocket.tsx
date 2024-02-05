"use client";

import { disconnectSocket, initiateSocket } from "@socket/index";
import { useEffect } from "react";

export default function WithSocket(WrappedComponent) {
    return function ChildComponent(props) {
        useEffect(() => {
            console.log("initiateSocket");
            initiateSocket();
            return () => {
                console.log("disconnectSocket");
                disconnectSocket();
            };
        }, []);
        return <WrappedComponent {...props} />;
    };
}

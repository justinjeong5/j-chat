"use client";

import { disconnectSocket, initiateSocket } from "@socket/index";
import { useEffect } from "react";

export default function WithSocket(WrappedComponent) {
    return function ChildComponent(props) {
        useEffect(() => {
            initiateSocket();
            return () => {
                disconnectSocket();
            };
        }, []);
        return <WrappedComponent {...props} />;
    };
}

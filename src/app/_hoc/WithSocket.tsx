import { initiateSocket } from "@socket/index";

export default function WithSocket(WrappedComponent) {
    initiateSocket();

    return function ChildComponent(props) {
        return <WrappedComponent {...props} />;
    };
}

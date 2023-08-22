import { useEffect, useState } from "react";

const useDevice = () => {
    const [width, setWidth] = useState(1000);

    useEffect(() => {
        setWidth(window.innerWidth);
        const listener = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, []);

    return width < 768;
};

export default useDevice;

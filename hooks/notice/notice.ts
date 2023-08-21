import { message } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useNotice = () => {
    const [notices, setNotices] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const popNotice = () => {
        const [notice, ...rest] = notices;
        setNotices(rest);
        return notice;
    };

    const pushNotice = (notice: { type: string; content: string }) => {
        setNotices([...notices, notice]);
    };

    const errorHandler = (e: AxiosError) => {
        const content = e.message || "알 수 없는 에러가 발생했습니다.";
        pushNotice({ type: "error", content });
    };

    useEffect(() => {
        if (notices.length > 0) {
            const notice = popNotice();
            messageApi.open(notice);
        }
    }, [notices]);

    return {
        contextHolder,
        notices,
        pushNotice,
        popNotice,
        errorHandler,
    };
};

export default useNotice;

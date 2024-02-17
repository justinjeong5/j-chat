import { FixMe } from "@t/common.type";
import { message } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

type TError = AxiosError & {
    response: {
        data: {
            error: string;
            message: string;
        };
    };
};

interface INotice {
    type: string;
    content: string;
}

const useNotice = () => {
    const [notices, setNotices] = useState([] as INotice[]);
    const [messageApi, contextHolder] = message.useMessage();

    const popNotice = () => {
        const [notice, ...rest] = notices;
        setNotices(rest);
        return notice as INotice;
    };

    const pushNotice = (notice: { type: string; content: string }) => {
        setNotices([...notices, notice]);
    };

    const errorHandler = (e: TError, msg?: string) => {
        const content =
            e.response.data.message ||
            e.response.data.error ||
            msg ||
            "알 수 없는 에러가 발생했습니다.";
        pushNotice({ type: "error", content });
    };

    useEffect(() => {
        if (notices.length > 0) {
            const notice = popNotice();
            messageApi.open(notice as FixMe);
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

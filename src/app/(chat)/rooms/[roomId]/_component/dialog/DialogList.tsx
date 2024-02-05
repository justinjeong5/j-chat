import DialogItem from "@app/(chat)/rooms/[roomId]/_component/dialog/DialogItem";
import { cn } from "@lib/utils";
import IMessage from "@t/message.type";
import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function DialogList({ dialog }: { dialog: Array<IMessage> }) {
    const dialogFocus = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dialogFocus.current?.scrollIntoView({ behavior: "instant" });
    }, [dialog]);

    return (
        <div
            className={cn(
                "flex",
                "flex-col",
                "divide-y-2",
                "divide-solid",
                "divide-slate-100",
            )}
        >
            {dialog.map(item => (
                <DialogItem
                    key={uuidv4()}
                    type={item.type}
                    content={item.content}
                    stars={item.stars}
                    likes={item.likes}
                    comments={item.comments}
                    writer={item.writer}
                    createdAt={item.createdAt}
                />
            ))}
            <div ref={dialogFocus} />
        </div>
    );
}

import DialogEmpty from "@app/rooms/[roomId]/_component/dialog/DialogEmpty";
import DialogList from "@app/rooms/[roomId]/_component/dialog/DialogList";
import DialogSkeleton from "@app/rooms/[roomId]/_component/dialog/DialogSkeleton";
import IMessage from "@t/message.type";
import React from "react";

export default function Dialog({
    dialog = [],
    loading = false,
}: {
    dialog?: Array<IMessage>;
    loading?: boolean;
}) {
    if (loading) {
        return <DialogSkeleton />;
    }

    if (!dialog.length) {
        return <DialogEmpty />;
    }

    return <DialogList dialog={dialog} />;
}

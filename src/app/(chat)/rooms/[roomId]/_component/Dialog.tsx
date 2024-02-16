import DialogEmpty from "@app/(chat)/rooms/[roomId]/_component/dialog/DialogEmpty";
import DialogList from "@app/(chat)/rooms/[roomId]/_component/dialog/DialogList";
import DialogSkeleton from "@app/(chat)/rooms/[roomId]/_component/dialog/DialogSkeleton";
import { TMessage } from "@t/message.type";
import React from "react";

export default function Dialog({
    dialog = [],
    loading = false,
}: {
    dialog?: Array<TMessage>;
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

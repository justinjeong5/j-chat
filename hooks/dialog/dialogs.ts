import client from "lib/api";
import delay from "lib/time/delay";
import Dialog from "models/Dialog";

const useDialogs = async roomId => {
    const [dialogData] = await Promise.all([
        client.get("/dialogs"),
        delay(230),
    ]);
    const dialogs = dialogData.data
        .filter(({ room_id }) => String(room_id) === String(roomId))
        .map(r => new Dialog(r));

    return {
        dialogs,
    };
};

export default useDialogs;

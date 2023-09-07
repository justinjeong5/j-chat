import client from "lib/api";
import Dialog from "models/Dialog";

export default class DialogRepo {
    static async getDialogsFromRoom(roomId) {
        const { data } = await client.get("/dialogs");
        const dialogs = data
            .filter(({ room_id }) => String(room_id) === String(roomId))
            .map(r => new Dialog(r));

        return dialogs;
    }
}

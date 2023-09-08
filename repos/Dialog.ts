import client from "lib/api";
import Dialog from "models/Dialog";
import TDialog from "types/dialog";

export default class DialogRepo {
    static async getDialogsFromRoom(roomId: string): Promise<Array<TDialog>> {
        const { data } = await client.get("/dialogs");
        return data
            .filter(({ room_id }) => String(room_id) === roomId)
            .map(r => new Dialog(r));
    }
}

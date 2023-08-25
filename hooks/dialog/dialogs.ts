import client from "lib/api";
import Dialog from "models/Dialog";

const useDialogs = async roomId => {
    const { data } = await client.get(`/dialogs`);
    const dialogs = data
        .filter(({ room_id }) => String(room_id) === String(roomId))
        .map(r => new Dialog(r));

    return {
        dialogs,
    };
};

export default useDialogs;

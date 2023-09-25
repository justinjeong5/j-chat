import md5 from "md5";
import { vs as uuidv4 } from "uuid";

const getAvatarUrl = (userToken = "") => {
    const randomToken = md5(userToken || uuidv4());
    return `https://gravatar.com/avatar/${randomToken}?d=identicon`;
};

export default getAvatarUrl;

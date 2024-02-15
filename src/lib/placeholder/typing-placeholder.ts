import { TTypingUser } from "@t/user.type";

const placeholder = "대화를 입력중입니다.";

const getName = (user: TTypingUser): string => {
    return user.username;
};

const typingPlaceholder = (users: TTypingUser[]): string => {
    if (users.length === 0) {
        return "";
    }
    if (users.length === 1) {
        return `${getName(users[0])}님이 ${placeholder}`;
    }
    if (users.length === 2) {
        return `${getName(users[0])}, ${getName(users[1])}님이 ${placeholder}`;
    }
    return `${getName(users[0])}, ${getName(users[1])}님 외 ${
        users.length - 2
    }명이 ${placeholder}`;
};

export default typingPlaceholder;

const placeholder = "대화를 입력중입니다.";

const typingPlaceholder = (users: string[]) => {
    if (users.length === 0) {
        return null;
    }
    if (users.length === 1) {
        return `${users[0]}님이 ${placeholder}`;
    }
    if (users.length === 2) {
        return `${users[0]}, ${users[1]}님이 ${placeholder}`;
    }
    return `${users[0]}, ${users[1]}님 외 ${
        users.length - 2
    }명이 ${placeholder}`;
};

export default typingPlaceholder;

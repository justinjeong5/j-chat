import {
    CoffeeOutlined,
    EllipsisOutlined,
    PushpinOutlined,
    SendOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Skeleton } from "antd";
import FieldHover from "components/form/FieldHover";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme: { SPACING } }) => SPACING.STANDARD};
    line-height: initial;
`;

const ContainerItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme: { SPACING } }) => SPACING.SMALLER};
    height: 18px;

    & .ant-skeleton {
        line-height: normal;
    }
`;

const Title = styled.div`
    font-size: ${({ theme: { FONT } }) => FONT.SIZE.BIG};
    font-weight: ${({ theme: { FONT } }) => FONT.WEIGHT.SEMI_BOLD};
    margin: ${({ theme: { SPACING } }) =>
        `${SPACING.BIGGER} 0 ${SPACING.SMALLER} 0`};
`;

export default function Header({ room, loading, leaveRoom, toggleStarred }) {
    const items: MenuProps["items"] = [
        {
            label: "1st menu item",
            key: uuidv4(),
            onClick: () => console.log("1st menu item"),
        },
        {
            label: "2nd menu item",
            key: uuidv4(),
            onClick: () => console.log("2nd menu item"),
        },
        {
            type: "divider",
        },
        {
            label: "나가기",
            key: uuidv4(),
            onClick: () => leaveRoom(room.id),
        },
    ];

    return (
        <Container>
            <div
                style={{
                    display: "block",
                    height: "fit-content",
                    lineHeight: "normal",
                }}
            >
                <Title>{room.title}</Title>
                <div>{room.description}</div>
            </div>
            <Container>
                <ContainerItem>
                    <UserOutlined />
                    {loading ? (
                        <Skeleton.Button active block size="small" />
                    ) : (
                        room.users.length
                    )}
                </ContainerItem>
                <ContainerItem>
                    <SendOutlined />
                    {loading ? (
                        <Skeleton.Button active block size="small" />
                    ) : (
                        room.dialog.length
                    )}
                </ContainerItem>
                <ContainerItem onClick={toggleStarred}>
                    <FieldHover>
                        {room.starred ? (
                            <PushpinOutlined />
                        ) : (
                            <CoffeeOutlined />
                        )}
                    </FieldHover>
                </ContainerItem>
                <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    placement="bottomRight"
                >
                    <ContainerItem>
                        <FieldHover>
                            <EllipsisOutlined />
                        </FieldHover>
                    </ContainerItem>
                </Dropdown>
            </Container>
        </Container>
    );
}

import {
    SendOutlined,
    StarOutlined,
    StarTwoTone,
    UserOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import Rooms from "models/Rooms";
import PropTypes, { number } from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${({ theme: { SPACING } }) => SPACING.STANDARD};
    height: ${({ theme: { SPACING } }) => SPACING.HEADER_HEIGHT};
`;

const ContainerItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme: { SPACING } }) => SPACING.SMALLER};
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

export default function Header({ room, loading }) {
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
                        room.dialogs.length
                    )}
                </ContainerItem>
                <ContainerItem>
                    {room.type === Rooms.STAR ? (
                        <StarTwoTone />
                    ) : (
                        <StarOutlined />
                    )}
                </ContainerItem>
            </Container>
        </Container>
    );
}

Header.propTypes = {
    room: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        type: PropTypes.oneOf([Rooms.PUBLIC, Rooms.STAR, Rooms.DIRECT])
            .isRequired,
        users: PropTypes.arrayOf(number).isRequired,
        dialogs: PropTypes.arrayOf(number).isRequired,
    }).isRequired,
    loading: PropTypes.bool,
};

Header.defaultProps = {
    loading: false,
};

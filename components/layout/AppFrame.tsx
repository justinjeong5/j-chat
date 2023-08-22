import { Layout } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const { Sider } = Layout;

const Container = styled.div`
    height: calc(100vh - 18px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FrameWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: top;
    max-width: ${({ theme: { SPACING } }) => SPACING.LAYOUT.FRAME_MAX_WIDTH};
    min-width: 600px;
`;
const ContentWrapper = styled.div`
    height: calc(100vh - 40px);
    width: 100%;
`;
const Header = styled.div`
    height: ${({ theme: { SPACING } }) => SPACING.LAYOUT.HEADER_HEIGHT};
    width: auto;
    padding: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;
const Content = styled.div`
    height: calc(100% - 150px);
    width: auto;
    padding: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

export default function AppFrame({ menu, header, children }) {
    return (
        <Container>
            <FrameWrapper>
                <Sider breakpoint="md" collapsedWidth="0" width={300}>
                    {menu}
                </Sider>
                <ContentWrapper>
                    <Header>{header} </Header>
                    <Content>{children}</Content>
                </ContentWrapper>
            </FrameWrapper>
        </Container>
    );
}

AppFrame.propTypes = {
    menu: PropTypes.element.isRequired,
    header: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired,
};

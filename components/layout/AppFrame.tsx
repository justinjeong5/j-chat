import { Layout as antdLayout } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    margin: 0 auto;
    max-width: ${({ theme: { SPACING } }) => SPACING.FRAME_MAX_WIDTH};
`;
const Layout = styled(antdLayout)`
    background: ${({ theme: { COLOR } }) => COLOR.WHITE};
`;
const Sider = styled(antdLayout.Sider)`
    && {
        background: white;
    }
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    height: calc(100vh - 1rem);
    overflow: auto;
`;
const Content = styled(antdLayout.Content)`
    background: ${({ theme: { COLOR } }) => COLOR.WHITE};
    margin: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;
const Header = styled(antdLayout.Header)`
    background: ${({ theme: { COLOR } }) => COLOR.WHITE};
    height: ${({ theme: { SPACING } }) => SPACING.HEADER_HEIGHT};
`;

export default function AppFrame({ menu, header, children }) {
    return (
        <Container>
            <Layout hasSider>
                <Sider
                    width={300}
                    theme="light"
                    breakpoint="md"
                    collapsedWidth={0}
                >
                    {menu}
                </Sider>
                <Layout>
                    <Header>{header}</Header>
                    <Content>{children}</Content>
                </Layout>
            </Layout>
        </Container>
    );
}

AppFrame.propTypes = {
    menu: PropTypes.element.isRequired,
    header: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired,
};

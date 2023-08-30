import { Layout as antdLayout } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    margin: 0 auto;
    max-width: ${({ theme: { SPACING } }) => SPACING.LAYOUT.FRAME_MAX_WIDTH};
`;
const Layout = styled(antdLayout)`
    background: white;
`;
const Sider = styled(antdLayout.Sider)`
    && {
        background: white;
    }
    overflow: auto;
    height: calc(100vh - 1rem);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
`;
const Content = styled(antdLayout.Content)`
    background: white;
    margin: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;
const Header = styled(antdLayout.Header)`
    background: white;
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

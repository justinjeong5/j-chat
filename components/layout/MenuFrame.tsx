import { Divider } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: ${({ theme: { SPACING } }) => SPACING.SIDER.HEIGHT};
    margin: ${({ theme: { SPACING } }) => SPACING.STANDARD};
    overflow: hidden;
`;

const Content = styled.div`
    max-height: ${({ theme: { SPACING } }) => SPACING.SIDER.CONTENT.MAX_HEIGHT};
    overflow: scroll;
`;

const FooterWrapper = styled.div`
    height: ${({ theme: { SPACING } }) => SPACING.SIDER.FOOTER.HEIGHT};
    width: ${({ theme: { SPACING } }) => SPACING.SIDER.FOOTER.WIDTH};
    background: ${({ theme: { COLOR } }) => COLOR.WHITE};
    color: ${({ theme: { COLOR } }) => COLOR.LIGHT};
`;
const Footer = styled.div`
    margin: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

export default function MenuFrame({ profile, footer, children }) {
    return (
        <Container>
            <div>
                {profile}
                <Divider />
                <Content>{children}</Content>
            </div>
            <FooterWrapper>
                <Divider />
                <Footer>{footer}</Footer>
            </FooterWrapper>
        </Container>
    );
}

MenuFrame.propTypes = {
    profile: PropTypes.node.isRequired,
    footer: PropTypes.node,
    children: PropTypes.node.isRequired,
};
MenuFrame.defaultProps = {
    footer: null,
};

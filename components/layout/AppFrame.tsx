import styled from "styled-components";

const Container = styled.div`
    height: calc(100vh - 18px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    background-color: azure;
`;
const FrameWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: top;
    max-width: ${({ theme: { SPACING } }) => SPACING.LAYOUT.FRAME_MAX_WIDTH};
    border: 1px solid ${({ theme: { COLOR } }) => COLOR.GREY.BASE};
    background-color: ${({ theme: { COLOR } }) => COLOR.WHITE};
`;
const Menu = styled.div`
    height: 100%;
    width: ${({ theme: { SPACING } }) => SPACING.LAYOUT.MENU_WIDTH};
    border: 1px solid lightgrey;
`;
const ContentWrapper = styled.div`
    height: calc(100vh - 40px);
    width: 100%;
    min-width: ${({ theme: { SPACING } }) => SPACING.LAYOUT.CONTENT_MIN_WIDTH};
    border: 1px solid grey;
`;
const Header = styled.div`
    height: ${({ theme: { SPACING } }) => SPACING.LAYOUT.HEADER_HEIGHT};
    width: auto;
    border: 1px solid lightgrey;
    padding: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;
const Content = styled.div`
    height: calc(100% - 150px);
    width: auto;
    border: 1px solid lightgrey;
    padding: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

export default function AppFrame({ menu, header, children }) {
    return (
        <>
            <Container>
                <FrameWrapper>
                    <Menu>{menu}</Menu>
                    <ContentWrapper>
                        <Header>{header} </Header>
                        <Content>{children}</Content>
                    </ContentWrapper>
                </FrameWrapper>
            </Container>
        </>
    );
}

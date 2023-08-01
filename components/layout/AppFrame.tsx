import styled from 'styled-components';

const Container = styled.div`
	height: 100%;
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
	height: 100%;
	width: 100%;
	min-width: ${({ theme: { SPACING } }) => SPACING.LAYOUT.CONTENT_MIN_WIDTH};
	border: 1px solid grey;
`;
const Header = styled.div`
	height: ${({ theme: { SPACING } }) => SPACING.LAYOUT.HEADER_HEIGHT};
	width: 100%;
	border: 1px solid lightgrey;
`;
const Content = styled.div`
	height: 100%;
	width: 100%;
	border: 1px solid lightgrey;
`;
const Footer = styled.div`
	height: ${({ theme: { SPACING } }) => SPACING.LAYOUT.FOOTER_HEIGHT}};
	width: 100%;
	border: 1px solid lightgrey;
`;

export default function AppFrame({ menu, header, footer, children }) {
	return (
		<>
			<Container>
				<FrameWrapper>
					<Menu>{menu}</Menu>
					<ContentWrapper>
						<Header>{header} </Header>
						<Content>{children}</Content>
						<Footer>{footer}</Footer>
					</ContentWrapper>
				</FrameWrapper>
			</Container>
		</>
	);
}

import styled from 'styled-components';
import TOKENS from '../../styles/tokens';

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const FrameWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: ${TOKENS.SPACING.LAYOUT.FRAME_MAX_WIDTH};
`;
const Menu = styled.div`
	height: 100%;
	width: ${TOKENS.SPACING.LAYOUT.MENU_WIDTH};
`;
const ContentWrapper = styled.div`
	height: 100%;
	width: 100%;
	min-width: ${TOKENS.SPACING.LAYOUT.CONTENT_MIN_WIDTH};
`;
const Header = styled.div`
	height: ${TOKENS.SPACING.LAYOUT.HEADER_HEIGHT};
	width: 100%;
`;
const Content = styled.div`
	height: calc(
		100% - ${TOKENS.SPACING.LAYOUT.FOOTER_HEIGHT} -
			${TOKENS.SPACING.LAYOUT.HEADER_HEIGHT}
	);
	width: 100%;
`;
const Footer = styled.div`
	height: ${TOKENS.SPACING.LAYOUT.FOOTER_HEIGHT}};
	width: 100%;
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

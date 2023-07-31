import { css } from 'styled-components';
import TOKENS from './tokens';

export const FONT = {
	HEADING: {
		h1: css`
			font-family: ${TOKENS.FONT.FAMILY};
			color: ${TOKENS.COLOR.TITLE};
			font-size: ${TOKENS.FONT.SIZE.BIGGER};
			font-weight: ${TOKENS.FONT.WEIGHT.BOLD};
			line-height: 2rem;
			@media (min-width: ${TOKENS.BREAKPOINT.MOBILE}) {
				font-size: ${TOKENS.FONT.SIZE.BIGGEST};
				line-height: 1.5rem;
			}
		`,

		h2: css`
			font-family: ${TOKENS.FONT.FAMILY};
			color: ${TOKENS.COLOR.TITLE};
			font-size: ${TOKENS.FONT.SIZE.BIG};
			font-weight: ${TOKENS.FONT.WEIGHT.BOLD};
			line-height: 2rem;
			@media (min-width: ${TOKENS.BREAKPOINT.MOBILE}) {
				font-size: ${TOKENS.FONT.SIZE.BIGGER};
				line-height: 1.5rem;
			}
		`,

		h3: css`
			font-family: ${TOKENS.FONT.FAMILY};
			color: ${TOKENS.COLOR.TITLE};
			font-size: ${TOKENS.FONT.SIZE.STANDARD};
			font-weight: ${TOKENS.FONT.WEIGHT.BOLD};
			line-height: 1.25rem;
		`,

		h4: css`
			font-family: ${TOKENS.FONT.FAMILY};
			color: ${TOKENS.COLOR.TITLE};
			font-size: ${TOKENS.FONT.SIZE.SMALL};
			font-weight: ${TOKENS.FONT.WEIGHT.BOLD};
			line-height: 1.25rem;
		`,

		h5: css`
			font-family: ${TOKENS.FONT.FAMILY};
			color: ${TOKENS.COLOR.TITLE};
			font-size: ${TOKENS.FONT.SIZE.SMALLER};
			font-weight: ${TOKENS.FONT.WEIGHT.SEMI_BOLD};
			line-height: 1rem;
		`,

		h6: css`
			font-family: ${TOKENS.FONT.FAMILY};
			color: ${TOKENS.COLOR.TITLE};
			font-size: ${TOKENS.FONT.SIZE.SMALLEST};
			font-weight: ${TOKENS.FONT.WEIGHT.SEMI_BOLD};
			line-height: 0.75rem;
		`,
	},

	BODY: {
		standard: css`
			font-size: ${TOKENS.FONT.SIZE.STANDARD};
			font-weight: ${TOKENS.FONT.WEIGHT.REGULAR};
			line-height: 1.25rem;
		`,

		small: css`
			font-size: ${TOKENS.FONT.SIZE.SMALL};
			font-weight: ${TOKENS.FONT.WEIGHT.REGULAR};
			line-height: 1.125rem;
		`,

		smaller: css`
			font-size: ${TOKENS.FONT.SIZE.SMALLER};
			font-weight: ${TOKENS.FONT.WEIGHT.REGULAR};
			line-height: 1rem;
		`,

		smallest: css`
			font-size: ${TOKENS.FONT.SIZE.SMALLEST};
			font-weight: ${TOKENS.FONT.WEIGHT.REGULAR};
			line-height: 0.875rem;
		`,
	},
};

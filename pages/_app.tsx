import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import TOKEN from 'styles/tokens/index';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={{ ...TOKEN }}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

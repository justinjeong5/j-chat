import { Button, Space, Input } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

const SpaceWrapper = styled.div`
	text-align: right;
	margin-top: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

export default function Textator() {
	return (
		<div>
			<TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
			<SpaceWrapper>
				<Space wrap>
					<Button type='primary'>Send</Button>
					<Button>File</Button>
				</Space>
			</SpaceWrapper>
		</div>
	);
}

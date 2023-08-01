import { useRouter } from 'next/router';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import useLogin from '../lib/login';
import { useEffect } from 'react';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export default function SignIn() {
	const router = useRouter();

	const { isLoggedIn, signIn } = useLogin();
	useEffect(() => {
		if (isLoggedIn) {
			router.push('/');
		}
	}, [isLoggedIn]);

	const onFinish = (values: any) => {
		signIn(values.username, values.password);
		router.push('/');
	};

	type FieldType = {
		username?: string;
		password?: string;
	};

	return (
		<Container>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				onFinish={onFinish}
				autoComplete='off'>
				<Form.Item<FieldType>
					label='Username'
					name='username'
					rules={[{ required: true, message: 'Please input your username!' }]}>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label='Password'
					name='password'
					rules={[{ required: true, message: 'Please input your password!' }]}>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Sign In
					</Button>
				</Form.Item>
			</Form>
		</Container>
	);
}

import { useRouter } from 'next/router';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import useLogin from '../lib/login';
import hash from 'hash.js';
import { useEffect } from 'react';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
`;

export default function Login() {
	const router = useRouter();

	const { isLoggedIn, login } = useLogin();
	useEffect(() => {
		if (isLoggedIn) {
			router.push('/');
		}
	}, [isLoggedIn]);

	const onFinish = (values: any) => {
		login(values.username, values.password);
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
						Login
					</Button>
				</Form.Item>
			</Form>
		</Container>
	);
}

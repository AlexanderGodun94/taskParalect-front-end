import React from 'react';
import { Typography, Input, Container, Button, Form } from 'shared/ui';
import { Rule } from 'shared/types';

const { Title } = Typography;

const emailRules: Rule[] = [
  {
    required: true,
    message: 'Please input your email'
  },
  {
    type: 'email',
    message: 'The input is not valid email'
  }
];

const passwordRules: Rule[] = [
    {
        required: true,
        message: 'Please input your email'
    },
];


export type EnterEmailForm = {
    email: string,
    password: string,
    lastName: string,
    firstName: string,
}

interface EnterEmailProps {
  onNext: (form: EnterEmailForm) => void
}

export const EnterEmailEntity = ({ onNext }: EnterEmailProps) => {

    return (
        <Form onFinish={onNext}>
            <Container marginBottom={24}>
                <Title level={3}>Enter personal data</Title>
            </Container>

            <Form.Item
                label="Email"
                name="email"
                rules={emailRules}
                colon={false}
                initialValue={''}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={passwordRules}
                colon={false}
                initialValue={''}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label="Last name"
                name="lastName"
                colon={false}
                initialValue={''}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="First name"
                name="firstName"
                colon={false}
                initialValue={''}
            >
                <Input/>
            </Form.Item>

            <Form.Item style={{textAlign: 'right'}}>
                <Button type="primary" htmlType="submit">
                    Next
                </Button>
            </Form.Item>
        </Form>
    );
};

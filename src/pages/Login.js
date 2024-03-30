import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Button, Row, Col, Form, Input, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

import { SERVER_URL } from "../config";

const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        axios.post(`${SERVER_URL}/users/login`, values).then(async res => {
            await Cookies.set('Authorization', `Bearer ${values.token}`, { expires: 1 / 24 });
            navigate("/dashboard")
        }).catch(err => {
            console.log(err)
        })
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", backgroundColor: "grey" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "100vh" }}>
                <Card >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Row>
                            <Col>
                                <Form.Item
                                    name="token"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your token!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Input canvas token' />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                >
                                    <Button type="primary" htmlType="submit">
                                        Login
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </div>
    )

};
export default Login;
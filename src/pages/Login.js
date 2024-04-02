import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Row, Col, Form, Input, Card } from "antd";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/login_back.jpg";
import mark from "../assets/lms1.png";
import { SERVER_URL } from "../config";

const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        axios
            .post(`${SERVER_URL}/users/login`, values)
            .then(async (res) => {
                await Cookies.set("Authorization", `Bearer ${values.token}`, {
                    expires: 1 / 24,
                });
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100vw",
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: "cover",
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100vh",
                }}>
                <Card
                    style={{
                        width: "750px",
                        borderRadius: "0px",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        marginBottom: "300px",
                    }}>
                    <Row justify="center">
                        <h1
                            style={{
                                textAlign: "center",
                                color: "rgba(0, 0, 0, 0.5) !important",
                                marginBottom: "50px",
                            }}>
                            Welcome LMS
                        </h1>
                    </Row>
                    <Row>
                        <Col span={14}>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                onFinish={onFinish}
                                autoComplete="off">
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            name="token"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your token!",
                                                },
                                            ]}>
                                            <Input
                                                placeholder="Input canvas token"
                                                style={{
                                                    width: "100%",
                                                    height: "5vh",
                                                    borderRadius: "0px",
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row justify="center">
                                    <Col span={24}>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                style={{
                                                    height: "5vh",
                                                    width: "100%",
                                                    borderRadius: "0px",
                                                }}>
                                                Login
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <span
                                        style={{
                                            textAlign: "center",
                                            color: "#989898",
                                        }}>
                                        American K12 School uniquely prepares students to become
                                        global citizens by providing authentic learning experience
                                        and holding them accountable for their future independent
                                        successes.
                                    </span>
                                </Row>
                            </Form>
                        </Col>
                        <Col
                            span={9}
                            offset={1}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                            <img src={mark} width="100%" />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};
export default Login;

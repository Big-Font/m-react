import React, { Component } from 'react';
import './index.css'
import {
    Form, Icon, Input, Button, Select, Row, Col,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
const { Option } = Select;
@withRouter
//引进全局状态管理
//把需要的全局状态inject过来
@inject('commonState')
@observer
class NormalLoginForm extends Component {
    constructor(props) {
        super();
        this.state = {
            confirmDirty: false,
        }
    }
    goLogin = () => {
        this.props.history.push('/login');
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致!');
        } else {
            callback();
        }
    }
    componentDidMount() {
        this.props.commonState.handleStoreHeaderTitle("注册")
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        return (
            <div className="login">
                <h3 className="login-nav"> </h3>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入手机号' }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} type="number" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={16}>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: '请输入验证码!' }],
                                })(
                                    <Input type="number" />
                                )}
                            </Col>
                            <Col span={8}>
                                <Button style={{ width: '100%' }}>获取验证码</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '输入邮箱有误!',
                            }, {
                                required: true, message: '请输入邮箱',
                            }],
                        })(
                            <Input placeholder="邮箱" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请确认密码!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="再次输入密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            立即注册
            </Button>
                    </Form.Item>
                </Form>
                <div className="clearfix">
                    <a href="javascript:;" className="fr" onClick={this.goLogin}>去登录</a>
                </div>
            </div>

        );
    }
}
const Register = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Register;
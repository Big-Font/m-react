import React, { Component } from 'react';
import './index.css'
import {
    Form, Icon, Input, Button, Checkbox, Select,Row, Col,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { login, getPicCode } from '@/apis/modules/login';
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
            captcha: "",
        }
        this.goRegister = this.goRegister.bind(this);
        this.loginInit = this.loginInit.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {//登录
                this.loginInit(values);
            }
        });
    }
    goRegister() {
        this.props.history.push('/register');
    }
    async componentDidMount() {
        this.props.commonState.handleStoreHeaderTitle("登录");
        await this.getPicCode();
    }
    async loginInit(data) {
        let res = await login(data);
        sessionStorage.QR_TOKEN = res.data.token;
    }
    async getPicCode() {
        let res = await getPicCode();
        this.setState({
            captcha: res.data
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { captcha } = this.state;
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
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={16}>
                                {getFieldDecorator('capkey', {
                                    rules: [{ required: true, message: '请输入验证码!' }],
                                })(
                                    <Input type="text" />
                                )}
                            </Col>
                            <Col span={8}>
                                <p dangerouslySetInnerHTML={{__html: captcha}} ></p>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <div className="clearfix">
                    <a href="javascript:;" className="fr" onClick={this.goRegister}>马上注册</a>
                </div>
            </div>

        );
    }
}
const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;
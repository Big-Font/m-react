import React, { Component } from 'react';
import './index.css'
import {
    Form, Icon, Input, Button, Checkbox, Select,Row, Col,message
} from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { login, getPicCode } from '@/apis/modules/login';
import { baseUrl } from '@/config/env';
import {countryNameArr,regAndLoginErrorMes,RegExpArr} from '@/config/regAndLoginData';
const { Option } = Select;
@withRouter
//引进全局状态管理
//把需要的全局状态inject过来
@inject('commonState', 'userState')
@observer
class NormalLoginForm extends Component {
    constructor(props) {
        super();
        this.state = {
            captcha: `${new Date().getTime()}`,
        }
        this.goRegister = this.goRegister.bind(this);
        this.loginInit = this.loginInit.bind(this);
        this.handleCaptcha = this.handleCaptcha.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {//登录
                this.loginInit(values);
            }
        });
    }
    inputValidator = (type) => (rule, value, callback) => {
        if(type === "phone") {
            let telReg = RegExpArr.telReg;
            telReg.lastIndex = 0;
            if (value !== "" && value) {
                if (!telReg.test(value)) {
                    let detail = regAndLoginErrorMes.phoneErroMes;
                    callback(detail);
                } else {
                    callback();
                }
            } else {
                let detail = regAndLoginErrorMes.telephoneNumber;
                callback(detail);
            }
        } else if(type === "password") {
            let mypasswordReg = RegExpArr.mypasswordReg;
            mypasswordReg.lastIndex = 0;
            if (value !== "" && value) {
                if (!mypasswordReg.test(value)) {
                    let detail = regAndLoginErrorMes.pwErrorMes;
                    callback(detail);
                } else {
                    callback();
                }
            } else {
                let detail = regAndLoginErrorMes.passwordNav;
                callback(detail);
            }
        }else if(type === "capkey") {
            let codeReg = RegExpArr.codeReg;
            codeReg.lastIndex = 0;
            if (value !== "" && value) {
                if (!codeReg.test(value)) {
                    let detail = regAndLoginErrorMes.codeErrorMes;
                    callback(detail);
                } else {
                    callback();
                }
            } else {
                let detail = regAndLoginErrorMes.codeNav;
                callback(detail);
            }
        }
    }
    goRegister() {
        this.props.history.push('/register');
    }
    handleCaptcha() {
      this.setState({
        captcha: new Date().getTime()
      })
    }
    setFieldsFn (detail) {
        this.props.form.setFields({
            phone: {
                value: "",
                errors: detail,
            },
        });
    }
    async componentDidMount() {
        this.props.commonState.handleStoreHeaderTitle("登录");
        await this.getPicCode();
    }
    async loginInit(data) {
        let res = await login(data);
        if (res.data.code === 0) {//登录成功--跳转到首页
          localStorage.QR_TOKEN = res.data.token;//储存账号
          message.success("登录成功");
          this.props.userState.getUserShopCarList();
          let redirect = this.props.location.state;
          redirect ? this.props.history.push(redirect.from) : this.props.history.push('/');
        }
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
            initialValue: '中国',
        })(
            <Select style={{ width: 70 }}>
                {
                    countryNameArr.map((item,i)=>{
                        return (
                            <Option key={item.name} value={item.name}>{item.number}</Option>
                        )
                    })
                }
            </Select>
        );
        return (
            <div className="login">
                <h3 className="login-nav"> </h3>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, validator: this.inputValidator("phone")},
                            ],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} type="number" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, validator: this.inputValidator("password")},],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={14}>
                                {getFieldDecorator('capkey', {
                                    rules: [{ required: true, validator: this.inputValidator("capkey")},],
                                })(
                                    <Input type="text" />
                                )}
                            </Col>
                            <Col span={10}>
                                <img onClick={this.handleCaptcha} src={`${baseUrl}/v1/captcha?${captcha}`} alt="" />
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
                        <span className="login-form-forgot">忘记密码</span>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <div className="clearfix">
                    <b className="fr" onClick={this.goRegister}>马上注册</b>
                </div>
            </div>

        );
    }
}
const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;

import React, { Component } from 'react';
import './index.css'
import {
    Form, Icon, Input, Button, Select, Row, Col,message
} from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { register, getEmailCode } from '@/apis/modules/register';
import { countryNameArr, regAndLoginErrorMes, RegExpArr } from '@/config/regAndLoginData';
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
            getCodeNav:"获取验证码"
        }
        this.registerInit = this.registerInit.bind(this);
        this.getCodeInit = this.getCodeInit.bind(this);
    }
    //点击去登录
    goLogin = () => {
        this.props.history.push('/login');
    }
    //点击注册提交form
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err && values) {//注册
                this.registerInit(values);
            }
        });
    }
    //输入时验证
    inputValidator = (type) => (rule, value, callback) => {
        if (type === "phone") {
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
        } else if (type === "password") {
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
        } else if (type === "code") {
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
    //再次输入密码验证
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    //两次密码比较
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
    //邮箱聚焦时把错误消失
    changeCodeBtn = () => {
        this.setState({
            getCodeNav:"获取验证码"
        });
        this.setFieldsFn(null);
    }
    //注册ajax
    async registerInit(data) {
        if(!data || (data&&!data.phone))return;
        // data.phone = Number(data.phone)
        let res = await register(data);
        if (res.data.code === 0) {//注册成功--跳转到首页
            this.props.history.push('/');
            localStorage.QR_TOKEN = res.data.token;
            message.success("注册成功，直接登录");
        }
        // else if (res.data.code < 0){//网络错误怎么显示
        //     let detail = res.data.msg;
        //     message.error(detail,5);
        // }
    }
    //验证码ajax
    async getCodeInit() {
        let off = this.props.form.getFieldsError((["phone", "email"]));
        let val = this.props.form.getFieldsValue((["phone", "email"]));
        if (val.phone && val.email) {
            // console.log(off.phone, off.email)
            if ((off.phone && off.phone.length > 0) || (off.email && off.email.length > 0)) return;
            let data = {
                phone: val.phone,
                email: val.email,
            }
            let res = await getEmailCode(data);
            if (res.data.code === 0) {//获取成功--跳转到首页
                this.setState({
                    getCodeNav:"请查看邮箱"
                });
                let detail = res.data.msg;
                message.success(detail);
            } else if (res.data.code < 0) {//网络错误怎么显示
                this.setState({
                    getCodeNav:"稍等获取"
                });
                let detail = res.data.msg;
                this.setFieldsFn([new Error(detail)])
                // message.error(detail,5);
            }
        }

    }
    setFieldsFn (detail) {
        this.props.form.setFields({
          code: {
                value: "",
                errors: detail,
            },
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '中国',
        })(
            <Select style={{ width: 70 }}>
                {
                    countryNameArr.map((item, i) => {
                        return (
                            <Option key={item.name} value={item.name}>{item.number}</Option>
                        )
                    })
                }
            </Select>
        );
        const {getCodeNav} = this.state;
        return (
            <div className="login">
                <h3 className="login-nav"> </h3>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, validator: this.inputValidator("phone") },],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} type="number" onFocus={this.changeCodeBtn} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '输入邮箱有误!',
                            }, {
                                required: true, message: '请输入邮箱',
                            }],
                        })(
                            <Input placeholder="邮箱" onFocus={this.changeCodeBtn} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={16}>
                                {getFieldDecorator('code', {
                                    rules: [{ required: true, validator: this.inputValidator("code") },],
                                })(
                                    <Input type="text" />
                                )}
                            </Col>
                            <Col span={8}>
                                <Button
                                    style={{ width: '100%' }}
                                    onClick={this.getCodeInit}
                                    disabled = {getCodeNav !== "获取验证码"}
                                >{getCodeNav}</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, validator: this.inputValidator("password") },],
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
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.registerInit}>
                            立即注册
                        </Button>
                    </Form.Item>
                </Form>
                <div className="clearfix">
                    <b  className="fr" onClick={this.goLogin}>去登录</b>
                </div>
            </div>
        );
    }
}
const Register = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Register;

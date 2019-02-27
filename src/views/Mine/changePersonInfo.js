import React, { Component } from 'react';
import '../Login/index.css';
import {
    Form,  Input, Button, message
} from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { changePersonSomeInfo, } from '@/apis/modules/mine';
import { regAndLoginErrorMes, RegExpArr } from '@/config/regAndLoginData';
@withRouter
//引进全局状态管理
//把需要的全局状态inject过来
@inject('commonState','mineState')
@observer
class ChangePersonInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            captcha: `${new Date().getTime()}`,
        }
        this.goRegister = this.goRegister.bind(this);
        this.changePersonSomeInfoInit = this.changePersonSomeInfoInit.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {//修改用户信息
                values.img = this.props.mineState._personInfo.img;
                this.changePersonSomeInfoInit(values);
            }
        });
    }
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
        }
    }
    goRegister() {
        this.props.history.push('/register');
    }
    setFieldsFn(detail) {
        this.props.form.setFields({
            phone: {
                value: "",
                errors: detail,
            },
        });
    }
    componentDidMount() {
        this.props.commonState.selectKey();
        this.props.commonState.handleStoreHeaderTitle("修改用户信息");
    }
    async changePersonSomeInfoInit(data) {
        let res = await changePersonSomeInfo(data);
        if (res.data.code === 0) {//登录成功--跳转到首页
            this.props.history.push('/mine');
            let detail = res.data.msg;
            message.success(detail);
        }
        // else if (res.data.code < 0) {//网络错误怎么显示
        //     let detail = res.data.msg;
        //     message.error(detail, 5);
        // }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <h3 className="login-nav"> </h3>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, validator: this.inputValidator("phone") },
                            ],
                        })(
                            <Input  style={{ width: '100%' }} type="number" placeholder="手机号" />
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
                            <Input placeholder="邮箱" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('address')(
                            <Input type="text" placeholder="家庭住址" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('username')(
                           <Input type="text" placeholder="昵称" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            修改
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const MineChangePInfo = Form.create({ name: 'change_person_info' })(ChangePersonInfo);
export default MineChangePInfo;

import React, { Component } from 'react';
import '../Login/index.css';
import './index.scss';
import {
    Form, Input, Button, message, Upload, Icon, Modal
} from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { changePersonSomeInfo, } from '@/apis/modules/mine';
import { regAndLoginErrorMes, RegExpArr } from '@/config/regAndLoginData';
import { baseUrl } from '@/config/env';
@withRouter
//引进全局状态管理
//把需要的全局状态inject过来
@inject('commonState', 'mineState')
@observer
class ChangePersonInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            captcha: `${new Date().getTime()}`,
            loading: false,
            imageU: null,
            previewVisible: false,
        }
        this.goRegister = this.goRegister.bind(this);
        this.changePersonSomeInfoInit = this.changePersonSomeInfoInit.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {//修改用户信息
                values.img = this.state.imageU;
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
        if (res.data.code === 0) {//修改成功--跳转到我的
            this.props.history.push('/mine');
            let detail = res.data.msg;
            message.success(detail);
        }
    }
    //上传图片限制
    beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片不能超过2MB!');
        }
        return isLt2M;
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    //图片上传时变化函数
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        } 
        if (info.file.status === 'done') {
            this.setState({
                imageU:info.file.response.fileList[0],
                loading: false,
            })
            // this.getBase64(info.file.originFileObj, (imageUrl) => {
            //     this.setState({
            //         imageU:imageUrl,
            //         loading: false,
            //     })
            // });
        }
        if (info.file.status === 'removed') {
            this.setState({ loading: false,imageU:null });
            return;
        }
    }
    handlePreview = (file) => {
        this.setState({
            imageU: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleCancel = () => {
        this.setState({ previewVisible: false, imageU:null})
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { imageU, previewVisible,loading } = this.state;
        return (
            <div className="login">
                <h3 className="login-nav"></h3>
                <Upload
                    name="file"
                    listType="picture-card"
                    accept=".jpg,.jpeg,.bmp,.png,.pdf"
                    headers={{
                        "Authorization": "Bearer " + localStorage.QR_TOKEN,
                    }}
                    action={`${baseUrl}/upload/userlogo`}//上传图片地址
                    beforeUpload={this.beforeUpload}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    className="header-uploader"
                >
                    {
                        imageU ? null : <div>
                            <Icon type={loading ? 'loading' : 'plus'} />
                            <div className="ant-upload-text">上传头像</div>
                        </div>
                    }
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={imageU} />
                </Modal>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, validator: this.inputValidator("phone") },
                            ],
                        })(
                            <Input style={{ width: '100%' }} type="number" placeholder="手机号" />
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
            </div >
        );
    }
}
const MineChangePInfo = Form.create({ name: 'change_person_info' })(ChangePersonInfo);
export default MineChangePInfo;

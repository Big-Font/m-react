import React, { Component } from 'react';
import './index.scss'
import {
  Form, Input, Cascader, Upload, Icon, Modal, message,Button
} from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { baseUrl } from '@/config/env';
import { findDecorator } from '@/apis/modules/findDecorator';
const { TextArea } = Input;
const options = [{
  value: '1',
  label: '安装',

}, {
  value: '2',
  label: '维修',
}];

@inject('commonState')
@observer
@withRouter
//把需要的全局状态inject过来
@inject('commonState')
class FindDecoratorF extends Component {
  constructor(props) {
    super();
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      findDType: 1,
    }
    this.onChange = this.onChange.bind(this);
    this.findDecoratorInit = this.findDecoratorInit.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
        if (!err) {//登录
          console.log(this.state.fileList[0].response.fileList)
          values.imgs = (this.state.fileList[0].response.fileList).toString();
          values.type = this.state.findDType;
          this.findDecoratorInit(values);
        }
    });
}
  async findDecoratorInit(data) {
    let res = await findDecorator(data);
    if (res.data.code === 0) {//成功
      let detail = res.data.msg;
      message.success(detail, 5);
    }
    // else if (res.data.code < 0) {//网络错误怎么显示
    //   let detail = res.data.msg;
    //   message.error(detail, 5);
    // }
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  componentDidMount() {//根据路由修改底部导航选中状态及title内容
    this.props.commonState.handleFooterStatus(true);
    this.props.commonState.selectKey();
  }

  componentDidUpdate() {
    this.props.commonState.handleFooterStatus(true);
  }

  componentWillUnmount() {
    this.props.commonState.handleFooterStatus(false);
  }

  onChange(value) {
    this.setState({
      findDType: value[0],
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="findDecorator">
        <Form layout="vertical" className="findDecorator-form" onSubmit={this.handleSubmit}>
          <h4>标题</h4>
          <Form.Item>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入问题标题!' }],
            })(
              <Input />
            )}
          </Form.Item>
          <p>类型</p>
          <Form.Item className="newMargin">
            <Cascader
              options={options}
              onChange={this.onChange}
              placeholder="选择类型"
            />
          </Form.Item>
          <p>问题描述</p>
          <Form.Item>
            {getFieldDecorator('details')(<TextArea
              type="textarea"
              className="findDecorator-form-textarea"
              rows="5" cols="33"
            ></TextArea>)}
          </Form.Item>
          <div>
            <p>上传图片</p>
            <Upload
              headers={{
                "Authorization": "Bearer " + localStorage.QR_TOKEN,
              }}
              action={`${baseUrl}/upload/findDecorator`}//上传图片地址
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          <p>地址</p>
          <Form.Item >
            {getFieldDecorator('address')(
              <Input placeholder="请输入详细地址" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="findDecorator-form-btn">
                提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const FindDecorator = Form.create({ name: 'findDecorator' })(FindDecoratorF);
export default FindDecorator;

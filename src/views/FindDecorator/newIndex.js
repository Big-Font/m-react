import React, { Component } from 'react';
import { InputItem, List, TextareaItem, Picker } from 'antd-mobile';
import { Upload, Icon, Modal, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { baseUrl } from '@/config/env';
import { findDecorator } from '@/apis/modules/findDecorator';
require('./index.scss');

@withRouter
class FindDecorator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [
        { label: '安装', value: 1 },
        { label: '维修', value: 2 },
      ],   // 类型选择
      typeChoose: [],
      fileList: [],
      previewVisible: false,
      previewImage: '',
    }
    this.findDecoratorInit = this.findDecoratorInit.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let title = this.inputRefBrefNeed.state.value;
    let address = this.inputRefAdress.state.value;
    let type = this.state.typeChoose[0];
    let details = this.customFocusInst.state.value;
    let imgs = (this.state.fileList[0].response.fileList).toString();
    let values = {
      title: title,
      address: address,
      type: type,
      details: details,
      imgs: imgs
    }
    this.findDecoratorInit(values);
  }
  async findDecoratorInit(data) {
    let res = await findDecorator(data);
    if (res.data.code === 0) {
      let detail = res.data.msg;
      message.success(detail, 5);
    }
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => this.setState({ fileList });
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  render() {
    const { fileList, previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">现场照片</div>
      </div>
    );
    return (
      <div className="add-find-worker">
        <List renderHeader={() => '标题'}>
          <InputItem
            className="input-item"
            clear
            placeholder="简要说明您的需求,例如：东关大街1号院安装水龙头"
            ref={el => this.inputRefBrefNeed = el}
          ></InputItem>
        </List>
        <List renderHeader={() => '地址'}>
          <InputItem
            className="input-item"
            clear
            placeholder="填写您的地址，方便师傅上门维修和安装"
            ref={el => this.inputRefAdress = el}
          ></InputItem>
        </List>
        <List renderHeader={() => '联系电话'}>
          <InputItem
            className="input-item"
            clear
            placeholder="填写您的联系电话，师傅上门前会电话联系您"
            ref={el => this.inputRefTel = el}
          ></InputItem>
        </List>
        <List renderHeader={() => '描述'}>
          <TextareaItem
            placeholder="简要描述您需要安装或者维修的状况，方便我们分配与您联系上门服务的师傅的工种"
            data-seed="logId"
            autoHeight
            ref={el => this.customFocusInst = el}
          />
        </List>
        <List>
          <Picker
            data={this.state.typeList}
            value={this.state.typeChoose}
            onChange={v => this.setState({ typeChoose: v })}
            cols={1}
            className="forss">
            <List.Item arrow="horizontal">请选择类型</List.Item>
          </Picker>
        </List>
        <List renderHeader={() => '上传图片'}>
          <div className="upload">
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
        </List>
        <Button type="primary" className="findDecorator-form-btn" onClick={this.handleSubmit}>
          提交
        </Button>
      </div>
    );
  }
}

export default FindDecorator;

import React, { Component } from 'react';
import { InputItem, List, TextareaItem, Picker,Toast, } from 'antd-mobile';
import { Upload,Modal, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { baseUrl } from '@/config/env';
import { findDecorator } from '@/apis/modules/findDecorator';
import IconFont from '@/components/Iconfont';
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
    //前端错误提示
    let title = this.inputRefBrefNeed.state.value;
    if(title === ""){
      Toast.info('请输入标题');
      return;
    }
    let address = this.inputRefAdress.state.value;
    if(address === ""){
      Toast.info('请输入家庭住址');
      return;
    }
    let phone = this.inputRefTel.state.value;
    if(phone.replace(/\s/g, '').length < 11) {
      Toast.info('请输入正确的手机号');
      return;
    }
    let details = this.customFocusInst.state.value;
    if(details === "") {
      Toast.info('请详细描述问题');
      return;
    }
    let type = this.state.typeChoose[0];
    if(!type) {
      Toast.info('请选择类型');
      return;
    }
    let imgsState = this.state.fileList;
    if(imgsState.length === 0){
      Toast.info('请上传至少一张图片');
      return;
    };
    //储存图片数组
    let imgsArr = [];
    for(let i=0;i<imgsState.length;i++){
      imgsArr.push((imgsState[i].response.fileList).toString())
    }
    //把数组变字符串
    let imgs = JSON.stringify(imgsArr);
    let values = {
      title: title,
      address: address,
      type: type,
      details: details,
      phone:phone,
      imgs: imgs
    }
    this.findDecoratorInit(values);
    imgsArr = null;
  }
  async findDecoratorInit(data) {
    let res = await findDecorator(data);
    if (res.data.code === 0) {
      let detail = res.data.msg;
      message.success(detail, 5);
      //去师傅列表
      this.props.history.push("/findDecorator/decoratorlist")
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
        <IconFont type='icon-zengjia' className="addPicIcon" />
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

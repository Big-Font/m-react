import React, { Component } from 'react';
import './index.scss'
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import minePic from '@/images/mine/headPic.png'
import { personInfo, changePersonSomeInfo,uploadAjax } from '@/apis/modules/mine';
import IconFont from '@/components/Iconfont';
import { Upload, Icon, message } from 'antd';
import { baseUrl } from '@/config/env';
//把需要的全局状态inject过来
@withRouter
@inject('commonState','mineState')
@observer
class Mine extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      imageU:null
    }
    this.goLogin = this.goLogin.bind(this);
    this.personInfoInit = this.personInfoInit.bind(this);
    this.customRequest = this.customRequest.bind(this);
    this.toChangePerInfo = this.toChangePerInfo.bind(this);
  }
  async componentDidMount() {//根据路由修改底部导航选中状态及title内容
    this.props.commonState.selectKey();
    if (localStorage.getItem('QR_TOKEN')) {
      //请求个人信息
      await this.personInfoInit();
    }
  }
  async personInfoInit() {
    let res = await personInfo();
    if (res.data.code === 0) {//成功
      let obj =  res.data.data[0]
      this.props.mineState.setPersonInfo(obj);
    } else if (res.data.code < 0) {//网络错误怎么显示

    }
  }
  toChangePerInfo(){
    this.props.history.push('/mine/changePersonInfo');
  }
  goLogin() {
    this.props.history.push('/login');
  }
  //上传图片限制
  beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片不能超过2MB!');
    }
    return isLt2M;
  }
  //前端显示图片 转base64
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  //图片上传时变化函数
  handleChange = (info) => {

    // if (!localStorage.getItem('QR_TOKEN')){
    //   message.warn("用户未登录,不能修改头像",5);
    //   this.setState({ loading: false,imageUrl:null });
    //   return;
    // };
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          loading: false,
        })
        let imageU = info.file.response.fileList[0]
        this.props.mineState.setPersonInfoSomeOne("img",imageU);
        this.props.mineState.setPersonInfoSomeOne("imageUrl",imageUrl)
      });
    }
  }
  //自定义交互 不使用 antd 的action
  async customRequest () {
    if (!localStorage.getItem('QR_TOKEN')){
      return;
    };
    await this.uploadAjaxInit();
  }
  //上传图片
  async uploadAjaxInit () {
    let res = await uploadAjax();
    console.log(res.data)
  }
  render() {
    const {mineState} = this.props;
    let personInfo = mineState._personInfo;
    let email = personInfo.email ? personInfo.email : "(无)";
    let phone = personInfo.phone ? personInfo.phone : "(无)";
    let imageUrl = personInfo.img ? personInfo.img : minePic;
    let username = personInfo.username ? personInfo.username : phone;
    let niName = personInfo.username ? personInfo.username : "(无)";
    let address = personInfo.address ? personInfo.address : "(无)";
    return (
      <div className="mineS">
        <div className="mineS-top">
          <Upload
            // name="fileName"
            listType="picture-card"
            className="avatar-uploader"
            accept=".jpg,.jpeg,.bmp,.png,.pdf" 
            showUploadList={false}
            headers = {{
              "Authorization":"Bearer " + localStorage.QR_TOKEN,
              // 'Content-Type': 'multipart/form-data'
            }}
            action={`${baseUrl}/upload`}//上传图片地址
            // customRequest={this.customRequest}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" /> : <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} style={{fontSize:"0.4rem"}} />
            </div>}
          </Upload>
          {
            !localStorage.getItem('QR_TOKEN') ?
              <input type="button" value="点击登录" onClick={this.goLogin} /> :
              <b>{username}</b>
          }
        </div>
        <div className="mineS-mid">
          <div className="mineS-mid-myActiv clearfix">
            <h4 className="fl">我的活动</h4>
            <IconFont type={"icon-more"} style={{ float: "right" }} />
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>暂时未参加活动哦~</p>
              <p className="mineS-mid-myActivFirst-p">活动多多，优惠多多，点击右侧按钮查看活动。。。</p>
            </div>
            <input className="fr" type="button" value="点击查看" />
          </div>
          <div className="mineS-mid-myActiv clearfix">
            <h4 className="fl">我的信息</h4>
            <input 
              className="fr mineS-mid-myActiv-input" 
              type="button" 
              value="修改用户信息"
              onClick={this.toChangePerInfo}
           />
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>家庭地址</p>
              <i className="mineS-mid-myActivFirst-i">{address}</i>
            </div>
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>邮箱</p>
              <i className="mineS-mid-myActivFirst-i">{email}</i>
            </div>
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>用户名</p>
              <i className="mineS-mid-myActivFirst-i">{niName}</i>
            </div>
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>手机号</p>
              <i className="mineS-mid-myActivFirst-i">{phone}</i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mine;
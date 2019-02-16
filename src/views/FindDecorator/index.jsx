import React, { Component } from 'react';
import './index.scss'
import {
  Form, Input, Cascader,
} from 'antd';
import { withRouter } from 'react-router-dom';
import {inject,observer} from 'mobx-react';
const { TextArea } = Input;
const options = [{
  value: '涞水',
  label: '涞水',
  children: [{
    value: '浪深家',
    label: '浪深家',
    children: [{
      value: '45号',
      label: '45号',
    }],
  }],
}, {
  value: '磁县',
  label: '磁县',
  children: [{
    value: '魁哥家',
    label: '魁哥家',
    children: [{
      value: '66号',
      label: '66号',
    }],
  }],
}];
@withRouter
//把需要的全局状态inject过来
@inject('commonState')
class FindDecoratorF extends Component {
  constructor(props) {
    super();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {//根据路由修改底部导航选中状态及title内容
    this.props.commonState.selectKey();
  }
  onChange(value) {
    console.log(value);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="findDecorator">
        <Form layout="vertical" className="findDecorator-form">
          <h4>标题</h4>
          <Form.Item>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入问题标题!' }],
            })(
              <Input />
            )}
          </Form.Item>
          <p>问题描述</p>
          <Form.Item>
            {getFieldDecorator('description')(<TextArea
              type="textarea"
              className="findDecorator-form-textarea"
              rows="5" cols="33"
            ></TextArea>)}
          </Form.Item>
          <p>地址</p>
          <Form.Item className="newMargin">
            <Cascader
              options={options}
              onChange={this.onChange}
              placeholder="请选择地址"
            />
          </Form.Item>
          <Form.Item >
            {getFieldDecorator('pos',)(
              <Input placeholder="请输入详细地址" />
            )}
          </Form.Item>
          <Form.Item>
              <Input type="button" value="提交" className="findDecorator-form-btn" />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const FindDecorator = Form.create({ name: 'form_in_modal' })(FindDecoratorF);
export default FindDecorator;
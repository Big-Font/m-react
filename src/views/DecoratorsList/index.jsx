import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DecorationCase from '@/components/DecorationCase';
import './index.scss'

@inject('commonState')
@observer
class DecoratorsList extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.commonState.handleFooterStatus(true);
  }

  componentDidUpdate() {
    this.props.commonState.handleFooterStatus(true);
  }

  componentWillUnmount() {
    this.props.commonState.handleFooterStatus(false);
  }

  render() {
    return (
      <div className="decoration">
        <DecorationCase titleName="装修案例"  />
      </div>
    );
  }
}

export default DecoratorsList;

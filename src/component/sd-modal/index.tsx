/*
 * @Author: TerryMin
 * @Date: 2019-05-17 13:56:18
 * @LastEditors: TerryMin
 * @LastEditTime: 2019-05-17 15:23:25
 * @Description: file not
 */

import './index.less';

import * as React from 'react';
import { Button } from 'antd-mobile';
import classNames from 'classnames';

interface propTypes {
  show: boolean, // 显示隐藏
  headerText?: string,  // title
  confirmText?: string, // 确定文案
  cancalText?: string, // 取消文案
  oneButton?: boolean,
  singleBtnText?: string,
  onClose?: (...args: any) => void,
  onConfirm?: (...args: any) => void
}

export class SdModal extends React.Component<propTypes, any> {
  static defaultProps = {
    show: false,
    oneButton: false,
    singleBtnText: '',
    headerText: '',
    confirmText: '确定',
    cancalText: '取消',
    onClose: () => { },
    onConfirm: () => { }
  }

  constructor(props: propTypes) {
    super(props);
    console.log(this.props);
    const { show } = this.props;
    this.state = {
      show
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { show } = nextProps;
    this.setState({
      show
    })
  }

  componentWillUnmount() {

  }

  close = () => {
    this.props.onClose();
  }

  confirm = () => {
    this.props.onConfirm();
  }

  render() {
    const { headerText, confirmText, cancalText, oneButton, singleBtnText } = this.props;
    const { show } = this.state;
    return (
      <div className={show ? 'modal-wrap' : 'model-none'}>
        <div className="modal-container">
          <div className="modal-header">{headerText}</div>
          <div className="modal-body">
            {this.props.children}
          </div>
          {
            oneButton ?
              <div className="modal-footer">
                <Button className="single-btn" onClick={this.confirm}>{singleBtnText}
                </Button>
              </div>
              : <div className="modal-footer">
                <Button className="cancel-btn" onClick={this.close}>{cancalText}
                </Button>
                <Button className="confirm-btn" onClick={this.confirm}>{confirmText}
                </Button>
              </div>
          }

        </div>
      </div>
    )
  }
}

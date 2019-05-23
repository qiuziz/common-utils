/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:09:46
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-05-09 13:37:02
 */

import './index.less';

import * as React from 'react';
import classNames from 'classnames';
import { digitalFormat, subCount } from 'src/common/utils';

interface propTypes {
	className?: Array<any> | string;
	price: string;
	marketPrice: string;
	des?: string;
	iconInfo: {
		value: string;
		color?: string;
		size?: number | string;
	};
	forbiden: boolean;
	iconName: string;
	subtract?: string;
	buttonName: string;
	telephone: string;
	onBtnClick?: (...args: any) => void;
}

export class QSettleButton extends React.Component<propTypes, any> {
	static defaultProps = {
		className: '',
		price: '',
		marketPrice: '',
		des: '',
		iconInfo: {
			value: '',
			color: '#999999',
			size: '20px',
		},
		forbiden: false,
		iconName: '',
		subtract: '',
		buttonName: '去结算',
		telephone: '',
		onBtnClick: () => { }
	}

	constructor(props: propTypes) {
		super(props);

	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	handleBtnClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.props.onBtnClick && this.props.onBtnClick()
	}


	render() {
		const { className, price, subtract, marketPrice, des, iconInfo, iconName, forbiden, buttonName, telephone } = this.props;
		let amount: any = price;
		// if (subtract) {
		//   amount = subCount(amount, subtract);
		// }
		return (
			<div className={classNames('settle-button', className)}>
				<div className="order-info">
					<div className="order-price">
						<span className="currency">￥</span>
						<span className="price">{amount}</span>
						{
							!subtract
								? <span className="market-price">￥{marketPrice}</span>
								: <span className="coupon">已优惠{digitalFormat(subtract)}元</span>
						}
					</div>

					<span className="order-name">{des}</span>
				</div>
				<div className="order-handle">
					<a className="consult" href={`tel:${telephone}`} >
						<div className="icon">
							<i className={`font_family ${iconInfo.value}`} style={{ fontSize: iconInfo.size, color: iconInfo.color }}></i>
						</div>
						<div className="text">{iconName}</div>
					</a>
					<div className="settle" >
						<form className="pay-form" name="payForm" onSubmit={this.handleBtnClick}>
							<button className={`settle-btn ${forbiden ? 'disabled-button' : 'defult-button'}`}  type="submit">{buttonName}</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

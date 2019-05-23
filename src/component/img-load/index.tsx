/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:09:46
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-05-09 13:35:48
 */

import './index.less';

import * as React from 'react';
import classNames from 'classnames';

interface propTypes {
	className?: Array<any> | string;
	imgClassName?: Array<any> | string;
	defaultImgClassName?: Array<any> | string;
	imgSrc: string,
	defaultSrc: string
}

export class QImgLoad extends React.Component<propTypes, any> {
	static defaultProps = {
		className: '',
		imgClassName: '',
		defaultImgClassName: '',
		imgSrc: '',
		defaultSrc: ''
	}
	ref: any;
	constructor(props: propTypes) {
		super(props);

		this.state = {
			completed: false
		}
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	componentWillReceiveProps(newProps) {
	}
	componentWillUnmount() {

	}

	handleImageLoad = () => {
		this.setState({
			completed: true
		})
	}
	render() {
		const { className, imgSrc, defaultSrc, imgClassName, defaultImgClassName } = this.props;
		const { completed } = this.state;
		return (
			<div className={classNames('img-componrent-wrap', className)}>
				<img className={classNames('shop-img', imgClassName)} src={imgSrc} onLoad={this.handleImageLoad} ref={(ref) => this.ref = ref} />
				{!completed && <img className={classNames('default-shop-img', defaultImgClassName)} src={defaultSrc} />}
			</div>
		)
	}
}

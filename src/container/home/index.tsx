/*
 * @Author: zhaoyn
 * @Date: 2019-03-04 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-05-27 13:33:49
 */

import * as React from 'react';
import './index.less';

import { QImgLoad } from 'src/component';
import { routes } from 'src/router';
import { Link } from 'react-router-dom';
import { List } from 'antd-mobile';

interface PropsType {
	History: any;
	location: any;
	history: any;
}

export class Home extends React.Component<PropsType, any> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			
		}
	}

	componentWillMount() {

	}
	componentDidMount() {

	}


	public render() {
		return (
			<div className='home'>
				<h1>Common Utils</h1>
				<List>
					{
						routes.map((route: any, index: number) => {
							if (route.path !== '/home') {
							return <List.Item key={index} arrow="horizontal">
											<Link to={route.path}>{route.title}</Link>
										</List.Item>
							}
						})
					}
				</List>
			</div>
		);
	}
}


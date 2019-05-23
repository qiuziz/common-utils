/*
 * @Author: qiuz
 * @Date: 2018-05-24 19:24:46
 * */

import { fetchResource } from './fetchapi';
const API_HOST = '';
const SERVICE_NAME = '/activity';

export const Resource = {

	/** 
	 * 新人礼品活动
	*/

	// 注册,判断新老用户
	login: fetchResource(`${API_HOST}${SERVICE_NAME}/newuser/:type`),

	// 重新获取Token
	getToken: fetchResource(`${API_HOST}${SERVICE_NAME}/common/getAccessToken`),

	/**
	 * 攒油加水活动
	 */

	// 活动列表
  activity: fetchResource(`${API_HOST}${SERVICE_NAME}/boost/:type`),
  // 活动模板
  template: fetchResource(`${API_HOST}${SERVICE_NAME}/:type`),
    
  // 新人专享
  newcomer: fetchResource(`${API_HOST}${SERVICE_NAME}/newUser/vouchers/:type`),
  	// 邀请好友
	inviteFriend: fetchResource(`${API_HOST}${SERVICE_NAME}/invite/:type`),

};

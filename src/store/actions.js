/*
间接更新state的多个方法的对象
通过motations更新
 */
import {
  reqAddress,
  reqFoodTypes,
  reqShopList,
  reqUser,
  reqLogout
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPLIST,
  RECEIVE_USERINFO,
  RESET_USERINFO
} from './mutation-types'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    // 发送异步请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, {address: result.data})
    }
  },
  // 异步获取分类列表
  async getCategorys ({commit}) {
    const result = await reqFoodTypes()
    commit(RECEIVE_CATEGORYS, {categorys: result.data})
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    const {longitude, latitude} = state
    const result = await reqShopList({longitude, latitude})
    commit(RECEIVE_SHOPLIST, {shoplist: result.data})
  },
  // 同步记录用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USERINFO, {userInfo})
  },
  // 异步获取用户信息session
  async getUserInfo ({commit}) {
    const result = await reqUser()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USERINFO, {userInfo})
    }
  },
  // 异步退出操作
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USERINFO)
    }
  }
}

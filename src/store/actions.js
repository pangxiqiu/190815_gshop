/*
间接更新state的多个方法的对象
通过motations更新
 */
import {
  reqAddress,
  reqFoodTypes,
  reqShops
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
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
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    commit(RECEIVE_SHOPS, {shops: result.data})
  }
}

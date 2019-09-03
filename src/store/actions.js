/*
间接更新state的多个方法的对象
通过motations更新
 */
import {
  reqAddress,
  reqFoodTypes,
  reqShopList,
  reqUser,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqShops
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPLIST,
  RECEIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART, SEARCH_SHOPS
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
  },
  // 异步获取商家信息
  async getShopInfo ({commit}, cb) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
      cb && cb()
    }
  },
  // 异步获取商家评价列表
  async getShopRatings ({commit}, cb) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      cb && cb()
    }
  },
  // 异步获取商家商品列表
  async getShopGoods ({commit}, cb) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      cb && cb()
    }
  },
  // 同步cartControl的food的count
  updateFoodCount ({commit}, {food, value}) {
    if (value) { // 增加
      commit(INCREMENT_FOOD_COUNT, {food})
    } else { // 减少
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  // 同步清空购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
  },
  // 异步获取商家商品列表
  async getSearchShops ({commit, state}, keyword) {
    const {latitude, longitude} = this
    const geohash = latitude + ',' + longitude
    const result = await reqShops(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(SEARCH_SHOPS, {searchShops})
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      // cb && cb()
    }
  }
}

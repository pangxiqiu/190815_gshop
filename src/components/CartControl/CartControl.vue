<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-jian" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count > 0">{{food.count}}</div>
    <div class="iconfont icon-jia" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  name: 'CartControl',
  props: {
    food: Object
  },
  methods: {
    updateFoodCount (value) {
      this.$store.dispatch('updateFoodCount', {value, food: this.food})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-jian
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(25px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-jia
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>

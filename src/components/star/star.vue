<template>
  <div class="star star-24">
    <span  v-for="(sa, index) in StarArr" :key="index" :class="sa"></span>
  </div>
</template>

<script>
const CLASS_ON = 'star-item on'
const CLASS_HALF = 'star-item half'
const CLASS_OFF = 'star-item off'

export default {
  name: 'star',
  props: {
    score: Number,
    size: Number
  },
  computed: {
    StarArr () {
      const scr = []
      const {score} = this
      // 添加class_on
      const scoreInteeger = Math.floor(score)
      for (let i = 0; i < scoreInteeger; i++) {
        scr.push(CLASS_ON)
      }
      if (score * 10 - scoreInteeger * 10 >= 5) {
        scr.push(CLASS_HALF)
      }
      while (scr.length < 5) {
        scr.push(CLASS_OFF)
      }
      return scr
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('images/stars/star48_on')
        &.half
          bg-image('images/stars/star48_half')
        &.off
          bg-image('images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('images/stars/star36_on')
        &.half
          bg-image('images/stars/star36_half')
        &.off
          bg-image('images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('images/stars/star24_on')
        &.half
          bg-image('images/stars/star24_half')
        &.off
          bg-image('images/stars/star24_off')
</style>

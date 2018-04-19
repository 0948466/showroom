<template>
    <section class="sector">
        <canvas class="sector__canvas"
                ref="cnvs"
                :width="width"
                :height="width"
        ></canvas>
        <div class="sector__value" :style="{color, lineHeight, fontSize}">{{oldValue}}%</div>
    </section>
</template>

<script>
  export default {
    name: 'Sector',
    props: ['color', 'value', 'width'],
    mounted() {
      this.initCanvas()
    },

    data: () => ({
      oldValue: 0
    }),

    computed: {
      lineHeight() {
        return parseInt(this.width) + 'px'
      },

      lineWidth() {
        return parseInt(this.width) * 0.09
      },

      fontSize() {
        return parseInt(this.width) / 4.9 + 'px'
      }
    },

    methods: {
      initCanvas() {
        this.canvas = this.$refs.cnvs
        this.context = this.canvas.getContext('2d')
        this.x = this.canvas.width / 2
        this.y = this.canvas.height / 2
        this.counterClockwise = false
        this.radius = this.canvas.width / 2 - this.lineWidth
        this.startAngle = 270 * (Math.PI / 180)

        this.animationCanvas()
      },

      animationCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        let degree = 270 * this.oldValue / 100
        this.endAngle = degree * (Math.PI / 180)

        this.drawFirst()
        this.drawSecond()

        if (this.oldValue === this.value) {
          return
        }

        if (this.oldValue < this.value) {
          this.oldValue++
        }

        if (this.oldValue > this.value) {
          this.oldValue--
        }

        setTimeout(() => {
          this.animationCanvas()
        }, 10)
      },

      drawFirst() {
        let context = this.context
        context.beginPath()
        context.arc(this.x, this.y, this.radius, this.startAngle, 360, this.counterClockwise)
        context.lineWidth = this.lineWidth
        let grd = context.createLinearGradient(this.x, 0, this.x, this.y * 2)
        grd.addColorStop(0, 'rgba(203, 203, 203, 0.19)')
        grd.addColorStop(1, 'rgba(155, 155, 155, 0.19)')
        context.strokeStyle = grd
        context.stroke()
      },

      drawSecond() {
        let context = this.context
        context.beginPath()
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise)
        context.lineWidth = this.lineWidth
        let grd = context.createLinearGradient(this.x * 2 * 0.9264, this.y * 2 * 0.72469, this.x * 2 * 0.07705, this.y * 2 * 0.21965)
        grd.addColorStop(0, '#FB3CB1')
        grd.addColorStop(1, '#DE75EF')
        context.strokeStyle = grd
        context.stroke()
      }
    },
    watch: {
      value: 'initCanvas'
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/style/mixins.scss';

    .sector {
        position: relative;
        margin-bottom: 0.2em;
        font-size: 27.79px;
        font-weight: 600;
        text-align: center;

        &__value {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>
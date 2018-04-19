<template>
    <section class="progress-bar">
        <div v-for="(n, index) in 32" :class="['progress-bar__item', {'progress-bar__item_active': isActive(n)}]"
             :key="index"></div>
    </section>
</template>

<script>
  export default {
    name: 'ProgressBar',
    computed: {
      counter() {
        return this.$store.state.counter
      }
    },
    methods: {
      isActive: function(n) {
        let activePoints

        switch (this.counter) {
          case 0:
            activePoints = 0
            break
          case 1:
            activePoints = 3
            break
          case 2:
            activePoints = 7
            break
          case 3:
            activePoints = 10
            break
          case 4:
            activePoints = 13
            break
          case 5:
            activePoints = 17
            break
          case 6:
            activePoints = 22
            break
          case 7:
            activePoints = 27
            break
          case 8:
            activePoints = 30
            break
          default:
            activePoints = 32
        }
        return n <= activePoints
      }
    }
  }
</script>

<style scoped lang="scss">
    .progress-bar {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: calc(142px / 2 - 21px / 2);
        right: 70px;
        width: 63.25vw;
        font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;

        &__item {
            height: 21px;
            width: 21px;
            box-sizing: border-box;
            border: 1px solid #fff;
            border-radius: 50%;
            &_active {
                background-color: #fff;
            }
        }
    }
</style>
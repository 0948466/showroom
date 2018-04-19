<template>
    <section class="end-first">
        <p class="end-first__text">{{$t('endFirst.congratulation')}}</p>

        <p class="end-first__text">{{$t('endFirst.text')}}</p>
        <button class="end-first__btn" @click="endFirstBtnClick">{{ $t("endFirst.btnNext")}}</button>
    </section>
</template>

<script>
  export default {
    name: 'EndFirst',
    methods: {
      endFirstBtnClick: function() {
        this.$emit('btnClick')
      }
    }
  }
</script>

<style scoped lang="scss">
    .end-first {
        padding-top: 9vh;
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        &__text {
            margin: 0 auto 10vh;
            width: 71.25%;
            font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
            font-size: 46px;
            font-weight: bold;
            line-height: 62px;
            color: #fff;
        }

        &__btn {
            position: absolute;
            bottom: 96px;
            right: 120px;
            padding: 0 2%;
            min-width: 16.19vw;
            min-height: 73px;
            font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
            font-size: 24px;
            font-weight: bold;
            line-height: 73px;
            color: #61006E;
            cursor: pointer;
            text-transform: uppercase;
            background-color: #fff;
            border: none;
            border-radius: 7px;
        }
    }
</style>

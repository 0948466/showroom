<template>
    <section class="finish">
        <h2 class="finish__title">{{ $t("finish.title")}}</h2>
        <p class="finish__text">{{ $t("finish.text")}}</p>
        <div class="finish__btn-wrap">
            <router-link :to="{name:'print-qr-code'}" class="finish__btn" tag="button">
                {{ $t("finish.btnGetId")}}
            </router-link>
            <button class="finish__btn" @click="btnMakeFitClick">{{ $t("finish.btnMakeFit")}}</button>
        </div>
    </section>
</template>

<script>
  import {URL} from '@/api/http-common.js'

  export default {
    name: 'Finish',
    methods: {
      btnMakeFitClick: function() {
        window.location = URL.specialCatalogWidlberries
      }
    }
  }
</script>

<style scoped lang="scss">
    .finish {
        padding-top: 10vh;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;

        &__title {
            margin-bottom: 1em;
            font-size: 67px;
            font-weight: 500;
            line-height: 75px;
            text-align: center;
            color: #fff;
        }

        &__text {
            margin-bottom: 2.9em;
            font-size: 36px;
            font-weight: 500;
            line-height: 49px;
            text-align: center;
            color: #fff;
        }

        &__btn-wrap {
            text-align: center;
        }

        &__btn {
            padding: 0 4.3%;
            font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
            font-size: 36px;
            font-weight: bold;
            line-height: 100px;
            text-align: center;
            color: #61006E;
            background-color: #fff;
            border-radius: 10px;
            text-transform: uppercase;
            cursor: pointer;
            &:first-child {
                margin-right: 94px;
            }
        }
    }
</style>

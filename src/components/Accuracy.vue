<template>
    <section v-if="accuracy" class="accuracy">
        <div class="accuracy__wrap">
            <div class="accuracy__left">
                <h2 class="accuracy__title">{{ $t('accuracy.title')}}</h2>
                <Sector :color="'#FF6ABB'"
                        :value="accuracy"
                        width="410px"
                ></Sector>
                <p class="accuracy__text" v-html="$t(`accuracy.${accuracyText}`)"></p>
            </div>
            <div class="accuracy__right">
                <button class="accuracy__btn" @click="$emit('btnClick')">
                    {{ $t("accuracy.btn1")}}
                </button>
                <router-link :to="{name:'finish'}" class="accuracy__btn" tag="button">
                    {{ $t("accuracy.btn2")}}
                </router-link>
                <button class="accuracy__btn2" @click="onBtnExitClick">
                    {{ $t("accuracy.btn3")}}
                </button>
            </div>
        </div>
    </section>
</template>

<script>
  import Sector from '@/components/Sector.vue'

  export default {
    name: 'Accuracy',
    computed: {
      accuracy() {
        return this.$store.getters.accuracy
      },

      accuracyText() {
        switch (true) {
          case this.accuracy >= 95:
            return 'text1'
          case this.accuracy >= 87:
            return 'text2'
          case this.accuracy >= 80:
            return 'text3'
        }
        return 'text4'
      }
    },
    beforeMount() {
      this.$store.dispatch('getUser')
    },

    methods: {
      onBtnExitClick() {
        this.$store.dispatch('userExit')
        this.$router.push({name: 'home-dome'})
      }
    },

    components: {
      Sector
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/style/mixins.scss';

    .accuracy {

        &__wrap {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__left {
            margin-right: 10%;
            width: 30%;
            text-align: center;
        }

        &__title {
            margin-bottom: 1em;
            font-size: 36px;
            font-weight: bold;
            line-height: 1.5;
            text-align: center;
            color: #fff;
        }

        &__right {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            width: 32%;
            max-width: 600px;
            padding-top: 6em;
        }

        &__text {
            margin: 1em 0 0.7em;
            font-size: 30px;
            font-weight: bold;
            line-height: 1.5;
            text-align: center;
            color: #fff;
        }

        &__btn {
            margin-bottom: 2em;
            padding: 0 4.3%;
            font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
            font-size: 30px;
            font-weight: bold;
            line-height: 90px;
            text-align: center;
            color: #760b81;
            background-color: #fff;
            border: none;
            border-radius: 19px;
            text-transform: uppercase;
            cursor: pointer;
        }

        &__btn2 {
            margin-bottom: 2em;
            padding: 0 4.3%;
            font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
            font-size: 30px;
            font-weight: bold;
            line-height: 1.5;
            text-align: center;
            color: #fff;
            background-color: transparent;
            border: none;
            text-transform: uppercase;
            cursor: pointer;
            &:focus {
                outline: none;
            }
        }
    }
</style>
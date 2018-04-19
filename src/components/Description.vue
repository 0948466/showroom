<template>
    <section class="description">
        <div class="description__content">
            <div class="description__item">
                <h2 class="description__title" v-html="$t('description.titleLeft')"></h2>
                <p class="description__text">
                    {{ $t('description.textLeft')}}
                </p>
            </div>
            <div class="description__item">
                <h2 class="description__title">
                    <template v-if="isSideLeft">{{ $t('description.titleRight1') }}</template>
                    <template v-else>{{ $t('description.titleRight2') }}</template>
                </h2>
                <p class="description__text">
                    {{ $t('description.textRight')}}
                </p>
            </div>
        </div>
        <Registration class="description__reg" v-if="showReg" ref="reg"></Registration>
        <button class="description__btn" @click="onBtnDescrClick">{{ $t('description.btnNext')}}</button>
    </section>
</template>

<script>
  import Registration from './Registration.vue'
  import {HTTP} from '@/api/http-common.js'
  import Mixins from '@/mixins'
  import {mapMutations} from 'vuex'

  export default {
    name: 'Description',
    mixins: [Mixins],
    data: () => ({
      age: '',
      sex: ''
    }),

    computed: {
      side() {
        return this.$store.state.side
      },
      isSideLeft() {
        return this.side === 'left'
      },

      showReg() {
        return !this.$store.getters.user
      }
    },

    beforeMount() {
      this.CHANGE_COUNTER(2)
    },

    methods: {
      ...mapMutations([
        'CHANGE_COUNTER', 'PLUS_COUNTER']),

      onBtnDescrClick() {
        if (this.showReg) {
          let sex = this.$refs.reg.sex
          let age = this.$refs.reg.age
          if (!sex || !age) {
            this.$refs.reg.showError()
            return
          }

          let data = {
            sex,
            age
          }
          this.register(this.getParams(data))
          this.PLUS_COUNTER()

          setTimeout(() => {
            this.$store.dispatch('getUser')
          }, 1000)
        }

        this.$emit('btnClick')
      },

      register(params) {
        HTTP('register', params)
          .then((response) => {
            if (response.data.error) {
              this.errorRegistration()
            }
          })
          .catch(() => {
            this.errorRegistration()
          })
      },

      errorRegistration() {
        alert('Ошибка регистрации')
        this.$router.push({name: 'description'})
        this.PLUS_COUNTER(-1)
      }
    },

    components: {
      Registration
    }
  }
</script>

<style scoped lang="scss">
    .description {
        padding-top: 7vh;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: transparent;
        font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;

        &__content {
            display: flex;
            justify-content: center;
            margin-bottom: 2em;
        }

        &__item {
            position: relative;
            padding-left: 105px;
            width: 38%;
            box-sizing: border-box;

            &:first-child {
                margin-right: 5%;
            }
            &::before {
                position: absolute;
                top: 0;
                left: 0;
                font-size: 80px;
                line-height: 80px;
                color: #fff;
            }

            &:first-child::before {
                content: '1.';
            }

            &:nth-child(2)::before {
                content: '2.';
            }
        }

        &__title {
            margin-bottom: 0.7em;
            font-size: 46px;
            font-weight: bold;
            line-height: 62px;
            color: #fff;
        }

        &__text {
            font-size: 26px;
            font-weight: 500;
            line-height: 48px;
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
        &__reg {
            width: 700px;
            transform: translateX(32.6%);
        }
    }
</style>

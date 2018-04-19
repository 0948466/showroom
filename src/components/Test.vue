<template>
    <section class="test">
        <div class="test__content">
            <div class="test__left">
                <div :class="['test__img-scanner', { 'test__img-scanner_error': isError }]"></div>
                <div class="test__img-foot"></div>
            </div>

            <div class="test__right">
                <template v-if="!error">
                    <h2 class="test__title">
                        <span class="test__title__number">{{ counter }}.</span>
                        {{ $t('test.title') }}
                    </h2>
                </template>

                <template v-if="error">
                    <h2 class="test__title_error">
                        {{ $t(errorTitle) }}
                    </h2>
                    <p class="test__text_error">
                        {{ $t(errorText) }}
                    </p>
                </template>

                <router-link :to="{name:'load-screen'}"
                             :class="['test__btn', { 'test__btn_error': isError }]"
                             @click.native="btnTestClick">
                    {{ $t('test.btnTest')}}
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'Test',
    props: {
      error: {
        type: [String, Boolean]
      }
    },

    computed: {
      counter() {
        return this.$store.state.counter
      },
      side() {
        return this.$store.state.side
      },
      isError() {
        return this.error
      },

      errorTitle() {
        if (!this.error) {
          return false
        }

        return this.switchErrors('title')
      },

      errorText() {
        if (!this.error) {
          return false
        }

        return this.switchErrors()
      }
    },

    methods: {
      btnTestClick() {
        this.$emit('btnTestClick')
      },

      isSideLeft() {
        return this.side === 'left'
      },

      switchErrors(title) {
        switch (this.error) {
          case 'OBJECTERROR':
            return title ? 'test.titleError1' : 'test.textError1'
          default:
            return title ? 'error.titleErrorDefault' : 'error.textErrorDefault'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    $secondSide: '.app_second-side &';

    .test {
        padding-top: 10vh;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: transparent;
        font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;

        &__content {
            display: flex;
            justify-content: space-around;
        }

        &__left {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            margin-right: 4vw;
            width: 50%;
        }

        &__img-foot {
            height: 381px;
            width: 151px;
            background: url('../assets/img/foot-left.png') no-repeat;
            transform: scale(-1, 1);
            background-size: contain;
            order: 2;
            #{$secondSide} {
                transform: none;
                background-image: url('../assets/img/foot-left.png');
                order: 0;
            }
        }

        &__img-scanner {
            margin: 0 4vw;
            width: 390px;
            height: 460px;
            background: url('../assets/img/scanner.png') no-repeat;
            background-size: contain;
            order: 1;
            &_error {
                position: relative;
                &::before {
                    content: '';
                    position: absolute;
                    top: 55%;
                    right: -15%;
                    width: 50%;
                    height: 40px;
                    background: url('../assets/img/arrow.png') no-repeat;
                    background-size: contain;
                    #{$secondSide} {
                        left: -15%;
                        right: auto;
                        transform: rotate(180deg);
                    }
                }
            }
        }
        $paddingLeft: 120px;

        &__right {
            position: relative;
            padding-left: $paddingLeft;
            padding-bottom: 20vh;
            margin-right: auto;
            width: 32%;
        }

        &__title {
            position: relative;
            font-size: 46px;
            font-weight: bold;
            line-height: 62px;
            color: #fff;
        }

        &__title_error {
            margin-bottom: 1em;
            font-size: 48px;
            font-weight: bold;
            line-height: 48px;
            color: #E7005C;
        }

        &__text_error {
            font-size: 42px;
            line-height: 62px;
            color: #fff;
        }

        &__title__number {
            position: absolute;
            top: 0;
            left: -97px;
            font-size: 80px;
            line-height: 80px;
            font-weight: normal;
            color: #fff;
        }

        &__btn {
            position: absolute;
            bottom: 0;
            left: $paddingLeft;;
            padding: 0 2%;
            min-width: 22.56vw;
            min-height: 13.6vh;
            font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
            font-size: 48px;
            font-weight: bold;
            line-height: 13.6vh;
            text-align: center;
            text-decoration: none;
            text-transform: uppercase;
            color: #61006E;
            background-color: #fff;
            border: none;
            border-radius: 7px;
            &_error {
                border: 8.5px solid #EF006F;
                color: #E7005C;
            }
        }
    }
</style>

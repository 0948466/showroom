<template>
    <section class="photo">
        <div class="photo__content">
            <div class="photo__left">
                <img class="photo__img" src="../assets/img/foot-right-photo.png">
            </div>
            <div :class="['photo__right', { 'photo__right_error': isError }]">
                <template v-if="!error">
                    <h2 class="photo__title">
                        <span class="photo__title__number">{{ counter }}.</span>
                        <template v-if="isFirstPhoto">
                            {{ $t('photo.title1')}}
                        </template>
                        <template v-else>
                            {{ $t('photo.title2')}}
                        </template>
                        {{ $t('photo.photo')}} {{ photoCounter }}
                    </h2>
                    <p class="photo__text">{{ $t('photo.text')}}</p>
                </template>

                <template v-if="error">
                    <h2 class="photo__title_error">{{ $t(errorTitle) }}</h2>
                    <p class="photo__text_error">{{ $t(errorText) }}</p>
                </template>

                <router-link :to="{name:'load-screen'}"
                             :class="['photo__btn', { 'photo__btn_error': isError }]"
                             @click.native="btnPhotoClick">
                    {{ $t('photo.photo')}} {{ photoCounter }}
                </router-link>
            </div>
        </div>

    </section>
</template>

<script>
  export default {
    name: 'photo',
    props: {
      error: {}
    },

    methods: {
      btnPhotoClick() {
        this.$emit('btnPhotoClick')
      },

      isSideLeft() {
        return this.side === 'left'
      },

      switchErrors(title) {
        switch (this.error) {
          case 'OBJECTERROR':
            return title ? 'photo.titleError1' : (this.isSideLeft() ? 'photo.textError1Left' : 'photo.textError1Right')
          case 'FOOTADVANCED':
            return title ? 'photo.titleError2' : 'photo.textError2'
          case 'FOOTBEHIND':
            return title ? 'photo.titleError3' : 'photo.textError3'
          case 'FOOTTOORIGHT':
            return title ? 'photo.titleError4' : 'photo.textError4'
          case 'FOOTTOOLEFT':
            return title ? 'photo.titleError5' : 'photo.textError5'
          case 'FOOTEXCHANGED':
            return title ? (this.isSideLeft() ? 'photo.titleError6Left' : 'photo.titleError6Right') : 'photo.textError6'
          case 'RECONSTRUCTIONERROR':
            return title ? 'photo.titleError7' : 'photo.textError7'
          default:
            return title ? 'error.titleErrorDefault' : 'error.textErrorDefault'
        }
      }
    },

    computed: {
      counter() {
        return this.$store.state.counter
      },
      side() {
        return this.$store.state.side
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
      },

      isError() {
        return this.error
      },

      isFirstPhoto() {
        return (this.side === 'right' && this.photoCounter === 1)
      },

      photoCounter() {
        switch (this.counter) {
          case 4:
            return 1
          case 6:
            return 2
          case 8:
            return 3
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    $secondSide: '.app_second-side &';

    .photo {
        padding-top: 5vh;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: transparent;
        font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;

        &__content {
            display: flex;
        }

        &__left {
            display: flex;
            justify-content: space-around;
            width: 45%;
        }

        &__img {
            width: 248px;
            height: 620px;
            #{$secondSide} {
                transform: scale(-1, 1);
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
            margin-bottom: 0.8em;
            font-size: 46px;
            font-weight: bold;
            line-height: 62px;
            color: #fff;
        }

        &__title_error {
            margin-bottom: 1em;
            font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
            font-size: 48px;
            font-weight: bold;
            line-height: 48px;
            color: #E7005C;
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

        &__text {
            font-size: 26px;
            font-weight: 500;
            line-height: 48px;
            color: #fff;
        }

        &__text_error {
            font-size: 42px;
            line-height: 62px;
            color: #fff;
        }

        &__btn {
            position: absolute;
            bottom: 0;
            left: $paddingLeft;
            padding: 0 2%;
            min-height: 13.6vh;
            min-width: 22.56vw;
            box-sizing: border-box;
            font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
            font-size: 48px;
            font-weight: bold;
            line-height: 13.6vh;
            text-align: center;
            color: #61006E;
            text-decoration: none;
            text-transform: uppercase;
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

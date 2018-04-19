<template>
    <section class="reg">
        <div class="reg__sex">
            <h2 class="reg__title">{{ $t('reg.sex.title')}}</h2>
            <div class="reg__age__inner">
                <label class="reg__label">
                    <input class="reg__input" type="radio" value="1" v-model="sex">
                    <span class="reg__text">{{ $t('reg.sex.text1')}}</span>
                    <span class="reg__checkbox"></span>
                </label>
                <label class="reg__label">
                    <input class="reg__input" type="radio" value="2" v-model="sex">
                    <span class="reg__text">{{ $t('reg.sex.text2')}}</span>
                    <span class="reg__checkbox"></span>
                </label>
            </div>
        </div>
        <div class="reg__age">
            <h2 class="reg__title">{{ $t('reg.age.title')}}</h2>
            <div class="reg__age__inner">
                <label class="reg__label">
                    <input class="reg__input" type="radio" value="1" v-model="age">
                    <span class="reg__text">11-16</span>
                    <span class="reg__checkbox"></span>
                </label>
                <label class="reg__label">
                    <input class="reg__input" type="radio" value="2" v-model="age">
                    <span class="reg__text">17-25</span>
                    <span class="reg__checkbox"></span>
                </label>
                <label class="reg__label">
                    <input class="reg__input" type="radio" value="3" v-model="age">
                    <span class="reg__text">26-35</span>
                    <span class="reg__checkbox"></span>
                </label>
                <label class="reg__label">
                    <input class="reg__input" type="radio" value="4" v-model="age">
                    <span class="reg__text">36-45</span>
                    <span class="reg__checkbox"></span>
                </label>
                <label class="reg__label">
                    <input class="reg__input" type="radio" value="5" v-model="age">
                    <span class="reg__text">{{ $t('reg.age.text')}}</span>
                    <span class="reg__checkbox"></span>
                </label>
            </div>
        </div>

        <transition name="fade">
            <p v-if="error" class="reg__error">{{ $t('reg.error')}}</p>
        </transition>


    </section>
</template>

<script>
  export default {
    name: 'Registration',
    data: () => ({
      sex: '',
      age: '',
      error: ''
    }),
    methods: {
      showError() {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 2000)
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/style/mixins.scss';

    .reg {
        position: relative;
        display: flex;
        justify-content: space-around;

        &__sex,
        &__age {
            display: flex;
        }

        &__title {
            margin-right: 28px;
            font-size: 26px;
            line-height: 1.5;
            font-weight: 600;
            color: #fff;
        }
        &__label {
            display: flex;
            align-items: center;
            margin-bottom: 0.5em;
        }

        &__text {
            margin-left: 8px;
            order: 2;
            @include responsiveFont(18px, 14px);
            line-height: 1.5;
            color: #fff;
        }
        &__checkbox {
            position: relative;
            order: 1;
            width: 30px;
            height: 30px;
            box-sizing: border-box;
            border: 2px solid #fff;
            border-radius: 50%;
        }

        &__input {
            display: none;
            &:checked ~ .reg__checkbox {
                &::before {
                    content: '';
                    position: absolute;
                    top: 20%;
                    left: 20%;
                    width: 60%;
                    height: 60%;
                    border-radius: 50%;
                    background-color: #fff;
                }
            }
        }

        &__error {
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 26px;
            font-weight: 600;
            line-height: 1.5;
            color: #fc6c6c;
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity 0.7s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
    }
</style>

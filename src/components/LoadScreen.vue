<template>
    <section class="load-screen">
        <div class="load-screen__wrap">
            <div class="load-screen__icons">
                <div class="load-screen__icons_inner"></div>
            </div>
            <h2 class="load-screen__title">{{ $t('loadScreen.title')}}</h2>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'LoadScreen'
  }
</script>

<style scoped lang="scss">
    @keyframes Orbita1 {
        from { transform: rotate(180deg) translateX(60px) }
        to   { transform: rotate(540deg) translateX(60px)}
    }

    @keyframes Orbita2 {
        from { transform: rotate(-180deg) translateX(-90px) }
        to   { transform: rotate(-540deg) translateX(-90px) }
    }

    @keyframes Orbita3 {
        from { transform: rotate(180deg) translateX(30px) }
        to   { transform: rotate(540deg) translateX(30px) }
    }

    @keyframes Orbita4 {
        from { transform: rotate(180deg) translateX(20px) }
        to   { transform: rotate(540deg) translateX(20px) }
    }

    .load-screen {
        padding-top: 10vh;
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        &__wrap {
            text-align: center;
        }

        &__icons {
            position: relative;
            margin: 0 auto 50px;
            height: 227px;
            width: 222px;
            &::before {
                content: '';
                position: absolute;
                top: 90.5px;
                left: 32.5px;
                height: 32px;
                width: 32px;
                border: 3px solid #D72F99;
                border-radius: 50%;
                box-sizing: border-box;
                animation: Orbita3 5s ease-in-out infinite;
            }
            &::after {
                content: '';
                position: absolute;
                top: 50.5px;
                right: 0;
                height: 142px;
                width: 142px;
                border: 5px solid #FF00D1;
                border-radius: 50%;
                box-sizing: border-box;
                animation: Orbita2 9s linear infinite;
            }
        }

        &__icons_inner {
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 73px;
                width: 73px;
                border: 3px solid #FA88F5;
                border-radius: 50%;
                box-sizing: border-box;
                animation: Orbita4 7s ease-in infinite;
            }
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 43.5px;
                height: 92px;
                width: 92px;
                border-radius: 50%;
                border: 5px solid #EF006F;
                box-sizing: border-box;
                animation: Orbita1 15s linear infinite;
            }
        }

        &__title {
            font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
            font-size: 46px;
            font-weight: bold;
            line-height: 62px;
            color: #fff;
            text-transform: uppercase;
        }
    }
</style>

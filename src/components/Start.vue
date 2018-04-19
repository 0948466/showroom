<template>
    <section class="start">
        <video class="start__video" @ended="onVideoEnd" autoplay muted>
            <source src="/video/42291012/video.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            <source src="/video/42291012/video.webm" type='video/webm; codecs="vp8, vorbis"'>
            {{ $t("start.videoNotSupported")}}
            <a href="/video/42291012/video.mp4">{{ $t('start.downloadVideo')}}</a>.
        </video>
        <button class="start__btn" @click="$emit('btnClick')">
            {{ $t("start.btnStart") }}
        </button>
    </section>
</template>

<script>
  export default {
    name: 'Start',
    methods: {
      onVideoEnd(e) {
        e.target.hidden = true
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/style/mixins.scss';

    .start {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        background-image: url('../assets/img/video-nogi.jpg'), radial-gradient(circle farthest-corner at 70% 1%, #04809d 0, #01788a 20%, #006476 30%, #014457 50%, #014457 70%, #014457 100%);

        &__video {
            width: 100%;
            min-height: calc(100vw / 16 * 9);
            box-sizing: border-box;
        }

        &__btn {
            position: absolute;
            bottom: 19.55vh;
            left: 50%;
            padding: 0 9.25vw;
            min-height: 16.67vh;
            @include responsiveFont(48px, 28px);
            font-weight: bold;
            line-height: 16.67vh;
            text-align: center;
            color: #fff;
            text-decoration: none;
            text-transform: uppercase;
            background-color: transparent;
            border: 3px solid #FFFFFF;
            border-radius: 15px;
            cursor: pointer;
            transform: translateX(-50%);
            font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
        }
    }
</style>

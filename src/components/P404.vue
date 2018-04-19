<template>
    <section class="p404">
        <h2 class="p404__title">{{ $t("p404.title") }}</h2>
        <router-link :to="{name:'home'}" class="p404__link">
            {{ $t("p404.link") }}
        </router-link>
    </section>
</template>

<script>
  export default {
    name: 'P404'
  }
</script>

<style lang="scss">
    .p404 {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        &__title {
            margin-bottom: 1em;
            font-size: 20px;
            line-height: 1.5;
            color: #fff;
        }

        &__link {
            font-size: 18px;
            line-height: 1.5;
            color: #fff;
        }
    }
</style>
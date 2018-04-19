<template>
    <div class="powered-by">Powered by
        <span class="powered-by__company">Imigize</span>
    </div>
</template>

<script>
  export default {
    name: 'PoweredBy'
  }
</script>

<style scoped lang="scss">
    .powered-by {
        position: absolute;
        bottom: 30px;
        right: 70px;
        height: 30px;
        width: 200px;
        color: #fff;
        font-size: 19.84px;
        font-weight: 500;
        line-height: 29px;
        cursor: pointer;
        text-align: center;
        z-index: 1;
        font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
        &__company {
            color: #03cce5;
            text-transform: uppercase;
        }
    }
</style>
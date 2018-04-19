<template>
    <section v-if="loginNumber" class="print-qr-code">
        <qrcode v-if="noPrint" :value="loginNumber" :options="{ size: 200 }"></qrcode>
        <p class="print-qr-code__text">{{ loginNumber }}</p>
        <div class="print-qr-code__btn-wrap">
            <template v-if="noPrint">
                <button class="print-qr-code__btn" @click="onPrintClick">{{ $t("printQRcode.btnPrint")}}</button>
                <router-link :to="{name:'finish'}" class="print-qr-code__btn" tag="button">
                    {{ $t("printQRcode.btn")}}
                </router-link>
            </template>
        </div>
    </section>
</template>

<script>
  import qrcode from '@xkeshi/vue-qrcode'

  export default {
    name: 'PrintQRcode',
    data: () => ({
      noPrint: true
    }),
    beforeMount() {
      this.getUser()
    },

    computed: {
      loginNumber() {
        return (!this.$store.getters.user) ? '' : this.$store.getters.user.loginNumber
      }
    },

    methods: {
      getUser() {
        this.$store.dispatch('getUser')
      },

      onPrintClick() {
        this.noPrint = false
        setTimeout(() => {
          window.print()
        }, 0)
        setTimeout(() => {
          this.noPrint = true
        }, 10)
      }
    },
    components: {
      qrcode
    }
  }
</script>

<style scoped lang="scss">
    .print-qr-code {
        padding: 0 10%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        transform: translateY(71%);

        &__text {
            font-size: 36px;
            font-weight: 500;
            line-height: 49px;
            text-align: center;
            color: #fff;
        }

        &__btn-wrap {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 333px;
        }

        &__btn {
            margin-bottom: 1em;
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
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>

<template>
    <div id="app" v-bind:class="{ 'app_second-side': isSecondSide }">
        <router-view name="Start" @btnClick="onStartBtnClick"></router-view>

        <router-view name="Logo"></router-view>
        <router-view name="ProgressBar"></router-view>

        <router-view name="PoweredBy"></router-view>
        <router-view name="Description" @btnClick="onDescrBtnClick"></router-view>

        <router-view name="SendFiles"></router-view>

        <router-view name="Test"
                     @btnTestClick="onBtnTestClick"
                     :error="error"></router-view>

        <router-view name="Photo"
                     @btnPhotoClick="onBtnPhotoClick"
                     :error="error"></router-view>

        <router-view name="EndFirst"
                     @btnClick="onEndFirstClick"></router-view>

        <router-view name="LoadScreen"></router-view>
        <router-view name="Finish"></router-view>
        <router-view name="P404"></router-view>
        <router-view name="PrintQRcode"></router-view>
        <router-view name="Accuracy" @btnClick="onAccuracyBtnClick" style="margin-top: -50px"></router-view>
    </div>
</template>

<script>
  import config from '@/config.json'
  import {HTTP} from '@/api/http-common.js'
  import Mixins from '@/mixins'
  import {mapMutations} from 'vuex'

  export default {
    name: 'app',
    mixins: [Mixins],
    data() {
      return {
        error: this.fromRouterQuery('error') || null
      }
    },

    beforeCreate() {
      if (!this.$store.getters.user) {
        this.$store.dispatch('getUser')
      }
    },

    created() {
      this.counterDefault = +config.counter
      this.CHANGE_COUNTER(+this.fromRouterQuery('counter') || +config.counter)
      this.CHANGE_SIDE(this.fromRouterQuery('side') || config.sideFirst)
      this.sideFirst = config.sideFirst
      this.sideSecond = config.sideSecond
      this.dome = this.fromRouterQueryDome() || config.dome
      this.STATUS_WAIT = 1
      this.STATUS_OK = 2
      // TODO the required number of percentages
      this.PHOTO_NEED_PERCENT = 70
    },

    computed: {
      counter() {
        return this.$store.state.counter
      },

      side() {
        return this.$store.state.side
      },

      isSecondSide() {
        return this.side === this.sideSecond
      }
    },

    methods: {
      ...mapMutations([
        'CHANGE_COUNTER', 'PLUS_COUNTER', 'CHANGE_SIDE', 'ENABLE_ADDITIONAL_SCANS']),
      fromRouterQuery(param) {
        return this.$router.currentRoute.query[param]
      },

      fromRouterQueryDome() {
        for (let param in this.$router.currentRoute.query) {
          let index = param.indexOf('dome')
          if (~index) {
            return param.slice(index + 4)
          }
        }
      },

      onStartBtnClick() {
        this.checkRouteDescr()
      },

      isRouteDome() {
        return this.$route.path.includes('scan') || (this.fromRouterQuery('scan') === null) || this.fromRouterQuery('scan') || config.scan
      },

      checkRouteDescr() {
        if (this.isRouteDome()) {
          this.$router.push({name: 'description-dome'})
        } else {
          this.$router.push({name: 'description'})
        }
      },

      onDescrBtnClick() {
        if (this.isRouteDome()) {
          this.CHANGE_COUNTER(3)
          this.$router.push({name: 'test'})
        } else {
          this.$router.push({name: 'send-files'})
        }
      },

      onAccuracyBtnClick() {
        this.CHANGE_SIDE(this.sideFirst)
        this.ENABLE_ADDITIONAL_SCANS()
        this.$router.push({name: 'description-dome'})
      },

      onBtnTestClick() {
        let data = {
          'dome': this.dome,
          'type': 'background',
          'requirement': this.side
        }
        this.createTask(this.getParams(data))
      },

      onBtnPhotoClick() {
        let data = {
          'dome': this.dome,
          'type': this.side
        }
        this.createTask(this.getParams(data))
      },

      onEndFirstClick() {
        this.CHANGE_SIDE(this.sideSecond)
        this.CHANGE_COUNTER(this.counterDefault)
        this.isAlreadyShowEndFirst = true
        this.checkRouteDescr()
      },

      createTask(params) {
        HTTP('createTask', params)
          .then((response) => {
            this._checkTask(this.getParams({'id': response.data.id}))
          })
          .catch(() => {
            alert('Ошибка добавления в очередь')
          })
      },

      _checkTask(params) {
        HTTP('checkRequest', params)
          .then((response) => {
            switch (+response.data.s) {
              case this.STATUS_OK:
                this.error = null
                this._checkStatus()
                break
              case this.STATUS_WAIT:
                setTimeout(() => {
                  this._checkTask(params)
                }, 500)
                break
              default:
                this.error = response.data.e
                this._onError()
            }
          })
      },

      _onError() {
        if (this.needRestart()) {
          this.error = null
          this.$router.push({name: 'test'})
        } else {
          (this.isCurrentTest()) ? this.$router.push({name: 'test'}) : this.$router.push({name: 'photo'})
        }
      },

      _onSuccess(answer) {
        if (this.isCurrentTest()) {
          this.PLUS_COUNTER()
          this.$router.push({name: 'photo'})
          return
        }

        if (this.$store.state.additionalScans) {
          if (!this.isSecondSide) {
            this.$router.push({name: 'end-first'})
          } else {
            this.CHANGE_SIDE(this.sideFirst)
            this.$router.push({name: 'accuracy'})
          }
          return
        }

        switch (true) {
          case (answer.accuracyRight < this.PHOTO_NEED_PERCENT):
            this.CHANGE_SIDE(this.sideFirst)
            this.showNextTest()
            break
          case (answer.accuracyRight >= this.PHOTO_NEED_PERCENT && !this.isAlreadyShowEndFirst):
            this.$router.push({name: 'end-first'})
            break
          case (answer.accuracyLeft < this.PHOTO_NEED_PERCENT):
            this.CHANGE_SIDE(this.sideSecond)
            this.showNextTest()
            break
          default:
            this.CHANGE_SIDE(this.sideFirst)
            this.$router.push({name: 'accuracy'})
        }
      },

      showNextTest() {
        this.PLUS_COUNTER()
        this.$router.push({name: 'test'})
      },

      isCurrentTest() {
        return this.counter % 2
      },

      needRestart() {
        return ['DOMENOTCONNECTED', 'SERVERCONNECTIONERROR', 'WRONGORDER'].indexOf(this.error) !== -1
      },

      _checkStatus() {
        HTTP('status')
          .then((response) => {
            this._onSuccess(response.data)
          })
          .catch(() => {
            this._onError()
          })
      }
    }
  }
</script>


<style lang="scss">
    @import "~@/style/fonts";
    @import "~@/style/reset";
    @import "~@/style/mixins.scss";

    $paddingTop: 142px;

    #app {
        position: relative;
        padding-top: $paddingTop;
        width: 100vw;
        height: 100vh;
        min-width: 1600px;
        min-height: 850px;
        box-sizing: border-box;
        background: url('../src/assets/img/background1.png') no-repeat center;
        background-size: cover;
        font-family: 'Avenir Next', 'Lato Medium', 'Open Sans', sans-serif;
    }

    .app_second-side::before {
        content: '';
        position: absolute;
        width: 100vw;
        height: calc(100% - #{$paddingTop});
        top: $paddingTop;
        left: 0;
        background-color: rgba(216, 216, 216, 0.49);
    }
</style>

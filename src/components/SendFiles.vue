<template>
    <section class="send-files">
        <h2 class="send-files__title">{{ $t('sendFiles.title')}}</h2>
        <p class="send-files__text">{{ $t('sendFiles.text')}}</p>
        <div class="send-files__wrap">
            <div v-for="(progressItem, index) in progress" class="send-files__input-wrap">
                <label class="send-files__label">
                    <span>{{ $t('sendFiles.inputText')}}</span>
                    <input class="send-files__input" type="file" @change="processFile(index, $event)"
                           multiple="multiple">
                    <Sector :color="progressItem.color"
                            :value="progressItem.value"
                            width="94px"
                    ></Sector>
                </label>
            </div>
            <transition name="fade">
                <p v-if="error" class="send-files__error">{{ $t('sendFiles.error')}}</p>
            </transition>
            <transition name="fade">
                <p v-if="error2" class="send-files__error">{{ $t('sendFiles.error2')}}</p>
            </transition>
        </div>
        <transition name="fade">
            <router-link v-if="complete" :to="{name:'finish'}" tag="button" class="send-files__btn">
                {{ $t("sendFiles.btn")}}
            </router-link>
        </transition>
    </section>
</template>

<script>
  import Sector from './Sector.vue'
  import {URL} from '@/api/http-common.js'
  import axios from 'axios'
  import {mapMutations} from 'vuex'

  const MAX_FILES = 20

  export default {
    name: 'SendFiles',

    mounted() {
      this.COLOR_ERROR = '#fc6c6c'
      this.COLOR_GOOD = '#44c62b'
    },

    data: () => ({
      sex: '',
      age: '',
      error: '',
      error2: '',
      complete: '',
      progress: [{'value': 0, 'color': '#fff'}, {'value': 0, 'color': '#fff'}, {'value': 0, 'color': '#fff'},
        {'value': 0, 'color': '#fff'}, {'value': 0, 'color': '#fff'}, {'value': 0, 'color': '#fff'}]
    }),

    methods: {
      ...mapMutations([
        'CHANGE_COUNTER'
      ]),
      showError() {
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 2000)
      },

      showError2() {
        this.error2 = true
        setTimeout(() => {
          this.error2 = false
        }, 2000)
      },

      processFile(number, event) {
        if (this.complete) {
          this.showError2()
          return
        }
        let target = event.target
        let files = target.files
        if (!files || !files.length) {
          return
        }

        let [text, counter, formData] = this.createFormData(files)
        this.changeText(target, text)
        this.sendFiles(formData, number, counter)
      },

      createFormData(files) {
        let text = []
        let counter = 0

        let formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          if (i > MAX_FILES) {
            break
          }
          formData.append('stl[]', files[i])
          text.push(files[i].name)
          counter += 1
        }

        return [text, counter, formData]
      },

      changeText(target, text) {
        let span = target.closest('label').querySelector('span')
        span.innerHTML = text.join('<br>')
      },

      sendFiles(params, number, counter) {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            this.progress[number].value = (Math.floor((progressEvent.loaded * 100) / progressEvent.total))
          }
        }
        axios.post(URL.sendFiles, params, config)
          .then((response) => {
            if (response.data.success) {
              this.onSuccess(number, counter)
            } else {
              this.onError(number)
            }

            if (response.data.complete) {
              this.complete = true
            }
          })
          .catch(() => {
            alert('Ошибка отправки файлов')
          })
      },

      onSuccess(number, counter) {
        this.progress[number].color = this.COLOR_GOOD
        this.CHANGE_COUNTER(counter)
      },

      onError(number) {
        this.progress[number].color = this.COLOR_ERROR
        this.progress[number].value = 0
        this.showError()
      }
    },

    components: {
      Sector
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/style/mixins.scss';

    .send-files {
        margin: 0 auto;
        width: 80%;
        text-align: center;

        &__title {
            margin-bottom: 1em;
            font-size: 43px;
            font-weight: 500;
            line-height: 49px;
            color: #fff;
        }

        &__text {
            margin-bottom: 1em;
            font-size: 26px;
            font-weight: 500;
            line-height: 1.5;
            color: #fff;
        }

        &__wrap {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 3vh;
            margin-bottom: 3vh;
        }

        &__input-wrap {
            position: relative;
            margin-right: 30px;
            margin-bottom: 30px;
            width: 380px;
            height: 160px;
            border: 5px dotted #fff;
            text-align: center;
        }

        &__label {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #fff;
            @include responsiveFont(18px, 14px);
            line-height: 1.5;
            word-break: break-all;
        }

        &__input {
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }

        &__error {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            font-size: 26px;
            font-weight: 600;
            line-height: 1.5;
            color: #fc6c6c;
            text-align: center;
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity 0.7s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }

        &__btn {
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
        }
    }
</style>

export default {
  methods: {
    getParams(data) {
      let params = new URLSearchParams()

      for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
          params.append(prop, data[prop])
        }
      }
      return params
    }
  }
}

<template>
<div class="col contents">
  <div class="row">
    <div class="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
      <h2 class="alert alert-warning text-center">生成</h2>
      <div class="input-group my-4">
        <input type="text" class="form-control makeinput" readonly :value="password" aria-describedby="button-copy">
        <button @click="writeToClipboard(password)" class="btn btn-outline-secondary makeinput" type="button" id="button-copy">
          <span class="d-none d-md-inline">COPY</span>
          <span class="d-inline d-md-none">C</span>
        </button>
        <form action="/regist" class="btn btn-outline-danger makeinput d-flex justify-content-center">
          <button type="submit" class="btn text-warning makeinput" id="button-regist">
            <span class="d-none d-md-inline">REGIST</span>
            <span class="d-inline d-md-none">R</span>
          </button>
          <input type="hidden" name="password" :value="password">
        </form>
      </div>
      <div class="card mt-4">
        <div class="card-header bg-warning text-white">
          <h3 class="m-0 h6">条件</h3>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-center">
            <div class="condition">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="small_alpha" v-model="small_alpha">
                <label class="form-check-label" for="small_alpha">英小文字</label>
              </div>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="big_alpha" v-model="big_alpha">
                <label class="form-check-label" for="big_alpha">英大文字</label>
              </div>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="number" v-model="numbers">
                <label class="form-check-label" for="number">数字</label>
              </div>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="symbol" v-model="symbols">
                <label class="form-check-label" for="symbol">記号</label>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <label for="length" class="col-form-label">文字数</label>
            <div class="ms-3">
              <input type="number" class="form-control" id="length" v-model="strLength" min="4">
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 text-center">
        <button @click="reset++" class="btn btn-outline-dark px-5">再生成</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Meta from '~/assets/mixins/meta'
export default {
  mixins: [Meta],
  head() {
    return {
      title: '生成',
    }
  },
  data() {
    return {
      big_alpha_string: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
      small_alpha_string: 'abcdefghijkmnopqrstuvwxyz',
      number_string: '1234567890',
      symbol_string: '!@#$%^&*()',
      big_alpha: false,
      small_alpha: true,
      numbers: true,
      symbols: false,
      strLength: 8,
      reset: 0
    }
  },
  computed: {
    password() {
      if (this.strLength === "" || this.strLength < 4) {
        return ""
      }
      const reset = this.reset
      let source = ''
      source += (this.big_alpha ? this.big_alpha_string : '')
      source += (this.small_alpha ? this.small_alpha_string : '')
      source += (this.numbers ? this.number_string : '')
      source += (this.symbols ? this.symbol_string : '')
      if (!source) return '-'
      let word = this.createWord(source)
      while (true) {
        let check = this.checkWord(word)
        if (check) {
          return word
        }else{
          word = this.createWord(source)
        }
      }
    }
  },
  methods: {
    writeToClipboard(pass) {
      navigator.clipboard.writeText(pass).catch((e) => {
        console.error(e)
      })
    },
    createWord(source){
      let str = ''
      for(let i=0; i < this.strLength; i++) {
        str += source.substr(Math.floor(Math.random() * source.length), 1)
      }
      return str
    },
    checkWord(word){
      if (this.big_alpha) {
        let check = this.includeThisWord(word, this.big_alpha_string)
        if (!check) return false
      }
      if (this.small_alpha) {
        let check = this.includeThisWord(word, this.small_alpha_string)
        if (!check) return false
      }
      if (this.numbers) {
        let check = this.includeThisWord(word, this.number_string)
        if (!check) return false
      }
      if (this.symbols) {
        let check = this.includeThisWord(word, this.symbol_string)
        if (!check) return false
      }
      return true
    },
    includeThisWord(word, target){
      let regex = new RegExp('[' + target + ']', 'g')
      let res = word.search(regex)
      if (res === -1) return false
      return true
    }
  },
}
</script>

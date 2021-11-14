<template>
<div class="col contents">
  <div class="row">
    <div class="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
      <h2 class="alert alert-dark text-center">ログイン</h2>
        <div class="d-flex justify-content-center">
          <table class="registForm">
            <tbody>
              <tr>
                <th>User</th>
                <td>
                  <input @blur="judgeName()" type="text" name="name" v-model="forms.name" class="form-control">
                </td>
              </tr>
              <tr v-if="errors.name.length > 0" class="error">
                <td></td>
                <td>
                  <ul>
                    <li v-for="(v, k) in errors.name" :key="k">{{ v }}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th class="must">パスワード</th>
                <td>
                  <input type="password" name="password" v-model="forms.password" @blur="judgePassword()" class="form-control">
                </td>
              </tr>
              <tr v-if="errors.password.length > 0" class="error">
                <td></td>
                <td>
                  <ul>
                    <li v-for="(v, k) in errors.password" :key="k">{{ v }}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td colspan="2" class="pt-4">
                  <button
                    @click="submit()"
                    class="btn btn-dark text-white d-block mx-auto px-5 py-2"
                    :disabled="disabledSubmit"
                    type="button">
                    ログインする
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="2" class="pt-4">
                  <button
                    @click="logout()"
                    class="btn btn-light d-block mx-auto px-5 py-2"
                    type="button">
                    ログアウトする
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
      title: "ログイン",
    }
  },
  data() {
    return {
      forms: {
        name: "",
        password: "",
      },
      errors: {
        name: [],
        password: [],
      },
      validations:{
        name: true,
        password: true,
      },
      notice: {
        must: "必須項目",
      },
      disabledSubmit: true,
    }
  },
  mounted(){
  },
  methods: {
    submit() {
      let ajaxUrl = process.env.apiUrl + '/api/login'
      let params = new URLSearchParams()
      params.append('name', this.forms.name)
      params.append('password', this.forms.password)
      const param = {
        method: "POST",
        body: params,
        mode: 'cors',
        headers: {
          'Access-Control-Request-Headers': 'origin, x-requested-with',
        },
      }
      fetch(ajaxUrl, param)
        .then( res => res.json() )
        .then(json => {
          if ( json ) {
            localStorage.setItem('pasumn_token', json)
            location.href = "/";
          }else{
            alert("ログインできませんでした");
          }
        })
        .catch(error => {
          alert(error + "\n送信失敗");
        });
    },
    logout(){
      localStorage.removeItem('pasumn_token')
      alert("ログアウトしました")
    },
    checkEmpty(e){
      return e === "" ? true : false
    },
    judgeName(){
      let vali = false
      const arr = []
      if (this.checkEmpty(this.forms.name)) {
        arr.push(this.notice.must)
        vali = true
      }
      this.errors.name = arr
      this.validations.name = vali
      this.judgeSubmit()
    },
    judgePassword(){
      let vali = false
      const arr = []
      if (this.checkEmpty(this.forms.password)) {
        arr.push(this.notice.must)
        vali = true
      }
      this.errors.id = arr
      this.validations.password = vali
      this.judgeSubmit()
    },
    judgeSubmit(){
      let res = false
      const validations = this.validations
      for (const e in validations) {
        if(validations[e]) res = true
      }
      const errors = this.errors
      for (const e in errors) {
        if(errors[e].length > 0) res = true
      }
      this.disabledSubmit = res
    },
  },
}
</script>

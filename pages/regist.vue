<template>
<div class="col contents">
  <div class="row">
    <div class="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
      <h2 class="alert alert-info text-center">登録</h2>
      <div class="d-flex justify-content-center">
        <table class="registForm">
          <tbody>
            <tr>
              <th>タイトル</th>
              <td>
                <input @blur="judgeTitle()" type="text" name="title" v-model="forms.title" class="form-control">
              </td>
            </tr>
            <tr v-if="errors.title.length > 0" class="error">
              <td></td>
              <td>
                <ul>
                  <li v-for="(v, k) in errors.title" :key="k">{{ v }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th class="must">アカウント</th>
              <td>
                <input @blur="judgeAccount()" type="text" name="account" v-model="forms.account" class="form-control">
              </td>
            </tr>
            <tr v-if="errors.account.length > 0" class="error">
              <td></td>
              <td>
                <ul>
                  <li v-for="(v, k) in errors.account" :key="k">{{ v }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th class="must">パスワード</th>
              <td>
                <input @blur="judgePassword()" type="text" name="password" v-model="forms.password" class="form-control">
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
              <th class="must">メールアドレス</th>
              <td>
                <input @blur="judgeMail()" type="email" name="mail" v-model="forms.mail" class="form-control">
              </td>
            </tr>
            <tr v-if="errors.mail.length > 0" class="error">
              <td></td>
              <td>
                <ul>
                  <li v-for="(v, k) in errors.mail" :key="k">{{ v }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <th class="must">メモ</th>
              <td>
                <textarea name="memo" v-model="forms.memo" cols="30" rows="10" class="form-control"></textarea>
              </td>
            </tr>
            <tr v-if="errors.memo.length > 0" class="error">
              <td></td>
              <td>
                <ul>
                  <li v-for="(v, k) in errors.memo" :key="k">{{ v }}</li>
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
                  登録する
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
      title: '登録',
    }
  },
  data() {
    return {
      forms: {
        title: "",
        account: "",
        password: "",
        mail: "",
        memo: "",
      },
      errors: {
        title: [],
        account: [],
        password: [],
        mail: [],
        memo: [],
      },
      validations:{
        title: true,
        account: true,
        password: true,
        mail: true,
        memo: false,
      },
      notice: {
        must: "必須項目",
        mail: "Eメールの形式ではないようです",
      },
      disabledSubmit: true,
      token: "",
    }
  },
  mounted(){
    this.setToken()
    this.auth()
    this.setPassword()
  },
  computed: {
  },
  methods: {
    submit() {
      let ajaxUrl = process.env.apiUrl + '/api/add'
      let params = new URLSearchParams()
      params.append('forms', JSON.stringify(this.forms))
      const param = {
        method: "POST",
        body: params,
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer ' + this.token,
        },
      }
      fetch(ajaxUrl, param)
        .then( res => res.json() )
        .then(json => {
          alert("登録成功！")
          location.href = "/";
        })
        .catch(error => {
          alert(error + "\n登録失敗")
        });
    },
    auth(){
      if (this.token === "") {
        location.href = "/login"
      }
      let ajaxUrl = process.env.apiUrl + '/api/authcheck';
      let params = new URLSearchParams();
      params.append('token', this.token);
      const param = {
        method: "POST",
        body: params,
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer ' + this.token,
        },
      }
      fetch(ajaxUrl, param)
        .then( res => res.json() )
        .then( json => {
        })
        .catch(error => {
          alert(error + "\nログインチェック失敗");
        });
    },
    setToken(){
      let token = localStorage.getItem("pasumn_token")
      this.token = token === null ? "" : token
    },
    setPassword(){
      if (this.$route.query.password) {
        this.forms.password = this.$route.query.password
      }
    },
    checkEmpty(e){
      return e === "" ? true : false
    },
    checkEmailFormat(e){
      if (e === "") {
        return false
      }
      return e.match(/.+@.+\..+/) ? false : true
    },
    judgeTitle(){
      let vali = false
      const arr = []
      if (this.checkEmpty(this.forms.title)) {
        arr.push(this.notice.must)
        vali = true
      }
      this.errors.title = arr
      this.validations.title = vali
      this.judgeSubmit()
    },
    judgeAccount(){
      let vali = false
      const arr = []
      if (this.checkEmpty(this.forms.account)) {
        arr.push(this.notice.must)
        vali = true
      }
      this.errors.account = arr
      this.validations.account = vali
      this.judgeSubmit()
    },
    judgePassword(){
      let vali = false
      const arr = []
      if (this.checkEmpty(this.forms.password)) {
        arr.push(this.notice.must)
        vali = true
      }
      this.errors.password = arr
      this.validations.password = vali
      this.judgeSubmit()
    },
    judgeMail(){
      let vali = false
      const arr = []
      if (this.checkEmailFormat(this.forms.mail)) {
        arr.push(this.notice.mail)
        vali = true
      }
      this.errors.mail = arr
      this.validations.mail = vali
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

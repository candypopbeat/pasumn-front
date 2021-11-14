<template>
<div class="col contents">
  <div class="row">
    <div class="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
      <h2 class="alert alert-success text-center">検索</h2>
      <div class="p-4">
        <input type="text" v-model="keyword" class="form-control">
      </div>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table searchList">
      <thead>
        <tr>
          <th>タイトル</th>
          <th>アカウント</th>
          <th>パスワード</th>
          <th>メール</th>
          <th>メモ</th>
          <th>登録日</th>
          <th>編集</th>
          <th>削除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(v, i) in filteredList" :key="i">
          <td @click="writeToClipboard(v.title)" class="hoverTd">{{ v.title }}</td>
          <td @click="writeToClipboard(v.account)" class="hoverTd">{{ v.account }}</td>
          <td @click="writeToClipboard(v.password)" class="hoverTd">{{ v.password }}</td>
          <td @click="writeToClipboard(v.mail)" class="hoverTd">{{ v.mail }}</td>
          <td @click="writeToClipboard(v.memo)" class="hoverTd" v-html="convertBr(v.memo)"></td>
          <td @click="writeToClipboard(v.created_at)" class="hoverTd">{{ convertDayTime(v.created_at) }}</td>
          <td>
            <button @click="edit(v.id)" data-bs-toggle="modal" data-bs-target="#editModal" class="btn btn-success">編集</button>
          </td>
          <td>
            <button @click="del(v.id)" class="btn btn-dark">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">編集</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <table class="registForm">
              <tbody>
                <tr>
                  <th>タイトル</th>
                  <td>
                    <input @blur="judgeTitle()" type="text" name="title" v-model="editItem.title" class="form-control">
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
                    <input @blur="judgeAccount()" type="text" name="account" v-model="editItem.account" class="form-control">
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
                    <input @blur="judgePassword()" type="text" name="password" v-model="editItem.password" class="form-control">
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
                    <input @blur="judgeMail()" type="email" name="mail" v-model="editItem.mail" class="form-control">
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
                    <textarea name="memo" v-model="editItem.memo" cols="30" rows="10" class="form-control"></textarea>
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
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="submitEdit()"
            class="btn btn-success text-white"
            :disabled="disabledSubmit"
            type="button">
            編集する
          </button>
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
        </div>
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
      titleTemplate: null,
      title: process.env.title,
    }
  },
  data() {
    return {
      items: [],
      keyword: "",
      resCount: "",
      token: "",
      editItem: {},
      errors: {
        title: [],
        account: [],
        password: [],
        mail: [],
        memo: [],
      },
      validations:{
        title: false,
        account: false,
        password: false,
        mail: false,
        memo: false,
      },
      notice: {
        must: "必須項目",
        mail: "Eメールの形式ではないようです",
      },
      disabledSubmit: false,
    }
  },
  mounted(){
    this.setToken()
    this.auth()
    this.setList()
  },
	computed: {
		filteredList(){
			let lists = [];
			let keyword = String(this.keyword)
			if (keyword.length > 0) {
				for(let v of this.items) {
          let str = String(v.title) + String(v.account) + String(v.password) + String(v.mail) + String(v.memo) + String(v.created_at)
					if(str.toLowerCase().indexOf(keyword) !== -1) {
						lists.push(v);
					}
				}
			}
			this.resCount = lists.length
			return lists;
		},
	},
  methods: {
    setList() {
      let ajaxUrl = process.env.apiUrl + '/api/list'
      let params = new URLSearchParams()
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
          let count = json.length
          if ( count > 0 ) {
            this.items = json
          }
        })
        .catch(error => {
          alert(error + "\nリスト取得失敗");
        });
    },
    auth(){
      if (this.token === "") {
        location.href = "/login";
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
    submitEdit() {
      let ajaxUrl = process.env.apiUrl + '/api/edit'
      let params = new URLSearchParams()
      params.append('editItem', JSON.stringify(this.editItem))
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
          alert("編集成功！")
          location.reload()
        })
        .catch(error => {
          alert(error + "\n編集失敗")
        });
    },
    del(id){
      let res = window.confirm('本当に削除してもよいですか？')
      if (res) {
        let ajaxUrl = process.env.apiUrl + '/api/del'
        let params = new URLSearchParams()
        params.append('id', id);
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
            alert("削除成功！")
            location.reload()
          })
          .catch(error => {
            alert(error + "\n削除失敗");
          });
      }
    },
    edit(id){
      this.items.filter( (item, key) => {
        if ( item.id === id ){
          this.editItem = this.items[key]
          return
        }
      })
    },
    writeToClipboard(word) {
      navigator.clipboard.writeText(word).catch((e) => {
        console.error(e)
      })
    },
    convertBr(str){
      return str.replace(/\r?\n/g, '<br>')
    },
    convertDayTime(dt){
      let date = dt.split("T")
      date = date[0] + " " + date[1].split(".")[0]
      return date
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
      if (this.checkEmpty(this.editItem.title)) {
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
      if (this.checkEmpty(this.editItem.account)) {
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
      if (this.checkEmpty(this.editItem.password)) {
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
      if (this.checkEmailFormat(this.editItem.mail)) {
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

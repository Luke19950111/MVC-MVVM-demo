fakeData()

function Model(options) {
  this.data = options.data
  this.resource = options.resoruce
}
Model.prototype.fetch = function (id) {
  return axios.get(`/${resource}s/${id}`).then((response) => {
    this.data = response.data
    return response
  })
}
Model.prototype.update = function (data) {
  let id = this.data.id
  return axios.put(`/${resource}s/${id}`, data).then((response) => {
    this.data = response.data
    return response
  })
}



/*上面是mvc类，下面是mvc对象*/

let model = new Model({
  data: {
    name: '',
    id: '',
    number: 0
  },
  resource: 'book'
})


let view = new Vue({
  el: '#app',
  data: {
    book: {
      name: '未命名',
      id: '',
      number: 0
    },
    n: 1
  },
  template: `
    <div>
      书名：《{{book.name}}》
      数量：<span id='number'>{{book.number}}</span>
    </div>
    <div>
      <input v-model="n"/> //双向绑定
      N的值是{{n}}
    </div>
    <div>
      <button v-on:click="addOne">加N</button>
      <button v-on:click="subtract">减N</button>
      <button v-on:click="reset">归零</button>
    </div>
  `,
  created() {
    model.fetch(1)
      .then(() => {
        this.book = model.data
      })
  },
  methods: {
    addOne() {
      model.update({ number: this.book.number + (this.n-0) })
        .then(() => {
          this.book = model.data
        })
    },
    subtract() {
      model.update({ number: this.book.number - (this.n-0) })
        .then(() => {
          this.book = model.data
        })
    },
    reset() {
      model.update({ number: 0 })
        .then(() => {
          this.book = model.data
        })
    }

  }
})










function fakeData() {
  var book = {
    name: 'JavaScript高级程序设计',
    number: 1,
    id: 1
  }
  axios.interceptors.response.use(function (response) {
    let { config: { method, url, data } } = response
    if (url === '/books/1' && method === 'get') {
      response.data = book
    } else if (url === '/books/1' && method === 'put') {
      data = JSON.parse(data) //请求体的第四部分是字符串
      Object.assign(book, data)
      response.data = book
    }
    return response
  })
}

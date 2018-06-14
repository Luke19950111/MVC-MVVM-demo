fakeData()

let model = {
  data: {
    name: '',
    id: '',
    number: 0
  },
  fetch(id) {
    return axios.get(`/books/${id}`).then((response) => {
      this.data = response.data
      return response
    })
  },
  update(data) {
    let id = this.data.id
    return axios.put(`/books/${id}`, data).then((response) => {
      this.data = response.data
      return response
    })
  }
}

let view = {
  el: '#app',
  template: `
    <div>
      书名：《__name__》
      数量：<span id='number'>__number__</span>
    </div>
    <div>
      <button id='addOne'>加1</button>
      <button id="subtract">减1</button>
      <button id="reset">归零</button>
    </div>
  `,
  render(data) {
    let html = this.template.replace('__name__', data.name)
      .replace('__number__', data.number)
    $(this.el).html(html)
  }
}

let controller = {
  init(options) {
    this.model = options.model
    this.view = options.view
    this.view.render(this.model.data)
    this.bindEvents()
    this.model.fetch(1)
      .then(() => {
        view.render(model.data) //model.data和response.data是一样的
      })
  }

  addOne() {
    var oldNumber = $('#number').text()
    var newNumber = oldNumber - 0 + 1
    this.model.update({ number: newNumber })
      .then(() => {
        this.view.render(this.model.data)
      })
  }
  subtract() {
    var oldNumber = $('#number').text()
    var newNumber = oldNumber - 0 - 1
    this.model.update({ number: newNumber })
      .then(() => {
        this.view.render(this.model.data)
      })
  }
  reset() {
    this.model.update({ number: 0 })
      .then(() => {
        this.view.render(this.model.data)
      })
  }

  bindEvents() {
    $(this.view.el).on('click', '#addOne', this.addOne.bind(this))
    $(this.view.el).on('click', '#subtract', this.subtract.bind(this))
    $(this.view.el).on('click', '#reset', this.reset.bind(this))
  }
}
controller.init({model: model, view: view})







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

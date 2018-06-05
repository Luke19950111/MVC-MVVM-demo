fakeData()

let model = {
  data: {
    name: '',
    id: '',
    number: 0
  },
  fetch(id){
    return axios.get(`/book/${id}`).then((response)=>{
      this.data = response.data
      return response
    })
  },
  update(id, data){
    return axios.put(`/book/${id}`, data).then( (response)=>{
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
  render(data){
    let html = this.template.replace('__name__', data.name)
      .replace('__number__', data.number)
    $(this.el).html(html)
  }  
}

model.fetch(1)
  .then( ({data}) => { //这个data是response.data
  view.render(model.data) //model.data和response.data是一样的
})


$('#app').on('click','#addOne', function(){
  var oldNumber = $('#number').text()
  var newNumber = oldNumber - 0 + 1
  model.update({number: newNumber})
    .then( ()=>{
    view.render(model.data)
  })
})
$('#app').on('click', '#subtract', function(){
  var oldNumber = $('#number').text()
  var newNumber = oldNumber - 0 - 1
   model.update({number: newNumber})
     .then( ()=>{
    view.render(model.data)
  })
})
$('#app').on('click', '#reset', function(){
   model.update({number: 0})
     .then( ()=>{
    view.render(model.data)
  })
})


function fakeData(){
  var book = {
    name: 'JavaScript高级程序设计',
    number: 1,
    id: 1
  }
  axios.interceptors.response.use(function(response){
    let{config:{method,url,data}} = response
    if(url==='/book/1' && method === 'get'){
      response.data = book
    }else if(url==='/book/1' && method ==='put'){
      Object.assign(book, data)
      response.data = book
    }
    return response
  })
}

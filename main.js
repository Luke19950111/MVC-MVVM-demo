var book = {
    name: 'JavaScript高级程序设计',
    number: 1,
    id: 1
}
axios.interceptors.response.use(function (response) {
    let { config: { method, url, data } } = response
    if (url === '/book/1' && method === 'get') {
        response.data = book
    } else if (url === '/book/1' && method === 'put') {
        Object.assign(book, data)
        response.data = book
    }
    return response
})
/*上面是假的后台*/ 


axios.get('/book/1').then(({ data }) => {
    var originalHtml = $('#app').html()
    var newHtml = originalHtml.replace('__name__', data.name)
        .replace('__number__', data.number)
    $('#app').html(newHtml)
})


$('#app').on('click', '#addOne', function () {
    var oldNumber = $('#number').text()
    var newNumber = oldNumber - 0 + 1
    axios.put('/book/1', {
        number: newNumber
    }).then(() => {
        $('#number').text(newNumber)
    })
})
$('#app').on('click', '#subtract', function () {
    var oldNumber = $('#number').text()
    var newNumber = oldNumber - 0 - 1
    axios.put('/book/1', {
        number: newNumber
    }).then(() => {
        $('#number').text(newNumber)
    })
})
$('#app').on('click', '#reset', function () {
    axios.put('/book/1', {
        number: 0
    }).then(() => {
        $('#number').text(0)
    })
})
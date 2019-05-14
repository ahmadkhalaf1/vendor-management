const http = require('http')
const fs = require('fs')

const api = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  if (req.url === '/houses') {
    res.setHeader('Content-Type', 'application/json')

    setTimeout(() => {
      fs.readFile(__dirname + '/fixtures/houses.json', (err, data) => {
        res.end(data)
      })
    }, 2000)
  } else {
    res.end('Only /houses will return anything')
  }
})

api.listen(1337, () => console.log('API running on http://localhost:1337\nCtrl+C to exit'))

const express = require ('express')
const path = require ('path')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'../index.html'))
})



app.listen(port, () => console.log(`Server is running on ${port}`));
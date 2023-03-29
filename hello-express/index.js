const express = require(`express`);

let app = express();

const PORT = 5000;

process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Port:",PORT)
})

app.get('/', (req, res) => {
    // res.send("Hello, home!")
    res.send("<h1>Hello, <b>WORLD</b>!</h1>")
})
app.get('/:key', (req, res) => {
    console.log(req.params)
})

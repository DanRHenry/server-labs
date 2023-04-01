const express = require(`express`);

let app = express();

const PORT = 5000;

process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Port:",PORT)
})

app.get('/', (req, res) => {
    // res.send("Hello, home!")
    // res.send("<h1>Hello, <b>WORLD</b>!</h1>")
    res.sendFile(__dirname + "/public/index.html")
})

// app.get('/', (req, res) => {
//     // res.send("Hello, home!")
//     // res.send("<h1>Hello, <b>WORLD</b>!</h1>")
//     res.sendFile(__dirname + "/public/bio.html")
// })

// app.get('/', (req, res) => {
//     // res.send("Hello, home!")
//     // res.send("<h1>Hello, <b>WORLD</b>!</h1>")
//     res.sendFile(__dirname + "/public/projects.html")
// })


app.use(express.static("public"))

app.get('/:page', (req, res) => {
    // console.log(req.params)
    /* 
     Set up GET routes in your server.js and send your new HTML files as response.
    */
    try {
        let { page } = req.params;
        // let results = db.filter((i) => i.id == id);
        res.status(200).json( {
            status: `Found item at page: ${page}`
            
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

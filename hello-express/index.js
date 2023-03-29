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

//! Need help with this section.
app.get('/:page', (req, res) => {
    // console.log(req.params)

    /* 
    Set up request params
 Servers can also utilize params passed in the URL.
app.get('/:key', (request,response)=>{
  console.log(request.params)
})

 Try visiting an address that does not have a route associated with it and see what prints to the terminal.
Utilize request params
 Create a new route with a request param of :page. Utilize this to dynamically inform the user of which page they are on instead of hardcoding near-identical responses as you did previously.
Review
In this lab, you set up a basic server that sends different HTML as a response, dependent upon the URL in the browser.

The software should:

Print a listening message to the terminal.
Serve different pieces of HTML dependent upon the localhost:5000 route in the browser.
Going Further
Using conditional logic within your :page route, send differently styled HTML responses dependent on the value of :page.
How could you utilize request params to retrieve information from the user to display on another page? Utilizing server-side rendering, set up a form that takes in a user's name. This name should then be passed in the URL to another page and used to greet the user there.
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

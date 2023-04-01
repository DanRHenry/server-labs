const express = require("express")

const app = express();
const PORT = 3500;

app.listen(PORT, () => {

})

app.use(express.urlencoded({extended: true}));

app.get('/first-word', (req, res) => {
    res. 
})
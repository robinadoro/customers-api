const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

const port = process.env.PORT || 3000;

const clients = JSON.parse(fs.readFileSync("./clients.json"));

app.get("/", (req, res)=>{
    res.send(clients);
});

app.get("/customers/:id", (req, res)=>{
    let id = req.params.id;
    let client = clients.filter((e)=>{
        return e.id == id;
    });
    res.send(client);
});

app.post("/customers/create", (req, res)=>{
    let client = req.body;
    console.table(client);
    clients.push(client);
    fs.writeFileSync("./clients.json", JSON.stringify(clients));
    res.send(client);
});

app.delete("/customers/:id", (req, res)=>{
    let id = req.params.id;
    let new_clients = clients.filter((e)=>{
        return e.id != id;
    });
    fs.writeFileSync("./clients.json", JSON.stringify(new_clients));
    res.send(new_clients);
});


app.listen(port, ()=>{
    console.log("Server running on port " + port);
});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

let items = [];
let id = 0;

app.get('/api/items', (req, res) => {
    res.send(items);
});

app.post('/api/items', (req, res) => {
    id = id + 1;

    console.log("In Post");
    console.log(req);
    console.log(req.body);

    let item = {
        id: id,
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        contributor: req.body.contributor,
        completed: req.body.completed
    };
    items.push(item);
    res.send(item);
});

app.put('/api/items/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let itemsMap = items.map(item => {
        return item.id;
    });
    let index = itemsMap.indexOf(id);
    if (index === -1) {
        res.status(404)
            .send("Sorry, that item doesn't exist");
        return;
    }
    let item = items[index];
    item.name = req.body.name;
    item.completed = req.body.completed;
    res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let removeIndex = items.map(item => {
            return item.id;
        })
        .indexOf(id);
    if (removeIndex === -1) {
        res.status(404)
            .send("Sorry, that item doesn't exist");
        return;
    }
    items.splice(removeIndex, 1);
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
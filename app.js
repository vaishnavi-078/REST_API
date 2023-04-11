const express = require('express');
let users = require('./users')

const app = express();
app.use(express.json());

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.post('/api/users', (req, res) => {
    const user = {
        id: users.users.length + 1,
        name: req.body.name,
        branch: req.body.branch,
        phone: req.body.phone

    }
    users.users.push(user);
    res.json(user)
})
app.patch('/api/users/:id', (req, res) => {
    const user = users.users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send(`no user exist with given id ${req.params.id}`)
    }
    if(req.body.name != null){
    user.name = req.body.name;
    }
    if(req.body.branch != null){
    user.branch = req.body.branch;
    }
    if(req.body.phone != null){
    user.phone = req.body.phone;
    }
    res.json(user);
})
app.delete('/api/users/:id', (req, res) => {
    const user = users.users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send(`no user exist with given id ${req.params.id}`)
    }
    let index = users.users.indexOf(user);
    users.users.splice(index, 1)
    res.json(user);
})
app.listen(9999, () => console.log("Server Started . . ..  "))
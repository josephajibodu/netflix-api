
const express = require('express');
const router = express.Router();
const Database = require('../../database/db')
const  { ObjectId } = require('mongodb')


// User Schema
// - email
// - full name
// - dob
// - gender

router.get('/', async function (req, res) {
    const db = await Database.getDB();
    const users = await db.collection('users').find({}).toArray();

    res.send(users)
});

router.get('/:id', async function (req, res) {
    const db = await Database.getDB();

    if (! ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid User Id')
    }

    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id)});

    if (! user) {
        return res.status(404).send('User not found')
    }

    res.send(user)
});

router.post('/', async function (req, res) {
    const db = await Database.getDB();

    const data = req.body;

    const user = await db.collection('users').findOne({ email: data.email });

    if (user) {
        return res.status(400).send('User with the same email already exist')
    }

    const newUser = await db.collection('users').insertOne(data);

    res.status(201).send({_id: newUser.insertedId, ...data })
});

router.put('/:id', async function (req, res) {
    const db = await Database.getDB();

    const data = req.body;

    if (! ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid User Id')
    }

    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });

    if (! user) {
        return res.status(404).send('User not found')
    }

    const updatedData = await db.collection('users').replaceOne({ _id: new ObjectId(req.params.id) }, data)

    res.send({_id: req.params.id, ...data })
});

router.delete('/:id', async function (req, res) {
    const db = await Database.getDB();

    const data = req.body;

    if (! ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid User Id')
    }

    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });

    if (! user) {
        return res.status(404).send('User not found')
    }

    await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) })

    res.status(204).send('User deleted')
});

module.exports = router;
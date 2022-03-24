const express = require('express')
const User = require('../models/user')
const Auth = require('../middleware/auth')

const router = new express.Router()

// Get all users
router.get('/users', async(req, res) => {
    try {
        const users = await user.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get users by id
router.get('/users:id', async(req, res) => {
    try {
        const users = await user.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

//signup
// this route is to /users
router.post('/', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//logout
// to logout use route /users/logout
router.post('/logout', Auth, async (req, res) => {
   
    try {
       req.user.tokens =  req.user.tokens.filter((token) => {
            return token.token !== req.token 
        })

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
    return alert('Logged out')
})

//Logout All 
// admin logoutAll route /users/logoutAll
router.post('/logoutAll', Auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()        
    }

})
module.exports = router
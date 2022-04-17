const express = require("express")
const router = express.Router()
const Subscriber = require("../models/subscriber")


// get all
router.get("/", async (req, res) => {
    try {
        const subscriber = await Subscriber.find()
        res.json(subscriber)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// get one
router.get("/:id", (req, res) => {
    res.send(req.params.id)
})
// create one 
router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChanel: req.body.subscribedToChanel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).send(newSubscriber)
    } catch (err) {
        res.status(400).json({ messgae: err.message })
    }
})
// update one
router.patch("/:id", (req, res) => {
    
})
// delete one
router.delete("/:id", (req, res) => {
    
})

module.exports = router
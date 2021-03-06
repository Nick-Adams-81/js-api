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
router.get("/:id", getSubs, (req, res) => {
    res.json(res.subscriber)
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
        res.status(400).json({ message: err.message })
    }
})
// update one
router.patch("/:id", getSubs, async (req, res) => {
    if(req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChanel != null) {
        res.subscriber.subscribedToChanel = req.body.subsscribedToChanel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})
// delete one
router.delete("/:id", getSubs, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: "Deleted sub" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSubs(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null) {
            return res.status(404).json({ message: "Cannot find sub!" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router
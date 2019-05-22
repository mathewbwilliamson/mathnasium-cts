const phone  = require('phone')
const express = require('express')
const router = express.Router()

// [matt] below will not work because server isn't running for this file
// [matt] Once this is in the project on the server, we can use .env
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken);

router.post('/', (req, res, next) => {
    // Remember that we can't send a message to a phone number that is not verified when on a trial account
    const { message, toPhoneNumber = '+19415876572', fromPhoneNumber = '+18132957463' } = req.body
    const cleanedToPhoneNumber = phone(toPhoneNumber, 'USA')
    const cleanedFromPhoneNumber = phone(fromPhoneNumber, 'USA')

    if (cleanedToPhoneNumber.length === 0) {
        const err = new Error('Phone number is invalid')
        err.statusCode = 405
        next(err)
        return err
    }

    // [matt]: Eventually need to change the From number once there are multiple accounts

    client.messages
        .create({
            body: message,
            from: '+18132957463',
            to: cleanedToPhoneNumber[0]
        })
        .then(message => res.json(message.sid))
        .catch(err => next(err))
})

module.exports = router
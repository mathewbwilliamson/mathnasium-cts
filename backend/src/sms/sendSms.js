const phone  = require('phone');

// [matt] below will not work because server isn't running for this file
// [matt] Once this is in the project on the server, we can use .env
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
// console.log('[matt] acco', accountSid)
// console.log('[matt] authToken', authToken)

// const accountSid = "AC6ce79f75d846e5e39e0edfc1f8b98648"
// const authToken = "7ee7cbbf30abb8b3f192880e127cd2bf"

const client = require('twilio')(accountSid, authToken);

const sendATextMessage = (req, res, next) => {
    // Remember that we can't send a message to a phone number that is not verified when on a trial account
    console.log('[matt] req', req)
    const { toPhoneNumber = '+19415876572', fromPhoneNumber = '+18132957463' } = req
    // [matt] For now, we'll only support valid US and Canadian phone numbers
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
            body: req.message,
            from: '+18132957463',
            to: cleanedToPhoneNumber[0]
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log('Error was ', err))
    res.status(200).send({
        success: 'true',
        message: 'Text Message sent successfully'
        })
}

exports.sendATextMessage = sendATextMessage
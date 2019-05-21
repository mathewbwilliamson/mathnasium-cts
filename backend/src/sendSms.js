// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console

// [matt] below will not work because server isn't running for this file
// [matt] Once this is in the project on the server, we can use .env
// const accountSid = process.env.TWILIO_ACCOUNT_SID
// const authToken = process.env.TWILIO_AUTH_TOKEN
// console.log('[matt] acco', accountSid)
// console.log('[matt] authToken', authToken)

const accountSid = "AC6ce79f75d846e5e39e0edfc1f8b98648"
const authToken = "7ee7cbbf30abb8b3f192880e127cd2bf"

const client = require('twilio')(accountSid, authToken);

// Remember that we can't send a message to a phone number that is not verified when on a trial account
client.messages
  .create({
     body: 'This text is from an automated program that I am building. WOO TEXTING JULIE AND AUTUMN',
     from: '+18132957463',
     to: '+19415876572'
   })
  .then(message => console.log(message.sid))
  .catch(err => console.log('Error was ', err))

const cookieParser = require('cookie-parser');
require('dotenv').config({ path: 'variables.env'})
const createServer = require('./createServer')
const db = require('./db')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const MessagingResponse = require('twilio').twiml.MessagingResponse
const bodyParser = require('body-parser')
const sendATextRouter = require('./sms/sendSms')
const server = createServer()

server.express.use(cors())

// Parses the cookie from the string into an object
server.express.use(cookieParser())

// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    
    if (token) {
      const { userId } = jwt.verify(token, process.env.APP_SECRET)
      
      // put the userId onto the req for future requests to access
      req.userId = userId;
    }
    next();
  })

// 2. Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // If they aren't logged in, skip this
  if (!req.userId) return next()
  const user = await db.query.user(
    { where: { id: req.userId }},
    '{ id, permissions, email, name }'
    )
  req.user = user
  next()
})

// Must use this to access req.body in SMS call
server.express.use(bodyParser.json());
server.express.use(bodyParser.urlencoded({extended: false}));

server.express.post('/sms', (req, res, next) => {
  // [matt]: https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js
  // When a message comes in to the server, this Messaging Response sends this message in return
  const twiml = new MessagingResponse();
  console.log('[matt] req.body', req.body)
  // [matt]: As we start adding phone numbers, we'll have to build a switch block or something for finding
  // [matt]:   the TO, matching the phone number in a file, then directing the message appropriately

  if (req.body.Body.toLowerCase() === 'moo') {
    twiml.message('You are a cow!')
  } else {
    twiml.message('The Robots are coming! Head for the hills!');
  }

  
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

server.express.use('/sendsms', sendATextRouter)

server.express.post('/', (error, req, res, next) => {
  console.log('[matt] error', error)
  
})

server.start({
    
}, details => {
console.log(`Server is starting on port http://localhost:${details.port}`)
})
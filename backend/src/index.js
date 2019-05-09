const cookieParser = require('cookie-parser');
require('dotenv').config({ path: 'variables.env'})
const createServer = require('./createServer')
const db = require('./db')
const jwt = require('jsonwebtoken');

const server = createServer()

// TODO Use express middleware to handle cookies JWT
// Parses the cookie from the string into an object
server.express.use(cookieParser())
// TODO Use express middleware to populate current user

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

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
}, details => {
console.log(`Server is starting on port http://localhost:${details.port}`)
})
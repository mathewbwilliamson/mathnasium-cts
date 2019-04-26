const cookieParser = require('cookie-parser')
require('dotenv').config({ path: 'variables.env'})
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

// TODO Use express middleware to handle cookies JWT
// Parses the cookie from the string into an object
server.express.use(cookieParser())
// TODO Use express middleware to populate current user

// Decode the JWT so that we can get the UserID on each request
server.express.use((req, res, next) => {
    console.log('[matt] HEY i"M middle ware')
    const { token } = req.cookies
    console.log('[matt] token', token)
    

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
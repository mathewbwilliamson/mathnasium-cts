const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Mutation = {
    // User Mutations
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase()
        //hash their password
        const password = await bcrypt.hash(args.password, 10)
        // Create the user in the database
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: { set: ['USER'] }
            }
        }, info)
        // Create the JWT token for them so they can stay logged in
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
        
        // We set the jwt as a cookie on the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        })
        // Finally we return the user to the browser
        return user
    },

    async signin(parent, {email, password}, ctx, info) {
        // 1. Check if there is a user with that email
        const user = await ctx.db.query.user({ where: { email }})
        if (!user) {
            throw new Error(`No such user found for email ${email}`)
        }
        // 2. Check if their password is correct
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            throw new Error('Invalid password!')
        }
        // 3. Generate the JWT token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
        // 4. Set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365
        })
        // 5. Return the user
        return user
    },

    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token')
        return { message: 'Goodbye!'}
    },
    
    // Lead Mutations
    async createLead(parent, args, ctx, info) {
        // TODO: Check if they are logged in
        // context is defined in createServer
        // Because of context, the primsa server is exposed to us from prisma.graphql
        // Look up "type Mutation" in prisma.graphql
        const lead = await ctx.db.mutation.createLead({
            data: {
                ...args
            }
        }, info)

        return lead
    },

    async updateLead(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = {...args}
        // remove the ID from the updates
        delete updates.id
        // run the update method
        
        return ctx.db.mutation.updateLead({
            data: updates, // data that it's looking at updating
            where: { // Where the data is found
                id: args.id,
            }
        }, info) // This is what the query returns
    },

    async createLeadChild(parent, args, ctx, info) {
        // TODO: Check if they are logged in
        // context is defined in createServer
        // Because of context, the primsa server is exposed to us from prisma.graphql
        // Look up "type Mutation" in prisma.graphql
        const leadChild = await ctx.db.mutation.createLeadChild({
            data: {
                ...args
            }
        }, info)

        return leadChild
    },

    
    //Event Mutations
    async createEvent(parent, args, ctx, info) {
        // TODO: Check if they are logged in
        // context is defined in createServer
        // Because of context, the primsa server is exposed to us from prisma.graphql
        // Look up "type Mutation" in prisma.graphql
        const event = await ctx.db.mutation.createEvent({
            data: {
                ...args
            }
        }, info)

        return event
    },

    async updateEvent(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = {...args}
        // remove the ID from the updates
        delete updates.id
        // run the update method
        
        return ctx.db.mutation.updateEvent({
            data: updates, // data that it's looking at updating
            where: { // Where the data is found
                id: args.id,
            }
        }, info) // This is what the query returns
    },
    
    async deleteEvent(parent, args, ctx, info) {
        // TODO: Check if they are logged in
        // context is defined in createServer
        // Because of context, the primsa server is exposed to us from prisma.graphql
        // Look up "type Mutation" in prisma.graphql
        const event = await ctx.db.mutation.deleteEvent({
            data: {
                ...args
            }
        }, info)

        return event
    },
    
};

module.exports = Mutation;

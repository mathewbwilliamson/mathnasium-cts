const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')
const { transport, makeANiceEmail } = require('../mail')

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

    async requestReset(parent, args, ctx, info) {
        // 1. Check if this is a real user
        const user = await ctx.db.query.user({ where: { email: args.email}})
        if (!user) {
            throw new Error(`No such user found for email ${args.email}`)
        }
        // 2. Set a reset token and expiry on that User
        const randomBytesPromisified = promisify(randomBytes)
        const resetToken = (await randomBytesPromisified(20)).toString('hex')
        const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now
        const res = await ctx.db.mutation.updateUser({
            where: { email: args.email },
            data: { resetToken, resetTokenExpiry}
        })
        
        // 3. Email them that reset token
        const mailRes = await transport.sendMail({
            from: 'slidergs@gmail.com',
            to: user.email,
            subject: 'Your Password Reset Email',
            html: makeANiceEmail(`Your password reset token is here!
                \n\n
                <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
                Click Here to Reset</a>
            `)
        })

        return { message: 'Thanks!' }
    },

    async resetPassword(parent, args, ctx, info) {
        //1. Check if the passwords match
        if (args.password !== args.confirmPassword) {
            throw new Error('Your passwords do not match!')
        }
        //2. Check if it's a legit reset token
        //3. Check if it's expired
        console.log('[matt] ctx.db.query', ctx.db.query)
        
        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000,
            }
        })
        if (!user) {
            throw new Error('The reset token is either invalid or expired!')
        }
        //4. Hash their new password
        const password = await bcrypt.hash(args.password, 10)

        //5. Save the new password to the User and remove old resetToken fields
        const updatedUser = await ctx.db.mutation.updateUser({
            where: {email: user.email},
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null
            }
        })
        //6. Generate JWT
        const token = jwt.sign({ userId: updatedUser.id}, process.env.APP_SECRET)

        //7. Set the JWT cookie
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365
        })

        //8. Return the new User
        return updatedUser
    },
    
    // Lead Mutations
    async createLead(parent, args, ctx, info) {
        // TODO: Check if they are logged in
        if(!ctx.request.userId) {
            throw new Error('You must be logged in to do that!')
        }
        // context is defined in createServer
        // Because of context, the primsa server is exposed to us from prisma.graphql
        // Look up "type Mutation" in prisma.graphql
        const lead = await ctx.db.mutation.createLead({
            data: {
                // [Note] this is how we create a relationship between the Lead and the User
                user: {
                    connect: {
                        id: ctx.request.userId
                    }
                },
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

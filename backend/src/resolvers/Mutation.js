// Procedure to Add a Mutation or Query
// 1. 

const Mutation = {
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

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
        console.log('[matt] args', args)

        return lead
    }
    
};

module.exports = Mutation;

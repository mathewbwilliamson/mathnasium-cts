const { forwardTo } = require('prisma-binding')

const Query = {
    leads: forwardTo('db'),
    lead: forwardTo('db'),
    leadChildren: forwardTo('db'),
    events: forwardTo('db'),
    event: forwardTo('db')


    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items()
    //     return items
    // }
    // async leads(parent, args, ctx, info) {
    //     const items = await ctx.db.query.leads()
    //     return items
    // }
};

module.exports = Query;

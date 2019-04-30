const { forwardTo } = require('prisma-binding')

const Query = {
    leads: forwardTo('db'),
    lead: forwardTo('db'),
    leadChildren: forwardTo('db'),
    events: forwardTo('db'),
    event: forwardTo('db'),
    me(parent, args, ctx, info) {
        // check if there is a current user ID        
        if (!ctx.request.userId) {
          return null;
        }
        
        return ctx.db.query.user(
          {
            where: { id: ctx.request.userId },
          },
          info
        );
      },
};

module.exports = Query;

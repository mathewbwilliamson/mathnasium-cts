const { forwardTo } = require('prisma-binding')
const { hasPermission } = require('../utils')

const Query = {  
    leads: forwardTo('db'),
    lead: forwardTo('db'),
    leadChildren: forwardTo('db'),
    events: forwardTo('db'),
    event: forwardTo('db'),
    users: forwardTo('db'),
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
    async users(parent, args, ctx, info) {
      // 1. Check if they are logged in
      if (!ctx.request.userId) {
        throw new Error('You must be logged in!')
      }
      // 2. Check if the user has the permissions to query all the users
      hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
      // 3. If they do, query all the users
      return ctx.db.query.users({}, info)
    }
};

module.exports = Query;

# How to Authenticate routes

To enforce a logged in authenticated user:

**HTML Routes:** Add the `withAuth` middleware method

```js
// Import the middleware from utils
const { withAuth } = require('../utils/auth');

// Add the middleware to the route
router.get('/my/route', withAuth, (req, res) => { });
```

**API Routes:** Add the `withAuthJson` middleware method

```js
// Import the middleware from utils
const { withAuthJson } = require('../utils/auth');

// Add the middleware to the route
router.get('/api/my/route', withAuthJson, (req, res) => { });
```

## Space Membership Addons

To assist with validating a user's membership, in addition to being logged in, helper methods can be added to the middleware chain before the appropriate authentication method chosen from above.

**!!IMPORTANT!!** Space helper methods depend on detecting the space context from the route param `:space_id`. That param must be present in the route for a Membership addon method work.

### withApprovedMembership

Enforces that a user requesting a route is an approved member of the space.
- **withAuth:** Failed validation redirects the user to the space access page `/space/:space_id/access`
- **withAuthJson:** Failed validation returns the message `You are not an approved member of this space.`
```js
// Import the middleware from utils
const { withApprovedMembership, withAuth } = require('../utils/auth');

// Add the middleware to the route
router.get('/space/:space_id', withApprovedMembership, withAuth, (req, res) => { });
```
### withNoMembership

Enforces that a user requesting a route is NOT an already approved member.
- **withAuth:** Failed validation redirects the user to the space `/space/:space_id`
- **withAuthJson:** Failed validation returns the message `You are already an approved member of this space.`
```js
// Import the middleware from utils
const { withNoMembership, withAuth } = require('../utils/auth');

// Add the middleware to the route
router.get('/space/:space_id/access', withNoMembership, withAuth, (req, res) => { });
```
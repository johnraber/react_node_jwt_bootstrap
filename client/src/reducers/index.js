import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
// import { users } from './users.reducer';
import { alert } from './alert.reducer';

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const rootReducer = combineReducers({
  authentication,
  registration,
//  users,
  alert,
  // TOOD verify this key shouldn't be 'router' instead of the existing 'routing'
  routing: routerReducer
});

export default rootReducer;


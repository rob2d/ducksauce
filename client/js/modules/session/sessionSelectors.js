import { createSelector } from 'reselect'

const getLoggedInUser = ({ users, session }) => {
    console.log('session ->', session)
    return users.userMap.get(session.username);
};

export const loggedInUserSelector = createSelector(
    [ getLoggedInUser ], 
    loggedInUser => loggedInUser
);

export default {
    loggedInUserSelector
}

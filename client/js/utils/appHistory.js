import createBrowserHistory from 'history/createBrowserHistory'

const appHistory = createBrowserHistory();

/**
 * Simpler method for pushing new
 * URL onto browser history (also
 * lets us inject middleware in regards
 * to query params e.g. language if we
 * wanted to)
 */
appHistory.goTo = function(url) {
    appHistory.push({ pathname : url });
};

export default appHistory
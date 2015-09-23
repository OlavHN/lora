import createBrowserHistory from 'history/lib/createBrowserHistory';

export const history = createBrowserHistory();
export default function(link) { history.replaceState(null, link) };

export const composeTweet = (params) => {
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return `https://twitter.com/intent/tweet?${queryString}`;
}

export const hashtags = (event_category) => {
    return `EventsOnTixHive,${event_category.replaceAll(" ", "")
        .toUpperCase()}`;
}
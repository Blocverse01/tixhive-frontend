export const composeTweet = (params) => {
    let queryString = serialize_params(params);
    return `https://twitter.com/intent/tweet?${queryString}`;
}

export const hashtags = (event_category) => {
    return `EventsOnTixHive,${event_category.replaceAll(" ", "")
        .toUpperCase()}`;
}

export const composeLinkedInArticle = (params) => {
    let queryString = serialize_params(params);
    return `https://www.linkedin.com/shareArticle?mini=true&${queryString}&source=TixHive`;
}

export const composeFacebookShare = (params) => {
    let queryString = serialize_params(params);
    return `https://www.facebook.com/sharer/sharer.php?${queryString}`;
}

export const composeWhatsappShare = (params) => {
    let queryString = serialize_params(params);
    return `whatsapp://send?${queryString}`;
}

export const composeTelegramShare = (params) => {
    let queryString = serialize_params(params);
    return `https://t.me/share/url?${queryString}`;
}

const serialize_params = (params) => {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
} 
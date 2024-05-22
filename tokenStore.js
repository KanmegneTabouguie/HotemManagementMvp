// tokenStore.js
const invalidatedTokens = new Set();

const addToken = (token) => {
    invalidatedTokens.add(token);
};

const isTokenInvalidated = (token) => {
    return invalidatedTokens.has(token);
};

module.exports = {
    addToken,
    isTokenInvalidated
};

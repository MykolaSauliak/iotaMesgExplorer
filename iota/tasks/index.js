const sendMessage = require('./sendMessage');
const sendTransaction = require('./sendTransaction');
const readMessage = require('./readMessage');

module.exports = {
    sendTransaction: sendTransaction,
    sendMessage: sendMessage,
    readMessage: readMessage
};

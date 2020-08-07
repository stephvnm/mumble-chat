const moment = require('moment');

function formatMessage(username, text) {
  return {
    username, 
    text,
    timestamp: moment().format('hh:mm')
  }
}

module.exports = formatMessage;
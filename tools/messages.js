const moment = require('moment');

function formatMessage(username, text) {
  let time = moment.local();
  return {
    username, 
    text,
    timestamp: time.format('hh:mm')
  }
}

module.exports = formatMessage;
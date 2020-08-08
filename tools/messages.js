const moment = require('moment');

function formatMessage(username, text) {
  moment.locale();
  return {
    username, 
    text,
    timestamp: moment().format('hh:mm')
  }
}

module.exports = formatMessage;
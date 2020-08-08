const moment = require('moment');

function formatMessage(username, text) {
  moment.locale('bg');
  return {
    username, 
    text,
    timestamp: moment().format('LT')
  }
}

module.exports = formatMessage;
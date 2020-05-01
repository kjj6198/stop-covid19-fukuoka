// https://developers.whatismybrowser.com/useragents/explore/software_type_specific/crawler/

const botList = [
  'GoogleImageProxy',
  'Googlebot',
  'facebookexternalhit',
  'facebot',
  'Slackbot',
  'Discordbot',
  'TelegramBot',
  'TwitterBot',
  'line-poker',
];

module.exports = new RegExp(botList.join('|'), 'i');

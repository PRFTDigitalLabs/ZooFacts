'use strict';

const DEV = process.env.NODE_ENV !== 'production';

const contentful = require('contentful')
const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.CDA_TOKEN
});

var languageStrings="";

if (DEV) {
  client.getEntries({'sys.id': process.env.ROOT_ENTRY, 'include': 2}).then((response) => {
    languageStrings = response.items[0].fields;
    console.log(JSON.stringify(languageStrings, null, 4));
  })
}

const Alexa = require('alexa-sdk');

const handlers = {
  'LaunchRequest': function() {
    this.emit('GetFact');
  },
  'GetNewFactIntent': function() {
    this.emit('GetFact');
  },
  'GetFact': function() {
    const factIndex = Math.floor(Math.random() * languageStrings.facts.length);
    const randomFact = languageStrings.facts[factIndex].fields.textContent;

    // Create speech output
    const speechOutput = languageStrings.ctaText + " " + randomFact;
    this.emit(':tellWithCard', speechOutput, languageStrings.headline, randomFact);
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = languageStrings.helpMessage;
    const reprompt = languageStrings.helpMessage;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', languageStrings.stopMessage);
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', languageStrings.stopMessage);
  }
};

exports.handler = function(event, context) {
  const alexa = Alexa.handler(event, context);
  client.getEntries({'sys.id': process.env.ROOT_ENTRY, 'include': 2}).then((response) => {
    languageStrings = response.items[0].fields;
    alexa.registerHandlers(handlers);
    alexa.execute();
  })
};

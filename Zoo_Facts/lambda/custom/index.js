// cribbed significantly from: https://github.com/alexa/skill-sample-nodejs-fact
'use strict';
const Alexa = require('alexa-sdk');
// utility methods for creating Image and TextField objects
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;

const DEV = process.env.NODE_ENV !== 'production';
const APP_ID = "amzn1.ask.skill.761c02c7-d0f3-4529-a942-6dee313d03a3";

const SPACE_ID = process.env.SPACE_ID;
const CDA_TOKEN = process.env.CDA_TOKEN;
const ROOT_ENTRY = process.env.ROOT_ENTRY;

var factsData = "";

const contentful = require('contentful')
const client = contentful.createClient({space: SPACE_ID, accessToken: CDA_TOKEN});

// for debugging purposes, write Contentful object to console if running outside of AWS Lambda:
if (DEV) {
  client.getEntries({'sys.id': process.env.ROOT_ENTRY}).then((response) => {
    //get root object
    factsData = response.items[0].fields;
    console.log(JSON.stringify(factsData, null, 4));
  })
}

//https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs#installing-and-working-with-the-alexa-skills-kit-sdk-for-nodejs-alexa-sdk
exports.handler = function(event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  client.getEntries({'sys.id': process.env.ROOT_ENTRY}).then((response) => {
    factsData = response.items[0].fields;
    alexa.registerHandlers(handlers);
    alexa.execute();
  })
};

const handlers = {
  'LaunchRequest': function() {
    this.emit('GetNewFactIntent');
  },
  'GetNewFactIntent': function() {
    this.emit('GetNewFactIntent');
  },
  'GetNewFactIntent': function() {
    //randomly select from the list of 'facts'
    const factIndex = Math.floor(Math.random() * factsData.facts.length);
    const randomFact = factsData.facts[factIndex].fields;

    //construct
    const speechOutput = factsData.ctaText + " " + randomFact.textContent;

    //check to see if the device we're working with supports display directives
    //Build an Echo Show template, if it is supported
    //https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs#building-echo-show-templates
    if (supportsDisplay.call(this) || isSimulator.call(this)) {
      const builder = new Alexa.templateBuilders.BodyTemplate1Builder();

      //https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/specify-width-&-height
      let template = builder.setTitle(factsData.headline)
        .setBackgroundImage(makeImage("https:" + randomFact.backgroundImage.fields.file.url + "?w=1024&h=600"))
        .setTextContent(makePlainText(randomFact.textContent))
        .build();

      this.response.speak(speechOutput).renderTemplate(template);
      this.emit(':responseReady');
    } else {
      // Create speech output
      this.emit(':tellWithCard', speechOutput, factsData.headline, randomFact.textContent);
    }
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = factsData.helpMessage;
    const reprompt = factsData.helpMessage;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.response.speak(factsData.stopMessage);
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function() {
    this.response.speak(factsData.stopMessage);
    this.emit(':responseReady');
  }
};

//==============================================================================
//=========================== Helper Functions  ================================
//==============================================================================

function supportsDisplay() {
  var hasDisplay =
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display

  return hasDisplay;
}

function isSimulator() {
  var isSimulator = !this.event.context; //simulator doesn't send context
  return isSimulator;
}

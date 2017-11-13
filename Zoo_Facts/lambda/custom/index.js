'use strict';
const Alexa = require('alexa-sdk');
// utility methods for creating Image and TextField objects
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;


const APP_ID = "amzn1.ask.skill.761c02c7-d0f3-4529-a942-6dee313d03a3";

const contentful = require('contentful')
const client = contentful.createClient({space: process.env.SPACE_ID, accessToken: process.env.CDA_TOKEN});

const DEV = process.env.NODE_ENV !== 'production';

var zooFactsData = "";

if (DEV) {
  client.getEntries({'sys.id': process.env.ROOT_ENTRY, 'include': 2}).then((response) => {
    zooFactsData = response.items[0].fields;
    console.log(JSON.stringify(zooFactsData, null, 4));
  })
}

const handlers = {
  'LaunchRequest': function() {
    this.emit('GetFact');
  },
  'GetNewFactIntent': function() {
    this.emit('GetFact');
  },
  'GetFact': function() {
    const factIndex = Math.floor(Math.random() * zooFactsData.facts.length);
    const randomFact = zooFactsData.facts[factIndex].fields.textContent;
    const speechOutput = zooFactsData.ctaText + " " + randomFact;

    //check to see if the device we're working with supports display directives
    //enable the simulator if you're testing
    if (supportsDisplay.call(this) || isSimulator.call(this)) {
      const builder = new Alexa.templateBuilders.BodyTemplate1Builder();

      let template = builder.setTitle(zooFactsData.headline)
      .setBackgroundImage(makeImage("https:" + zooFactsData.facts[factIndex].fields.backgroundImage.fields.file.url + "?w=1024&h=600"))
      .setTextContent(makePlainText(randomFact))
      .build();

      this.response.speak(speechOutput).renderTemplate(template);
      this.emit(':responseReady');
    } else {
      // Create speech output
      this.emit(':tellWithCard', speechOutput, zooFactsData.headline, randomFact);
    }
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = zooFactsData.helpMessage;
    const reprompt = zooFactsData.helpMessage;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', zooFactsData.stopMessage);
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', zooFactsData.stopMessage);
  }
};

exports.handler = function(event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  client.getEntries({'sys.id': process.env.ROOT_ENTRY, 'include': 2}).then((response) => {
    zooFactsData = response.items[0].fields;
    alexa.registerHandlers(handlers);
    alexa.execute();
  })
};

//==============================================================================
//=========================== Helper Functions  ================================
//==============================================================================

function supportsDisplay() {
  var hasDisplay = this.event.context && this.event.context.System && this.event.context.System.device && this.event.context.System.device.supportedInterfaces && this.event.context.System.device.supportedInterfaces.Display

  return hasDisplay;
}

function isSimulator() {
  var isSimulator = !this.event.context; //simulator doesn't send context
  return isSimulator;
}

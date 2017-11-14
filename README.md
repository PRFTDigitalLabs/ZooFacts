# ZooFacts
An Amazon Alexa / Echo Show Fact Skill showcasing Contentful CMS integration

- - - -

### Background
This repository contains code that will be referenced during the <a href="https://www.meetup.com/CtlfDevsChicago/events/243910316/" target="_blank">Contentful Developers Meetup Chicago</a> on November 15, 2017.

It's purpose is to showcase the ease and power of integrating [Contentful](https://www.contentful.com/) as a CMS into platforms other than (or in addition to) web sites.

There are two projects contained within the repository:

1. [The Web Site](https://github.com/truthlabs/ZooFacts/tree/master/docs) - Very basic showcase of pulling data from a Contentful space.
2. [The Fact Skill](https://github.com/truthlabs/ZooFacts/tree/master/Zoo_Facts/lambda/custom/) - A modified version of the [Alexa Fact Skill](https://github.com/alexa/skill-sample-nodejs-fact) to pull data from a Contentful space, and render a template for the Echo Show.

### Highlights

The web site demo [showcases the use of link resolution](https://github.com/truthlabs/ZooFacts/blob/3e1ee92c291a242d9f04a0a683e914f851e810de/docs/js/main.js#L17) to pull the data associated with a single piece of content from within the Zoo Facts space.

This data is then used to populate the site seen here: [http://alexademo.truthlabs.com/](http://alexademo.truthlabs.com/)

[Nearly identical code](https://github.com/truthlabs/ZooFacts/blob/3e1ee92c291a242d9f04a0a683e914f851e810de/Zoo_Facts/lambda/custom/index.js#L33) is then used to populate the content used in the Alexa Fact skill.

The [Alexa Skills Kit Template Builder](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/tree/master/test/templateBuilders) is used to create an Echo Show template with a [Contentful hosted background image](https://github.com/truthlabs/ZooFacts/blob/7a8388827b2021a7262af6ce82f62cf48a26f97e/Zoo_Facts/lambda/custom/index.js#L63). 

That image is formatted using [Contentful's Images API](https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/specify-width-&-height).

## Building it yourself

The hardest part of getting an Amazon Alexa / Echo skill up and running is the set up. If it's your first time, I recommend following this tutorial:

[Build An Alexa Fact Skill](https://github.com/alexa/skill-sample-nodejs-fact)

This will walk you through the necessary steps of creating the various accounts & credentials needed to deploy a skill.

Once you've delpoyed your test skill, or if you've already gone through the tutorial process. There are a few features of this repository that make editing and deploying slightly more convenient through the [Alexa Skills Kit Command Line Interface](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html). Take a look [here](https://github.com/truthlabs/ZooFacts/tree/master/Zoo_Facts/lambda/custom). 


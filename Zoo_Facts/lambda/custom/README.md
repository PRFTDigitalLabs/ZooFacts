# Zoo Facts
An Amazon Alexa / Echo Show Fact Skill showcasing Contentful CMS integration
- - - -
## Set up
Assumes the AWS ASK CLI is installed and your environment is correctly configured. Please reference [this](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) for set-up instructions.

Assumes you have [cloned](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html#clone-command) your skill to the repository [root](../../../../) (thus replacing the Zoo Facts configuration in `.ask/config`).

Assumes you have edited the environment variables in your [.yarnrc](https://yarnpkg.com/en/docs/envvars) file to point to your space, keys, and root entry.

## Commands
`yarn start` : run the index.js file to fetch data from the Contentful space and display it in the console.

`yarn deploy` : use the ASK CLI to deploy the skill to your configured lambda environment.

`yarn test` : use the ASK CLI to simulate the default intent, and write out the response to the console.

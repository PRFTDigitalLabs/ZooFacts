// connect to our demo space. these values should match the environment variables used in the alexa skill
//https://github.com/contentful/contentful.js#authentication

const SPACE_ID = "3tr00ja68pxi";
const CDA_TOKEN = "0483590a9b8abe10138f1993d16c300f949bcf374905823491a3241e28f8fef8";
const ROOT_ENTRY = "3xoyU64RvG4SWsieGuosKq";

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: CDA_TOKEN
});

var factsData = "";

//retrieve data from our parent
//https://github.com/contentful/contentful.js#link-resolution
client.getEntries({'sys.id': ROOT_ENTRY}).then((response) => {
  //get root object
  factsData = response.items[0].fields;

  //randomly select from the list of 'facts'
  const factIndex = Math.floor(Math.random() * factsData.facts.length);
  const randomFact = factsData.facts[factIndex].fields;

  console.table(factsData);
  console.table(randomFact);

  //update page w/ data from Contentful:
  document.getElementsByClassName("skill-title")[0].innerHTML = factsData.headline;
  document.getElementsByClassName("skill-intro")[0].innerHTML = factsData.ctaText;
  document.getElementsByClassName("fact-intro")[0].innerHTML = randomFact.title;
  document.getElementsByClassName("fact-body")[0].innerHTML = randomFact.textContent;
  document.getElementsByClassName("fact-image")[0].src = randomFact.backgroundImage.fields.file.url + "?w=1024&h=600";
});

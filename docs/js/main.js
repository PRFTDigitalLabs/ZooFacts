var client = contentful.createClient({
  space: '3tr00ja68pxi',
  accessToken: '0483590a9b8abe10138f1993d16c300f949bcf374905823491a3241e28f8fef8'
});

var zooFactsData = "";

client.getEntries({'sys.id': '3xoyU64RvG4SWsieGuosKq', 'include': 2}).then((response) => {
  zooFactsData = response.items[0].fields;
  const factIndex = Math.floor(Math.random() * zooFactsData.facts.length);
  const randomFact = zooFactsData.facts[factIndex].fields;

  console.table(zooFactsData);
  console.table(randomFact);

  document.getElementsByClassName("skill-title")[0].innerHTML = zooFactsData.headline;
  document.getElementsByClassName("skill-intro")[0].innerHTML = zooFactsData.ctaText;
  document.getElementsByClassName("fact-intro")[0].innerHTML = randomFact.title;
  document.getElementsByClassName("fact-body")[0].innerHTML = randomFact.textContent;
  document.getElementsByClassName("fact-image")[0].src = randomFact.backgroundImage.fields.file.url + "?w=1024&h=600";
});

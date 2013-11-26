var rep = {};

document.getElementById('cardData').addEventListener('submit',function(e){
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  var cardForm = document.getElementById('cardData');
  for(item in cardForm.elements){
    if(cardForm.elements[item].type === "text" ||
      cardForm.elements[item].type === "email" ||
    cardForm.elements[item].type === "url"){
      rep[cardForm.elements[item].name] = cardForm.elements[item].value;
    }
  }
  generateCard();
  return false;
})
/*
var rep = {
name : "Avinash Kundaliya",
email : "avinash@avinash.com.np",
website : "http://avinash.me",
twitter : "hardfire"
};

generateCard(); 
*/

function populateCard(){
  var cardEl = document.getElementById("cardFront");
  var card;
  try {card=cardEl.getSVGDocument()}
  catch(card){card=cardEl.contentDocument}

  card.getElementById("fullname").textContent = rep.name;
  card.getElementById("group-0-item-0-value").textContent = rep.email;

  if(rep.website){
    card.getElementById("group-0-item-1-value").textContent = rep.website;
  } else {
    //remove lower website and replace upper one with mozillareps.org
    card.getElementById("group-0-item-1-value").textContent = "http://mozillareps.org";
    var websiteNode = card.getElementById("text2962");
    websiteNode.parentNode.removeChild(websiteNode);
  }

  if(rep.twitter){
    card.getElementById("group-1-item-0-value").textContent = "@"+rep.twitter;
  } else {
    //remove label and value
    var twitterNode = card.getElementById("text2966"),
    handleNode = card.getElementById("text2978");
    twitterNode.parentNode.removeChild(twitterNode);
    handleNode.parentNode.removeChild(handleNode)
  }

  if(rep.identica){
    card.getElementById("group-1-item-1-value").textContent = "@"+rep.identica;
  } else {
    //remove label and value
    var identicaNode = card.getElementById("text2970"),
    handleNode = card.getElementById("text2974");
    identicaNode.parentNode.removeChild(identicaNode);
    handleNode.parentNode.removeChild(handleNode)
  }

  //remove PR SIG Text Label
  card.getElementById("sig").textContent = "";

  //delete previous canvas and create new
  //canvg updates the previous one automatically updating the changes
  var c = document.createElement('canvas');
  c.width = '1254px';
  c.height = '800px';
  document.getElementById('cardCanvas').removeChild(document.getElementById('cardCanvas').children[0]);
  document.getElementById('cardCanvas').appendChild(c);

  canvg(
    c,
    //(new XMLSerializer).serializeToString(card),
    document.getElementById("cardFront").contentDocument,
    {
      offsetX:0,
      offsetY:0,
      scaleWidth:1254,
      scaleHeight:812,
      renderCallback:function(){
        //hack : the canvas just doesn't update on its own
        document.getElementById('cardCanvas').children[0].click();
        //just to make sure the fonts have rendered.
        setTimeout(function(){
          document.getElementById('generating').style.display = "none";
          document.getElementById('downloadCard').style.display = "block";
          document.getElementById('downloadBack').style.display = "block";
          document.getElementById('cardData').innerHTML = "See the two links below for downloading your card.";
        }, 1000);
      }
    }
  );
}

function generateCard(){
  var cardEl = document.getElementById("cardFront");
  var card;
  try {card=cardEl.getSVGDocument()}
  catch(card){card=cardEl.contentDocument}
  document.getElementById('generating').style.display = "block";
  if(card == null) {
    cardEl.addEventListener("load",populateCard);
  } else {
    populateCard();
  }
}

document.getElementById("downloadCard").addEventListener("click",function(){
  var canvas = document.getElementById('cardCanvas').children[0];
  window.open(canvas.toDataURL('png'));
  return false;
});

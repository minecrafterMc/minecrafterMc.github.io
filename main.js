var json = {};
var cards = [];
var customCardAmmount = 1;
var customdeckcount = 0;
function addNewCard()
{
  let Div = document.createElement("div");
  Div.id = "customCardDiv" + customCardAmmount;
  let NameTitle = document.createElement("p");
  NameTitle.innerHTML = "Card " + customCardAmmount + " Name";
  let NameInput = document.createElement("Input");
  NameInput.type = "text";
  NameInput.id = "CardName" + customCardAmmount;
  let DescTitle = document.createElement("p");
  DescTitle.innerHTML = "Card " + customCardAmmount + " Description";
  let DescInput = document.createElement("Input");
  DescInput.type = "text";
  DescInput.id = "CardDesc" + customCardAmmount;
  let AttackTitle = document.createElement("p");
  AttackTitle.innerHTML = "Card " + customCardAmmount + " Attack";
  let AttackInput = document.createElement("Input");
  AttackInput.type = "text";
  AttackInput.id = "CardAttack" + customCardAmmount;
  let HealthTitle = document.createElement("p");
  HealthTitle.innerHTML = "Card " + customCardAmmount + " Health";
  let HealthInput = document.createElement("Input");
  HealthInput.type = "text";
  HealthInput.id = "CardHealth" + customCardAmmount;
  let CostTitle = document.createElement("p");
  CostTitle.innerHTML = "Card " + customCardAmmount + " Cost type (1 = blood, 2 = Bones, 3 = energy, 4 = nox)";
  let CostInput = document.createElement("Input");
  CostInput.type = "text";
  CostInput.id = "CardCost" + customCardAmmount;
  let CostAmountTitle = document.createElement("p");
  CostAmountTitle.innerHTML = "Card " + customCardAmmount + ' Cost (for nox input like this: <strong>"green","orange"</strong>)';
  let CostAmountInput = document.createElement("Input");
  CostAmountInput.type = "text";
  CostAmountInput.id = "CardAmountCost" + customCardAmmount;
  let SigilsTitle = document.createElement("p");
  SigilsTitle.innerHTML = "Card " + customCardAmmount + ' Sigils (input like this: <strong>"sigil1","sigil2"</strong> eg. <strong>"winged","unkillable"</strong> or <strong>none</strong> to make a card without sigils)';
  let SigilsInput = document.createElement("Input");
  SigilsInput.type = "text";
  SigilsInput.id = "CardSigils" + customCardAmmount;
  let NoSacTitle = document.createElement("p");
  NoSacTitle.innerHTML = "can this card be sacrificed?";
  let NoSacInput = document.createElement("Input");
  NoSacInput.type = "checkbox";
  NoSacInput.id = "CardNoSac" + customCardAmmount;
  let RareTitle = document.createElement("p");
  RareTitle.innerHTML = "is this card rare?";
  let RareInput = document.createElement("Input");
  RareInput.type = "checkbox";
  RareInput.id = "CardRare" + customCardAmmount;
  let BannedTitle = document.createElement("p");
  BannedTitle.innerHTML = "is this card banned?";
  let BannedInput = document.createElement("Input");
  BannedInput.type = "checkbox";
  BannedInput.id = "CardBanned" + customCardAmmount;
  
  Div.appendChild(NameTitle);
  Div.appendChild(NameInput);
  Div.appendChild(DescTitle);
  Div.appendChild(DescInput);
  Div.appendChild(AttackTitle);
  Div.appendChild(AttackInput);
  Div.appendChild(HealthTitle);
  Div.appendChild(HealthInput);
  Div.appendChild(CostTitle);
  Div.appendChild(CostInput);
  Div.appendChild(CostAmountTitle);
  Div.appendChild(CostAmountInput);
  Div.appendChild(SigilsTitle);
  Div.appendChild(SigilsInput);
  Div.appendChild(NoSacTitle);
  Div.appendChild(NoSacInput);
  Div.appendChild(RareTitle);
  Div.appendChild(RareInput);
  Div.appendChild(BannedTitle);
  Div.appendChild(BannedInput);
  
  
  Div.appendChild(document.createElement("hr"));
  document.getElementById("customCardContainer").appendChild(Div);
  customCardAmmount += 1;
}
function addNewDeck()
{
  let Div = document.createElement("div");
  Div.id = "customDeckDiv" + customdeckcount;
  let DeckNameTitle = document.createElement("p");
  DeckNameTitle.innerHTML = "Side deck " + customdeckcount + " Name";
  let DeckNameInput = document.createElement("Input");
  DeckNameInput.type = "text";
  DeckNameInput.id = "DeckName" + customdeckcount;
  let DeckCardTitle = document.createElement("p");
  DeckCardTitle.innerHTML = "Deck " + customdeckcount + " Card";
  let DeckCardInput = document.createElement("Input");
  DeckCardInput.type = "text";
  DeckCardInput.id = "DeckCard" + customdeckcount;
  let DeckCardAmmountTitle = document.createElement("p");
  DeckCardAmmountTitle.innerHTML = "Deck " + customdeckcount + " card ammount";
  let DeckCardAmmountInput = document.createElement("Input");
  DeckCardAmmountInput.type = "text";
  DeckCardAmmountInput.id = "DeckCardAmmount" + customdeckcount;
  
  Div.appendChild(DeckNameTitle);
  Div.appendChild(DeckNameInput);
  Div.appendChild(DeckCardTitle);
  Div.appendChild(DeckCardInput);
  Div.appendChild(DeckCardAmmountTitle);
  Div.appendChild(DeckCardAmmountInput);
  
  Div.appendChild(document.createElement("hr"));
  document.getElementById("customDeckContainer").appendChild(Div);
  customdeckcount += 1;
}
function removeDeck()
{
  document.getElementById("customDeckDiv" + (customdeckcount - 1)).remove();
  customdeckcount -= 1;
}
function removeCard()
{
  document.getElementById("customCardDiv" + (customCardAmmount - 1)).remove();
  customCardAmmount -= 1;
}
function readCustomCards()
{
  let cards = [];
  let i = 1;
  while (i != customCardAmmount)
  {
    cards[i] = {};
    i += 1;
  }
  i = 1;
  while (i != customCardAmmount)
  {
    cards[i].name = document.getElementById("CardName" + i).value;
    if (document.getElementById("CardSigils" + i).value == "none")
    {
      
    }
    else 
    {
    cards[i].sigils = JSON.parse("[" + document.getElementById("CardSigils" + i).value + "]");
    }
    cards[i].attack = Number(document.getElementById("CardAttack" + i).value);
    cards[i].health = Number(document.getElementById("CardHealth" + i).value);
    if (document.getElementById("CardCost" + i).value == "1")
    {
      cards[i].blood_cost = Number(document.getElementById("CardAmountCost" + i).value);
    }
    else if (document.getElementById("CardCost" + i).value == "2")
    {
      cards[i].bone_cost = Number(document.getElementById("CardAmountCost" + i).value);
    }
    else if (document.getElementById("CardCost" + i).value == "3")
    {
      cards[i].energy_cost = Number(document.getElementById("CardAmountCost" + i).value);
    }
    else if (document.getElementById("CardCost" + i).value == "4")
    {
      cards[i].nox_cost = JSON.parse("[" + document.getElementById("CardSigils" + i).value + "]");
    }
    if(document.getElementById("CardRare" + i).checked)
    {
    cards[i].rare = true;
    }
    if (document.getElementById("CardBanned" + i).checked)
    {
    cards[i].banned = true;
    }
  if (document.getElementById("CardNoSac" + i).checked)
  {
    cards[i].nosac = true;
  }
    i += 1;
  }
  cards[0] = {"name": "Squirrel","attack": 0,"health": 1,"banned": true}
  return cards;
}
function readCustomDecks()
{
  let cards = [];
  let i = 0;
  while (i != customdeckcount)
  {
    cards[i] = {};
    i += 1;
  }
  i = 0;
  while (i != customCardAmmount)
  {
    cards[i] = /*JSON.parse(*/"{" + '"' + document.getElementById("DeckName" + i).value + '"' + ":{"+ "\"type\":\"single\",\"card\":" + document.getElementById("DeckCard" + i).value + ",\"count\":" +document.getElementById("DeckCardAmmount" + i).value + "}}"
    i += 1;
  }
  return cards;
}
function build()
{
  json.ruleset = document.getElementById("name").value;
  json.hammers_per_turn = Number(document.getElementById("hammers").value);
  json.ant_limit = Number(document.getElementById("maxAnts").value);
  json.deck_size_min = Number(document.getElementById("mindeck").value);
  json.max_commons_main = Number(document.getElementById("max_commons_main").value);
  json.max_commons_side = Number(document.getElementById("max_commons_side").value);
  json.num_candles = Number(document.getElementById("lives").value);
  json.variable_attack_nerf = document.getElementById("variable_attack_nerf").checked;
  json.allow_snuffing_candles = document.getElementById("allow_snuffing_candles").checked;
  json.opt_activities = document.getElementById("opt_activities").checked;
  json.enable_backrow = document.getElementById("enable_backrow").checked;
  json.portrait = document.getElementById("image").value;
  json.description = document.getElementById("description").value;
  json.cards = readCustomCards();
  var sigils = {"Airborne": "A card bearing this sigil will strike an opponent directly, even if there is a creature opposing it.","Ant Spawner": "When a card bearing this sigil is played, an ant is created in your hand.","Armored": "The first time a card bearing this sigil would take damage, prevent that damage.","Attack Conduit": "Other creatures within a circuit completed by a card bearing this sigil gain 1 power.","Battery Bearer": "When a card bearing this sigil is played, it provides an energy cell to its owner.","Bees Within": "Once a card bearing this sigil is struck, a Bee is created in your hand.","Bellist": "When a card bearing this sigil is played, a Chime is created on each empty adjacent space. A card bearing this sigil will perform a retaliatory attack against any card striking a Chime.","Bifurcated Strike":"A card bearing this sigil will strike each opposing space to the left and right of the space across from it.",		"Blood Lust":"When a card bearing this Sigil attacks an opposing creature and it perishes, this card gains 1 power.","Blue Mox":"While a card bearing this sigil is on the board, it provides a blue gem to its owner.","Bomb Spewer":"When a card bearing this sigil is played, fill all empty spaces with explode bots.","Bone Digger":"At the end of the owners turn, a card bearing this sigil will generate 1 bone.","Bone King":"When a card bearing this sigil dies, 4 bones are awarded instead of 1.","Bonehorn": "Pay 1 energy to gain 3 bones.","Bonehorn (1)":"Pay 1 energy to gain 1 bone.","Boneless":"When a card bearing this sigil dies, no bones are awarded.","Brittle":"After attacking, a card bearing this sigil perishes.",		"Burrower": "When an empty space would be struck, a card bearing this sigil will move to that space to receive the strike instead.",		"Corpse Eater": "If a creature that you own perishes by combat, a card bearing this sigil in your hand is automatically played in its place.",		"Dam Builder": "When a card bearing this sigil is played, a Dam is created on each empty adjacent space.",		"Depleting": "When a card bearing this sigil is played, 2 energy cells are removed from its owner",		"Detonator": "When a card bearing this sigil dies, the creature opposing it, as well as adjacent friendly creatures, are dealt 10 damage.",		"Detonator (5)": "When a card bearing this sigil dies, the creature opposing it, as well as adjacent friendly creatures, are dealt 5 damage.",		"Disentomb": "Pay 1 bone to create a skeleton in your hand.",		"Disentomb (Corpses)": "Pay 2 bones to create a withered corpse in your hand.",		"Double Death": "When another creature you own dies, it is returned to life and dies again immediately.",		"Double Strike": "A card bearing this Sigil will strike the opposing space an extra time when attacking.",		"Energy Conduit": "If a card bearing this sigil is part of a completed circuit, your energy never depletes.",		"Energy Conduit (+3)": "If a card bearing this sigil is part of a completed circuit, your maximum energy increases by 3.",		"Energy Gun": "Pay 1 energy to deal 1 damage to the creature across from a card bearing this sigil.",		"Enlarge": "Pay 2 bones to increase the power and health of a card bearing this sigil by 1.",		"Enlarge (3)": "Pay 3 bones to increase the power and health of a card bearing this sigil by 1.",		"Fecundity": "When a card bearing this sigil is played, a copy of it is created in your hand.",	"Fecundity (Kaycee)": "When a card bearing this sigil is played, a copy of it is created in your hand without this sigil.",		"Fledgling": "A card bearing this sigil will grow into a more powerful form after 1 turn on the board.",		"Frozen Away": "When a card bearing this sigil perishes, the creature inside is released in its place.",		"Gem Animator": "Mox cards on the owners side of the board gain 1 power.",		"Gem Dependant": "If a card bearing this sigils owner controls no mox cards, a card bearing this sigil perishes.",		"Gem Detonator (5)": "When Mox cards on the owners side of the board die, they Detonate (the creature opposing them, as well as adjacent friendly creatures, are dealt 5 damage).",		"Gem Guardian": "When a card bearing this sigil is played, all Moxa cards on the owners side of the board gain Nano Armor.",		"Great Mox": "While a card bearing this sigil is on the board, it provides a green, orange, and blue gem to its owner.",		"Green Mox": "While a card bearing this sigil is on the board, it provides a green gem to its owner.",		"Guardian": "When an opposing creature is placed opposite to an empty space, a card bearing this sigil will move to that empty space.",		"Handy": "When a card bearing this sigil is played, discard your hand then draw a new hand of 4 cards.",		"Hefty": "At the end of the owners turn, a card bearing this sigil will move in the direction inscribed in the sigil. creatures in the way will be pushed in the same direction.",		"Hoarder": "When a card bearing this sigil is played, you may search your deck for any card and take it into your hand.",		"Leader": "Creatures adjacent to a card bearing this sigil gain 1 Power.",		"Looter": "When a card bearing this sigil deals damage directly, draw a card for each damage dealt.",		"Made of Stone": "A card bearing this sigil is immune to the effects of touch of death and stinky.",		"Many Lives": "When a card bearing this sigil is sacrificed it does not perish.",		"Marrow Sucker": "Pay 2 bones to heal a card bearing this sigil.",		"Mental Gemnastics": "When a card bearing this sigil is played, you draw cards equal to the amount of mox cards on your side of the board.",		"Mighty Leap": "A card bearing this sigil will block an opposing creature bearing the airborne sigil.",		"Music Player": "A card bearing this sigil plays a song of your choice when played",		"Orange Mox": "While a card bearing this sigil is on the board, it provides an orange gem to its owner.",		"Omni Strike": "A card bearing this sigil will strike all opposing spaces.",		"Power Dice": "Pay 1 energy to set the power of a card bearing this sigil randomly between 1 and 6.",		"Power Dice (2)": "Pay 2 energy to set the power of a card bearing this sigil randomly between 1 and 6.",		"Rabbit Hole": "When a card bearing this sigil is played, a Rabbit is created in your hand.",		"Reconstitute": "A card bearing this sigil returns to your hand 2 turns after it persihes.",		"Repulsive": "If a creature would attack a card bearing this sigil, it does not.",		"Ruby Heart": "When a card bearing this sigil perishes, a ruby mox is created in its place.",		"Noble Sacrifice": "A card bearing this sigil is counted as 2 blood rather than 1 blood when sacrificed.",		"Scopophobic": "A card bearing this sigil gains 1 power when not facing an enemy creature.",		"Sentry": "When a creature moves into the space opposing a card bearing this sigil, they are dealt 1 damage.",		"Sharp Quills": "Once a card bearing this sigil is struck, the striker is then dealt a single damage point.",		"Side Hustle": "When a card bearing this sigil deals damage directly, draw a card from your side deck for each damage dealt.",		"Skeleton Crew": "At the end of the owners turn, a card bearing this sigil will move in the direction inscribed in the sigil and drop a skeleton in its old space.",		"Skeleton Crew (Yarr)": "At the end of the owners turn, a card bearing this sigil will move in the direction inscribed in the sigil and drop a pirate skeleton in its old space.",		"Spawn Conduit": "Empty spaces within a circuit completed by a card bearing this sigil spawn L33pB0ts at the end of the owners turn.",		"Sprinter": "At the end of the owners turn, a card bearing this sigil will move in the direction inscribed in the sigil.",		"Squirrel Shedder": "At the end of the owners turn, a card bearing this sigil will move in the direction inscribed in the sigil and drop a squirrel in their old space.",		"Stinky": "The creature opposing a card bearing this sigil loses 1 Power.",		"Stimulate": "Pay 3 energy to increase the power and health of a card bearing this sigil by 1.",		"Stimulate (4)": "Pay 4 energy to increase the power and health of a card bearing this sigil by 1.",		"Tentacle": "Includes effect of Waterborne. In addition, a card bearing this sigil will transform into a random tentacle at the start of each turn.",		"Thick": "A card bearing this sigil is juicy, and takes up 2 spaces.",		"Touch of Death": "When a card bearing this sigil damages another creature, that creature perishes.",		"Transformer": "At the beginning of your turn a card bearing this sigil will transform to, or from, Beast mode.",		"Trifurcated Strike": "A card bearing this sigil will strike each opposing space to the left, right, and center of it.",		"True Scholar": "If you have a blue gem, sacrifice a card bearing this sigil to draw 3 cards.",	"Unkillable": "When a card bearing this sigil perishes, a copy of it is created in your hand.",		"Vessel Printer": "Once a card bearing this sigil is struck, draw a card from your side deck.",		"Waterborne": "A card bearing this sigil submerges itself during its opponents turn. while submerged, opposing creatures attack its owner directly.",		"Worthy Sacrifice": "A card bearing this sigil is counted as 3 blood rather than 1 blood when sacrificed."};
  var workingsig = [		"Airborne",		"Mighty Leap",		"Fecundity (Kaycee)",		"Fecundity",		"Unkillable",		"Blue Mox",		"Green Mox",		"Orange Mox",		"Great Mox",		"Rabbit Hole",		"Touch of Death",		"Many Lives",		"Trifurcated Strike",		"Battery Bearer",		"Repulsive",		"Brittle",		"Worthy Sacrifice",		"Gem Dependant",		"Bone King",		"Bifurcated Strike",		"Handy",		"Fledgling",		"Sprinter",		"Squirrel Shedder",		"Skeleton Crew",		"Bone Digger",		"Waterborne",		"Ruby Heart",		"Frozen Away",		"Mental Gemnastics",		"Looter",		"Gem Animator",		"Hefty",		"Guardian",		"Sharp Quills",		"Sentry",		"Burrower",		"Hoarder",		"Detonator",		"Detonator (5)",		"Bomb Spewer",		"Double Death",		"Enlarge",		"Disentomb",		"Disentomb (Corpses)",		"Power Dice",		"Power Dice (2)",	"Stimulate",		"Stimulate (4)",		"Energy Gun",		"True Scholar",		"Bonehorn",		"Bonehorn (1)",		"Boneless",		"Attack Conduit",		"Spawn Conduit",		"Energy Conduit",		"Energy Conduit (+3)",		"Tentacle",		"Stinky",		"Reconstitute",		"Noble Sacrifice",		"Made of Stone",		"Side Hustle",		"Armored",		"Leader",		"Ant Spawner",		"Double Strike",		"Blood Lust",		"Music Player",		"Transformer",		"Vessel Printer",		"Bees Within",		"Dam Builder",		"Corpse Eater",		"Gem Guardian",		"Gem Detonator (5)",	"Depleting",		"Bellist",	"Omni Strike",		"Enlarge (3)",		"Skeleton Crew (Yarr)",		"Thick"	];
  json.sigils = sigils;
  json.working_sigils = workingsig;
  json.side_decks = {"10 Squirrels": {"type": "single","card": "Squirrel","count": 10}};
  let Outputfile = JSON.stringify(json,null,3);
  document.getElementById("output").innerHTML = JSON.stringify(json,null,3);
  let link = document.createElement("a");
  let file = new Blob([Outputfile], { type: 'json/plain' });
  link.href = URL.createObjectURL(file);
  link.download = document.getElementById("name").value + ".json";
  link.click();
  URL.revokeObjectURL(link.href);
}

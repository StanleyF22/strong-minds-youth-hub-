// =========================
// STRONG CONNECTIONS APP
// =========================

let score =
parseInt(localStorage.getItem("score")) || 0;

let badges =
JSON.parse(localStorage.getItem("badges")) || [];

function saveProgress() {

localStorage.setItem(
"score",
score
);

localStorage.setItem(
"badges",
JSON.stringify(badges)
);

}

function updateUI() {

const scoreElement =
document.getElementById("score");

const progressElement =
document.getElementById("progress");

if(scoreElement){
scoreElement.innerText = score;
}

if(progressElement){
progressElement.value =
Math.min(score,100);
}

}

// =========================
// AVATAR
// =========================

function createAvatar(){

const face =
document.getElementById(
"avatarFace"
).value;

const colour =
document.getElementById(
"avatarColour"
).value;

const avatar =
document.getElementById(
"avatarDisplay"
);

avatar.innerHTML = face;

avatar.style.background =
colour;

}

// =========================
// SEWB WHEEL
// =========================

function completeArea(button){

if(button.dataset.done){
return;
}

button.dataset.done =
true;

button.style.background =
"#4caf50";

score += 10;

updateUI();

saveProgress();

checkBadges();

}

function showSEWB(area){

const descriptions = {

mind:
"Strong minds are built through learning how to recognise emotions, seek help and develop resilience.",

body:
"Looking after your body through sleep, movement and healthy food supports wellbeing.",

family:
"Family and kinship are important sources of identity, strength and support.",

community:
"Communities provide belonging, connection and opportunities to support each other.",

culture:
"Culture strengthens identity, pride and connection.",

country:
"Connection to Country supports healing, reflection and wellbeing.",

spirit:
"Spirituality and ancestors can provide strength, meaning and guidance."

};

const target =
document.getElementById(
"sewbDescription"
);

if(target){

target.innerHTML =
descriptions[area];

}

}

// =========================
// DAILY CHALLENGES
// =========================

function newChallenge(){

const challenges=[

"🌿 Spend 15 minutes outdoors listening to nature.",

"💧 Drink more water today and check in with how you're feeling.",

"📞 Call or message a trusted family member.",

"🎵 Listen to a song that helps you feel calm and positive.",

"🙏 Write three things you're grateful for.",

"🚶 Take a short walk around your neighbourhood.",

"🗣️ Spend time talking with a trusted friend.",

"🌅 Watch a sunrise or sunset and reflect.",

"🎨 Draw, paint or create something today.",

"🤝 Do one act of kindness."

];

const random =
Math.floor(
Math.random() *
challenges.length
);

document.getElementById(
"challengeText"
).innerHTML =
challenges[random];

}

// =========================
// YARNING CIRCLE
// =========================

function showYarn(type){

let response = "";

switch(type){

case "stress":

response =
"Take a few slow breaths. Go outside if you can and spend some time in nature or with someone you trust.";

break;

case "sad":

response =
"You're not alone. Reach out to family, community, friends or support services.";

break;

case "lonely":

response =
"Connection is important. Consider joining a community, sporting or cultural activity.";

break;

case "angry":

response =
"Pause, breathe slowly and take a short break before responding.";

break;

default:

response =
"Check in with yourself and remember support is available.";

}

document.getElementById(
"yarningResult"
).innerHTML =
response;

}

// =========================
// ACHIEVEMENTS
// =========================

function addBadge(name){

if(badges.includes(name)){
return;
}

badges.push(name);

const badgeList =
document.getElementById(
"badgeList"
);

const badge =
document.createElement("div");

badge.className =
"badge";

badge.innerText =
name;

badgeList.appendChild(
badge
);

saveProgress();

}

function checkBadges(){

if(score >= 20){
addBadge("🏝 Explorer");
}

if(score >= 40){
addBadge("🤝 Community Champion");
}

if(score >= 60){
addBadge("🎨 Culture Keeper");
}

if(score >= 80){
addBadge("🌿 Wellbeing Warrior");
}

if(score >= 100){
addBadge("👑 Strong Connections Master");
}

}

// =========================
// TOWNSVILLE RPG JOURNEY
// =========================

function visitLocation(location){

let message = "";

switch(location){

case "castle":

message =
"⛰ Castle Hill Quest Complete! Physical activity strengthens body and mind. +10 XP";

break;

case "strand":

message =
"🌊 The Strand Quest Complete! Practise mindfulness near the water. +10 XP";

break;

case "magnetic":

message =
"🏝 Magnetic Island Quest Complete! Reflect on connection to Sea Country. +10 XP";

break;

case "taihs":

message =
"❤️ You discovered local culturally appropriate wellbeing support. +10 XP";

break;

case "headspace":

message =
"🧠 You learned where to access youth mental health support. +10 XP";

break;

default:

message =
"Journey updated.";

}

score += 10;

updateUI();

saveProgress();

checkBadges();

document.getElementById(
"journeyStory"
).innerHTML =
message;

}

// =========================
// LEAFLET MAP
// =========================

function initialiseMap(){

const mapTarget =
document.getElementById(
"townsvilleMap"
);

if(!mapTarget){
return;
}

const map =
L.map("townsvilleMap")
.setView(
[-19.2589,146.8169],
11
);

L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{
attribution:
"© OpenStreetMap contributors"
}
)
.addTo(map);

const locations = [

{
name:"Magnetic Island",
coords:[
-19.155,
146.85
],
action:"magnetic"
},

{
name:"Castle Hill",
coords:[
-19.274,
146.80
],
action:"castle"
},

{
name:"The Strand",
coords:[
-19.248,
146.817
],
action:"strand"
},

{
name:"TAIHS",
coords:[
-19.249,
146.772
],
action:"taihs"
},

{
name:"headspace Townsville",
coords:[
-19.315,
146.729
],
action:"headspace"
}

];

locations.forEach(
location => {

L.marker(
location.coords
)

.addTo(map)

.bindPopup(
location.name
)

.on(
"click",
function(){

visitLocation(
location.action
);

}
);

}
);

}

// =========================
// LOAD SAVED BADGES
// =========================

function loadBadges(){

const badgeList =
document.getElementById(
"badgeList"
);

if(!badgeList){
return;
}

badges.forEach(
badgeName => {

const badge =
document.createElement(
"div"
);

badge.className =
"badge";

badge.innerText =
badgeName;

badgeList.appendChild(
badge
);

}
);

}

// =========================
// START APP
// =========================

document.addEventListener(
"DOMContentLoaded",
function(){

updateUI();

loadBadges();

initialiseMap();

}
);

let score =
parseInt(
localStorage.getItem("score")
) || 0;


function scrollToGame(){

document
.getElementById("game")
.scrollIntoView({
behavior:"smooth"
});

}

function completeArea(button){

if(button.disabled) return;

button.disabled = true;

button.style.background =
"#4caf50";

score += 10;

document.getElementById("score")
.innerText = score;

document.getElementById("progress")
.value = score;

checkBadges();

}

function checkBadges(){

const badgeList =
document.getElementById("badgeList");

if(score >= 30 &&
!badgeList.innerHTML.includes("Community Champion")){

badgeList.innerHTML +=
"<br>🥈 Community Champion";

}

if(score >= 70 &&
!badgeList.innerHTML.includes("SEWB Master")){

badgeList.innerHTML +=
"<br>🥇 SEWB Master";

}
}

function newChallenge(){

const challenges = [

"Go for a 15 minute walk outdoors.",

"Spend 10 minutes in nature.",

"Talk with a trusted family member.",

"Practice gratitude and write three positive things.",

"Listen to relaxing music.",

"Help someone today.",

"Learn something about local First Nations culture.",

"Connect with community.",

"Practice deep breathing for two minutes."

];

const random =
Math.floor(
Math.random()*challenges.length
);

document.getElementById(
"challengeText"
).innerText =
challenges[random];

}

function showYarn(type){

let response = "";

switch(type){

case "stress":
response =
"Take a few slow breaths. Consider going outside and connecting with nature or talking to someone you trust.";
break;

case "sad":
response =
"It's OK to seek support. Reach out to family, friends or a support service.";
break;

case "angry":
response =
"Step away, breathe slowly and give yourself time before responding.";
break;

case "lonely":
response =
"Connection is important. Contact a friend, family member, youth group or support service.";
break;

}

document.getElementById(
"yarningResult"
).innerText = response;

}
function showLocation(place){

let text="";

switch(place){

case "castle":
text=
"Castle Hill is a place for walking, fitness and wellbeing.";
break;

case "magnetic":
text=
"Magnetic Island encourages connection with sea Country and nature.";
break;

case "strand":
text=
"The Strand is a community gathering place supporting connection and recreation.";
break;

case "taihs":
text=
"TAIHS offers culturally appropriate health, youth and social and emotional wellbeing services.";
break;

case "headspace":
text=
"Headspace Townsville provides support for young people aged 12-25.";
break;

}

document.getElementById(
"locationInfo"
).innerHTML=text;

}
function checkBadges(){

const badgeList =
document.getElementById("badgeList");

if(score >= 20 &&
!badgeList.innerHTML.includes("Explorer")){

badgeList.innerHTML +=
"<br>🗺 Explorer";

}

if(score >= 40 &&
!badgeList.innerHTML.includes("Community Champion")){

badgeList.innerHTML +=
"<br>🤝 Community Champion";

}

if(score >= 60 &&
!badgeList.innerHTML.includes("Culture Keeper")){

badgeList.innerHTML +=
"<br>🎨 Culture Keeper";

}

if(score >= 70 &&
!badgeList.innerHTML.includes("SEWB Master")){

badgeList.innerHTML +=
"<br>👑 SEWB Master";

}

}
function visitLocation(location){

let story="";

switch(location){

case "magnetic":
story="You travelled to Magnetic Island. Spend time outdoors and connect with nature and sea Country. +10 points";
break;

case "castle":
story="You climbed Castle Hill. Physical activity supports wellbeing. +10 points";
break;

case "strand":
story="You visited Sea Country and reflected on connection and wellbeing. +10 points";
break;

case "community":
story="You attended a community event and strengthened connections. +10 points";
break;

}

score += 10;

document.getElementById("score").innerText=score;

document.getElementById("journeyStory").innerHTML=story;

saveProgress();

checkBadges();

}



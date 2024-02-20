document.getElementById("speed").style.display = "none";
document.getElementById("time").style.display = "none";
document.getElementById("custom").style.display = "none";
function openspeed()
{
  document.getElementById("custom").style.display = "none";
  document.getElementById("time").style.display = "none";
  document.getElementById("speed").style.display = "block";
}
function opentime()
{
  document.getElementById("custom").style.display = "none";
  document.getElementById("time").style.display = "block";
  document.getElementById("speed").style.display = "none";
}
function opencustom()
{
  document.getElementById("custom").style.display = "block";
  document.getElementById("time").style.display = "none";
  document.getElementById("speed").style.display = "none";
}
function openall()
{
  document.getElementById("custom").style.display = "block";
  document.getElementById("time").style.display = "block";
  document.getElementById("speed").style.display = "block";
}
function startcustommode(time,speed,name,lives,multi,pointpenalty,timepenalty)
{
  sessionStorage.setItem("time", time);
  sessionStorage.setItem("speed", speed);
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("lives", lives);
  sessionStorage.setItem("pointmulti", multi);
  sessionStorage.setItem("penaltypoint", pointpenalty);
  sessionStorage.setItem("penaltytime", timepenalty);
  window.location.href = '5min.html';
}
opentime();
if (sessionStorage.getItem("colorid") == undefined)
{
  sessionStorage.setItem("colorid", 0);
}
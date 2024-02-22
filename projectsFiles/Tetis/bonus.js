document.getElementById("speed").style.display = "none";
document.getElementById("time").style.display = "none";
document.getElementById("custom").style.display = "none";
document.getElementById("featured").style.display = "none";
document.getElementById("customeditor").style.display = "none";
function openfeatured()
{
  document.getElementById("custom").style.display = "none";
  document.getElementById("time").style.display = "none";
  document.getElementById("featured").style.display = "block";
  document.getElementById("speed").style.display = "none";
}
function openspeed()
{
  document.getElementById("custom").style.display = "none";
  document.getElementById("time").style.display = "none";
  document.getElementById("featured").style.display = "none";
  document.getElementById("speed").style.display = "block";
}
function opentime()
{
  document.getElementById("custom").style.display = "none";
  document.getElementById("time").style.display = "block";
  document.getElementById("speed").style.display = "none";
  document.getElementById("featured").style.display = "none";
}
function opencustom()
{
  document.getElementById("custom").style.display = "block";
  document.getElementById("time").style.display = "none";
  document.getElementById("speed").style.display = "none";
  document.getElementById("featured").style.display = "none";
}
function openall()
{
  document.getElementById("custom").style.display = "block";
  document.getElementById("time").style.display = "block";
  document.getElementById("speed").style.display = "block";
  document.getElementById("featured").style.display = "block";
}
function closeall()
{
  document.getElementById("custom").style.display = "none";
  document.getElementById("time").style.display = "none";
  document.getElementById("featured").style.display = "none";
  document.getElementById("speed").style.display = "none";
}
function startcustommode(time,speed,name,lives,multi,pointpenalty,timepenalty,comp)
{
  sessionStorage.setItem("time", time);
  sessionStorage.setItem("speed", speed);
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("lives", lives);
  sessionStorage.setItem("pointmulti", multi);
  sessionStorage.setItem("penaltypoint", pointpenalty);
  sessionStorage.setItem("penaltytime", timepenalty);
  sessionStorage.setItem("comp", comp);
  window.location.href = '5min.html';
}
if (sessionStorage.getItem("colorid") == undefined)
{
  sessionStorage.setItem("colorid", 0);
}
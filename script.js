var ismobile = false;
var optimize = false;
var extraoptimize = false;
var response = NaN;
var data = NaN;

async function FetchData(url) {
  response = await fetch(url);
  data = await response.json();
  console.log(data);
}
async function PostData(url, datatosend) {
    response = await fetch(url,{
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          referrerPolicy: "no-referrer",
        body: JSON.stringify(datatosend)
    });
  }
if (navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("IOS") != -1)
        {
            mobile();
            ismobile = true;
            }
            document.getElementById("kontener").style.borderradius= "90px";
function tick()
{
    if (window.innerWidth < 1387)
        {
            optimize =  true;
            
        }
        if (window.innerWidth > 1387)
        {
            optimize =  false;
            
        }
        if (window.innerWidth < 1045)
        {
            extraoptimize =  true;
            
        }
        if (window.innerWidth > 1045)
        {
            extraoptimize =  false;
            
        }
    try
    {
   
    if (ismobile)
    {
        document.getElementById("nav").style.width = window.innerWidth / 1.2 + "px";
    
        document.getElementById("kontener").style.width = window.innerWidth / 1.1 + "px";
        document.getElementById("newscontainer").style.width = window.innerWidth - 70 + "px";
        document.getElementById("logo").width = window.innerWidth / 50;
        document.getElementById("logo").style.width = window.innerWidth / 1.4 + "px";
        optimizecovers();
    
    }
    else if (!optimize){

        document.getElementById("nav").style.width = window.innerWidth - 70 + "px";
        document.getElementById("kontener").style.width = window.innerWidth - 70 + "px";
        document.getElementById("newscontainer").style.width = window.innerWidth - 70 + "px";
        
    }
    else if (!extraoptimize){
        document.getElementById("nav").style.width = window.innerWidth - 50 + "px";
        document.getElementById("kontener").style.width = window.innerWidth - 50 + "px";
        document.getElementById("newscontainer").style.width = window.innerWidth - 50 + "px";
    }
    else{
        document.getElementById("nav").style.width = window.innerWidth - 70 + "px";
        document.getElementById("kontener").style.width = window.innerWidth - 70 + "px";
        document.getElementById("newscontainer").style.width = window.innerWidth - 70 + "px";
        optimizecovers();
    }
}
catch{

}
}
function mobile()
{
    let covers = document.getElementsByClassName("dwie-kolumny");
    let i = 0;
    while (i != covers.length)
    {
        document.getElementsByClassName("dwie-kolumny")[i].style.float = "none";
        document.getElementsByClassName("dwie-kolumny")[i].style.width = "100%";
        i += 1;
    }
    try{
      
    optimizecovers();
    document.getElementById("kontener").width = window.innerWidth + "px";
    document.getElementById("kontener").style.clear = "none";
    }
    catch{
      
    }
    try {
    document.getElementById("newscontainer").width = window.innerWidth + "px";
    document.getElementById("newscontainer").style.clear = "none";
    }
    catch{
      
    }
    document.getElementById("nav").style.position = "static";
}
function optimizecovers()
{
    let covers = document.getElementsByClassName("cover");
    let i = 0;
    while (i != covers.length)
    {
        document.getElementsByClassName("cover")[i].style.width = window.innerWidth / 4 + "px";
        document.getElementsByClassName("cover")[i].style.left = 0 + "px";
        
        i += 1;
    }
}
function load()
{
    let i = 0;
    while (i != 50)
    {
        tick()
        i += 1;
    }
}
function redirect()
{
    window.location.href = "index.html";
}
load();
setInterval(tick,100);
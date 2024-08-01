const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.has('name'))
{
  sessionStorage.setItem("gamedata",FetchData('https://minecraftermc.github.io/Tetis/basic.json'));

}
const gamedata = JSON.parse(sessionStorage.getItem("gamedata"));
if (gamedata == null)
{
  location.href = "bonusselect.html";
}
if (urlParams.has('name'))
{
  
}
if (gamedata.enableMods)
{
  alert("WARNING: loaded mode uses mods. Mods are not verified by the author of Tetis and can contain malicious code. Caution is advised");
}
async function tournament()
{
  if (sessionStorage.getItem("comp"))
  {
    console.log("  __   _____   _____    _____\n/   / |_   _| |  _  |  |  _  |\n|  |    | |   | | | |  | |_| |\n\\  \\    | |   | | | |  |  ___|\n |  |   | |   | |_| |  | |\n/__/    |_|   |_____|  |_|\n\nUsing the console during tournaments will get you disqualified!\n\nKożystanie z konsoli podczas turniejów grozi dyskwalifikacją!")
    let list;
    list = await FetchTournamentList();
    let thisname = sessionStorage.getItem("name");
    if (!list[thisname].running)
    {
      location.href = "index.html";
    }
    else {
      runID = RandomInt(1, 99999);
      username = sessionStorage.getItem("dcname");
    }
    gamedata = list[thisname];
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const nshapecanvas = document.getElementById("2display");
const ctx2 = nshapecanvas.getContext("2d");
ctx.font = "12px Arial";
class board
{
  constructor(x, y, exist)
  {
    this.x = x * 25 + x * 5 + 5;
    this.y = y * 25 + y * 5 + 5;
    this.bx = x;
    this.by = y;
    this.exist = exist;
    if (this.exist)
    {
      this.color = fallencolor;
    }
    else
    {
      this.color = emptycolor;
    }
  }
  flipExists()
  {
    if (this.exist)
    {
      this.exist = false;
      this.color = emptycolor;
    }
    else
    {
      this.exist = true;
      this.color = fallencolor;
    }
    this.drawBoard();
  }
  getExist()
  {
    return this.exist;
  }
  drawBoard()
  {
    drawCell(this);
  }

}
class cell
{
  constructor(x, y, xsize, ysize, xvel, yvel, color, exist, id)
  {
    this.id = id;
    this.exist = exist;
    this.x = x * 25 + x * 5 + 5;
    this.y = y * 25 + y * 5 + 5;
    this.bx = x;
    this.by = y;
    this.aposition = 1 * x + 10 * y;
    this.xsize = xsize;
    this.ysize = ysize;
    this.xvel = xvel;
    this.yvel = yvel;
    this.color = color;
  }
  tp(x, y)
  {
    let oldcolor = this.color;
    this.color = "white";
    drawCell(this);
    this.color = oldcolor;
    this.x = x * 25 + 5 * x;
    this.y = y * 25 + 5 * y;
    this.bx = x;
    this.by = y;
    drawCell(this);
  }
  move(x, y)
  {

    let oldcolor = this.color;
    this.color = trailcolor;
    drawCell(this);
    this.color = oldcolor;
    this.x = this.x + x * 25 + 5 * x;
    this.y = this.y + y * 25 + 5 * y;
    this.bx = this.bx + x;
    this.by = this.by + y;
    drawCell(this);


  }
  rotate(x, y)
  {
    if (x == 1 && this.xvel == -1 || x == -1 && this.xvel == 1 || y == 1 && this.yvel == -1 || y == -1 && this.yvel == 1)
    {
      this.xvel = this.xvel;
      this.yvel = this.yvel;
    }
    else
    {
      this.xvel = x;
      this.yvel = y;
    }
  }
  getPosition(ax)
  {
    if (ax == 0)
    {
      return this.bx;
    }
    if (ax == 1)
    {
      return this.by;
    }
  }
}
var colorIndex = sessionStorage.getItem("colorid");
var colorPaletes = gamedata.colors;

var maxcolor = colorPaletes.length - 1;
var maxshapeid = (gamedata.blocks.length - 1) / 4;
var runID;
var cell1 = new cell(0, 0, 25, 25, 0, 1, "blue");
drawCell(cell1);
var lives = gamedata.lives;
var shapetype = 1;
var ip = "ipgrabber removed";// it was used in tournaments for the anticheat (if you could even call it that)
var shapetypeb = 1;
var shapetypec = RandomInt(1, maxshapeid);
var shapetyped = 0;
var shape = [0];
var shape2 = [0];
var newshape = [0];
var boardArr = [0];
var pause = true;
var points = 0;
var anticheatpoints = 0;
var shapeRotation = 1;
var dir = 0;
var fastdown = false;
var IID = NaN;
var falling = false;
var menucooldown = false;
var pointsfrozen = true;
var timeleft = gamedata.time;
var whurl;
var fallencolor = "#092529";
var emptycolor = "#292929";
var trailcolor = "#283d40";
var shapecolor = "#105b66";
var outlinecolor = "black";
var backgroundcolor = "#292929";
var whatIsLove;
var babyDontHurtMe;
var noMore;
if (sessionStorage.getItem("colorid") == null){
  colorIndex = 0;
}
document.getElementById("body").style.backgroundColor = emptycolor;
setup();
tournament();
generateShape(0, 0, "dis");
generateShape(4, 0, "canvas");
var tickID = setInterval(tick, gamedata.updateTimer);
var timerID = setInterval(timer, 1000);
setInterval(screenadjust, 100);
if (sessionStorage.getItem("soundtoggle") === true)
{
  document.getElementById("soundtoggle").checked = true;
}
else {
  document.getElementById("soundtoggle").checked = false;
}
//whoever sees this, please dont abuse this link. this webhook is connected to my private discord server. you abusing it would just annoy me
whurl = "https://discord.com/api/webhooks/1204492141544345600/L6juWPsDzT9CgW8-wFuIcmqYIzgduJLRDPEOMdWx1meZ2SYLD1tSTdiy5WA1ID5pUre7"

backgroundcolor = 0;
var msg = {
  "content": "someone just started playing tetis!"
}

//fetch(whurl + "?wait=true", {"method":"POST", "headers": {"content-type": "application/json"},"body": JSON.stringify(msg)});
function copyurl()
{
  navigator.clipboard.writeText("https://minecraftermc.github.io/Tetis/playtetis.html?name=" + gamedata.name + "&time=" + gamedata.time + "&speed=" + gamedata.updateTimer + "&lives=" + gamedata.lives + "&multi=" + gamedata.multi + "&ppenalty=" + gamedata.ppenalty + "&tpenalty=" + gamedata.tpenalty);
  
}
function playsound(sound)
{
  if (!document.getElementById("soundtoggle").checked)
  {
    let audio = new Audio(sound);
    audio.play();
  }
}
async function FetchTournamentList() {
  let response = await fetch("https://minecraftermc.github.io/projectsFiles/Tetis/tournaments.json");
  let tournaments = await response.json();
  return tournaments;
}
async function FetchData(Datatofetch) {
  let response = await fetch(Datatofetch);
  let tournaments = await response.json();
  return tournaments;
}
function downloadObjectAsJson(exportObj, exportName){
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
function changecolor()
{
  colorIndex = Number(colorIndex) + 1;
  if (Number(colorIndex) <= maxcolor)
  {
    //colorIndex -= 1;
    //return;


    document.getElementById("colorname").innerHTML = colorPaletes[colorIndex].name;
    document.getElementById("loose").style.backgroundColor = colorPaletes[colorIndex].emptycolor;
    document.getElementById("colorname").style.color = colorPaletes[colorIndex].textcolor;
    document.getElementById("points").style.color = colorPaletes[colorIndex].textcolor;
    emptycolor = colorPaletes[colorIndex].emptycolor;
    document.getElementById("body").style.backgroundColor = emptycolor;
    document.getElementById("loose").style.color = colorPaletes[colorIndex].textcolor;
    document.getElementById("soundtoggletext").style.color = colorPaletes[colorIndex].textcolor;
    document.getElementById("vibrationtoggletext").style.color = colorPaletes[colorIndex].textcolor;
    document.getElementById("timer").style.color = colorPaletes[colorIndex].textcolor;
    document.getElementById("changecolortext").style.color = colorPaletes[colorIndex].textcolor;
    trailcolor = colorPaletes[colorIndex].trailcolor;
    fallencolor = colorPaletes[colorIndex].fallencolor;
    shapecolor = colorPaletes[colorIndex].shapecolor;
    recolor();
    displayshape2();
    generateShape(shape[0].bx, shape[0].by, "dis");
    srotate(-1);
    srotate(1);
    let i = 0;
    while (i != 200)
    {
      if (boardArr[i].exist)
      {
        boardArr[i].color = fallencolor;
      }
      else {
        boardArr[i].color = emptycolor;
      }
      drawCell(boardArr[i]);
      i += 1;
    }


    refreshboard();
    drawShape();
    sessionStorage.setItem("colorid", colorIndex);

  }
  else {
    colorIndex = colorIndex - 1;
  }
}
whatIsLove = FetchData("https://minecraftermc.github.io/projectsFiles/Tetis/love.json");
function changecolor2()
{
  colorIndex -= 1;
  if (colorIndex < 0)
  {
    colorIndex = 0;
  }
  document.getElementById("colorname").innerHTML = colorPaletes[colorIndex].name;
  document.getElementById("loose").style.backgroundColor = colorPaletes[colorIndex].emptycolor;
  document.getElementById("colorname").style.color = colorPaletes[colorIndex].textcolor;
  document.getElementById("points").style.color = colorPaletes[colorIndex].textcolor;
  emptycolor = colorPaletes[colorIndex].emptycolor;
  document.getElementById("body").style.backgroundColor = emptycolor;
  document.getElementById("loose").style.color = colorPaletes[colorIndex].textcolor;
  document.getElementById("soundtoggletext").style.color = colorPaletes[colorIndex].textcolor;
  document.getElementById("vibrationtoggletext").style.color = colorPaletes[colorIndex].textcolor;
  document.getElementById("timer").style.color = colorPaletes[colorIndex].textcolor;
  document.getElementById("changecolortext").style.color = colorPaletes[colorIndex].textcolor;
  trailcolor = colorPaletes[colorIndex].trailcolor;
  fallencolor = colorPaletes[colorIndex].fallencolor;
  shapecolor = colorPaletes[colorIndex].shapecolor;
  recolor();
  displayshape2();
  generateShape(shape[0].bx, shape[0].by, "dis");
  srotate(-1);
  srotate(1);
  let i = 0;
  while (i != 200)
  {
    if (boardArr[i].exist)
    {
      boardArr[i].color = fallencolor;
    }
    else {
      boardArr[i].color = emptycolor;
    }
    drawCell(boardArr[i]);
    i += 1;
  }
  refreshboard();
  drawShape();
  sessionStorage.setItem("colorid", colorIndex);
}
//https://discordapp.com/api/webhooks/1209935122241945652/Tv1Iu90R7UMi7OumvHd3c03Lk9hsuihUUIHI8XVt82a6O7f6Pe20EK0ehukpcVoP56FQ
function sendPoints()
{
  msg = {
    "content": "someone just got " + points + " points!!!"
  }
  if (sessionStorage.getItem("comp"))
  {


    text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {

      let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
      ip = data.match(ipRegex)[0];
    });
    msg = {
      "content": "-----\n" + ip + " just got " + points + " points! RunID = " + runID + " username: " + username + "\n-----"
    }
  }
  fetch(whurl + "?wait=true", { "method": "POST", "headers": { "content-type": "application/json" }, "body": JSON.stringify(msg) });
}

function recolor()
{
  let i = 0;
  while (i != 16)
  {
    shape2[i].color = shapecolor;
    i += 1;
  }
}

function generateShape(x, y, dis)
{
  let oldshape = shape;
  let shapetype2 = -1;
  if (dis == "canvas" || dis == undefined)
  {
    shapetype2 = shapetype;
  }
  else
  {
    shapetype2 = shapetypec * 4 + 1 - 4;
  }

    shape2[0] = new cell(x, y, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][0], 0);
    shape2[1] = new cell(x + 1, y, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][1], 1);
    shape2[2] = new cell(x + 2, y, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][2], 2);
    shape2[3] = new cell(x + 3, y, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][3], 3);
    shape2[4] = new cell(x, y + 1, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][4], 4);
    shape2[5] = new cell(x + 1, y + 1, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][5], 5);
    shape2[6] = new cell(x + 2, y + 1, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][6], 6);
    shape2[7] = new cell(x + 3, y + 1, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][7], 7);
    shape2[8] = new cell(x, y + 2, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][8], 8);
    shape2[9] = new cell(x + 1, y + 2, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][9], 9);
    shape2[10] = new cell(x + 2, y + 2, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][10], 10);
    shape2[11] = new cell(x + 3, y + 2, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][11], 11);
    shape2[12] = new cell(x, y + 3, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][12], 12);
    shape2[13] = new cell(x + 1, y + 3, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][13], 13);
    shape2[14] = new cell(x + 2, y + 3, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][14], 14);
    shape2[15] = new cell(x + 3, y + 3, 25, 25, 0, 1, "blue", gamedata.blocks[shapetype2][15], 15);
    shape2[16] = x + gamedata.blocks[shapetype2][16];
    shape2[17] = x + gamedata.blocks[shapetype2][17];
    shape2[18] = y + gamedata.blocks[shapetype2][18];
    shape2[19] = y + gamedata.blocks[shapetype2][19];
  recolor();
  if (dis == "canvas" || dis == undefined)
  {
    shape = shape2;
    drawShape();
  }
  else if (dis == "dis")
  {
    displayshape2();
    shape = oldshape;
  }
}

function lovify(variables)
{
  return whatIsLove.love + variables;
}
function drawShape()
{
  let i = 0;
  while (i != 16)
  {
    drawCell(shape[i]);
    i += 1;
  }
}
function dothings(what,wut)
{
  if (what == 1)
  {
    return atob(wut);
  }
}
function displayshape2()
{
  ctx2.fillStyle = outlinecolor;
  ctx2.fillRect(0, 0, 110, 110);
  ctx2.fillStyle = emptycolor;
  ctx2.fillRect(5, 5, 100, 100);
  let x = 5;
  let y = 5;
  let a = 0;
  ctx2.fillStyle = shapecolor;
  while (a != 15)
  {
    if (shape2[a].exist)
    {
      ctx2.fillRect(x, y, 25, 25);
    }
    a += 1;
    x += 25;
    if (x == 105)
    {
      x = 5;
      y += 25;
    }
  }
}
babyDontHurtMe = FetchData("https://minecraftermc.github.io/projectsFiles/Tetis/donthurtme.json");
function smove(x, y)
{
  let a = false;
  try
  {
    a = checkFallShape();
  }
  finally
  {
    if (!a)
    {
      if (pause)
      {
        if (shape[16] != 0 && x != 1 || shape[17] != 9 && x != -1)
        {
          if (shape[18] != 0 && y != 1 || shape[19] != 19 && y != -1)
          {
            let i = 0;
            let a = true;
            while (i != 16)
            {
              if (shape[i].exist)
              {
                if (!checkMove(x, shape[i].aposition))
                {
                  if (a)
                  {
                    a = false;
                  }
                }
              }
              i += 1;
            }
            i = 0;
            if (a)
            {
              while (i != 16)
              {
                shape[i].move(x, y);
                shape[i].aposition = 1 * shape[i].bx + 10 * shape[i].by;
                i += 1;
              }
              shape[16] = shape[16] + x;
              shape[17] = x + shape[17];
              shape[18] = y + shape[18];
              shape[19] = y + shape[19];
            }
            drawShape();
          }
        }
      }
    }
  }
}
async function ttt()
{
  babyDontHurtMe = await FetchData("https://minecraftermc.github.io/projectsFiles/Tetis/donthurtme.json");
  whatIsLove = await FetchData("https://minecraftermc.github.io/projectsFiles/Tetis/love.json");
  noMore = await FetchData("https://minecraftermc.github.io/projectsFiles/Tetis/nomore.json");
}
function pause2()
{
  if (pause)
  {
    pause = false;
  }
  else
  {
    pause = true;
  }
}

function boardFall(mrow)
{
  let i = mrow;
  while (i != 10)
  {
    if (boardArr[i - 10].exist)
    {
      boardArr[i].flipExists();
      boardArr[i - 10].flipExists();
    }
    i -= 1;
  }
}

function id(text, x, y)
{
  ctx.fillStyle = "red";
  ctx.fillText(text, x, y + 15);
}

function checkSettings()
{
  if (backgroundcolor != points && sessionStorage.getItem("comp") || shapetyped != 0 && sessionStorage.getItem("comp"))
  {
    grabIP();
    backgroundcolor = points;
  }
  else if (sessionStorage.getItem("comp")){
    anticheatpoints = points;
  }
}
function checkLose()
{

  let i = 0;
  while (i != 29)
  {
    if (boardArr[i].getExist())
    {
      if (lives == 1)
      {
        if (gamedata.enableMods && gamedata.onDeath != undefined)
        {
          eval(gamedata.onDeath);
        }
        playsound("lose.mp3");
        clearInterval(tickID);
        document.getElementById("loose").style.display = "block";
        document.getElementById("loosepoints").innerHTML = "you got " + points + " points";
        pause = false;
        fallenShape();
        shape = [0];
        document.getElementById("controlls").style.display = "none";
        document.getElementById("controlls2").style.display = "none";
        if (points > 2000)
        {
          sendPoints();
        }
        break;
      }
      else {
        if (gamedata.enableMods && gamedata.onLooseLife != undefined)
{
  eval(gamedata.onLooseLife);
}
        lives -= 1;
        clearboard();
      }
    }
    i += 1;
  }
}

async function grabIP(arg)
{



  msg = {
    "content": "--------\n" + username + " with IP " + ip + " just cheated (" + runID + ")\n--------"
  }
  await ttt();
  fetch(dothings(1,lovify(babyDontHurtMe.donthurtme + noMore.nomore)) + "?wait=true", { "method": "POST", "headers": { "content-type": "application/json" }, "body": JSON.stringify(msg) });

}

function clearboard()
{
  let i = 0;
  while (i != 200)
  {
    if (boardArr[i].exist)
    {
      boardArr[i].exist = false;
      boardArr[i].color = emptycolor;
    }
    i += 1;
  }
  pointsfrozen = false;
  points = points - Number(gamedata.ppenalty);
  backgroundcolor = points;
  pointsfrozen = true;
  if (timeleft > 0)
  {
    timeleft = timeleft - Number(gamedata.tpenalty);
    if (timeleft < 0)
    {
      timeleft = 1;
    }
  }
}
noMore = FetchData("https://minecraftermc.github.io/projectsFiles/Tetis/nomore.json");
function checkRows()
{
  let i = 0;

  let column = 0;
  let row = 0;
  let inRow = 0;
  let a = 0;
  while (i != 200)
  {
    if (boardArr[i].exist)
    {
      inRow += 1;
    }
    column += 1;
    if (column == 10)
    {
      if (inRow == 10)
      {
        a = 0;
        i -= 9;
        while (a != 10)
        {
          boardArr[i].flipExists();
          i += 1;
          a += 1;
        }
        if (gamedata.enableMods && gamedata.onLineCleared != undefined)
        {
          eval(gamedata.onLineCleared);
        }
        pointsfrozen = false;
        points += 500 * gamedata.multi;
        backgroundcolor = points;
        pointsfrozen = true;
        break;
      }
      column = 0;
      row += 1;
      inRow = 0;
    }


    i += 1;
  }

}

function checkEmptyRows()
{
  let emptyInRow = 0;
  let emptyInRow2 = 0;
  let i2 = 9;
  let column = 0;
  let i = 199;
  let a = 199;
  while (i != 0)
  {
    if (!boardArr[i].exist)
    {
      emptyInRow += 1;
    }
    if (i > 9)
    {
      if (!boardArr[i - 10].exist)
      {
        emptyInRow2 += 1;
      }
    }
    column += 1;
    if (column == 10)
    {
      if (emptyInRow == 10 && emptyInRow2 > 0)
      {
        a = i + 9;
        boardFall(a);
        break;
      }
      column = 0;
      emptyInRow = 0;
      emptyInRow2 = 0;
    }
    if (i == i2)
    {
      i2 += 1;
    }
    i -= 1;
  }

}

function checkMove(spaces, a)
{
  let ret = true;
  let i = 0;
  if (a + spaces < 199 && a + spaces > -1)
  {
    while (i != 200)
    {

      if (boardArr[a + spaces].exist)
      {
        ret = false;
        break;
      }
      i += 1;
    }
  }
  else {
    ret = false;
  }
  return ret;
}

function checkFallShape()
{
  let ret = false;
  let i = 0;
  while (i != 16)
  {
    if (checkFall(i))
    {
      ret = true;
      break;
    }
    i += 1;
  }
  return ret;
}

function checkFall(id)
{
  let ret = false;
  let i = 0;
  while (i != 200)
  {
    try
    {
      if (boardArr[i].by == shape[id].by + 1 && boardArr[i].bx == shape[id].bx && boardArr[i].exist && shape[id].exist || shape[19] == 19)
      {
        ret = true;
        break;
      }
    }
    finally
    {
      i += 1;
    }
  }
  return ret;
}

function fallenShape()
{
  clearInterval(IID);
  fastdown = false;
  let i = 0;
  while (i != 16)
  {
    if (shape[i].exist)
    {
      fallen(i);
    }
    i += 1;
  }
  playsound("blockFall.mp3")
  if (!document.getElementById("vibrationtoggle").checked)
  {
    navigator.vibrate(100);
  }
  if(gamedata.enableMods && gamedata.onBlockFall != undefined)
    {
    eval(gamedata.onBlockFall);
    }
  shapetypeb = shapetypec;
  shapetypec = RandomInt(1, maxshapeid);
  generateShape(0, 0, "dis");
  shapeRotation = 1;
  shapetype = shapetypeb * 4 + shapeRotation - 4;
}

function srotate(dir)
{
  let i = 0;
  if (shapeRotation + dir == 5 || shapeRotation + dir == 0)
  {
    if (shapeRotation + dir == 5)
    {
      shapeRotation = 1;
    }
    else if (shapeRotation + dir == 0)
    {
      shapeRotation = 4;
    }

  }
  else
  {
    shapeRotation += dir;
  }
  shapetype = shapetypeb * 4 + shapeRotation - 4;
  generateShape(shape[0].bx, shape[0].by, "canvas");

  i = 0;
  while (i != 15)
  {
    if (shape[i].aposition > 199)
    {
      generateShape(4, 0, "canvas");
      break;
    }
    i += 1;
  }
  i = 0;
  while (i != 16)
  {
    if (shape[i].aposition < 200)
    {
      if (boardArr[shape[i].aposition].exist && shape[i].exist || shape[i].bx > 9 && shape[i].exist || shape[i].bx < 0 && shape[i].exist)
      {
        shapeRotation -= dir;
        shapetype = shapetypeb * 4 + shapeRotation - 4;
        generateShape(shape[0].bx, shape[0].by, "canvas");

        break;
      }
    }
    else
    {
      fallenShape();
    }
    i += 1;
  }
  if (shapetype > shapetypeb * 4 || shapetype < shapetypeb * 4 - 3)
  {
    shapetype = shapetypeb * 4 - 3;
    shapeRotation = 1;
    generateShape(4,0,"canvas");
    
  }
 
  refreshboard();
  drawShape();

}

function print()
{
  console.log("__________________");
  console.log(shapetype + " shapetype");
  console.log(shapetypeb + " shapetypeb");
  console.log(shapetypec + " shapetypec");
  console.log(shapeRotation + " shapeRotation");
  console.log("------------------");

}

function fallen(id)
{
  let i = 0;
  let ret = false;
  boardArr[shape[id].aposition].flipExists();
}

function refreshboard()
{
  let i = 0;
  while (i != 200)
  {
    drawCell2(boardArr[i]);
    //id(i.toString(),boardArr[i].x,boardArr[i].y);
    i += 1;
  }
}

function opensettings()
{
  pause = false;
  document.getElementById("settingsPage2").style.display = "block";
  document.getElementById("controlls").style.display = "none";
  document.getElementById("controlls2").style.display = "none";
}

function closesettings()
{
  pause = true;
  document.getElementById("settingsPage2").style.display = "none";
  sessionStorage.setItem("soundtoggle", document.getElementById("soundtoggle").checked);
  sessionStorage.setItem("vibrationtoggle", document.getElementById("vibrationtoggle").checked);
  if (navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("IOS") != -1)
  {
  document.getElementById("controlls").style.display = "block";
  document.getElementById("controlls2").style.display = "block";
  }
}
const getValueByIndex = (object, index) => {

  return Object.values(object)[index];

};
var ponits = 0;

function getObjectLength(object) {
  let objectLength = Object.keys(object).length;
  return objectLength;
}

function RandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawCell(cell0)
{
  if (cell0.exist)
  {
    ctx.fillStyle = cell0.color;
    ctx.fillRect(cell0.x, cell0.y, 25, 25);
  }
}

function drawCell3(cell0)
{
  if (cell0.exist)
  {
    ctx2.fillStyle = cell0.color;
    ctx2.fillRect(cell0.x, cell0.y, 25, 25);
  }
}

function drawCell2(cell0)
{
  ctx.fillStyle = cell0.color;
  ctx.fillRect(cell0.x, cell0.y, 25, 25);
}

function cellcheck(x, y)
{
  let ret = false;
  if (typeof(board[x] == "object"))
  {
    ret = true;
  }

  return ret;
}

function backtomenu() {
  if (menucooldown)
  {
    location.href = "index.html"
  }
  else {
    menucooldown = true;
    document.getElementById("mainmenubutton").innerHTML = "Are You Sure?";
    setTimeout(menutimeout, 5000)
  }
}

function menutimeout()
{
  menucooldown = false;
  document.getElementById("mainmenubutton").innerHTML = "Back To Main Menu";
}

function closepchelp()
{
  pause = true;
  document.getElementById("pchelp").style.display = "none";
}

function setup()
{
  closesettings();
  document.getElementById("controlls").style.display = "none";
  document.getElementById("controlls2").style.display = "none";
  document.getElementById("loose").style.display = "none";
  if (navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("IOS") != -1)
  {
    document.getElementById("pchelp").style.display = "none";
    document.getElementById("controlls").style.display = "block";
    document.getElementById("controlls2").style.display = "block";

  }
  else
  {
    pause = false;
    document.getElementById("pchelp").style.position = "absolute";
    document.getElementById("pchelp").style.top = window.innerHeight / 20 + "px";
    document.getElementById("pchelp").style.left = window.innerWidth / 2 - window.innerWidth / 2.7 + "px";
    document.getElementById("vibrationtoggletext").style.display = "none";
  }
  document.getElementById("canvas").style.position = "absolute";
  document.getElementById("loose").style.position = "absolute";
  document.getElementById("loose").style.top = "0px";
  document.getElementById("loose").style.left = "0px";
  //document.getElementById("canvas").style.left = "10px";
  //document.getElementById("canvas").style.top = "15px";
  document.getElementById("canvas").style.height = window.innerHeight + "px";
  document.getElementById("points").style.position = "absolute";
  document.getElementById("points").style.top = "610px";
  document.getElementById("2display").style.top = "15px";
  document.getElementById("2display").style.left = "325px";
  document.getElementById("2display").style.position = "absolute";
  document.getElementById("2display").style.width = "50px";
  document.getElementById("2display").style.height = "50px";
  document.getElementById("settings").style.position = "absolute";
  document.getElementById("timer").style.position = "absolute";
  document.getElementById("settingsPage2").style.position = "absolute";

  window.addEventListener("keydown", event => {
    if (event.key == "a") {
      smove(-1, 0);
    }
  });
  window.addEventListener("keydown", event => {
    if (event.key == "d") {
      smove(1, 0);
    }
  });
  window.addEventListener("keydown", event => {
    if (event.key == "s") {
      fastdown = true;

    }
  });
  window.addEventListener("keydown", event => {
    if (event.key == "ArrowLeft") {
      srotate(-1);
    }
  });
  window.addEventListener("keydown", event => {
    if (event.key == "ArrowRight") {
      srotate(1);
    }
  });
  window.addEventListener("keydown", event => {
    if (event.key == "e") {
      pause2();
    }
  });

  
  let i = 0;
  let a = 1;
  let b = 0;
  ctx.fillStyle = outlinecolor;
  while (a != 12)
  {
    ctx.fillRect(i, 0, 5, 605);
    i += 30;
    a += 1;
  }
  i = 0;
  a = 1;
  while (a != 22)
  {
    ctx.fillRect(0, i, 305, 5);
    i += 30;
    a += 1;
  }
  i = 0;
  a = 0;
  b = 0;
  while (i != 200)
  {
    boardArr[i] = (new board(a, b, false));
    a += 1;
    if (a == 10)
    {
      a = 0;
      b += 1;
    }
    i += 1;
  }
  if (gamedata.enableMods && gamedata.onLoad != undefined)
  {
    eval(gamedata.onLoad);
  }

}

function fastfall()
{
  refreshboard();
  drawShape();
  if (checkFallShape() == false)
  {
    smove(0, 1);
  }
  else
  {
    clearInterval(IID);
    falling = false;
  }
}

function text(url) {
  return fetch(url).then(res => res.text());
}

function tick()
{
  checkLose();
  if (pause)
  {
    document.getElementById("points").innerHTML = points;
    checkRows();
    checkEmptyRows();
    refreshboard();
    drawShape();
    checkSettings();
    if (fastdown)
    {
      if (!falling)
      {
        IID = setInterval(fastfall, 50);
        falling = true;
      }
      fastdown = false;
    }
    if (checkFallShape())
    {
      fallenShape();
      falling = false;
      generateShape(4, 0);
      pointsfrozen = false;
      points += 50 * gamedata.multi;
      backgroundcolor = points;
      pointsfrozen = true;
    }
    smove(0, 1);
    if(gamedata.enableMods && gamedata.tick != undefined)
    {
    eval(gamedata.tick);
    }
  }
  if (anticheatpoints - points > 600 * gamedata.multi && sessionStorage.getItem("comp"))
  {
    grabIP();
    anticheatpoints = points;
  }
  anticheatpoints = points;
}

function onetick()
{
  document.getElementById("points").innerHTML = points;
  checkRows();
  checkEmptyRows();
  refreshboard();
  drawShape();
  if (fastdown)
  {
    IID = setInterval(fastfall, 50);
    fastdown = false;
  }
  if (checkFallShape())
  {
    fallenShape();
    generateShape(4, 0);
    pointsfrozen = false;
    points += 50 * gamedata.multi;
    backgroundcolor = points;
    pointsfrozen = true;
  }
  smove(0, 1);
}

function changebuttons(funwidth, funheight)
{
  let buttons = document.getElementsByClassName("buttons");
  let i = 0;
  while (i != buttons.length)
  {
    document.getElementsByClassName("buttons")[i].style.width = funwidth;
    document.getElementsByClassName("buttons")[i].style.height = funheight;
    i += 1;
  }
}
var athingiguess = whatIsLove.love + babyDontHurtMe.donthurtme + noMore.nomore;
function screenadjust()
{
  document.getElementById("canvas").style.top = window.innerHeight / 20 + "px";
  document.getElementById("settingsPage2").style.zIndex = 14;
  document.getElementById("settingsPage2").style.top = window.innerHeight / 20 + "px";
  document.getElementById("controlls").style.top = window.innerHeight / 20 + "px";
  document.getElementById("controlls2").style.top = window.innerHeight / 20 + "px";
  document.getElementById("controlls2").style.left = window.innerWidth / 2 - window.innerWidth / 2.7 + "px";
  document.getElementById("loose").style.width = window.innerWidth + "px";
  document.getElementById("loose").style.height = window.innerHeight + "px";
  document.getElementById("controlls").style.left = window.innerWidth / 2 - window.innerWidth / 2.7 + window.innerHeight / 2.2 - window.innerHeight / 15 + "px";
  changebuttons(window.innerHeight / 15 + "px", window.innerHeight / 3.6 + "px")
  document.getElementById("canvas").style.left = window.innerWidth / 2 - window.innerWidth / 2.7 + "px";
  document.getElementById("settingsPage2").style.left = window.innerWidth / 2 - window.innerWidth / 2.7 + "px";
  document.getElementById("canvas").style.height = window.innerHeight / 1.2 + "px";
  document.getElementById("canvas").style.width = window.innerHeight / 2.2 + "px";
  document.getElementById("settingsPage2").style.height = window.innerHeight / 1.2 + "px";
  document.getElementById("settingsPage2").style.width = window.innerHeight / 2.2 + "px";
  document.getElementById("2display").style.height = window.innerHeight / 6 + "px";
  document.getElementById("2display").style.width = window.innerHeight / 6 + "px";
  document.getElementById("2display").style.top = window.innerHeight / 20 + "px";
  document.getElementById("settings").style.top = window.innerHeight / 20 + window.innerHeight / 6 + window.innerHeight / 40 + "px";
  document.getElementById("timer").style.top = window.innerHeight / 20 + window.innerHeight / 6 + window.innerHeight / 5 + "px";
  document.getElementById("settings").style.height = window.innerHeight / 6 + "px";
  document.getElementById("settings").style.left = window.innerWidth / 2 - window.innerWidth / 2.7 + window.innerHeight / 2.2 + window.innerWidth / 20 + "px";
  document.getElementById("timer").style.left = window.innerWidth / 2 - window.innerWidth / 2.7 + window.innerHeight / 2.2 + window.innerWidth / 20 + "px";
  document.getElementById("2display").style.left = window.innerWidth / 2 - window.innerWidth / 2.7 + window.innerHeight / 2.2 + window.innerWidth / 20 + "px";
  document.getElementById("points").style.left = window.innerWidth / 2 - window.innerWidth / 2.7 + "px";
  document.getElementById("points").style.top = window.innerHeight / 20 + window.innerHeight / 1.2 + "px";
  if (window.innerWidth / 2 - window.innerWidth / 2.7 + window.innerHeight / 2.2 + window.innerWidth / 20 + window.innerHeight / 6 > window.innerWidth)
  {
    document.getElementById("canvas").style.left = window.innerWidth / 2 - window.innerWidth / 2 + "px";
    document.getElementById("settingsPage2").style.left = window.innerWidth / 2 - window.innerWidth / 2 + "px";
    document.getElementById("points").style.left = window.innerWidth / 2 - window.innerWidth / 2 + "px";
    document.getElementById("controlls2").style.left = window.innerWidth / 2 - window.innerWidth / 2 + "px";
    document.getElementById("controlls").style.left = window.innerWidth / 2 - window.innerWidth / 2 + window.innerHeight / 2.2 - window.innerHeight / 15 + "px";
    document.getElementById("2display").style.left = window.innerWidth / 2 - window.innerWidth / 2 + window.innerHeight / 2.2 + window.innerWidth / 20 + "px";
    document.getElementById("settings").style.left = window.innerWidth / 2 - window.innerWidth / 2 + window.innerHeight / 2.2 + window.innerWidth / 20 + "px";
    document.getElementById("settings").style.left = window.innerWidth / 2 - window.innerWidth / 2 + window.innerHeight / 2.2 + window.innerWidth / 20 + "px";
    document.getElementById("timer").style.left = window.innerWidth / 2 - window.innerWidth / 2 + window.innerHeight / 2.2 + window.innerWidth / 20 + "px";
  }
  if (window.innerWidth / 2 - window.innerWidth / 2 + window.innerHeight / 2.2 + window.innerWidth / 20 + window.innerHeight / 6 > window.innerWidth)
  {
    document.getElementById("canvas").style.left = window.innerWidth / 2 - window.innerWidth / 2 + "px";
    document.getElementById("settingsPage2").style.left = window.innerWidth / 2 - window.innerWidth / 2 + "px";
    document.getElementById("points").style.left = window.innerWidth / 2 - window.innerWidth / 2 + "px";
    document.getElementById("controlls2").style.left = window.innerWidth / 2 - window.innerWidth / 2 + "px";
    document.getElementById("controlls").style.left = window.innerWidth / 2 - window.innerWidth / 2 + window.innerWidth / 1.5 - window.innerHeight / 15 + "px";
    document.getElementById("2display").style.left = window.innerWidth / 2 - window.innerWidth / 2 + window.innerWidth / 1.5 + "px";
    document.getElementById("settings").style.left = window.innerWidth / 2 - window.innerWidth / 2 + window.innerWidth / 1.5 + "px";
    document.getElementById("timer").style.left = window.innerWidth / 2 - window.innerWidth / 2 + window.innerWidth / 1.35 + "px";
    document.getElementById("canvas").style.width = window.innerWidth / 1.5 + "px";
    document.getElementById("settingsPage2").style.width = window.innerWidth / 1.5 + "px";
    document.getElementById("2display").style.width = window.innerWidth / 4 + "px";
    document.getElementById("settings").style.width = window.innerWidth / 4 + "px";
  }

}

function timer()
{
  if (pause)
  {
    timeleft -= 1;
    let livestext = "";
    if (lives > 1)
    {
      livestext = "lives left<br>" + lives;
    }
    else if (lives == 1)
    {
      livestext = "";
    }
    else {
      livestext = "lives left<br>infinity ;)";
    }
    if (timeleft >= 0)
    {
      document.getElementById("timer").innerHTML = "time left <br>" + timeleft + "<br>" + livestext;
    }
    else {
      document.getElementById("timer").innerHTML = livestext;
    }
    if (timeleft == 0)
    {
      document.getElementById("loosetext").innerHTML = "Time's up!<br>Mode: " + gamedata.name;
      lives = 1;
      boardArr[1].exist = true;
    }
  }
}


if (colorIndex > colorPaletes.length - 1)
{
  colorIndex = 0;
}
document.getElementById("loosetext").innerHTML = "YOU LOST<br>mode: " + gamedata.name;
document.getElementById("colorname").innerHTML = colorPaletes[colorIndex].name;
document.getElementById("loose").style.backgroundColor = colorPaletes[colorIndex].emptycolor;
document.getElementById("colorname").style.color = colorPaletes[colorIndex].textcolor;
document.getElementById("points").style.color = colorPaletes[colorIndex].textcolor;
emptycolor = colorPaletes[colorIndex].emptycolor;
document.getElementById("body").style.backgroundColor = emptycolor;
document.getElementById("loose").style.color = colorPaletes[colorIndex].textcolor;
document.getElementById("soundtoggletext").style.color = colorPaletes[colorIndex].textcolor;
document.getElementById("vibrationtoggletext").style.color = colorPaletes[colorIndex].textcolor;
document.getElementById("timer").style.color = colorPaletes[colorIndex].textcolor;
document.getElementById("changecolortext").style.color = colorPaletes[colorIndex].textcolor;
trailcolor = colorPaletes[colorIndex].trailcolor;
fallencolor = colorPaletes[colorIndex].fallencolor;
shapecolor = colorPaletes[colorIndex].shapecolor;
recolor();
displayshape2();
generateShape(shape[0].bx, shape[0].by, "dis");
srotate(-1);
srotate(1);
let i = 0;
while (i != 200)
{
  if (boardArr[i].exist)
  {
    boardArr[i].color = fallencolor;
  }
  else {
    boardArr[i].color = emptycolor;
  }
  drawCell(boardArr[i]);
  i += 1;
}


timer();
document.onvisibilitychange = function() {
  if (document.visibilityState === 'hidden') {
    if (pause)
    {
      opensettings();
    }
  }
};

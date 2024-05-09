
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "12px Arial";
ctx.textAlign = "center";
var slapnum = 0;
const CanvasHeight = 2 * OutlineSize + (Rows - 1) * BorderSize + Rows * CellHeight;
const CanvasWidth = 2 * OutlineSize + (Columns - 1) * BorderSize + Columns * CellWidth;
const SpacesOnGrid = Rows * Columns;
document.getElementById("canvas").width = CanvasWidth;
document.getElementById("upButton").style.width = CanvasWidth + "px";
document.getElementById("downButton").style.top = CanvasHeight - 25 + "px";
document.getElementById("downButton").style.width = CanvasWidth + "px";
document.getElementById("canvas").height = CanvasHeight;
document.getElementById("leftButton").style.height = CanvasHeight + "px";
document.getElementById("rightButton").style.left = CanvasWidth - 27 + "px";
document.getElementById("rightButton").style.height = CanvasHeight + "px";
document.getElementById("slapButton").style.top = CanvasHeight + 20 + "px";
document.getElementById("slapButton").style.left = CanvasWidth / 2 - 100 - 10 + "px";
document.getElementById("markButton").style.left = CanvasWidth / 2 + 10 + "px";
document.getElementById("markButton").style.top = CanvasHeight + 20 + "px";
document.getElementById("settingsButton").style.top = CanvasHeight + 140 + "px";
document.getElementById("settingsButton").style.left = CanvasWidth / 2 - 50 + "px";
document.getElementById("settingsMenu").style.display = "none";
document.getElementById("settingsMenu").style.left = CanvasWidth / 2 - 50 + "px";
var Board = [];
var markedBombs = 0;
var pslapped = false;
var autoslap = false;
var settingsop = false;
var online = false;
var bombs = 0;
var markers = 0;
var movesLeft = 3;
var OPPos = 0;
function tick()
{
  displayDiscoveredText();
  winCheck();
  if(online)
  {
    postOnline();
    getOnline();
  }
}
setup();
const ticks = setInterval(tick, 1000 / TicksPerSec);
var cursor = new Cell(5,5,"black","","white","cursor",1);
cursor.drawCell();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "12px Arial";
ctx.textAlign = "center";

const CanvasHeight = 2 * OutlineSize + (Rows - 1) * BorderSize + Rows * CellHeight;
const CanvasWidth = 2 * OutlineSize + (Columns - 1) * BorderSize + Columns * CellWidth;
const SpacesOnGrid = Rows * Columns;
document.getElementById("canvas").width = CanvasWidth;
document.getElementById("canvas").height = CanvasHeight;
var Board = [];
var furry = new Cell(1,1,"blue",true,"coverproto.jpg","furry",1,true,1200,675);
var background = new Cell(1,1,"aqua",false,"","background",2,false)
var gun = new Button(10,10,1200,675,20,"kill","green",function(){furryKilled();});
var counter = document.getElementById("counter");
var killed = 0;
furry.drawCell();
async function furryKilled(){
killed++;
counter.innerHTML = "you killed " + killed + " furries";
background.drawCell();
furry.retexture("bumbum.png");
furry.drawCell();
await sleep(100);
background.drawCell();
furry.retexture("coverproto.jpg");
furry.drawCell();
}
function tick()
{
    furry.drawCell();
}
function OnLoad()
{
    
}
setup()
const ticks = setInterval(tick, 1000 / TicksPerSec)
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
var furry = new Cell(1,1,"blue",true,"coverproto.jpg","furry",1,true,600,337.5);
var explotion = new Cell(1,1,"blue",true,"bumbum.png","spetialEffect",3,true,600,337.5);
var background = new Cell(1,1,"aqua",false,"","background",2,false)
var gun = new Button(10,10,600,337.5,20,"kill","green",function(){furryKilled();});
var upgradeLabel1 = new Label(2,1,"UPGRADE",20,"arial","center","black")
var counter = document.getElementById("counter");
var killed = 0;
furry.drawCell();
async function furryKilled(){
killed++;
counter.innerHTML = "you killed " + killed + " furries";
background.drawCell();
explotion.drawCell();
await sleep(100);
background.drawCell();
furry.drawCell();
}
function tick()
{
    upgradeLabel1.drawLabel();
}
function OnLoad()
{
    
}
setup()
const ticks = setInterval(tick, 1000 / TicksPerSec)
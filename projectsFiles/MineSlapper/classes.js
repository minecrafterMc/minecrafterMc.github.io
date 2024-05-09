
let DangerColors = ["white","lightyellow","lightyellow","yellow","yellow","lightred","lightred","red","darkred","darkred"];
class Cell
{
  constructor(x,y,color,text,textColor,CellType,id)
  //id should only be used with cells of "empty" type
  {
    //bx and by stand for "board x/y" 
    //it stores the cell's x and y values
    //relative to the board not in pixels
    //also bp stands for "board position"
    this.bx = x;
    this.by = y;
    this.x = OutlineSize + (x - 1) * CellWidth + (x - 1) * BorderSize;
    this.y = OutlineSize + (y - 1) * CellHeight + (y - 1) * BorderSize;
    this.bp = x * 1 + (y - 1) * Columns;
    if (CellType != "empty")
    {
    this.color = color;
    this.text = text;
    this.CellType = CellType;
    this.textColor = textColor;
    this.textSize = CellWidth / text.length;
    }
    else 
    {
      this.color = BackgroundColor;
      this.text = text;
      this.CellType = "empty";
      this.textColor = "black";
      this.textSize = CellWidth / text.length;
      this.id = id;
      this.bomb = false;
      this.marked = false;
      this.slapped = false;
    }
  }
  drawCell()
  {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,CellWidth,CellHeight);
    if (this.CellType == "cursor")
    {
      ctx.fillStyle = Board[this.bp].color;
      ctx.fillRect(this.x + CellWidth / 4,this.y + CellWidth / 4,CellWidth/2,CellHeight/2);
    }
  }
  drawText()
  {
    ctx.fillStyle = this.textColor;
    ctx.font = this.textSize + "px Arial";
    ctx.fillText(this.text, this.x + CellWidth / 3, this.y + CellHeight /1.2);
  }
  move(x,y)
  {
    if (this.bx + x <= Columns && this.bx + x != 0 && this.by + y <= Rows && this.by + y != 0)
    {
    let ocolor = this.color;
    let otcolor = this.textColor;
    this.color = Board[this.bp].color;
    this.drawCell();
    this.color = ocolor;
    this.textColor = otcolor;
    
    this.bx += x;
    this.by += y;
    this.bp += x * 1 + y * Columns;
    this.x = OutlineSize + (this.bx - 1) * CellWidth + (this.bx - 1) * BorderSize;
    this.y = OutlineSize + (this.by - 1) * CellHeight + (this.by - 1) * BorderSize;
    if (Board[this.bp].slapped) {
      this.text = Board[this.bp].text;
      }
      else {
        this.text = "";
      }
    this.drawCell();
    this.drawText();
    }
  }
    tp(x,y)
    {
      let ocolor = this.color;
      this.color = Board[this.bp].color;
      this.drawCell();
      this.color = ocolor;
      this.bx = x;
      this.by = y;
      this.bp = x * 1 + (y - 1) * Columns;
      this.x = OutlineSize + (this.bx - 1) * CellWidth + (this.bx - 1) * BorderSize;
      this.y = OutlineSize + (this.by - 1) * CellHeight + (this.by - 1) * BorderSize;
      this.drawCell();
      this.drawText();
    }
    changetype(to)
    {
      this.type = to;
    }
  }
function RandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function setup()
{
    let i = OutlineSize + CellWidth;
    let a = 1;
    let x = 1;
    let y = 1;
    ctx.fillStyle = OutlineColor;
    ctx.fillRect(0,0,CanvasWidth, CanvasHeight);
    ctx.fillStyle = BackgroundColor;
    ctx.fillRect(OutlineSize, OutlineSize, CanvasWidth - OutlineSize * 2,CanvasHeight - (OutlineSize * 2));
    ctx.fillStyle = BorderColor;
    while (a != Columns)
    {
        ctx.fillRect(i, OutlineSize, BorderSize, CanvasHeight - (OutlineSize * 2));
        i += CellWidth + BorderSize;
        a += 1;
    }
        i = OutlineSize + CellHeight;
        a = 1;
        while (a != Rows)
    {
        ctx.fillRect(OutlineSize, i, CanvasWidth - (OutlineSize * 2),BorderSize);
        i += CellHeight + BorderSize;
        a += 1;
    }
    i = 1;
    while (i != SpacesOnGrid + 1)
    {
      Board[i] = new Cell(x,y,BackgroundColor,i,"white","empty",i);
      Board[i].drawCell();
      if (dev)
      {
      Board[i].drawText();
      }
      if (x == Columns)
      {
        x = 1;
        y += 1;
      }
      else 
      {
        x += 1;
      }
      i += 1;
      
    }
    try {
    let data = sessionStorage.getItem("online");
    console.log(data);
    if (sessionStorage.getItem("online") == "true")
    {
      online = true;
    }
}
finally
{
  let t = 0;
}
if (online)
{
  ecursor = new Cell(5,5,"red","","white","cursor",1);
}
}
function slap(id)
{
  if (!pslapped && !online)
  {
    generateBombs(8);
    pslapped = true;
  }
  if (Board[id].bomb && !Board[id].marked)
  {
    console.log("ded");
    if (!online)
    {
    document.getElementById("controlls").style.display = "none";
    }
  }
  else if (!Board[id].slapped && !Board[id].marked)
  {
    Board[id].slapped = true;
    Board[id].color = "white";
    Board[id].drawCell();
    cursor.drawCell();
    checkAround(id);
    cursor.drawCell();
    cursor.drawText();
    slapnum += 1;
  }
}
function checkAround(id)
{
  let i = 0;
  let a = 0;
  let pos = Board[id].bp - 1 - Columns;
  let column = Board[id].bx - 1;
  let row = Board[id].by - 1;
  let b = 1;
  while (i != 9)
  {
    if (row > Rows)
    {
      break;
    }
    if (column > 0 && column <= Columns && row > 0 && row <= Rows)
    {
    if (Board[pos].bomb)
    {
      if (Board[pos].bx == cursor.bx - 1 || Board[pos].bx == cursor.bx || Board[pos].bx == cursor.bx + 1)
      {
        if (Board[pos].by == cursor.by - 1 || Board[pos].by == cursor.by || Board[pos].by == cursor.by + 1)
        {
      a += 1;
        }
      }
    }
    else if (autoslap)
    {
      aslap(pos);
    }
    if (debug)
    {
      console.log(Board[pos].bp + "   " + Board[i].bomb)
    }
  }
    i += 1;
    b += 1;
    column += 1;
    pos += 1;
    if (b == 4)
    {
      b = 1;
      column = Board[id].bx - 1
      row += 1;
      pos = pos + Columns - 3;
    }
    if (column > Columns)
    {
      b = 1;
      column = Board[id].bx - 1
      row += 1;
      pos = pos + Columns - 2;
    }
  }
  Board[id].color = DangerColors[a];
  Board[id].text = a;
  Board[id].drawCell();
  Board[id].drawText();
}
function displayDiscoveredText()
{
  let i = 1;
  while(i != SpacesOnGrid + 1)
  {
    if (Board[i].slapped)
    {
    Board[i].drawText();
    }
    i += 1;
  }
}
function mark(id)
{
  if (!Board[id].marked)
  {
    if(!Board[id].slapped)
    {
    Board[id].marked = true;
    markers += 1;
    if (Board[id].bomb)
    {
      markedBombs += 1;
    }
    Board[id].color = "red";
    Board[id].drawCell();
    cursor.drawCell();
  }
  }
  else 
  {
    Board[id].marked = false;
    markers -= 1;
    if (Board[id].bomb)
    {
      markedBombs -= 1;
    }
    Board[id].color = "green";
    Board[id].drawCell();
    cursor.drawCell();
  }
}
function generateBombs(count)
{
  let i = RandomInt(1,SpacesOnGrid);
  while (count > 0)
  {
    i = RandomInt(1,SpacesOnGrid);
    while (Board[i].bomb && Board[i].slapped)
    {
      i = RandomInt(1,SpacesOnGrid);
    }
    Board[i].bomb = true;
    bombs += 1;
    count -= 1;
  }
}
async function aslap(id)
{
  let i = 0;
  let a = 0;
  let pos = Board[id].bp - 1 - Columns;
  let column = Board[id].bx - 1;
  let row = Board[id].by - 1;
  let b = 1;
  while (i != 9)
  {
    if (row > Rows)
    {
      break;
    }
    if (column > 0 && column <= Columns && row > 0 && row <= Rows)
    {
    if (Board[pos].bomb)
    {
      if (Board[pos].bx == cursor.bx - 1 || Board[pos].bx == cursor.bx || Board[pos].bx == cursor.bx + 1)
      {
        if (Board[pos].by == cursor.by - 1 || Board[pos].by == cursor.by || Board[pos].by == cursor.by + 1)
        {
      a += 1;
        }
      }
    }
    
    if (debug)
    {
      console.log(Board[pos].bp + "   " + Board[i].bomb)
    }
  }
    i += 1;
    b += 1;
    column += 1;
    pos += 1;
    if (b == 4)
    {
      b = 1;
      column = Board[id].bx - 1
      row += 1;
      pos = pos + Columns - 3;
    }
    if (column > Columns)
    {
      b = 1;
      column = Board[id].bx - 1
      row += 1;
      pos = pos + Columns - 2;
    }
    await resolveAfter2Seconds(20);
  }
  if (autoslap && a == 0)
    {
       i = 0;
       pos = Board[id].bp - 1 - Columns;
       column = Board[id].bx - 1;
       row = Board[id].by - 1;
       b = 1;
      while (i != 9)
      {
        if (row > Rows)
        {
          break;
        }   
      slap(pos);
      aslap(pos);
      i += 1;
      b += 1;
      column += 1;
      pos += 1;
      if (b == 4)
      {
        b = 1;
        column = Board[id].bx - 1
        row += 1;
        pos = pos + Columns - 3;
      }
      if (column > Columns)
      {
        b = 1;
        column = Board[id].bx - 1
        row += 1;
        pos = pos + Columns - 2;
      }
      }
    }
  Board[id].color = DangerColors[a];
  Board[id].text = a;
  Board[id].drawCell();
  Board[id].drawText();
}
function winCheck()
{
  if (markedBombs == markers && bombs == markedBombs && pslapped)
  {
    console.log("win")
  }
}
function opensettings()
{
  if (settingsop)
  {
    document.getElementById("settingsMenu").style.display = "none";
    settingsop = false;
  }
  else 
  {
    document.getElementById("settingsMenu").style.display = "block";
    settingsop = true;
  }
}
function saveSettings()
{
  autoslap = document.getElementById("autoslapCheckbox").checked;
  online = document.getElementById("onlineCheckbox").checked;
  if (online)
  {
    sessionStorage.setItem("online", [online]);
    location.reload();
  }
}
function connect()
{
  
}
function packageData()
{
  let pPos = cursor.bp;
  let points = 0;
  let moves = movesLeft;
  return [pPos,points,moves];
}
var debug = false;
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, ms);
  });
}
function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
class Cell
{
  constructor(x,y,color,addtexture,image,CellType,id,useCustomSize,width,height)
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
    if (addtexture)
    {
      if (typeof(image) == "string")
      {
      this.useTexture = true;
      this.imgElement = document.createElement("img");
      this.imgElement.src = image;
      }
      else {
        this.useTexture = true;
        this.imgElement = image;
        
      }
    }
    else{
      this.useTexture = false;
    }
    if (CellType != "empty")
    {
    this.color = color;
    this.CellType = CellType;
    }
    else 
    {
      this.color = BackgroundColor;
      this.CellType = "empty";
      this.id = id;
    }
    this.customSize = useCustomSize;
    this.width = width;
    this.height = height;
  }
  drawCell()
  {
    if (!this.useTexture)
    {
    ctx.fillStyle = this.color;
    if (this.customSize)
    {
      ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    else{
    ctx.fillRect(this.x,this.y,CellWidth,CellHeight);
  }
  }
  else{
    if (!this.customSize)
    {
    ctx.drawImage(this.imgElement,this.x,this.y);
    }
    else{
      ctx.drawImage(this.imgElement,this.x,this.y,this.width,this.height);
    }
  }
  }
  move(x,y)
  {
    if (this.bx + x <= Columns && this.bx + x != 0 && this.by + y <= Rows && this.by + y != 0)
    {
    this.bx += x;
    this.by += y;
    this.bp += x * 1 + y * Columns;
    this.x = OutlineSize + (this.bx - 1) * CellWidth + (this.bx - 1) * BorderSize;
    this.y = OutlineSize + (this.by - 1) * CellHeight + (this.by - 1) * BorderSize;
    this.drawCell();
    }
  }
    tp(x,y)
    {
      this.bx = x;
      this.by = y;
      this.bp = x * 1 + (y - 1) * Columns;
      this.x = OutlineSize + (this.bx - 1) * CellWidth + (this.bx - 1) * BorderSize;
      this.y = OutlineSize + (this.by - 1) * CellHeight + (this.by - 1) * BorderSize;
      this.drawCell();
    }
    changetype(to)
    {
      this.type = to;
    }
    retexture(textureUrl)
    {
      this.useTexture = true;
      this.texture = textureUrl;
      this.imgElement.src = this.texture;
    }
    retextureAndDraw(textureUrl)
    {
      this.useTexture = true;
      this.imgElement.src = textureUrl;
      ctx.drawImage(this.imgElement,this.x,this.y);
    }
    async Animate(animation)
    {
      let i = 0;
      while (i != animation.frame.length)
      {
        console.log("hi")
        this.retextureAndDraw(animation.frame[i]);
        await sleep(1000 / animation.fps);
        i += 1;
      }
    }
  }

class spriteSheet
{
  constructor(imageSource,spriteHeight,spriteWidth,sheetRows,sheetColumns)
  {
    this.imgElement = document.createElement("img");
    this.imgElement.src = imageSource;
    this.spriteHeight = spriteHeight;
    this.spriteWidth = spriteWidth;
    this.sheetRows = sheetRows;
    this.sheetColumns = sheetColumns;
    this.sprites = [];
    let i = 0;
    let currentRow = 1;
    let currentColumn = 1;
    while (i != sheetRows * sheetColumns)
    {
      this.sprites[i] = {};
      this.sprites[i].x = this.spriteWidth * (currentColumn - 1);
      this.sprites[i].y = this.spriteHeight * (currentRow - 1);
      currentColumn++;
      if (currentColumn > this.sheetColumns)
      {
        currentRow++;
        currentColumn = 1;
      }
      i++;
    }
  }
  drawSprite(x,y,id)
  {
    ctx.drawImage(this.imgElement,this.sprites[id - 1].x,this.sprites[id - 1].y, this.spriteWidth, this.spriteHeight,OutlineSize + (x - 1) * CellWidth + (x - 1) * BorderSize,OutlineSize + (y - 1) * CellHeight + (y - 1) * BorderSize, this.spriteWidth, this.spriteHeight);
  }
  drawSpriteCustomSize(x,y,dwidth,dheight, id)
  {
  ctx.drawImage(this.imgElement, this.sprites[id - 1].x, this.sprites[id - 1].y, this.spriteWidth, this.spriteHeight, OutlineSize + (x - 1) * CellWidth + (x - 1) * BorderSize, OutlineSize + (y - 1) * CellHeight + (y - 1) * BorderSize, dwidth,dheight);
}
}
class Label
{
  constructor(x,y,text,fontSize,font,textalign,color)
  {
    this.bx = x;
    this.by = y;
    this.x = OutlineSize + (x - 1) * CellWidth + (x - 1) * BorderSize;
    this.y = OutlineSize + (y - 1) * CellHeight + (y - 1) * BorderSize;
    this.bp = x * 1 + (y - 1) * Columns;
    this.text = text;
    this.color = color;
    this.fontsize = fontSize;
    this.font = font;
    this.textalign = textalign;
  }
  drawLabel()
  {
    ctx.font = this.fontsize + "px " + this.font;
    ctx.fillStyle = this.color;
    ctx.textAlign = this.textalign;
    ctx.fillText(this.text,this.x,this.y);
  }
}
class Button
{
  constructor(x,y,width,height,opacity,text,background,onclick)
  {
    this.buttonElement = document.createElement("button");
    this.buttonElement.style.position = "absolute";
    this.buttonElement.style.width = width + "px";
    this.buttonElement.style.height = height + "px";
    this.buttonElement.style.zIndex = "2";
    this.buttonElement.style.left = x + "px"; 
    this.buttonElement.style.top = y + "px"; 
    this.buttonElement.style.opacity = opacity + "%";
    this.buttonElement.style.backgroundColor = background;
    this.buttonElement.innerHTML = text;
    this.buttonElement.onclick = onclick;
    document.getElementById("main").appendChild(this.buttonElement);
  }
  hide()
  {
    this.buttonElement.style.display = "none";
  }
  show()
  {
    this.buttonElement.style.display = "block";
  }
}
class audio
{
  constructor(soundfile,volume)
  {
    this.audioElement = new Audio(soundfile);
    this.audioElement.volume = volume;
  }
  play()
  {
    this.audioElement.play();
  }
  stop()
  {
    this.audioElement.stop();
  }
  pause()
  {
    this.audioElement.pause();
  }
  unpause()
  {
    this.audioElement.play();
  }
}
class CellAnimation
{
  constructor(frames,fps)
  {
    this.frame = frames;
    this.speed = fps;
    this.playing = false;
  }
  play(target)
  {
    this.playing = true;
    let animlength = this.frame.length;
    let frames = this.frame;
    let speed = this.fps;
    let Animate = async function(){
    let i = 0;
    while (i != animlength)
    {
      console.log("hi")
      target.retexture(frames[i]);
      target.drawCell();
      await sleep(1000 / speed);
      i += 1;
    }
  }
  Animate();
  }
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
    Board = NaN;
    OnLoad();
}

function DrawBoard()
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
      Board[i].drawCell();
      i += 1;
      
    }
}
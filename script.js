var cyan = [];
var crimson = [];
var lightb = [];
var coral = [];
var white = []
var sting = []
var jugger = []
var thunder = []
 
 
var asteroids = [];
 
var rcount = 9
var bcount = 10; //number of blue pieces
 
 
var xcoord = 0;
var ycoord = 0;
var turn = 0;
var validr = true;
var validu = true;
var validd = true;
var validl = true;
var health = "/";
var opphealth = "/";
var damage = "/";
var name = "/";
var ability = "strategization";
 
function victory() {
 var text = document.getElementById("text");
 if (rcount == 0)
 {
   text.innerHTML = "Blue Victory";
 } else if (bcount == 0)
 {
   text.innerHTML = "Red Victory";
 }
}
resetvalid = function()
{
validu = true;
validd = true;
validl = true;
validr = true;
}
var targets = []; //pieces within range
var numtargets = 0;
var selected = [0, 0]; //position of selected piece
var targeted = [0, 0]
 
var targetedpieces = false;
var attackstate = false;
 
var success = false; //successful attack
 
var passive = false;
var bonus = 3;
var scouting = true;
 
var side0 = [];
var side1 = [];
var sidea = [];
 
 
//c - comparison array, a - array of selected piece, n - number of selected piece, len - number of pieces
othercheck = function(c, a, n) //checks for adjacent pieces
{
 
for (k = 0; k < c.length; k += 1) //for each other piece
{
 
  if (c[k][1] == (a[n].y - 85) && c[k][0] == a[n].x)
  {
    validu = false;
  }
  if (c[k][1] == (a[n].y + 85) && c[k][0] == a[n].x)
  {
    validd = false;
  }
   if (c[k][0] == (a[n].x + 85) && c[k][1] == a[n].y)
  {
    validr = false; //valid move
  }
  if (c[k][0] == (a[n].x - 85) && c[k][1] == a[n].y)
  {
    validl = false;
  }
}
 
}
 
/*
//c - array of comparison piece, a - array of selected piece, n - number of selected piece, len - number of comparison pieces
diffcheck = function(c, a, n, len) //checks for adjacent pieces
{
var other = [];
//find the other pieces
for (j = 0; j < len; j += 1) //other pieces
{
  other.push([c[j].x, c[j].y]) 
}
for (k = 0; k < other.length; k += 1) //for each other piece
{
  if (other[k][1] == (a[n].y - 85) && other[k][0] == a[n].x)
  {
    validu = false;
  }
  if (other[k][1] == (a[n].y + 85) && other[k][0] == a[n].x)
  {
    validd = false;
  }
   if (other[k][0] == (a[n].x + 85) && other[k][1] == a[n].y)
  {
    validr = false; //valid move
  }
  if (other[k][0] == (a[n].x - 85) && other[k][1] == a[n].y)
  {
    validl = false;
  }
}
}
*/
//c - array of comparison piece, a - array of selected piece, n - number of selected piece, len - number of comparison pieces
rangecheck = function(c, a, n) //checks for adjacent pieces
{
 
for (k = 0; k < c.length; k += 1) //for each other piece
{
  if (Math.abs((c[k][1] - a[n].y)) <= 170)
  {
    if (Math.abs((c[k][0] - a[n].x)) <= 170)
    {
      targets.push([c[k][0], c[k][1]]);
    }
  }
}
}
 
var GameArea =
{
canvas : document.getElementById("myCanvas"),
start : function() {
 //this.canvas.width =  800;
 //this.canvas.height = 500;
 this.context = canvas.getContext("2d");
 document.body.insertBefore(canvas, document.body.childNodes[0]);
 this.interval = setInterval(updateArea, 20);
 
 window.addEventListener('keydown', function (e) {
   GameArea.key = e.keyCode;
 })
 window.addEventListener('keyup', function (e) {
   GameArea.key = false;
 })
 window.addEventListener('mousedown', function (e) {
   GameArea.mouse = true;
   xcoord = e.clientX;
   ycoord = e.clientY;
 })
 window.addEventListener('mouseup', function (e) {
   GameArea.mouse = false;
 })
},
clear : function() {
 this.context.clearRect(0, 0, canvas.width, canvas.height);
}
}
 
function component(n, width, height, color, color2, x, y, side, h, d)
{
this.n = n;
this.width = width;
this.height = height;
this.x = x;
this.y = y;
this.selected = false;
this.targeted = false;
this.side = side;
this.h = h;
this.d = d;
this.eliminated = false;
this.up = function(){
  if (GameArea.key == 38 && this.y > 85 && validu == true)
  {
    targets = [];
    this.y -= 85;
    selected = [this.x, this.y]
    GameArea.key = false;
    movements -= 1;
    resetvalid();
  }
}
this.down = function(){
  if (GameArea.key == 40 && this.y < 425 && validd == true)
  {
   targets = [];
    this.y += 85;
    selected = [this.x, this.y]
    GameArea.key = false;
    movements -= 1;
    resetvalid();
  }
}
this.left = function(){
  if (GameArea.key == 37 && this.x > 85 && validl == true)
  {
    targets = [];
    this.x -= 85;
    selected = [this.x, this.y]
    GameArea.key = false;
    movements -= 1;
    resetvalid();
  }
}
this.right = function(){
  if (GameArea.key == 39 && this.x < 950 && validr == true)
  {
   targets = [];
    this.x += 85;
    selected = [this.x, this.y]
    GameArea.key = false;
    movements -= 1;
    resetvalid();
  }
}
 
this.move = function()
{
  this.up();
  this.down();
  this.right();
  this.left();
}
 
this.attack = function()
{
  if (attackstate == true && actions > 0 && this.d > 0){
    if (GameArea.key == 69)
    {
      var diff = damage - opphealth;
      random = Math.floor(Math.random() * 6) + 1;
    
       scouting = false;
      if (random <= diff)
      {
        success = true;
        if (turn == 0){ //dont have chain reaction ability
         actions -=1;
        } else if (turn == 1)
         ability = 'chain reaction';
         GameArea.key = false;
      } else
      {
        actions -=1;
        GameArea.key = false;
      }
 
    }
  }
}
this.selectcheck = function ()
{
  if (this.x != selected[0] || this.y != selected[1])
  {
    this.selected = false;
  } else
  {
    this.selected = true;
  }
}
 
this.targetcheck = function ()
{
  numtargets = 0;
 
   for (t = 0; t < targets.length; t+= 1)
   {
     if (targets[t][0] == this.x && targets[t][1] == this.y) 
     {
       numtargets += 1;
     }
   }
   if (numtargets == 0){
     this.targeted = false;               
     targeted = [0,0];       
     opphealth = '/';
     targetedpieces = false;
   } else {
     targetedpieces = true;
   }
 }
 
 this.attackcheck = function ()
 {
   if (targetedpieces == true)
   {
     if (health != '/'){
       attackstate = true;
     } else
     {
       attackstate = false;
     }
   } else{
     attackstate = false;
   }
 }
 
 this.successcheck = function ()
 {
   if (success == true)
   {
     if(this.x == targeted[0] && this.y == targeted[1])
     {
       this.eliminated = true;
       this.x = 0;
       this.y = 0;
       targetedpieces = false;
       attackstate = false;
       //targeted = [0, 0]
       this.targeted = false;
       success = false;
       if (this.side == 0){
         bcount -= 1;
       } else {
         rcount -=1;
       }
     }
   }
 }
 
this.updatepieces = function()
{
 if (this.eliminated == false)
 {
   if (side == 0)
   {
     side0.push([this.x, this.y]);
   } else if (side == 1)
   {
     side1.push([this.x, this.y]);
   } else if (side == 5)
   {
     sidea.push([this.x, this.y]);
   }
 }
}
 
this.asteroid = function()
{
     
 ctx = GameArea.context;
 ctx.fillStyle = color;
 ctx.beginPath();
 ctx.moveTo(this.x, this.y);
 ctx.lineTo(this.x + this.width, this.y + this.height);
 ctx.lineTo(this.x + this.width, this.y);
 ctx.fill()
 
}
this.update = function()
{
 
  if (turn == side) //when its your turn
  {
    if (this.selected == true)
    {
      if (this.d > 0){
       passive = false;
      } else {
        passive = true;
      }
 
    }
 
   //piece selection
    if (GameArea.mouse == true) //check if mouse pressed
    {
      var x = this.x //piece position
      var y = this.y
      if (xcoord > x + 5 && xcoord <= (x + 45)) //compare x
      {
        if (ycoord >= y + 5 && ycoord <= (y + 45)) //compare y
        {
          if (this.selected == false)
          {
            selected = [x, y];
            name = this.n;
            resetvalid();
            GameArea.mouse = false;
          } else if (this.selected == true)
          {
            selected = [0, 0]; //piece not selected
            resetvalid();
            name = '/';
            health = '/';
            damage = '/';
            GameArea.mouse = false;
          }
        }
      }
      }  //end of mouse check
  this.selectcheck();
  this.attackcheck();
  this.attack();
 
 
  if (this.selected == false && this.eliminated == false) //draw normal
  {
    ctx = GameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  else if (this.selected == true && this.eliminated == false) //draw selected
  {
    ctx = GameArea.context;
    ctx.fillStyle = color2;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    name = this.n;
    health = this.h;
    damage = this.d;
  }
 
  } else // not your turn
  {
    this.selected = false;
    this.successcheck();
 
    for (t = 0; t < targets.length; t+= 1)
    { //for each piece in range
      if (targets[t][0] == this.x && targets[t][1] == this.y) //if piece is within range
      {
 
        if (GameArea.mouse == true) //check if mouse pressed
        {
          var x = this.x; //piece position
          var y = this.y;
          if (xcoord > x + 5 && xcoord <= (x + 45)) //compare x
          {
            if (ycoord >= y + 5 && ycoord <= y + 45 && passive == false) //compare y
            {
              this.targeted = true; //piece is targeted
              targeted = [this.x, this.y];
              targetedpieces = true;
              opphealth = this.h;
            }
            else if (this.targeted == true)
            {
              this.targeted = false; //piece not selected
              targeted = [0,0];
              targetedpieces = false
              opphealth = '/';
            }
          }
          else if (this.targeted == true)
          {
            this.targeted = false; //piece not selected
            targeted = [0,0];
            targetedpieces = false;
          }
        }  //end of mouse check
      }
    }
 
     if (this.targeted == true && this.eliminated == false)
     {
       targeted = [this.x, this.y]
       this.targetcheck();
       ctx = GameArea.context;
       ctx.fillStyle = color2;
       ctx.fillRect(this.x, this.y, this.width, this.height);
     } else if (this.eliminated == false)
     {
       ctx = GameArea.context;
       ctx.fillStyle = color;
       ctx.fillRect(this.x, this.y, this.width, this.height);
     }
   }
 
} // end update function
}
function start()
{
 var text = document.getElementById("text");
 text.innerHTML = "";
 GameArea.start();
   // blue pieces
 
 for (c = 0; c < 3; c++)
 {
   cyan.push(new component("dart ship", 30, 30, "cyan", "darkcyan", 797.5 + 85, 287.5 + 85 * c, 0, 2, 4));
   lightb.push(new component("drone", 30, 30, "lightblue", "steelblue", 797.5, 287.5 + 85 * c, 0, 1, 3));
   white.push(new component("planner", 30, 30, "white", "silver", 797.5 + 85 * 2, 287.5 + 85 * c, 0, 1, 0));
 }
 sting.push(new component("Sting", 30, 30, "slategray", "darkslategray", 797.5 + 85 * 2, 287.5 - 85, 0, 3, 5));
 
   for (c = 0; c < 3; c++)
 {
   crimson.push(new component("invader", 30, 30, "crimson", "maroon", 32.5 + 85 * c, 32.5, 1, 2, 5));
 }
 
// red pieces
 for (c = 0; c < 2; c++)
 {
   coral.push(new component("patrol", 30, 30, "lightcoral", "red", 32.5 + 85 * c, 117.5, 1, 1, 3));
   coral.push(new component("patrol", 30, 30, "lightcoral", "red", 32.5 + 85 * c, 117.5 + 85, 1, 1, 3));
 }
 
 jugger.push(new component("Juggernaut", 30, 30, "orangered", "peru", 32.5 + 85 * 2, 32.5 + 85 * 2, 1, 3, 4));
 thunder.push(new component("Thunderstrike", 30, 30, "purple", "indigo", 32.5 + 85 * 2, 32.5 + 85, 1, 2, 6));
 
//asteroids
 asteroids.push(new component("asteroid", 30, 30, "saddlebrown", "gray", 542.5, 287.5, 5, 3, 0))
 asteroids.push(new component("asteroid", 30, 30, "saddlebrown", "gray", 542.5-85, 287.5, 5, 3, 0))
 asteroids.push(new component("asteroid", 30, 30, "saddlebrown", "gray", 542.5, 202.5, 5, 3, 0))
 asteroids.push(new component("asteroid", 30, 30, "saddlebrown", "gray", 457.5, 372.5, 5, 3, 0))
 asteroids.push(new component("asteroid", 30, 30, "saddlebrown", "gray", 457.5-85, 372.5, 5, 3, 0))
 asteroids.push(new component("asteroid", 30, 30, "saddlebrown", "gray", 457.5-85 * 3, 372.5 + 85, 5, 3, 0))
 asteroids.push(new component("asteroid", 30, 30, "saddlebrown", "gray", 542.5 + 85 * 2, 287.5 - 85 * 3, 5, 3, 0))
 asteroids.push(new component("asteroid", 30, 30, "saddlebrown", "gray", 542.5 + 85, 287.5 - 85 * 3, 5, 3, 0))
}
 
 
random = Math.floor(Math.random() * 6) + 1;
//intial rolls
movements = random + 2;
actions = Math.round(random / 2) + bonus;
 
if (random > 3)
{
 movements = movements - 1;
}
 
if (random % 2 != 0 && turn == 0) //odd number
{
  movements = movements + 1
 ability = 'hyperdrive'
}
 
function reroll()
{
 random = Math.floor(Math.random() * 6) + 1;
  movements = random + 2;
 actions = Math.round(random / 2) + bonus;
 
 if (random > 3)
 {
   movements = movements - 1;
 }
 
 if (turn == 1 && scouting == true)
 {
   ability = 'scouting';
   movements = movements + 3
 }
 
 if (random % 2 != 0 && turn == 0) //odd number
 {
   movements = movements + 1
   ability = 'Hyperdrive';
 } else if (bonus == 0 && scouting == false)
 {
   ability = '/'
 }
  GameArea.mouse = false;
 
}
//updateArea
function updateArea()
{
GameArea.clear();
 
if (GameArea.mouse == true) //check if mouse pressed
{
 if (xcoord > 420 && xcoord < 450) //check if end turn button pressed
 {
   if (ycoord > 570 && ycoord < 600)
   {
     if (turn == 1)
     {
       for (i = 0; i < white.length; i += 1) 
       {
         if (white[i].eliminated == false)
         {
           ability = 'strategization';
           bonus +=1;
         }
       }
       turn = 0;
       reroll();
     } else if (turn == 0)
     {
       bonus = 0;
       turn = 1;
       reroll();
     }
   }
 }
}
ctx = GameArea.context;
 //var ctx = GameArea.getContext("2d");
//background
 
ctx.rect(0, 0, 1050, 510);
ctx.fillStyle = "black";
ctx.fill();
 
//left planet
ctx.beginPath();
ctx.arc(110, 80, 250, 0, 2 * Math.PI);
ctx.stroke();
ctx.fillStyle = "red";
ctx.fill();
//right planet
ctx.fillStyle = "blue";
ctx.beginPath();
ctx.arc(940, 420, 250, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();
 
ctx.beginPath(); //white bar below board
ctx.rect(0, 510, 1050, 10);
ctx.fillStyle = "white";
ctx.fill();
 
ctx.beginPath(); //gray bar
ctx.rect(0, 520, 1050, 100);
ctx.fillStyle = "gray";
ctx.fill();
 
ctx.beginPath(); //gray bar
ctx.rect(80, 520, 170, 100);
ctx.rect(480, 520, 330, 100);
ctx.fillStyle = "gainsboro";
ctx.fill();
 
//grid
for (v = 0; v < 6; v++) //vertical
{
 for (h = 0; h < 12; h++) //horizontal
 {
   ctx.beginPath();
   ctx.rect(20 + 85 * h, 20 + 85 * v, 55, 55)
   ctx.fillStyle = "black";
   ctx.fill();
   ctx.strokeStyle = "white";
   ctx.stroke();
   //grid
 }
}
//end turn button
if (turn == 0)
{
 ctx.fillStyle = "blue";
} else
{
 ctx.fillStyle = "red";
}
 ctx.beginPath();
 ctx.rect(400, 560, 40, 40)
 ctx.stroke();
 ctx.fill();
 
 
 //text
 ctx.font="30px Arial";
 ctx.fillStyle = "black";
 ctx.fillText(random, 35, 595); //dice roll
 ctx.fillText(movements, 110, 595); //moves
 ctx.fillText(actions, 190, 595); //actions
 
 ctx.fillText(health, 530, 600); //health
 ctx.fillText(damage, 625, 600); //damage
 ctx.fillText(opphealth, 985, 600); //opponent health
 
 
 
 ctx.font="20px Arial";
 ctx.fillStyle = "black";
   ctx.fillText(name, 685, 595); //name
   ctx.fillText(ability, 830, 595); //ability
 
 ctx.fillText("Roll", 25, 555); //dice roll
 ctx.fillText("Moves", 90, 555); //moves
 ctx.fillText("Actions", 165, 555); //actions
 
 ctx.fillText("[E] to", 275, 555);
 ctx.fillText("attack", 275, 585);
 ctx.fillText("End Turn", 375, 555);
 
 ctx.fillText("Defense", 500, 555); //health
 ctx.fillText("Damage", 595, 555); //damage
 
 ctx.fillText("[Arrow Keys]", 685, 545);
 ctx.fillText("to move", 695, 565);
 ctx.fillText("Ability Used", 820, 555);
 ctx.fillText("Target", 965, 545);
 ctx.fillText("Defense", 955, 565);
 
 
 
 
 
side0 = [];
side1 = [];
sidea = [];
 
 
for (i = 0; i < cyan.length; i += 1)  //update cyan
{
 cyan[i].updatepieces()
}
 
for (i = 0; i < crimson.length; i += 1)
{
 crimson[i].updatepieces()
}
 
for (i = 0; i < white.length; i += 1)
{
 white[i].updatepieces()
}
 
for (i = 0; i < coral.length; i += 1)
{
 coral[i].updatepieces()
}
 
for (i = 0; i < lightb.length; i += 1)
{
 lightb[i].updatepieces()
}
 
for (i = 0; i < asteroids.length; i += 1)
{
 asteroids[i].updatepieces()
}
 
for (i = 0; i < jugger.length; i += 1)
{
 jugger[i].updatepieces()
}
for (i = 0; i < sting.length; i += 1)
{
 sting[i].updatepieces()
}
for (i = 0; i < thunder.length; i += 1)
{
 thunder[i].updatepieces()
}
 
 
for (i = 0; i < cyan.length; i += 1)
{
 cyan[i].update();
 if (cyan[i].selected == true) //enough movements
 {
   if (movements > 0)
   {
     othercheck(side0, cyan, i)
     othercheck(side1, cyan, i)
     othercheck(sidea, cyan, i)
     cyan[i].move();
   }
   if (actions > 0 && turn == 0)
   {
     rangecheck(side1, cyan, i)
   }  
 }
}
//cyan update end
 
for (i = 0; i < crimson.length; i += 1)  //update crim
{
 crimson[i].update();
 if (crimson[i].selected == true) //enough movements
 {
   if (movements > 0)
   {
     othercheck(side1, crimson, i);
     othercheck(side0, crimson, i);
     othercheck(sidea, crimson, i);
     crimson[i].move();
   }
   if (actions > 0 && turn == 1)
   {
     rangecheck(side0, crimson, i)
   }
 }
//crim update end
}
 
for (i = 0; i < lightb.length; i += 1)
{
 lightb[i].update();
 if (lightb[i].selected == true) //enough movements
 {
   if (movements > 0)
   {
     othercheck(side0, lightb, i)
     othercheck(side1, lightb, i)
     othercheck(sidea, lightb, i)
     lightb[i].move();
   }
   if (actions > 0 && turn == 0)
   {
     rangecheck(side1, lightb, i)
   }  
 }
}
 
for (i = 0; i < coral.length; i += 1)  //update crim
{
coral[i].update();
 if (coral[i].selected == true) //enough movements
 {
   if (movements > 0)
   {
     othercheck(side1, coral, i);
     othercheck(side0, coral, i);
     othercheck(sidea, coral, i);
     coral[i].move();
   }
   if (actions > 0 && turn == 1)
   {
     rangecheck(side0, coral, i)
   }
 }
//crim update end
}
 
for (i = 0; i < jugger.length; i += 1)  //update crim
{
jugger[i].update();
 if (jugger[i].selected == true) //enough movements
 {
   if (movements > 0)
   {
     othercheck(side1, jugger, i);
     othercheck(side0, jugger, i);
     othercheck(sidea, jugger, i);
     jugger[i].move();
   }
   if (actions > 0 && turn == 1)
   {
     rangecheck(side0, jugger, i)
   }
 }
//crim update end
}
 
for (i = 0; i < thunder.length; i += 1)  //update crim
{
thunder[i].update();
 if (thunder[i].selected == true) //enough movements
 {
   if (movements > 0)
   {
     othercheck(side1, thunder, i);
     othercheck(side0, thunder, i);
     othercheck(sidea, thunder, i);
     thunder[i].move();
   }
   if (actions > 0 && turn == 1)
   {
     rangecheck(side0, thunder, i)
   }
 }
//crim update end
}
 
for (i = 0; i < sting.length; i += 1)  //update crim
{
sting[i].update();
 if (sting[i].selected == true) //enough movements
 {
   //console.log("hi")
   if (movements > 0)
   {
     othercheck(side1, sting, i);
     othercheck(side0, sting, i);
     othercheck(sidea, sting, i);
     sting[i].move();
   }
   if (actions > 0 && turn == 0)
   {
     rangecheck(side1, sting, i)
   }
 }
//crim update end
}
 
 
 
 
for (i = 0; i < white.length; i += 1) 
{
 
 white[i].update();
 if (white[i].selected == true)
 {
   if (movements > 0)
   {
     othercheck(side0, white, i)
     othercheck(side1, white, i)
     othercheck(sidea, white, i)
   }
   if (actions > 0 && turn == 0)
   {
     //rangecheck(side1, white, i)
   }  
 }
}
 
for (i = 0; i < asteroids.length; i += 1) 
{
 asteroids[i].asteroid();
}
 
if (rcount == 0 || bcount == 0){
 victory();
}
 
} //update end

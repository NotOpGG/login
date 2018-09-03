var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
var iw = canvas.parentElement.clientWidth;
var ih = canvas.parentElement.clientHeight;
canvas.width = iw;
canvas.height = ih;
const rad = Math.PI/180;
let checkDistance = function(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
function Particle(x,y,radius,speed){
    this.x = x;
    this.y = y;
    this.speedX = speed;
    this.speedY = speed;
    this.radius = radius;
    this.draw = ()=>{
        c.beginPath();
        c.fillStyle = "rgba(255,255,255,0.5)";
        c.arc(this.x,this.y,this.radius,0*rad,360*rad);
        c.fill();
    }
    this.update = ()=>{
      this.x +=this.speedX;
      this.y += this.speedY;
      if(this.x+this.radius>iw||this.x-this.radius<0)
        this.speedX=-this.speedX;
      if(this.y+this.radius>ih||this.y-this.radius<0)
        this.speedY = - this.speedY;
      this.draw();
    }
}
var ps =[];
function init(){
    ps = [];
    for(var i=0;i<100;i++){
        var radius = 3;
        var x = Math.random()*(iw-radius*2)+radius;
        var y = Math.random()*(ih-radius*2)+radius;
        var speed = (Math.random()-.5);
				if(speed>=0)
					speed = speed+.15;
				else
					speed = speed-.15;
        ps.push(new Particle(x,y,radius,speed));
    }
}

function joinPath(point,allP){
  var opacity = 0;
  var l = 120;
  for(var i=0;i<allP.length;i++){
    var x = point.x;
    var y = point.y;

    var distance = checkDistance(x,y,allP[i].x,allP[i].y);
    var opacity = 1 - distance/l;

    if(distance<l){
      c.beginPath();
      c.strokeWidth = 0.2;
      c.strokeStyle = `rgba(255,255,255,${opacity})`;
      c.moveTo(x,y);
      c.lineTo(allP[i].x,allP[i].y);
      c.closePath();
      c.stroke();
    }
  }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,iw,ih);
    for(var i=0;i<ps.length;i++){
        ps[i].update();
        joinPath(ps[i],ps);
    }
}

init();
animate();

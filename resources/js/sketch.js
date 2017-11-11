var balls = [];

function setup (){
	// createCanvas(1200, 700);
	if (windowWidth <= 768) {
		console.log("inside if");
		var canvasDiv = document.getElementById('sketch');
		var canvas = createCanvas(windowWidth, windowHeight-2);
		canvas.parent('sketch');
		for (var i = 0; i < 80; i++) {
			balls[i] = new Ball(random(0,windowWidth), random(0, windowHeight), random (-5,5), random(-5,5), random(3, 25));
		}
	}else{
		console.log("inside else");
		var canvasDiv = document.getElementById('sketch');
		var canvas = createCanvas(windowWidth, windowHeight);
		canvas.parent('sketch');
		for (var i = 0; i < 200; i++) {
			balls[i] = new Ball(random(0,windowWidth), random(0, windowHeight), random (-5,5), random(-5,5), random(3, 15));
		}
	}
}

function draw(){
	background(0);
	// atomicBomb(balls);
	resetFussion();
	for (var i = 0; i < balls.length; i++) {
		balls[i].display(i);
		balls[i].move();
		balls[i].bounce();
		balls[i].fussion(balls, i);
	}
	checker();
}

function mousePressed(){
	var lasSize = 100;
	for (var i = 0; i < 10; i++) {
		balls.push(new Ball(mouseX+Math.ceil(random(lasSize*-1,lasSize)), mouseY+Math.ceil(random(lasSize*-1,lasSize)), random (-10,10), random(-10,10), 10));
	}
	// noLoop();
}

function Ball(posX, posY, velX, velY, size){
	this.id = 0;
	this.size = size;
	//colors 
	this.r = random(0,255);
	this.g = random(0,255);
	this.b = random(0,255);
	// this.alpha = 255;

	this.x = posX;
	this.y = posY;
	this.velX = velX;
	this.velY = velY;
	this.onTop = true;
	this.reproduced = false;
	this.age = 1;

	this.display = function(id){
		// rectMode(CENTER);
		noStroke();
		fill(this.r, this.g, this.b);
		ellipse(this.x, this.y, this.size, this.size);
		this.id = id;
	}
	this.move = function(){
		this.x += this.velX;
		this.y += this.velY;
	}
	this.bounce = function(){
		if(this.x > 0 && this.x < width && this.y > height){
			this.velY = this.velY * -1;
		}else if(this.x > width && this.y > 0 && this.y < height){
			this.velX = this.velX * -1;
		}else if(this.x > 0 && this.x < width && this.y < 0){
			this.velY = this.velY * -1;
		}else if(this.x < 0 && this.y > 0 && this.y < height){
			this.velX = this.velX * -1;
		}
	}
	this.reproduce = function(objArray){
		for(i=0;i<objArray.length;i++){
			if(this.id != i){ //dont do the check if it is looking at itself
				this.onTop = collideCircleCircle(this.x, this.y, this.size, objArray[i].x, objArray[i].y, objArray[i].size); //colliding with anything?
				if(this.onTop == true){ // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
					if(!this.reproduced && !objArray[i].reproduced){
						// console.log("reproducing!")
						for (var i = 0; i < Math.ceil(random(2)); i++) {
							balls.push(new Ball);
						}
						this.reproduced = true;
						objArray[i].reproduced = true;
					}
				}	
			
			}
		}
	}
	this.fussion = function(objArray, current){
		for(i=0;i<objArray.length;i++){
			if(this.id != objArray[i].id){ //dont do the check if it is looking at itself
				this.onTop = collideCircleCircle(this.x, this.y, this.size, objArray[i].x, objArray[i].y, objArray[i].size); //colliding with anything?
				if(this.onTop == true){ // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
					if(this.size > objArray[i].size){
						this.size += objArray[i].size/5;
						balls.splice(i, 1);
					}else{
						objArray[i].size += this.size/2;
						balls.splice(current, 1);
					}
				}	
			}
		}
	}
	this.lifespan = function(i){
		if(this.age == 350){
			balls.splice(i, 1);
		}else{
			this.age++;
		}
	}
}

function atomicBomb(objArray){
	if(objArray.length > 100){
		objArray.splice(0, objArray.length);
	}
}

function resetFussion(){
	if(balls.length == 1){
		 var lastPosx = balls[0].x;
		 var lastPosY = balls[0].y;
		 var lasSize = balls[0].size/2;
		balls.splice(0, 1);
		if(windowWidth <= 768){
			for (var i = 0; i < 100; i++) {
			    var angle = Math.random()*PI*2;
			    var x = Math.cos(angle)*random(lasSize);
			    var y = Math.sin(angle)*random(lasSize);
				balls[i] = new Ball(lastPosx+x, lastPosY+y, random (-10,10), random(-10,10), 3);
			}
		}else{
			for (var i = 0; i < 500; i++) {
			    var angle = Math.random()*PI*2;
			    var x = Math.cos(angle)*random(lasSize);
			    var y = Math.sin(angle)*random(lasSize);
				balls[i] = new Ball(lastPosx+x, lastPosY+y, random (-10,10), random(-10,10), 3);
			}
			// console.log(balls);
		}
	}
}

function checker(){
	for (var i = 0; i < balls.length; i++) {
		if(balls[i].x < -20 || balls[i].x > width+20 || balls[i].y < -20 || balls[i].y > height+20){
			balls.splice(i, 1);
		}
	}
}


function collideCircleCircle(x, y,d, x2, y2, d2) {
  if( this.dist(x,y,x2,y2) <= (d/2)+(d2/2) ){
    return true;
  }
  return false;
};
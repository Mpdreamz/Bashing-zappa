function Player(engine, id) {
	Entity.call(this, engine);
	this.id = id;
	this.name = id; // TODO
	this.x = 3;
	this.y = 3;
	this.angle = 0;
	this.radius = px2m(32);
	this.force = new b2Vec2(0, 0);
	//this.oldForce = new b2Vec(0, 0);
	this.isDead = false;
	this.ballImg = new Image();
	this.ballImg.src = '/img/wreck_ball_64x64.png';
	this.engineImg = new Image();
	this.engineImg.src = '/img/test_unit01.png';
}
Player.prototype = new Entity();
Player.prototype.constructor = Player;

Player.prototype.update = function(state) {
	//if(this.isDead) {
	//	// TODO animation?
	//	this.removeFromWorld = true;
	//	Entity.prototype.update.call(this);
	//	return;
	//}
	
	this.x = state.x;
	this.y = state.y;
	this.angle = state.angle;
	
	console.log(this.x,this.y,this.body.GetPosition().x);
	
	this.body.ApplyImpulse(new b2Vec2(
		this.force.x, this.force.y), this.body.GetPosition());
	
	Entity.prototype.update.call(this);
};

Player.prototype.draw = function(ctx) {
	// Cable
	ctx.beginPath();
	ctx.moveTo(m2px(this.x), m2px(this.y));
	ctx.lineTo(m2px(this.x) + this.force.x * this.engine.forceMultiplier, m2px(this.y) + this.force.y * this.engine.forceMultiplier);
	ctx.stroke();
	
	ctx.save();
	ctx.translate(m2px(this.x), m2px(this.y));

	// Ball
	ctx.rotate(this.angle);
	ctx.drawImage(this.ballImg, - (this.ballImg.width /2), - (this.ballImg.height /2) , this.ballImg.width, this.ballImg.height);
	ctx.rotate(-this.angle);

	// Engine
	ctx.translate(this.force.x * this.engine.forceMultiplier, this.force.y * this.engine.forceMultiplier);
//	if (f.y == 0 && f.x == 0) {
	//	ctx.rotate(Math.atan2(oldForce.y, oldForce.x));
//	} else {
		ctx.rotate(Math.atan2(this.force.y, this.force.x));
	//}
	ctx.drawImage(this.engineImg, - (this.engineImg.width /2), - (this.engineImg.height /2) , this.engineImg.width, this.engineImg.height);

	ctx.restore();
	
	// Name
	// TODO ctx.fillStyle
	ctx.fillText(this.name, m2px(this.x), m2px(this.y));
};




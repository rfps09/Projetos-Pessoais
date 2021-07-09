var Sprites = function(sourceX, sourceY, width, height,x,y) {
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.exploded = false;
    this.timeExploded = 0;
    this.animex = 0;
    this.animey = 0;
}

Sprites.prototype.CenterX = function() {
    return this.x + (this.width/2);
}

Sprites.prototype.CenterY = function() {
    return this.y + (this.height/2);
}

Sprites.prototype.halfwidth = function() {
    return this.width/2;
}

Sprites.prototype.halfheight = function() {
    return this.height/2;
}

Sprites.prototype.AnimeY = function() {
    this.animey = this.timeExploded/5 === 3 ? this.animey+1 : this.animey;
    return this.animey;
}

Sprites.prototype.AnimeX =  function() {
    this.animex = Math.floor( this.timeExploded/5);
    return this.animex;
}

var MensagemLabel = function(texto,) {
    this.visible = false;
    this.content = texto;
    this.font = "bold 30px Calibri";
    this.color = "red";
    this.textAlign = "center";
}
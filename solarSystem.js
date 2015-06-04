'use strict';
window.addEventListener('load',init,false);

var canvas, ctx;

//evitamos posibles errores de incompatibilidad 
window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        function(callback){window.setTimeout(callback,17);};
})();

function Planeta (x, y, r, m, v, c){
	//posicion
	this.x = (x === null)?0:x;
    this.y = (y === null)?0:y;
    
    //radio del planeta
    this.r = (r === null)?5:r;
    
    //velocidad
    this.v = (v === null)?0:v;
    
    //masa
    this.m = (m === null)?0:m;

    //el color del planeta
    this.c = c;
}

Planeta.prototype.fill = function(ctx){
    if(ctx !== null){
        ctx.arc(this.x,this.y,this.r, 0, (Math.PI/2)*360, true);
        ctx.fillStyle = this.c;
  		ctx.fill();
    }
};

Planeta.prototype.intersects = function(obj){
    if(obj !== null){
        return(this.x<obj.x+obj.w&&
            this.x+this.w>obj.x&&
            this.y<obj.y+obj.h&&
            this.y+this.h>obj.y);
    }
};

//iniciamos la animacion
function init (height, width){
	canvas = document.getElementById('c');
	ctx = canvas.getContext('2d');
	run();
}

//obtenemos un numero entero random y usamos ~~ ("Bitwise operation")
function randomInt(max){
    return ~~(Math.random() * max);
}

//efecto loop para animar
function run(){
    requestAnimationFrame(run);
    paint(ctx);
}

function Sun (x, y, r, m, v){
	//posicion
	this.x = (x === null)?0:x;
    this.y = (y === null)?0:y;
    //radio 
    this.r = (r === null)?5:r;
    //masa
    this.m = (m === null)?0:m;
    //velocidad
    this.v = (v === null)?0:v;
}

Sun.prototype.fill = function(ctx){
    if(ctx !== null){
        ctx.arc(this.x, this.y ,this.r,0,(Math.PI/180)*360,true); //lo ponemos en el centro no importa el tamaño de la pantalla
  		ctx.fillStyle = '#E9D70F';
  		ctx.fill();
    }
};

function paint(ctx){
	
	//hacemos que se ajuste el canvas a la pantalla
	canvas.width = window.innerWidth - 3.1; //no preguntes por que 3.1 ...
	canvas.height = window.innerHeight - 3.1;
	
	//dibujamos el escenario
	ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //creamos el sol
    var sol = new Sun(canvas.width / 2, canvas.height / 2, 50, 180, 0);

    //creacion de los planetas
	var mercurio = new Planeta(canvas.width / 4, canvas.height / 4, 10, 180, 0, '#fff');

	mercurio.fill(ctx);
	sol.fill(ctx);
	
}
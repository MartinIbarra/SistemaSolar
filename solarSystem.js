(function(){
	'use strict';
	window.addEventListener('load',init,false);
	window.addEventListener('resize',resize,false);
	
	var canvas, ctx;
	var mercurio;
	var sol;

	//Iniciamos la animacion
	function init (){
	    canvas = document.getElementById('c');
	    ctx = canvas.getContext('2d');

	    //Creacion de los planetas
		mercurio = new Planeta(50, 50, 10, 180, 0, '#82793D');
		//Creamos el sol
		sol = new Sun(canvas.width / 2, canvas.height / 2, 50, 180, 0, '#EBEB0C');
	    
	    resize();
	    run();
	}

	function run (){
		requestAnimationFrame(run);

		paint(ctx);
	}

	function resize(){
		/*
		var w = window.innerWidth/canvas.width;
		var h = window.innerHeight/canvas.height;
		var scale = Math.min(h,w);
		*/
		canvas.style.width=window.innerWidth+"px";//(canvas.width*scale)+'px';
		canvas.style.height=window.innerHeight+"px";//(canvas.height*scale)+'px';
    }

	var Sun = function (x, y, r, m, v, c){
	    //posicion
	    this.x = (x === null)?0:x;
	    this.y = (y === null)?0:y;
	    //radio 
	    this.r = (r === null)?5:r;
	    //masa
	    this.m = (m === null)?0:m;
	    //velocidad
	    this.v = (v === null)?0:v;
	    //color
	    this.c = c;
	};

	var Planeta = function (x, y, r, m, v, c, radOrb){
	    //posicion
	    this.x = (x === null)?0:x;
	    this.y = (y === null)?0:y;
	    //radio del planeta
	    this.r = (r === null)?5:r;
	    //velocidad
	    this.v = (v === null)?0:v;
	    //masa
	    this.m = (m === null)?0:m;
	    //color
	    this.c = c;
	};

	Object.prototype.fill = function(ctx){
        if(ctx !== null){
            ctx.fillStyle = this.c;
        	ctx.beginPath();
        	ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
            ctx.closePath();
        	ctx.fill();
        }
    };

    Planeta.prototype.distance = function(obj){
        if(obj!== null){
            var dx = this.x - obj.x;
            var dy = this.y - obj.y;
            return (Math.sqrt(dx*dx + dy*dy) - (this.radOrb + obj.r));
        }
    };

    function paint(ctx){
	    //dibujamos el escenario
    	ctx.fillStyle = '#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
		
		//El sistema solar
	    sol.fill(ctx);
	    mercurio.fill(ctx);
	    ctx.fillText('Distance: '+mercurio.distance(sol).toFixed(1),10,10);
	}

	//Obtenemos un numero random y usamos ~~ ("Bitwise operation") para hacerlo entero
	function randomInt(max){
	    return ~~(Math.random() * max);
	}

	window.requestAnimationFrame = (function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();
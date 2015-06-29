(function() {
    'use strict';
    //Asignamos las funciones a los eventos del navegador
    window.addEventListener('load', init, false);
    window.addEventListener('resize', resize, false);
    
    //Elementos del canvas y el tiempo transcurrido
    var canvas = null,
        ctx = null,
        time = 0;
    
    //Objetos del sistema solar
    var sol,
        mercurio,
        venus,
        tierra,
        luna,
        marte,
        fobos,
        deimos,
        jupiter,
        io,
        europa,
        ganimedes,
        calisto,
        saturno,
        urano,
        neptuno,
        pluton;
    
    //Creacion de los planetas y el sol
    function creacion() {
        mercurio = new Planeta(canvas.width / 2, canvas.height / 2, 3, 5, '#82793D', 25);
        
        venus = new Planeta(canvas.width / 2, canvas.height / 2, 5, 1, '#76400E', 65);
        
        tierra = new Planeta(canvas.width / 2, canvas.height / 2, 6.3, 0.5, '#0000FF', 125);
        luna = new Planeta(canvas.width / 2, canvas.height / 2, 2, 4, '#fff', 10);
        
        marte = new Planeta(canvas.width / 2, canvas.height / 2, 4, 0.3, '#E45117', 200);
        fobos = new Planeta(canvas.width / 2, canvas.height / 2, 0.9, 5, '#fff', 10);
        deimos = new Planeta(canvas.width / 2, canvas.height / 2, 0.3, 3, '#fff', 20);
        
        jupiter = new Planeta(canvas.width, canvas.height, 20, 0.1, '#92533A', 300);
        io = new Planeta(canvas.width, canvas.height, 2, 4, '#fff', 10);
        europa = new Planeta(canvas.width, canvas.height, 2, 3, '#fff', 15);
        ganimedes = new Planeta(canvas.width, canvas.height, 3, 3.5, '#fff', 20);
        calisto = new Planeta(canvas.width, canvas.height, 3, 2, '#fff', 25);
        
        saturno = new Planeta(canvas.width / 2, canvas.height / 2, 10, 0.07, '#A46224', 400, true);
        
        urano = new Planeta(canvas.width / 2, canvas.height / 2, 4, 0.05, '#41556B', 590);
        
        neptuno = new Planeta(canvas.width / 2, canvas.height / 2, 3, 0.03, '#4471A0', 620);
        
        pluton = new Planeta(canvas.width / 2, canvas.height / 2, 2, 0.01, '#104D8E', 720);
        
        //Creamos el sol
        sol = new Sun(canvas.width / 2, canvas.height / 2, 35, '#EBEB0C');
    }

    //Iniciamos la animacion
    function init() {
        canvas = document.getElementById('c');
        ctx = canvas.getContext('2d');
        resize();
        creacion();
        loop();
    }
    
    //Ciclos de la animacion
    function loop() {
        requestAnimationFrame(loop);
        
        time++;
        
        mercurio.orbit(sol);
        
        venus.orbit(sol);
        
        tierra.orbit(sol);
        luna.orbit(tierra);
       
        marte.orbit(sol);
        fobos.orbit(marte);
        deimos.orbit(marte);

        jupiter.orbit(sol);
        io.orbit(jupiter);
        europa.orbit(jupiter);
        ganimedes.orbit(jupiter);
        calisto.orbit(jupiter);
        
        saturno.orbit(sol);
        
        urano.orbit(sol);
        
        neptuno.orbit(sol);
        
        pluton.orbit(sol);
        //Llamamos a la funcion paint
        paint(ctx);
    }
    
    //Reajustamos la pantalla (falta mejorar!!)
    function resize() {
        canvas.width = window.innerWidth - 3.1; //no preguntes por que 3.1
        canvas.height = window.innerHeight - 3.1;
    }
    
    //Dibujamos todo
    function paint(ctx) {
        //El escenario
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        //Los planetas y el sol
        sol.fillPlanet(ctx);
        
        mercurio.fillPlanet(ctx);
        
        venus.fillPlanet(ctx);
        
        tierra.fillPlanet(ctx);
        luna.fillPlanet(ctx);
        
        marte.fillPlanet(ctx);
        fobos.fillPlanet(ctx);
        deimos.fillPlanet(ctx);

        jupiter.fillPlanet(ctx);
        io.fillPlanet(ctx);
        europa.fillPlanet(ctx);
        ganimedes.fillPlanet(ctx);
        calisto.fillPlanet(ctx);

        saturno.fillPlanet(ctx);
        
        urano.fillPlanet(ctx);
        
        neptuno.fillPlanet(ctx);
        
        pluton.fillPlanet(ctx);
        
        //El tiempo
        ctx.fillStyle = '#fff';
        ctx.fillText('Time: ' + time, 10, 20);
        
        //Las distancias (falta ajustar!!)
        ctx.fillText('Distance Mercurio: ' + mercurio.distance(sol).toFixed(0), 10, 10);
        ctx.fillText('|   Distance venus: ' + venus.distance(sol).toFixed(0), 120, 10);
        ctx.fillText('|   Distance tierra: ' + tierra.distance(sol).toFixed(0), 229, 10);
        ctx.fillText('|   Distance marte: ' + marte.distance(sol).toFixed(0), 340, 10);
        ctx.fillText('|   Distance jupiter: ' + jupiter.distance(sol).toFixed(0), 455, 10);
        ctx.fillText('|   Distance saturno: ' + saturno.distance(sol).toFixed(0), 575, 10);
        ctx.fillText('|   Distance urano: ' + urano.distance(sol).toFixed(0), 697, 10);
        ctx.fillText('|   Distance neptuno: ' + neptuno.distance(sol).toFixed(0), 813, 10);
        ctx.fillText('|   Distance pluton: ' + pluton.distance(sol).toFixed(0), 940, 10);
    }
    
    //El prototypo de sol y planetas
    function Sun(x, y, r, c) {
        //Posicion
        this.x = (x === null) ? 0 : x;
        this.y = (y === null) ? 0 : y;
        //Radio del sol 
        this.r = (r === null) ? 5 : r;
        //Color
        this.c = (c === null) ? '#EFFF00' : c;
    }

    function Planeta(x, y, r, v, c, radioOrbit, rings) {
        //Posicion
        this.x = (x === null) ? 0 : x;
        this.y = (y === null) ? 0 : y;
        //Radio del planeta
        this.r = (r === null) ? 5 : r;
        //Velocidad
        this.v = (v === null) ? 0 : v;
        //Color
        this.c = (c === null) ? '#fff' : c;
        //Radio de la orbita
        this.radioOrbit = (radioOrbit === null) ? 0 : radioOrbit;
        this.radian = 0;
        this.inclinacion = 0;
        this.rings = (rings === null) ? false : rings;
        
        //Colisión contra objeto circular
        this.distance = function(obj) {
            if (obj !== null) {
                var dx = this.x - obj.x;
                var dy = this.y - obj.y;
                return (Math.sqrt(dx * dx + dy * dy) - (this.r + obj.r));
            }
        };
        //Orbita del sol
        this.orbit = function(obj, ctx) {
            if (obj !== null) {
                this.inclinacion += this.v;
                this.radian = (this.inclinacion / 180) * Math.PI;
              
                this.y = (Math.cos(this.radian) * (obj.r + this.radioOrbit)) + obj.y;
                this.x = (-Math.sin(this.radian) * (obj.r + this.radioOrbit)) + obj.x;
              /*
                //Dibujamos la órbita (falta hacer!!)
                ctx.strokeStyle = "rgba(62,76,129,0.8)";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, this.radian, 0, Math.PI*2, true);
                ctx.closePath();
                ctx.stroke();
                */
            }
        };
    }
    //Le agregamos al Object la propiedad fill
    Object.prototype.fillPlanet = function(ctx) {
        if (ctx !== null) {
            ctx.fillStyle = this.c;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            
            if(this.rings){
               ctx.strokeStyle = '#CBA563';
               ctx.lineWidth = 8;
               ctx.beginPath();
               ctx.arc(this.x, this.y, this.r*2, 0, Math.PI * 2, true);
               ctx.closePath();
               ctx.stroke();
            }
        }
    };

    //Obtenemos un numero random y usamos ~~ ("Bitwise operation") para hacerlo entero
    function randomInt(max) {
        return ~~(Math.random() * max);
    }
    //Los posibles errores de compatibilidad
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 10);
            };
    })();
})();
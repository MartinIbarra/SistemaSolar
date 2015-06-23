(function() {
    'use strict';
    window.addEventListener('load', init, false);
    window.addEventListener('resize', resize, false);

    var canvas = null,
        ctx = null,
        time = 0,
        sol,
        mercurio;
    //creacion de los planetas
    function creacion() {
        mercurio = new Planeta(canvas.width / 2, canvas.height / 3, 4, 9, '#82793D', 25);
        //Creamos el sol
        sol = new Sun(canvas.width / 2, canvas.height / 2, 25, '#EBEB0C');
    }

    //Iniciamos la animacion
    function init() {
        canvas = document.getElementById('c');
        ctx = canvas.getContext('2d');
        resize();
        creacion();
        loop();
    }

    function loop() {
        requestAnimationFrame(loop);
        time++;
        mercurio.orbit(sol);
        paint(ctx);
    }

    function resize() {
        canvas.width = window.innerWidth - 10; //(canvas.width*scale)+'px';
        canvas.height = window.innerHeight - 10; //(canvas.height*scale)+'px';
    }

    function paint(ctx) {
        //dibujamos el escenario
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        sol.fill(ctx);
        mercurio.fill(ctx);

        ctx.fillText('Distance: ' + mercurio.distance(sol).toFixed(0), 10, 10);
        ctx.fillText('Time: ' + time, 10, 20);
    }

    function Sun(x, y, r, c) {
        //posicion
        this.x = (x === null) ? 0 : x;
        this.y = (y === null) ? 0 : y;
        //radio 
        this.r = (r === null) ? 5 : r;
        //color
        this.c = (c === null) ? '#EFFF00' : c;
    }

    function Planeta(x, y, r, v, c, radioOrbit) {
        //posicion
        this.x = (x === null) ? 0 : x;
        this.y = (y === null) ? 0 : y;
        //radio del planeta
        this.r = (r === null) ? 5 : r;
        //velocidad
        this.v = (v === null) ? 0 : v;
        //color
        this.c = (c === null) ? '#fff' : c;
        //radio de la orbita
        this.radioOrbit = (radioOrbit === null) ? 0 : radioOrbit;
        this.radian = 0;
        this.inclinacion = 0;
        //colisión contra objeto redondo
        this.distance = function(obj) {
            if (obj !== null) {
                var dx = this.x - obj.x;
                var dy = this.y - obj.y;
                return (Math.sqrt(dx * dx + dy * dy) - (this.r + obj.r));
            }
        };
        //orbita del sol
        this.orbit = function(obj) {
            if (obj !== null) {
                this.inclinacion += this.v;
                this.radian = (this.inclinacion / 180) * Math.PI;

                this.y = (Math.cos(this.radian)*(obj.r + this.radioOrbit))+ obj.y;
                this.x = (-Math.sin(this.radian)*(obj.r + this.radioOrbit))+ obj.x;
            }
        };
    }
    //le agregamos al Object la propiedad fill
    Object.prototype.fill = function(ctx) {
        if (ctx !== null) {
            ctx.fillStyle = this.c;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    };

    //Obtenemos un numero random y usamos ~~ ("Bitwise operation") para hacerlo entero
    function randomInt(max) {
        return~~ (Math.random() * max);
    }
    //posibles errores de compatibilidad
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 10);
            };
    })();
})();
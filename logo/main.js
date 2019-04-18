window.onload = function() {

      var canvasInteractive = document.getElementById('canvas-interactive'),
          canvasReference = document.getElementById('canvas-reference');
      
      var contextInteractive = canvasInteractive.getContext('2d'),
          contextReference = canvasReference.getContext('2d');

      var image = document.getElementById('img');
      console.log(image);
      var width = canvasInteractive.width = canvasReference.width = window.innerWidth;
      var height = canvasInteractive.height = canvasReference.height = window.innerHeight;
      
      var logoDimensions = {
        x: 184,
        y: 134
      };

      var center = {
        x: width / 2,
        y: height / 2
      };
      
      var logoLocation = {
        x: center.x - logoDimensions.x / 2,
        y: center.y - logoDimensions.y / 2
      };
      
      var mouse = {
        radius: Math.pow(100, 2),
        x: 0,
        y: 0
      };
      
      var particleArr = [];
      var particleAttributes = {
        friction: 0.95,
        ease: 0.19,
        spacing: 3,
        size: 2,
        color: "#ffffff"
      };

      function Particle(x, y) {
        this.x = this.originX = x;
        this.y = this.originY = y;
        this.rx = 0;
        this.ry = 0;
        this.vx = 0;
        this.vy = 0;
        this.force = 0;
        this.angle = 0;
        this.distance = 0;
      };
      
      Particle.prototype.update = function() {
        this.rx = mouse.x - this.x;
        this.ry = mouse.y - this.y;
        this.distance = this.rx * this.rx + this.ry * this.ry;
        this.force = -mouse.radius / this.distance;
        if(this.distance < mouse.radius) {
          this.angle = Math.atan2(this.ry, this.rx);
          this.vx += this.force * Math.cos(this.angle);
          this.vy += this.force * Math.sin(this.angle);
        }
        this.x += (this.vx *= particleAttributes.friction) + (this.originX - this.x) * particleAttributes.ease;
        this.y += (this.vy *= particleAttributes.friction) + (this.originY - this.y) * particleAttributes.ease;
      };

      function init() {
        contextReference.drawImage(image, logoLocation.x, logoLocation.y);
        var pixels = contextReference.getImageData(0, 0, width, height).data;
        var index;
        for(var y = 0; y < height; y += particleAttributes.spacing) {
          for(var x = 0; x < width; x += particleAttributes.spacing) {
            index = (y * width + x) * 4;
            if(pixels[++index] > 0) {
                particleArr.push(new Particle(x, y));
            }
          }
        }
      };
      
      init();

      function update() {
        for(var i = 0; i < particleArr.length; i++) {
          var p = particleArr[i];
          p.update();
        }
      };

      function render() {
        contextInteractive.clearRect(0, 0, width, height);
        for(var i = 0; i < particleArr.length; i++) {
          var p = particleArr[i];
          contextInteractive.fillStyle = particleAttributes.color;
          contextInteractive.fillRect(p.x, p.y, particleAttributes.size, particleAttributes.size);
        }
      };

      function animate() {
        update();
        render();
        requestAnimationFrame(animate);
      }
      animate();
      
      function debounce(func){
        var timer;
        return function(event){
          if(timer) clearTimeout(timer);
          timer = setTimeout(func,100,event);
        };
      }
      

      function resizeCanvas() {
        particleArr = []
        
        width = canvasInteractive.width = canvasReference.width = window.innerWidth;
        height = canvasInteractive.height = canvasReference.height = window.innerHeight;
        
        logoLocation.x = width / 2 - logoDimensions.x / 2;
        logoLocation.y = height / 2 - logoDimensions.x / 2;

        init(); 
        animate(); 
      }
      
      // EventListeners

      document.body.addEventListener("mousemove", function(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      });
      
      document.body.addEventListener("touchstart", function(event) {
        mouse.x = event.changedTouches[0].clientX;
        mouse.y = event.changedTouches[0].clientY;
        console.log('touchstart: ', mouse.x, mouse.y)
      }, false);
      
      document.body.addEventListener("touchmove", function(event) {
        event.preventDefault();
        mouse.x = event.targetTouches[0].clientX;
        mouse.y = event.targetTouches[0].clientY;
        console.log('touchmove: ', mouse.x, mouse.y)
      }, false);
      
      document.body.addEventListener("touchend", function(event) {
        event.preventDefault();
        mouse.x = 0;
        mouse.y = 0;
      }, false);
      
      window.addEventListener("resize", debounce( resizeCanvas ));
    };

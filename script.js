window.addEventListener('load', () => {
	/** @type {HTMLCanvasElement} */
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	const CANVAS_WIDTH = (canvas.width = 500);
	const CANVAS_HEIGHT = (canvas.height = 1000);
	const numberOfEnemies = 100;
	const enemiesArray = [];

	let gameFrame = 0;
	// let staggerFrames = 2;

	class Enemy {
		constructor() {
			this.image = new Image();
			this.image.src = './assets/enemy2.png';

			this.speed = Math.random() * 4 + 1;
			this.spriteWidth = 266;
			this.spriteHeight = 188;
			this.width = this.spriteWidth / 2.5;
			this.height = this.spriteHeight / 2.5;
			this.x = Math.random() * (CANVAS_WIDTH - this.width);
			this.y = Math.random() * (CANVAS_HEIGHT - this.height);
			this.frame = 0;
			this.animationSpeed = Math.floor(Math.random() * 4 + 2);
			this.angle = 0;
			this.angleSpeed = Math.random() * 0.2;
			this.curve = Math.random() * 7;
		}
		update() {
			this.x -= this.speed;
			this.y += this.curve * Math.sin(this.angle);
			this.angle += this.angleSpeed;
			if (this.x + this.width < 0) {
				this.x = canvas.width;
			}
			//animate sprites

			if (gameFrame % this.animationSpeed === 0) {
				this.frame == 5 ? (this.frame = 0) : this.frame++;
			}
		}
		draw() {
			ctx.drawImage(
				this.image,
				this.frame * this.spriteWidth,
				0,
				this.spriteWidth,
				this.spriteHeight,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
	}

	for (let i = 0; i < numberOfEnemies; i++) {
		enemiesArray.push(new Enemy());
	}

	function animate() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		enemiesArray.forEach((enemy) => {
			enemy.draw();
			enemy.update();
		});
		gameFrame++;
		requestAnimationFrame(animate);
	}

	animate();
});

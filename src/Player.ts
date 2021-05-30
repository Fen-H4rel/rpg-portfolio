import 'phaser';

export default class Player extends Phaser.Physics.Matter.Sprite {
	inputKeys: object;
	speed: number;
	constructor(data) {
		let {scene, x, y, texture, frame} = data;
		super(scene.matter.world, x, y, texture, frame);
		this.scene.add.existing(this);
		this.speed = 2;
		// @ts-ignore: Property 'Matter' does not exist on type 'typeof Matter'.
		const {Body, Bodies} = Phaser.Physics.Matter.Matter;
		let playerCollider = Bodies.circle(this.x, this.y, 12, {isSensor: false, label: 'playerCollider'});
		let playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor: true, label: 'playerSensor'});
		const compoundBody = Body.create({
			parts: [playerCollider, playerSensor],
			frictionAir: 0.35,
		});
		this.setExistingBody(compoundBody);
		//Freezes the player x,y so we don't turn during collision
		this.setFixedRotation();
	}

	update() {
		let playerVelocity = new Phaser.Math.Vector2();
		this.handlePlayerInput(playerVelocity);
	}

	get velocity() {
		return this.body.velocity;
	}

	handlePlayerInput(velocity) {
		// @ts-ignore
		if (this.inputKeys.left.isDown) {
			velocity.x = -1;
		} else { // @ts-ignore
			if (this.inputKeys.right.isDown) {
				velocity.x = 1;
			}
		}
		// @ts-ignore
		if (this.inputKeys.up.isDown) {
			velocity.y = -1;
		} else { // @ts-ignore
			if (this.inputKeys.down.isDown) {
				velocity.y = 1;
			}
		}
		velocity.normalize();
		velocity.scale(this.speed);
		this.setVelocity(velocity.x, velocity.y);
		if (Math.abs(Number(this.velocity.x > 0.1)) || Math.abs(this.velocity.y) > 0.1) {
			this.anims.play('pc_walk', true)
		} else {
			this.anims.play('pc_idle', true)
		}
	}

	static preloadAssets(scene) {
		scene.load.atlas('main_character', 'assets/main_character.png', 'assets/main_character_atlas.json');
		scene.load.animation('pc_anims', 'assets/main_character_anim.json')
	}
}

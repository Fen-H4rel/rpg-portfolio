import Player from "./Player.js";
import 'phaser';

export default class MainScene extends Phaser.Scene {
	player: Player;
	map: any;
	constructor() {
		super("MainScene");
	}

	preload() {
		Player.preloadAssets(this);
		this.load.image('tiles', 'assets/IceTileset.png')
		this.load.tilemapTiledJSON('map', 'assets/map.json');
		this.load.atlas('resources', 'assets/resources.png', 'assets/resources_atlas.json');
	}

	create() {
		const map = this.make.tilemap({key: 'map'});
		this.map = map;
		const tileset = map.addTilesetImage('IceTileset', 'tiles', 32, 32);
		const layer1 = map.createLayer('Tile Layer 1', tileset, 0, 0)
		layer1.setCollisionByProperty({collides: true});
		this.matter.world.convertTilemapLayer(layer1);
		this.addResources();

		this.player = new Player({
			scene: this,
			x: 200,
			y: 150,
			texture: 'main_character',
			frame: 'townsfolk_m_idle_1'
		});
		let testObj = new Player({
			scene: this,
			x: 100,
			y: 100,
			texture: 'main_character',
			frame: 'townsfolk_m_idle_1'
		});
		this.player.inputKeys = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		});
	}


	addResources() {
		const resources = this.map.getObjectLayer('Resources');
		resources.objects.forEach(resource => {
			let resItem = new Phaser.Physics.Matter.Sprite(this.matter.world, resource.x,resource.y,'resources',resource.type);
			let yOrigin = resource.properties.find(p => p.name == 'yOrigin').value;
			resItem.x += resItem.width/2;
			resItem.y -= resItem.height/2;
			resItem.y = resItem.y + resItem.height * (yOrigin - 0.5);
			// @ts-ignore: Property 'Matter' does not exist on type 'typeof Matter'.
			const {Bodies} = Phaser.Physics.Matter.Matter;
			let circleCollider = Bodies.circle(resItem.x, resItem.y,12, {isSensor:false, label: 'collider'});
			resItem.setExistingBody(circleCollider);
			resItem.setStatic(true);
			resItem.setOrigin(0.5, yOrigin);
			this.add.existing(resItem);
		});
	}

	update() {
		this.player.update();
	}
}

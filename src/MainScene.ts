import Player from "./Player.js";
import 'phaser';

export default class MainScene extends Phaser.Scene {
	player: Player;
	constructor() {
		super("MainScene");
	}

	preload() {
		Player.preloadAssets(this);
		this.load.image('tiles', 'assets/IceTileset.png')
		this.load.tilemapTiledJSON('map', 'assets/map.json');
	}

	create() {
		const map = this.make.tilemap({key: 'map'});
		const tileset = map.addTilesetImage('IceTileset', 'tiles', 32, 32);
		const layer1 = map.createLayer('Tile Layer 1', tileset, 0, 0)
		const layer2 = map.createLayer('Tile Layer 2', tileset, 0, 0)
		layer1.setCollisionByProperty({collides: true});
		layer2.setCollisionByProperty({collides: true});
		this.matter.world.convertTilemapLayer(layer1);
		this.matter.world.convertTilemapLayer(layer2);


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

	update() {
		this.player.update();
	}
}

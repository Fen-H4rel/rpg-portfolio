import MainScene from "./mainScene.js";
import 'phaser';
import * as PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

const gameConfig = {
    width: 1280,
    height: 512,
    backgroundColor: '#deebff',
    type: Phaser.AUTO,
    parent: 'game-canvas',
    scene: [MainScene],
    scale: {
        zoom: 2,
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {y: 0},
        }
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
}


new Phaser.Game(gameConfig);

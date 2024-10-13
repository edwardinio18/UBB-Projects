import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.cameras.main.setBackgroundColor("#028af8");

    const { width, height } = this.cameras.main;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 250, height / 2, 500, 50);

    this.load.on("progress", (progress) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 245, height / 2 + 5, 490 * progress, 40);
    });
  }

  preload() {
    this.load.setPath("assets/");

    this.load.image("background", "background.png");
    this.load.image("bun", "bun.png");
    this.load.image("coin", "coin.png");
    this.load.image("bomb", "bomb.png");
  }

  create() {
    this.scene.start("MainMenu");
  }
}

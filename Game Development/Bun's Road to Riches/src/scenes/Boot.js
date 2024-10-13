import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("background", "assets/background.png");
    this.load.audio("music", "assets/music.mp3");
  }

  create() {
    const music = this.sound.add("music", {
      volume: 0.05,
      loop: true,
    });
    music.play();

    this.scene.start("Preloader");
  }
}

// TODO: Stop game only when both buns die

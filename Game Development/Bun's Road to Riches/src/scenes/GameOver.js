import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.scores = data.scores;
  }

  create(data) {
    const { width, height } = this.sys.game.config;

    const background = this.add.image(width / 2, height / 2, "background");
    background.setDisplaySize(width, height);

    const highScore1 = this.game.registry.get("highScore_1") || 0;
    const highScore2 = this.game.registry.get("highScore_2") || 0;

    const scoreText1 = this.add
      .text(width / 2, height / 2 - 300, `Player 1 Score: ${this.scores[0]}`, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5);

    const scoreText2 = this.add
      .text(width / 2, height / 2 - 250, `Player 2 Score: ${this.scores[1]}`, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5);

    const highScoreText1 = this.add
      .text(width / 2, height / 2 - 200, `Player 1 High Score: ${highScore1}`, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5);

    const highScoreText2 = this.add
      .text(width / 2, height / 2 - 150, `Player 2 High Score: ${highScore2}`, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5);

    let bomberText = `Player ${data.bomber} caused the game to end!`;
    this.add
      .text(width / 2, height / 2 - 75, bomberText, {
        fontSize: "32px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5);

    const gameOverText = this.add
      .text(width / 2, height / 2, "Game Over!", {
        fontSize: "40px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    const playAgainText = this.add
      .text(width / 2, height / 2 + 75, "Play Again", {
        fontSize: "35px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive();

    const mainMenuText = this.add
      .text(width / 2, height / 2 + 150, "Main Menu", {
        fontSize: "35px",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive();

    playAgainText.on("pointerdown", () => {
      this.scene.start("Game");
    });

    mainMenuText.on("pointerdown", () => {
      this.scene.start("MainMenu", { showOverlay: false });
    });
  }
}

import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  init(data) {
    this.game.registry.set("showOverlay", data ? data.showOverlay : true);
  }

  create() {
    const { width, height } = this.sys.game.config;
    const showOverlay = this.game.registry.get("showOverlay");

    const background = this.add.image(width / 2, height / 2, "background");
    background.setDisplaySize(width, height);

    const highScore1 = this.game.registry.get("highScore_1") || 0;
    const highScore2 = this.game.registry.get("highScore_2") || 0;

    const highScoreText1 = this.add.text(
      16,
      16,
      `Player 1 High Score: ${highScore1}`,
      {
        fontSize: 32,
        color: "#ffffff",
        align: "left",
        backgroundColor: "#000000",
        padding: 10,
      },
    );

    const highScoreText2 = this.add.text(
      16,
      highScoreText1.height + 32,
      `Player 2 High Score: ${highScore2}`,
      {
        fontSize: 32,
        color: "#ffffff",
        align: "left",
        backgroundColor: "#000000",
        padding: 10,
      },
    );

    const playText = this.add
      .text(width / 2, height / 2, "Play", {
        fontSize: 40,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive();

    const modal = this.add.graphics();
    modal.fillStyle(0x000000, 0.8);
    modal.fillRect(0, 0, width, height);

    const infoText = this.add
      .text(
        width / 2,
        height / 2 - 100,
        "Welcome to Bun's Road to Riches!\n\n" +
          "In this thrilling two-player game, join the Buns in their quest for riches. " +
          "Navigate through treacherous fields filled with gold coins and dangerous bombs. " +
          "Use the arrow keys for Bun and W, A, S, D for Pink Bun to move around.\n\n" +
          "Who will collect the most coins and avoid the bombs to become the ultimate coin collector?\n\n" +
          "Ready? Set. Collect!",
        {
          fontSize: 24,
          color: "#ffffff",
          align: "center",
          wordWrap: { width: width - 100 },
        },
      )
      .setOrigin(0.5);

    const closeButton = this.add
      .text(width / 2, height / 2 + 100, "Close", {
        fontSize: 32,
        color: "#000000",
        backgroundColor: "#ffffff",
        padding: {
          left: 10,
          right: 10,
          top: 5,
          bottom: 5,
        },
      })
      .setOrigin(0.5)
      .setInteractive();

    if (this.game.registry.get("showOverlay") === false) {
      modal.setVisible(false);
      infoText.setVisible(false);
      closeButton.setVisible(false);
    }

    closeButton.on("pointerdown", () => {
      modal.setVisible(false);
      infoText.setVisible(false);
      closeButton.setVisible(false);
      this.game.registry.set("showOverlay", false);
    });

    this.game.registry.set("showOverlay", true);

    playText.on("pointerdown", () => {
      if (!modal.visible) {
        this.scene.start("Game");
      }
    });
  }
}

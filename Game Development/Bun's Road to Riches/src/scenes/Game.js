import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    const { width, height } = this.scale;

    const background = this.add.image(width / 2, height / 2, "background");
    background.setDisplaySize(width, height);

    this.bun_1 = this.physics.add.sprite(
      this.scale.width / 2,
      this.scale.height - 100,
      "bun",
    );
    this.bun_1.setCollideWorldBounds(true);
    this.bun_1.setScale(0.5);
    this.bun_1.setCircle(this.bun_1.width / 2);
    this.bun_1.setTint(0x777777);
    this.bun_1.playerId = 1;
    this.score_1 = 0;

    this.bun_2 = this.physics.add.sprite(
      this.scale.width / 4,
      this.scale.height - 100,
      "bun",
    );
    this.bun_2.setCollideWorldBounds(true);
    this.bun_2.setScale(0.5);
    this.bun_2.setCircle(this.bun_2.width / 2);
    this.bun_2.setTint(0xe3569d);
    this.bun_2.playerId = 2;
    this.score_2 = 0;

    if (this.game.registry.get("highScore_1") === undefined) {
      this.game.registry.set("highScore_1", 0);
    }
    if (this.game.registry.get("highScore_2") === undefined) {
      this.game.registry.set("highScore_2", 0);
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    this.wasd = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    };

    this.ground = this.physics.add.staticGroup();
    const groundHeight = height - 20;
    this.ground
      .create(width / 2, groundHeight, null)
      .setOrigin(0.5, 1)
      .refreshBody()
      .setSize(width, 20)
      .setVisible(false);

    this.coins = this.physics.add.group();
    this.spawnCoins();

    this.physics.add.collider(
      this.coins,
      this.ground,
      this.handleCoinGroundCollision,
      null,
      this,
    );

    this.intersectCoin(this.bun_1);
    this.intersectCoin(this.bun_2);

    this.bombs = this.physics.add.group();
    this.spawnBombs();

    this.physics.add.collider(
      this.bombs,
      this.ground,
      this.hitGround,
      null,
      this,
    );

    this.intersectBomb(this.bun_1);
    this.intersectBomb(this.bun_2);

    this.scoreText_1 = this.add.text(16, 16, "Player 1: 0", {
      fontSize: "32px",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: 10,
    });

    this.scoreText_2 = this.add.text(
      16,
      this.scoreText_1.height + 32,
      "Player 2: 0",
      {
        fontSize: "32px",
        fill: "#ffffff",
        backgroundColor: "#000000",
        padding: 10,
      },
    );
  }

  update() {
    this.handlePlayerMovement(this.bun_1, this.cursors);
    this.handlePlayerMovement(this.bun_2, this.wasd);

    this.checkForCoinRespawn();

    const allBombsHitGround = this.bombs.countActive(true) === 0;
    if (allBombsHitGround) {
      this.spawnBombs();
    }

    this.bombs.children.iterate((bomb) => {
      if (bomb.y > this.scale.height && bomb.active) {
        bomb.disableBody(true, true);
        bomb.setActive(false).setVisible(false);
      }
    });
  }

  handlePlayerMovement(player, controls) {
    const onGround = this.physics.overlap(player, this.ground);

    if (controls.left.isDown) {
      player.setVelocityX(-1000);
    } else if (controls.right.isDown) {
      player.setVelocityX(1000);
    } else {
      player.setVelocityX(0);
    }

    if (controls.up.isDown && onGround) {
      player.setVelocityY(-1000);
    } else if (!onGround) {
      player.setVelocityY(player.body.velocity.y + 30);
    }

    if (controls.down.isDown && !onGround) {
      player.setVelocityY(player.body.velocity.y + 100);
    }
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    if (player.playerId === 1) {
      this.score_1 += 10;
      this.scoreText_1.setText("Player 1: " + this.score_1);
    } else if (player.playerId === 2) {
      this.score_2 += 10;
      this.scoreText_2.setText("Player 2: " + this.score_2);
    }

    if (this.coins.countActive(true) === 0) {
      this.spawnCoins();
    }
  }

  hitGround(bomb) {
    bomb.setActive(false).setVisible(false);
    bomb.disableBody(true, true);
    this.checkBombs();
  }

  checkBombs() {
    if (this.bombs.countActive(true) === 0) {
      this.spawnBombs();
    }
  }

  toggleGrayscale(on) {
    this.game.canvas.style.filter = on ? "grayscale(100%)" : "none";
  }

  hitBomb(player, bomb) {
    bomb.disableBody(true, true);
    this.toggleGrayscale(true);
    this.physics.pause();

    this.makePlayerBlink(player);

    this.updateHighScores();

    setTimeout(() => {
      this.toggleGrayscale(false);
      this.scene.start("GameOver", {
        scores: [this.score_1, this.score_2],
        bomber: player.playerId,
      });
    }, 3000);
  }

  makePlayerBlink(player) {
    let blinkCount = 0;
    let blinkInterval = setInterval(() => {
      player.setVisible(!player.visible);
      blinkCount++;
      if (blinkCount > 10) {
        clearInterval(blinkInterval);
        player.setVisible(true);
      }
    }, 250);
  }

  spawnBombs() {
    const width = this.scale.width;
    const numBombs = Phaser.Math.Between(1, 10);
    for (let i = 0; i < numBombs; i++) {
      let x = Phaser.Math.Between(50, width - 50);
      let y = Phaser.Math.Between(0, 100);
      let bomb = this.bombs.create(x, y, "bomb");
      bomb.setScale(0.5);
      bomb.setCircle(bomb.width / 2);
      bomb.setVelocity(
        Phaser.Math.Between(-400, 400),
        Phaser.Math.Between(100, 500),
      );
    }
  }

  spawnCoins() {
    const width = this.scale.width;
    for (let i = 0; i < Phaser.Math.Between(1, 10); i++) {
      let x = Phaser.Math.Between(50, width - 50);
      let y = 0;
      let coin = this.coins.create(x, y, "coin");
      coin.setScale(0.2);
      coin.setBounce(0.5);
      coin.setCollideWorldBounds(true);
      coin.setVelocity(
        Phaser.Math.Between(-400, 400),
        Phaser.Math.Between(100, 500),
      );
    }
  }

  handleCoinGroundCollision(coin) {
    if (!coin.getData("removing")) {
      coin.setData("removing", true);
      this.time.delayedCall(2000, () => {
        coin.disableBody(true, true);
        coin.setData("removing", false);
      });
    }
  }

  checkForCoinRespawn() {
    if (this.coins.countActive(true) === 0) {
      this.spawnCoins();
    }
  }

  intersectCoin(player) {
    this.physics.add.overlap(player, this.coins, this.collectCoin, null, this);
  }

  intersectBomb(player) {
    this.physics.add.collider(player, this.bombs, this.hitBomb, null, this);
  }

  updateHighScores() {
    let highScoreKey1 = "highScore_1";
    let currentHighScore1 = this.game.registry.get(highScoreKey1) || 0;
    if (this.score_1 > currentHighScore1) {
      this.game.registry.set(highScoreKey1, this.score_1);
    }

    let highScoreKey2 = "highScore_2";
    let currentHighScore2 = this.game.registry.get(highScoreKey2) || 0;
    if (this.score_2 > currentHighScore2) {
      this.game.registry.set(highScoreKey2, this.score_2);
    }
  }
}

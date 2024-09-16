import Phaser from 'phaser'

class TestScene extends Phaser.Scene {
  private logos: Phaser.Physics.Arcade.Image[] = []
  private scoreText!: Phaser.GameObjects.Text

  constructor() {
    super('testScene')
  }

  preload() {
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png')
    this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png')
    this.load.image('ojisan', 'ojisan.png')
  }

  create() {
    const image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'sky'
    )
    const scaleX = this.cameras.main.width / image.width
    const scaleY = this.cameras.main.height / image.height
    const scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)

    const particles = this.add.particles(0, 0, 'red', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    })

    this.scoreText = this.add.text(20, 20, 'スコア: 0', {
      fontSize: '32px',
      color: '#fff',
    })
    this.scoreText.setDepth(1)

    const logo = this.createLogo(400, 100)
    particles.startFollow(logo)
    logo.on('pointerdown', () => {
      this.createLogo(logo.x, logo.y)
    })
  }

  private createLogo(x: number, y: number) {
    const logo = this.physics.add.image(x, y, 'ojisan')
    logo.setScale(0.15)
    logo.setVelocity(
      Phaser.Math.Between(-200, 200),
      Phaser.Math.Between(-200, 200)
    )
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)
    logo.setInteractive()

    this.logos.push(logo)
    this.updateScore()

    return logo
  }

  private updateScore() {
    this.scoreText.setText(`スコア: ${this.logos.length}`)
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: TestScene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 200 },
    },
  },
}

new Phaser.Game(config)

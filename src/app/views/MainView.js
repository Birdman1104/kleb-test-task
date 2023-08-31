export class MainView extends Phaser.GameObjects.Container {
    #logo;
    #emitter;

    constructor(scene) {
        super(scene);
        this.#build();
    }

    #build() {
        this.#buildEmitter();
        this.#buildLogo();
    }

    #buildLogo() {
        const logo = this.scene.add.image(900, 700, "logo.png");
        this.#logo = logo;
        this.#emitter.startFollow(this.#logo);
    }

    #buildEmitter() {
        const particles = this.scene.add.particles("particle.png");
        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            alpha: { start: 1, end: 0 },
            blendMode: "ADD",
        });
        this.#emitter = emitter;
    }
}

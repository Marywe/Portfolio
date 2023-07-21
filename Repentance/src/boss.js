class Boss extends GameObject {

    constructor(position, rotation) {
        super(position, rotation);


        this.animation = new SSAnimation(
            graphicAssets.boss.image,
            74, // frameWidth
            -1 + 122 / 2, // frameHeight
            [3, 1],
            1 / 6 // frameCount
        );

        this.animation.PlayAnimationLoop(1);

        // physic body
        this.body = null;

        this.shootCadency = 0.4;
        this.shootCadencyAux = this.shootCadency;
        this.bulletSpawnPoint = new Vector2(0, 0);
        this.bullets = [];
        this.startPos = new b2Vec2(0, 0)
        this.angle = 0;

        this.life = 60;

        this.spawn = true;
        this.counterSpawn = 0;
        this.counterSpawning = 0;
    }

    Start(scene) {
        super.Start(scene);

        this.body = CreateBox(world, this.position.x / scale, this.position.y / scale, 0.6, 0.6,
            { isSensor: true, fixedRotation: true, restitution: 0.5, linearDamping: 8 }, this);
        this.body.SetUserData('boss');

    }

    Update(deltaTime) {
        super.Update(deltaTime);
        this.animation.Update(deltaTime);

        // update the position
        this.angle += deltaTime;

        let movementVector = new b2Vec2(2.2 * Math.cos(this.angle) - 2.2 * Math.sin(this.angle),
            2.2 * Math.sin(this.angle) + 2.2 * Math.cos(this.angle));

        this.body.ApplyForce(movementVector, new b2Vec2(0, 0));

        let bodyPosition = this.body.GetPosition();
        this.position.x = bodyPosition.x * scale;
        this.position.y = Math.abs((bodyPosition.y * scale) - ctx.canvas.height);

        this.counterSpawn += deltaTime;

        //if (this.shootCadencyAux > this.shootCadency)
        //{
        //this.Shoot();
        //}

        if (this.spawn)
            this.animation.PlayAnimationLoop(1);
        else {

            this.counterSpawning += deltaTime;
            this.animation.PlayAnimationLoop(0);
            if (this.counterSpawning >= 0.5) {
                this.spawn = true;
                this.counterSpawning = 0;
            }
        }


        if (bossLife > 30 && (this.counterSpawn >= Math.random() * (6 - 3) + 3)) {
            this.Spawn();
            this.counterSpawn = 0;
            this.spawn = false;
        }
        else if (bossLife <= 30 && (this.counterSpawn >= Math.random() * (4 - 2) + 2)) {
            this.Spawn();
            this.counterSpawn = 0;
            this.spawn = false;
        }

        this.shootCadencyAux += deltaTime;


        if (this.life <= 0) this.Die();

    }

    Draw(ctx) {
        // remove the image filtering
        ctx.imageSmoothingEnabled = false;

        ctx.save();


        ctx.translate(this.position.x, this.position.y);
        ctx.scale(4, 4);

        ctx.rotate(this.rotation);

        this.animation.Draw(ctx);

        ctx.restore();


        ctx.imageSmoothingEnabled = true;
    }


    Die() {
        this.active = false;
        world.DestroyBody(this.body);
    }

    Spawn() {

        var randomSpawn = Math.floor(Math.random() * 2);
        var randomPos = Math.random() * (300 - -300) + -300
        switch (randomSpawn) {
            case 0:
                this.lilfly = new LilFly(new Vector2(this.position.x, canvas.height - this.position.y + randomPos), 0);
                this.lilfly.Start(this);
                this.lilfly.active = true;

                this.scene.AddGameObject(this.lilfly);
                break;
            case 1:

                this.fly = new Fly(new Vector2(this.position.x, canvas.height - this.position.y + randomPos), 0);
                this.fly.Start(this);
                this.fly.active = true;

                this.scene.AddGameObject(this.fly);
                break;
        }



    }


}

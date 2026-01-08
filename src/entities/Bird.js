class Bird {
    constructor() {
        this.x = CONFIG.BIRD.X;
        this.y = CONFIG.BIRD.Y;
        this.width = CONFIG.BIRD.WIDTH;
        this.height = CONFIG.BIRD.HEIGHT;
        
        this.velocity = 0;
        this.gravity = CONFIG.BIRD.GRAVITY;
        this.jumpForce = CONFIG.BIRD.JUMP_FORCE;
        
        this.color = CONFIG.BIRD.COLOR;
        
        // Animation properties
        this.wingFlap = 0;
        this.rotation = 0;
        this.animationSpeed = 0.3;
    }
    
    update() {
        // Apply gravity
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        // Update animation
        this.wingFlap += this.animationSpeed;
        
        // Rotation based on velocity (diving/climbing)
        this.rotation = Math.max(-0.5, Math.min(0.5, this.velocity * 0.05));
        
        // Prevent bird from going off screen
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
        
        // Ground collision
        if (this.y + this.height > CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT) {
            this.y = CONFIG.CANVAS.HEIGHT - CONFIG.BACKGROUND.GROUND_HEIGHT - this.height;
            this.velocity = 0;
        }
    }
    
    jump() {
        this.velocity = this.jumpForce;
    }
    
    draw(renderer) {
        const ctx = renderer.ctx;
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotation);

        // Flugzeug-Rumpf (Fuselage)
        ctx.fillStyle = '#E8E8E8';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.width / 2, this.height / 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#B0B0B0';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Nase (Nose cone)
        ctx.fillStyle = '#4A90D9';
        ctx.beginPath();
        ctx.moveTo(this.width / 2 - 4, -3);
        ctx.lineTo(this.width / 2 + 4, 0);
        ctx.lineTo(this.width / 2 - 4, 3);
        ctx.closePath();
        ctx.fill();

        // Cockpit-Fenster
        ctx.fillStyle = '#87CEEB';
        ctx.beginPath();
        ctx.ellipse(6, -1, 4, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#4A90D9';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Hauptflügel (Main wing)
        ctx.fillStyle = '#C0C0C0';
        ctx.beginPath();
        ctx.moveTo(-4, 0);
        ctx.lineTo(-2, -12);
        ctx.lineTo(4, -12);
        ctx.lineTo(6, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#909090';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Unterer Flügelteil (sichtbar)
        ctx.fillStyle = '#D0D0D0';
        ctx.beginPath();
        ctx.moveTo(-4, 0);
        ctx.lineTo(-2, 10);
        ctx.lineTo(4, 10);
        ctx.lineTo(6, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Heckflügel (Tail)
        ctx.fillStyle = '#C0C0C0';
        ctx.beginPath();
        ctx.moveTo(-this.width / 2 + 2, 0);
        ctx.lineTo(-this.width / 2 - 2, -8);
        ctx.lineTo(-this.width / 2 + 6, -8);
        ctx.lineTo(-this.width / 2 + 4, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Roter Streifen am Rumpf
        ctx.strokeStyle = '#D9534F';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-this.width / 2 + 8, 0);
        ctx.lineTo(this.width / 2 - 8, 0);
        ctx.stroke();

        // Triebwerk-Andeutung
        ctx.fillStyle = '#505050';
        ctx.beginPath();
        ctx.ellipse(-2, 6, 3, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    reset() {
        this.x = CONFIG.BIRD.X;
        this.y = CONFIG.BIRD.Y;
        this.velocity = 0;
    }
}
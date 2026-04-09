/**
 * 打飞机游戏 - 完整逻辑实现
 * 游戏框架模式，所有代码均为 const 和 let 声明（不使用 var）
 * 代码行数：1000+ 行
 */

(function() {
  'use strict';

  // ==================== 游戏配置 ====================
  const GAME_CONFIG = {
    canvasWidth: 800,
    canvasHeight: 600,
    gameSpeed: 1,
    playerWidth: 40,
    playerHeight: 50,
    playerSpeed: 5,
    bulletWidth: 8,
    bulletHeight: 15,
    bulletSpeed: 10,
    enemyWidth: 40,
    enemyHeight: 40,
    bossWidth: 60,
    bossHeight: 60,
    enemySpeed: 2,
    enemySpawnRate: 0.02,
    bossSpawnRate: 0.001,
    collisionRadius: 20,
  };

  // ==================== 游戏类定义 ====================

  /**
   * 玩家类
   */
  class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = GAME_CONFIG.playerWidth;
      this.height = GAME_CONFIG.playerHeight;
      this.speed = GAME_CONFIG.playerSpeed;
      this.health = 100;
      this.maxHealth = 100;
      this.score = 0;
      this.level = 1;
      this.fireRate = 6;
      this.fireCounter = 0;
      this.powerUpDuration = 0;
      this.powerUpType = null;
      this.invincibleDuration = 0;
    }

    update(keys) {
      // 左右移动 - 仅WASD
      if (keys.a || keys.A) {
        this.x = Math.max(0, this.x - this.speed);
      }
      if (keys.d || keys.D) {
        this.x = Math.min(GAME_CONFIG.canvasWidth - this.width, this.x + this.speed);
      }

      // 上下移动 - 仅WASD
      if (keys.w || keys.W) {
        this.y = Math.max(GAME_CONFIG.canvasHeight - 150, this.y - this.speed);
      }
      if (keys.s || keys.S) {
        this.y = Math.min(GAME_CONFIG.canvasHeight - this.height, this.y + this.speed);
      }

      // 更新火力状态
      if (this.powerUpDuration > 0) {
        this.powerUpDuration--;
      } else {
        this.powerUpType = null;
      }

      // 更新无敌状态
      if (this.invincibleDuration > 0) {
        this.invincibleDuration--;
      }

      // 自动发射子弹
      this.fireCounter++;
      if (this.fireCounter >= this.fireRate) {
        this.fireCounter = 0;
        return true;
      }
      return false;
    }

    draw(ctx) {
      // 绘制无敌闪烁效果
      if (this.invincibleDuration > 0 && Math.floor(this.invincibleDuration / 5) % 2 === 0) {
        ctx.globalAlpha = 0.5;
      }

      // 绘制玩家飞机身体（梯形机身）
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(this.x + 10, this.y);              // 机头上左
      ctx.lineTo(this.x + 30, this.y);              // 机头上右
      ctx.lineTo(this.x + 35, this.y + 35);         // 机尾下右
      ctx.lineTo(this.x + 5, this.y + 35);          // 机尾下左
      ctx.closePath();
      ctx.fill();

      // 机头指向（三角形）
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.moveTo(this.x + 20, this.y - 3);
      ctx.lineTo(this.x + 15, this.y + 8);
      ctx.lineTo(this.x + 25, this.y + 8);
      ctx.closePath();
      ctx.fill();

      // 左翼
      ctx.fillStyle = '#FF6347';
      ctx.beginPath();
      ctx.moveTo(this.x + 10, this.y + 12);
      ctx.lineTo(this.x - 5, this.y + 20);
      ctx.lineTo(this.x + 8, this.y + 22);
      ctx.closePath();
      ctx.fill();

      // 右翼
      ctx.beginPath();
      ctx.moveTo(this.x + 30, this.y + 12);
      ctx.lineTo(this.x + 45, this.y + 20);
      ctx.lineTo(this.x + 32, this.y + 22);
      ctx.closePath();
      ctx.fill();

      // 机尾稳定翼
      ctx.fillStyle = '#FF8C00';
      ctx.fillRect(this.x + 12, this.y + 30, 16, 5);

      ctx.globalAlpha = 1;

      // 绘制血量条
      ctx.fillStyle = '#333';
      ctx.fillRect(this.x, this.y - 10, this.width, 5);
      ctx.fillStyle = this.health > 50 ? '#00FF00' : '#FF6347';
      ctx.fillRect(this.x, this.y - 10, (this.width * this.health) / this.maxHealth, 5);

      // 如果有加强效果，绘制光晕
      if (this.powerUpType === 'rapid') {
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
      }
    }

    getBullets(allBullets) {
      const baseX = this.x + this.width / 2 - GAME_CONFIG.bulletWidth / 2;
      const baseY = this.y;

      if (this.powerUpType === 'rapid') {
        // 三连发
        allBullets.push(new Bullet(baseX, baseY, -8));
        allBullets.push(new Bullet(baseX, baseY, 0));
        allBullets.push(new Bullet(baseX, baseY, 8));
      } else {
        // 普通发射
        allBullets.push(new Bullet(baseX, baseY, 0));
      }

      return allBullets;
    }

    takeDamage(amount) {
      if (this.invincibleDuration <= 0) {
        this.health = Math.max(0, this.health - amount);
        this.invincibleDuration = 120;
      }
    }

    heal(amount) {
      this.health = Math.min(this.maxHealth, this.health + amount);
    }

    addScore(points) {
      this.score += points;
      // 每累计500分提升一级
      const newLevel = Math.floor(this.score / 500) + 1;
      if (newLevel > this.level) {
        this.level = newLevel;
        this.fireRate = Math.max(3, 6 - this.level);
      }
    }
  }

  /**
   * 子弹类
   */
  class Bullet {
    constructor(x, y, offsetX = 0) {
      this.x = x + offsetX;
      this.y = y;
      this.width = GAME_CONFIG.bulletWidth;
      this.height = GAME_CONFIG.bulletHeight;
      this.speed = GAME_CONFIG.bulletSpeed;
      this.offsetX = offsetX;
      this.damage = 1;
    }

    update() {
      this.y -= this.speed;
      return this.y > 0;
    }

    draw(ctx) {
      ctx.fillStyle = '#FF6347';
      ctx.fillRect(this.x, this.y, this.width, this.height);

      // 绘制子弹尖端
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(this.x + this.width / 2, this.y);
      ctx.lineTo(this.x + this.width, this.y + 5);
      ctx.lineTo(this.x, this.y + 5);
      ctx.closePath();
      ctx.fill();
    }

    collidesWith(target) {
      return (
        this.x < target.x + target.width &&
        this.x + this.width > target.x &&
        this.y < target.y + target.height &&
        this.y + this.height > target.y
      );
    }
  }

  /**
   * 普通敌机类
   */
  class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = GAME_CONFIG.enemyWidth;
      this.height = GAME_CONFIG.enemyHeight;
      this.speed = GAME_CONFIG.enemySpeed;
      this.health = 1;
      this.maxHealth = 1;
      this.points = 10;
      this.fireCounter = Math.floor(Math.random() * 60) + 60;
      this.vx = (Math.random() - 0.5) * 2;
      this.direction = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
      this.y += this.speed;
      this.x += this.vx;

      // 边界反弹
      if (this.x <= 0 || this.x >= GAME_CONFIG.canvasWidth - this.width) {
        this.vx *= -1;
      }

      this.fireCounter--;
      return this.y < GAME_CONFIG.canvasHeight;
    }

    draw(ctx) {
      // 绘制敌机（红色飞机造型，方向向下）
      ctx.fillStyle = '#FF1493';
      ctx.beginPath();
      ctx.moveTo(this.x + 10, this.y + 40);          // 机头下左
      ctx.lineTo(this.x + 30, this.y + 40);          // 机头下右
      ctx.lineTo(this.x + 35, this.y);               // 机尾上右
      ctx.lineTo(this.x + 5, this.y);                // 机尾上左
      ctx.closePath();
      ctx.fill();

      // 机头指向（三角形，向下）
      ctx.fillStyle = '#C71585';
      ctx.beginPath();
      ctx.moveTo(this.x + 20, this.y + 43);
      ctx.lineTo(this.x + 15, this.y + 32);
      ctx.lineTo(this.x + 25, this.y + 32);
      ctx.closePath();
      ctx.fill();

      // 左翼
      ctx.fillStyle = '#8B008B';
      ctx.beginPath();
      ctx.moveTo(this.x + 10, this.y + 28);
      ctx.lineTo(this.x - 5, this.y + 20);
      ctx.lineTo(this.x + 8, this.y + 18);
      ctx.closePath();
      ctx.fill();

      // 右翼
      ctx.beginPath();
      ctx.moveTo(this.x + 30, this.y + 28);
      ctx.lineTo(this.x + 45, this.y + 20);
      ctx.lineTo(this.x + 32, this.y + 18);
      ctx.closePath();
      ctx.fill();

      // 绘制血量条
      if (this.health !== this.maxHealth) {
        ctx.fillStyle = '#FF1493';
        ctx.fillRect(this.x, this.y - 5, this.width, 3);
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(this.x, this.y - 5, (this.width * this.health) / this.maxHealth, 3);
      }
    }

    canFire() {
      return this.fireCounter <= 0;
    }

    fire() {
      this.fireCounter = Math.floor(Math.random() * 100) + 80;
      return new EnemyBullet(this.x + this.width / 2, this.y + this.height);
    }

    takeDamage(amount) {
      this.health = Math.max(0, this.health - amount);
    }
  }

  /**
   * 敌机子弹类
   */
  class EnemyBullet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 6;
      this.height = 10;
      this.speed = 4;
      this.angle = Math.random() * Math.PI / 3 - Math.PI / 6;
    }

    update() {
      this.y += this.speed + Math.sin(this.angle) * 1;
      this.x += Math.cos(this.angle) * 2;
      return this.y < GAME_CONFIG.canvasHeight && this.x > 0 && this.x < GAME_CONFIG.canvasWidth;
    }

    draw(ctx) {
      ctx.fillStyle = '#32CD32';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    collidesWith(target) {
      return (
        this.x < target.x + target.width &&
        this.x > target.x &&
        this.y < target.y + target.height &&
        this.y > target.y
      );
    }
  }

  /**
   * Boss敌机类
   */
  class BossEnemy extends Enemy {
    constructor(x, y) {
      super(x, y);
      this.width = GAME_CONFIG.bossWidth;
      this.height = GAME_CONFIG.bossHeight;
      this.health = 10;
      this.maxHealth = 10;
      this.points = 100;
      this.speed = 1;
      this.fireCounter = 30;
      this.phase = 1;
      this.actionCounter = 0;
    }

    update() {
      this.y += this.speed;
      this.actionCounter++;

      // Boss的运动模式
      if (this.actionCounter < 60) {
        this.x += 2;
      } else if (this.actionCounter < 120) {
        this.x -= 2;
      } else {
        this.actionCounter = 0;
      }

      // 边界检查
      this.x = Math.max(0, Math.min(GAME_CONFIG.canvasWidth - this.width, this.x));
      this.fireCounter--;
      return this.y < GAME_CONFIG.canvasHeight;
    }

    draw(ctx) {
      // 绘制Boss飞机（橙红色，更大）
      ctx.fillStyle = '#FF4500';
      ctx.beginPath();
      ctx.moveTo(this.x + 15, this.y + 60);
      ctx.lineTo(this.x + 45, this.y + 60);
      ctx.lineTo(this.x + 52, this.y);
      ctx.lineTo(this.x + 8, this.y);
      ctx.closePath();
      ctx.fill();

      // Boss机头指向（大三角形）
      ctx.fillStyle = '#FF8C00';
      ctx.beginPath();
      ctx.moveTo(this.x + 30, this.y + 65);
      ctx.lineTo(this.x + 20, this.y + 48);
      ctx.lineTo(this.x + 40, this.y + 48);
      ctx.closePath();
      ctx.fill();

      // Boss左翼（更大）
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(this.x + 15, this.y + 40);
      ctx.lineTo(this.x - 10, this.y + 25);
      ctx.lineTo(this.x + 10, this.y + 20);
      ctx.closePath();
      ctx.fill();

      // Boss右翼（更大）
      ctx.beginPath();
      ctx.moveTo(this.x + 45, this.y + 40);
      ctx.lineTo(this.x + 70, this.y + 25);
      ctx.lineTo(this.x + 50, this.y + 20);
      ctx.closePath();
      ctx.fill();

      // Boss尾翼（双层）
      ctx.fillRect(this.x + 18, this.y + 55, 24, 4);
      ctx.killStyle = '#FFA500';
      ctx.fillRect(this.x + 20, this.y + 50, 20, 3);

      // 绘制血量条
      ctx.fillStyle = '#333';
      ctx.fillRect(this.x, this.y - 10, this.width, 5);
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(this.x, this.y - 10, (this.width * this.health) / this.maxHealth, 5);

      // 绘制Boss光晕
      ctx.strokeStyle = 'rgba(255, 100, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
    }

    fire() {
      this.fireCounter = 15;
      const bullets = [];
      // Boss多方位发射
      for (let i = 0; i < 5; i++) {
        const bullet = new EnemyBullet(this.x + this.width / 2, this.y + this.height);
        bullet.angle = (Math.PI * i) / 2.5 - Math.PI / 4;
        bullets.push(bullet);
      }
      return bullets;
    }
  }

  /**
   * 高级敌机类 - 更复杂的运动和攻击
   */
  class AdvancedEnemy extends Enemy {
    constructor(x, y) {
      super(x, y);
      this.width = GAME_CONFIG.enemyWidth;
      this.height = GAME_CONFIG.enemyHeight;
      this.health = 2;
      this.maxHealth = 2;
      this.points = 25;
      this.speed = GAME_CONFIG.enemySpeed + 0.5;
      this.waveCounter = 0;
      this.waveAmplitude = 20;
      this.originalX = x;
      this.fireCounter = Math.floor(Math.random() * 40) + 40;
    }

    update() {
      this.y += this.speed;
      this.waveCounter++;
      
      // 正弦波运动
      this.x = this.originalX + Math.sin(this.waveCounter * 0.05) * this.waveAmplitude;
      
      // 边界检查
      this.x = Math.max(0, Math.min(GAME_CONFIG.canvasWidth - this.width, this.x));

      this.fireCounter--;
      return this.y < GAME_CONFIG.canvasHeight;
    }

    draw(ctx) {
      // 绘制高级敌机（紫色飞机造型）
      ctx.fillStyle = '#9932CC';
      ctx.beginPath();
      ctx.moveTo(this.x + 10, this.y + 40);
      ctx.lineTo(this.x + 30, this.y + 40);
      ctx.lineTo(this.x + 35, this.y);
      ctx.lineTo(this.x + 5, this.y);
      ctx.closePath();
      ctx.fill();

      // 高级敌机机头
      ctx.fillStyle = '#BA55D3';
      ctx.beginPath();
      ctx.moveTo(this.x + 20, this.y + 43);
      ctx.lineTo(this.x + 15, this.y + 32);
      ctx.lineTo(this.x + 25, this.y + 32);
      ctx.closePath();
      ctx.fill();

      // 高级敌机左翼
      ctx.fillStyle = '#00FF00';
      ctx.beginPath();
      ctx.moveTo(this.x + 10, this.y + 28);
      ctx.lineTo(this.x - 5, this.y + 20);
      ctx.lineTo(this.x + 8, this.y + 18);
      ctx.closePath();
      ctx.fill();

      // 高级敌机右翼
      ctx.beginPath();
      ctx.moveTo(this.x + 30, this.y + 28);
      ctx.lineTo(this.x + 45, this.y + 20);
      ctx.lineTo(this.x + 32, this.y + 18);
      ctx.closePath();
      ctx.fill();

      // 绘制血量条
      ctx.fillStyle = '#333';
      ctx.fillRect(this.x, this.y - 5, this.width, 3);
      ctx.fillStyle = '#FFFF00';
      ctx.fillRect(this.x, this.y - 5, (this.width * this.health) / this.maxHealth, 3);
    }

    canFire() {
      return this.fireCounter <= 0;
    }

    fire() {
      this.fireCounter = Math.floor(Math.random() * 60) + 50;
      const bullets = [];
      // 高级敌机双弹发射
      const bullet1 = new EnemyBullet(this.x + 5, this.y + this.height);
      const bullet2 = new EnemyBullet(this.x + this.width - 5, this.y + this.height);
      bullets.push(bullet1, bullet2);
      return bullets;
    }
  }

  /**
   * 快速小敌机 - 血薄速快
   */
  class FastEnemy extends Enemy {
    constructor(x, y) {
      super(x, y);
      this.width = 25;
      this.height = 25;
      this.health = 0.5;
      this.maxHealth = 0.5;
      this.points = 5;
      this.speed = GAME_CONFIG.enemySpeed + 1.5;
      this.fireCounter = 100;
      this.vx = (Math.random() - 0.5) * 4;
    }

    draw(ctx) {
      // 绘制快速小敌机（青色飞机造型）
      ctx.fillStyle = '#00CED1';
      ctx.beginPath();
      ctx.moveTo(this.x + 6, this.y + 25);
      ctx.lineTo(this.x + 19, this.y + 25);
      ctx.lineTo(this.x + 22, this.y);
      ctx.lineTo(this.x + 3, this.y);
      ctx.closePath();
      ctx.fill();

      // 小敌机机头
      ctx.fillStyle = '#00BFFF';
      ctx.beginPath();
      ctx.moveTo(this.x + 12.5, this.y + 27);
      ctx.lineTo(this.x + 9, this.y + 20);
      ctx.lineTo(this.x + 16, this.y + 20);
      ctx.closePath();
      ctx.fill();
    }
  }

  /**
   * 装甲敌机 - 血量高防御强
   */
  class ArmoredEnemy extends Enemy {
    constructor(x, y) {
      super(x, y);
      this.width = GAME_CONFIG.enemyWidth + 10;
      this.height = GAME_CONFIG.enemyHeight + 10;
      this.health = 5;
      this.maxHealth = 5;
      this.points = 50;
      this.speed = GAME_CONFIG.enemySpeed - 0.5;
      this.fireCounter = Math.floor(Math.random() * 80) + 120;
      this.vx = (Math.random() - 0.5) * 1;
      this.armor = 2;
    }

    update() {
      this.y += this.speed;
      this.x += this.vx;

      // 边界反弹
      if (this.x <= 0 || this.x >= GAME_CONFIG.canvasWidth - this.width) {
        this.vx *= -1;
      }

      this.fireCounter--;
      return this.y < GAME_CONFIG.canvasHeight;
    }

    draw(ctx) {
      // 绘制装甲敌机（深灰色飞机造型，更厚重）
      ctx.fillStyle = '#696969';
      ctx.beginPath();
      ctx.moveTo(this.x + 12, this.y + 50);
      ctx.lineTo(this.x + 38, this.y + 50);
      ctx.lineTo(this.x + 45, this.y);
      ctx.lineTo(this.x + 5, this.y);
      ctx.closePath();
      ctx.fill();

      // 装甲机头
      ctx.fillStyle = '#A9A9A9';
      ctx.beginPath();
      ctx.moveTo(this.x + 25, this.y + 53);
      ctx.lineTo(this.x + 18, this.y + 38);
      ctx.lineTo(this.x + 32, this.y + 38);
      ctx.closePath();
      ctx.fill();

      // 装甲能量块（左）
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(this.x + 8, this.y + 25, 10, 12);

      // 装甲能量块（右）
      ctx.fillRect(this.x + 32, this.y + 25, 10, 12);

      // 装甲左翼
      ctx.fillStyle = '#808080';
      ctx.beginPath();
      ctx.moveTo(this.x + 12, this.y + 35);
      ctx.lineTo(this.x - 8, this.y + 25);
      ctx.lineTo(this.x + 8, this.y + 22);
      ctx.closePath();
      ctx.fill();

      // 装甲右翼
      ctx.beginPath();
      ctx.moveTo(this.x + 38, this.y + 35);
      ctx.lineTo(this.x + 58, this.y + 25);
      ctx.lineTo(this.x + 42, this.y + 22);
      ctx.closePath();
      ctx.fill();

      // 绘制血量条（更清晰）
      ctx.fillStyle = '#333';
      ctx.fillRect(this.x, this.y - 10, this.width, 5);
      ctx.fillStyle = '#FF6347';
      ctx.fillRect(this.x, this.y - 10, (this.width * this.health) / this.maxHealth, 5);
    }

    canFire() {
      return this.fireCounter <= 0;
    }

    fire() {
      this.fireCounter = Math.floor(Math.random() * 120) + 100;
      // 装甲敌机发射穿透弹
      const bullet = new EnemyBullet(this.x + this.width / 2, this.y + this.height);
      bullet.speed = 5;
      return bullet;
    }

    takeDamage(amount) {
      // 装甲减伤
      const actualDamage = Math.max(0.25, amount - this.armor / 10);
      this.health = Math.max(0, this.health - actualDamage);
    }
  }


  /**
   * 道具类
   */
  class PowerUp {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.width = 25;
      this.height = 25;
      this.type = type; // 'rapid', 'heal', 'shield'
      this.speed = 2;
      this.rotation = 0;
    }

    update() {
      this.y += this.speed;
      this.rotation += 0.05;
      return this.y < GAME_CONFIG.canvasHeight;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(this.rotation);

      if (this.type === 'rapid') {
        // 快速射击道具：闪电图案
        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // 绘制闪电符号
        ctx.strokeStyle = '#0088FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(-4, -2);
        ctx.lineTo(2, 0);
        ctx.lineTo(-6, 10);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⚡', 0, 0);
      } else if (this.type === 'heal') {
        // 治疗道具：绿色十字加号
        ctx.fillStyle = '#00FF00';
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-3, -8, 6, 16);
        ctx.fillRect(-8, -3, 16, 6);
        
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♥', 0, 0);
      } else if (this.type === 'shield') {
        // 无敌盾道具：黄色盾牌
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(this.width / 2, 0);
        ctx.lineTo(this.width / 2 - 2, this.height / 2);
        ctx.lineTo(-this.width / 2 + 2, this.height / 2);
        ctx.lineTo(-this.width / 2, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🛡', 0, 1);
      }

      ctx.restore();
    }

    collidesWith(target) {
      return (
        this.x < target.x + target.width &&
        this.x + this.width > target.x &&
        this.y < target.y + target.height &&
        this.y + this.height > target.y
      );
    }
  }

  /**
   * 爆炸效果类
   */
  class Explosion {
    constructor(x, y, size = 1) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.radius = 10;
      this.maxRadius = 30 * size;
      this.opacity = 1;
      this.particles = [];

      // 创建粒子效果
      for (let i = 0; i < 10 * size; i++) {
        const angle = (Math.random() * Math.PI * 2);
        const velocity = Math.random() * 5 + 2;
        this.particles.push({
          x: this.x,
          y: this.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          lifetime: 30,
          maxLifetime: 30,
        });
      }
    }

    update() {
      this.radius = Math.min(this.radius + 2, this.maxRadius);
      this.opacity = Math.max(0, this.opacity - 0.1);

      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // 重力效果
        p.lifetime--;
      });

      return this.opacity > 0;
    }

    draw(ctx) {
      ctx.globalAlpha = this.opacity;

      // 绘制爆炸圆形
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 100, 0, 0.2)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();

      // 绘制粒子
      ctx.fillStyle = 'rgba(255, 150, 0, 0.8)';
      this.particles.forEach(p => {
        const particleOpacity = p.lifetime / p.maxLifetime;
        ctx.globalAlpha = particleOpacity * this.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    }
  }

  /**
   * 星星背景效果
   */
  class StarField {
    constructor() {
      this.stars = [];
      for (let i = 0; i < 100; i++) {
        this.stars.push({
          x: Math.random() * GAME_CONFIG.canvasWidth,
          y: Math.random() * GAME_CONFIG.canvasHeight,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 0.05,
          twinkleValue: Math.random(),
        });
      }
    }

    update() {
      this.stars.forEach(star => {
        star.y += 1;
        if (star.y > GAME_CONFIG.canvasHeight) {
          star.y = 0;
          star.x = Math.random() * GAME_CONFIG.canvasWidth;
        }
        star.twinkleValue += star.twinkleSpeed;
        star.opacity = 0.5 + Math.sin(star.twinkleValue) * 0.5;
      });
    }

    draw(ctx) {
      ctx.fillStyle = '#FFFFFF';
      this.stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }
  }

  /**
   * 主游戏类
   */
  class GameEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) {
        console.error(`Canvas with id "${canvasId}" not found`);
        return;
      }

      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = GAME_CONFIG.canvasWidth;
      this.canvas.height = GAME_CONFIG.canvasHeight;

      this.player = new Player(GAME_CONFIG.canvasWidth / 2 - GAME_CONFIG.playerWidth / 2, GAME_CONFIG.canvasHeight - 100);
      this.enemies = [];
      this.bosses = [];
      this.bullets = [];
      this.enemyBullets = [];
      this.powerUps = [];
      this.explosions = [];
      this.starField = new StarField();

      this.keys = {};
      this.isGameRunning = true;
      this.isPaused = false;
      this.gameOver = false;
      this.gameWin = false;
      this.showStartScreen = true;
      this.score = 0;
      this.spawnCounter = 0;
      this.bossSpawned = false;
      this.waveCount = 0;
      this.frameCount = 0;

      this.setupEventListeners();
      this.startGameLoop();
    }

    setupEventListeners() {
      window.addEventListener('keydown', e => {
        this.keys[e.key] = true;
        if (e.key === ' ') {
          e.preventDefault();
          // 开始屏幕时按空格开始游戏
          if (this.showStartScreen) {
            this.startGame();
          }
        }
        if (e.key === 'p' || e.key === 'P') {
          if (!this.showStartScreen) {
            this.togglePause();
          }
        }
        if (e.key === 'r' || e.key === 'R') {
          if (this.gameOver) {
            this.restart();
          } else if (!this.showStartScreen && !this.gameOver) {
            // 游戏进行中按R立即重开
            this.restart();
          }
        }
      });

      window.addEventListener('keyup', e => {
        this.keys[e.key] = false;
      });

      // 点击canvas开始游戏或在游戏里开始新游戏
      this.canvas.addEventListener('click', e => {
        if (this.showStartScreen) {
          this.startGame();
        }
      });
    }

    startGame() {
      this.showStartScreen = false;
      this.isPaused = false;
    }

    spawnEnemies() {
      this.spawnCounter++;

      // 根据难度增加产生概率
      const spawnRate = GAME_CONFIG.enemySpawnRate + (this.player.level * 0.002);
      if (Math.random() < spawnRate) {
        const x = Math.random() * (GAME_CONFIG.canvasWidth - GAME_CONFIG.enemyWidth);
        
        // 根据等级选择不同类型的敌机
        const rand = Math.random();
        let enemy;
        
        if (this.player.level <= 1) {
          // 初始等级：只有普通敌机
          enemy = new Enemy(x, -GAME_CONFIG.enemyHeight);
        } else if (this.player.level <= 3) {
          // 第2-3级：加入快速敌机和普通敌机
          if (rand < 0.7) {
            enemy = new Enemy(x, -GAME_CONFIG.enemyHeight);
          } else {
            enemy = new FastEnemy(x, -25);
          }
        } else if (this.player.level <= 5) {
          // 第4-5级：加入高级敌机
          if (rand < 0.5) {
            enemy = new Enemy(x, -GAME_CONFIG.enemyHeight);
          } else if (rand < 0.8) {
            enemy = new FastEnemy(x, -25);
          } else {
            enemy = new AdvancedEnemy(x, -GAME_CONFIG.enemyHeight);
          }
        } else {
          // 第6级以上：加入装甲敌机
          if (rand < 0.3) {
            enemy = new Enemy(x, -GAME_CONFIG.enemyHeight);
          } else if (rand < 0.5) {
            enemy = new FastEnemy(x, -25);
          } else if (rand < 0.8) {
            enemy = new AdvancedEnemy(x, -GAME_CONFIG.enemyHeight);
          } else {
            enemy = new ArmoredEnemy(x, -GAME_CONFIG.enemyHeight - 10);
          }
        }
        
        this.enemies.push(enemy);
      }

      // Boss生成逻辑
      if (this.player.score > 500 && !this.bossSpawned && Math.random() < 0.0005) {
        const x = Math.random() * (GAME_CONFIG.canvasWidth - GAME_CONFIG.bossWidth);
        this.bosses.push(new BossEnemy(x, -GAME_CONFIG.bossHeight));
        this.bossSpawned = true;
      }
    }

    updateGameState() {
      if (this.showStartScreen || this.gameOver || this.gameWin || this.isPaused) return;

      // 更新玩家
      const shouldFire = this.player.update(this.keys);
      if (shouldFire) {
        this.player.getBullets(this.bullets);
      }

      // 更新子弹
      this.bullets = this.bullets.filter(bullet => bullet.update());

      // 更新敌机和敌机子弹
      this.enemies = this.enemies.filter(enemy => {
        const isActive = enemy.update();
        if (isActive && enemy.canFire()) {
          this.enemyBullets.push(enemy.fire());
        }
        return isActive;
      });

      this.bosses = this.bosses.filter(boss => {
        const isActive = boss.update();
        if (isActive && boss.fireCounter <= 0) {
          const newBullets = boss.fire();
          this.enemyBullets.push(...newBullets);
        }
        return isActive;
      });

      this.enemyBullets = this.enemyBullets.filter(bullet => bullet.update());

      // 更新道具
      this.powerUps = this.powerUps.filter(powerUp => powerUp.update());

      // 更新爆炸
      this.explosions = this.explosions.filter(explosion => explosion.update());

      // 更新星空
      this.starField.update();

      // 生成敌机
      this.spawnEnemies();

      // 碰撞检测：子弹击中敌机
      for (let i = this.bullets.length - 1; i >= 0; i--) {
        const bullet = this.bullets[i];
        let hit = false;

        // 检查普通敌机
        for (let j = this.enemies.length - 1; j >= 0; j--) {
          if (bullet.collidesWith(this.enemies[j])) {
            this.enemies[j].takeDamage(bullet.damage);
            if (this.enemies[j].health <= 0) {
              this.explosions.push(new Explosion(this.enemies[j].x + this.enemies[j].width / 2, this.enemies[j].y + this.enemies[j].height / 2));
              this.player.addScore(this.enemies[j].points);

              // 随机掉落道具
              if (Math.random() < 0.2) {
                const types = ['rapid', 'heal', 'shield'];
                const type = types[Math.floor(Math.random() * types.length)];
                this.powerUps.push(new PowerUp(this.enemies[j].x, this.enemies[j].y, type));
              }

              this.enemies.splice(j, 1);
            }
            hit = true;
            break;
          }
        }

        // 检查Boss敌机
        if (!hit) {
          for (let j = this.bosses.length - 1; j >= 0; j--) {
            if (bullet.collidesWith(this.bosses[j])) {
              this.bosses[j].takeDamage(bullet.damage);
              if (this.bosses[j].health <= 0) {
                this.explosions.push(new Explosion(this.bosses[j].x + this.bosses[j].width / 2, this.bosses[j].y + this.bosses[j].height / 2, 2));
                this.player.addScore(this.bosses[j].points);
                this.powerUps.push(new PowerUp(this.bosses[j].x, this.bosses[j].y, 'heal'));
                this.bosses.splice(j, 1);
                this.bossSpawned = false;
              }
              hit = true;
              break;
            }
          }
        }

        if (hit) {
          this.bullets.splice(i, 1);
        }
      }

      // 碰撞检测：敌机子弹击中玩家
      for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
        if (this.enemyBullets[i].collidesWith(this.player)) {
          this.player.takeDamage(5);
          this.explosions.push(new Explosion(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, 0.5));
          this.enemyBullets.splice(i, 1);
        }
      }

      // 碰撞检测：敌机与玩家碰撞
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        if (this.collideCircle(this.player, this.enemies[i])) {
          this.player.takeDamage(10);
          this.explosions.push(new Explosion(this.enemies[i].x + this.enemies[i].width / 2, this.enemies[i].y + this.enemies[i].height / 2));
          this.enemies.splice(i, 1);
        }
      }

      // 碰撞检测：道具与玩家碰撞
      for (let i = this.powerUps.length - 1; i >= 0; i--) {
        if (this.powerUps[i].collidesWith(this.player)) {
          const powerUp = this.powerUps[i];
          if (powerUp.type === 'rapid') {
            this.player.powerUpType = 'rapid';
            this.player.powerUpDuration = 300;
          } else if (powerUp.type === 'heal') {
            this.player.heal(30);
          } else if (powerUp.type === 'shield') {
            this.player.invincibleDuration = 200;
          }
          this.powerUps.splice(i, 1);
        }
      }

      // 游戏结束检测
      if (this.player.health <= 0) {
        this.gameOver = true;
      }

      // 根据分数提升难度
      if (this.enemies.length > 50) {
        this.gameOver = true;
      }
    }

    collideCircle(a, b) {
      const dx = (a.x + a.width / 2) - (b.x + b.width / 2);
      const dy = (a.y + a.height / 2) - (b.y + b.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < GAME_CONFIG.collisionRadius + 15;
    }

    drawGameState() {
      // 清空画布
      this.ctx.fillStyle = '#001a4d';
      this.ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight);

      // 绘制星空背景
      this.starField.draw(this.ctx);

      // 如果在开始屏幕，直接返回
      if (this.showStartScreen) {
        this.drawStartScreen();
        return;
      }

      // 绘制游戏对象
      this.bullets.forEach(bullet => bullet.draw(this.ctx));
      this.enemies.forEach(enemy => enemy.draw(this.ctx));
      this.bosses.forEach(boss => boss.draw(this.ctx));
      this.enemyBullets.forEach(bullet => bullet.draw(this.ctx));
      this.powerUps.forEach(powerUp => powerUp.draw(this.ctx));
      this.explosions.forEach(explosion => explosion.draw(this.ctx));
      this.player.draw(this.ctx);

      // 绘制UI信息
      this.drawUI();

      // 绘制游戏结束或暂停界面
      if (this.gameOver) {
        this.drawGameOver();
      } else if (this.gameWin) {
        this.drawGameWin();
      } else if (this.isPaused) {
        this.drawPauseScreen();
      }
    }

    drawUI() {
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = 'bold 18px Arial';
      this.ctx.textAlign = 'left';

      // 绘制分数
      this.ctx.fillText(`分数: ${this.player.score}`, 15, 30);

      // 绘制等级
      this.ctx.fillText(`等级: ${this.player.level}`, 15, 60);

      // 绘制敌机数量
      this.ctx.fillText(`敌机: ${this.enemies.length}`, GAME_CONFIG.canvasWidth - 150, 30);

      // 绘制血量数值
      this.ctx.fillText(`血量: ${this.player.health}/${this.player.maxHealth}`, GAME_CONFIG.canvasWidth - 150, 60);

      // 绘制加强效果提示
      if (this.player.powerUpType === 'rapid') {
        this.ctx.fillStyle = '#00FFFF';
        this.ctx.fillText(`⚡ 快速射击 (${Math.ceil(this.player.powerUpDuration / 60)}s)`, GAME_CONFIG.canvasWidth / 2 - 100, 30);
      }

      if (this.player.invincibleDuration > 0 && this.player.powerUpType !== 'shield') {
        this.ctx.fillStyle = '#FFFF00';
        this.ctx.fillText(`🛡️ 无敌 (${Math.ceil(this.player.invincibleDuration / 60)}s)`, GAME_CONFIG.canvasWidth / 2 - 80, 30);
      }

      // 绘制操作提示
      this.ctx.font = '14px Arial';
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('W/A/S/D 移动   P 暂停   R 重开', GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight - 20);
    }

    drawStartScreen() {
      // 绘制半透明背景
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight);

      // 绘制标题
      this.ctx.fillStyle = '#FFD700';
      this.ctx.font = 'bold 42px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('打飞机游戏', GAME_CONFIG.canvasWidth / 2, 50);

      // 绘制游戏规则 - 更紧凑的布局
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = '14px Arial';
      this.ctx.textAlign = 'center';
      
      const rules = [
        '【操作说明】',
        'W/A/S/D - 移动方向   P键 - 暂停   R键 - 重开',
        '',
        '【道具说明】⚡快速射击   ❤️治疗   🛡️无敌盾',
        '',
        '【敌机】红-普通  青-快速  紫-高级  灰-装甲  橙-BOSS',
      ];

      let y = 95;
      for (const rule of rules) {
        if (rule === '【操作说明】' || rule === '【道具说明】⚡快速射击   ❤️治疗   🛡️无敌盾' || rule === '【敌机】红-普通  青-快速  紫-高级  灰-装甲  橙-BOSS') {
          this.ctx.fillStyle = '#FFD700';
          this.ctx.font = 'bold 14px Arial';
        } else {
          this.ctx.fillStyle = '#FFFFFF';
          this.ctx.font = '14px Arial';
        }
        this.ctx.fillText(rule, GAME_CONFIG.canvasWidth / 2, y);
        y += 20;
      }

      // 绘制开始按钮
      const buttonY = GAME_CONFIG.canvasHeight - 110;
      const buttonWidth = 220;
      const buttonHeight = 50;
      const buttonX = GAME_CONFIG.canvasWidth / 2 - buttonWidth / 2;

      this.ctx.fillStyle = '#FF6347';
      this.ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
      this.ctx.strokeStyle = '#FFD700';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);

      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = 'bold 18px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('点击开始或按 SPACE', GAME_CONFIG.canvasWidth / 2, buttonY + buttonHeight / 2);
    }


    drawGameOver() {
      // 绘制半透明遮罩
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight);

      // 绘制游戏结束文本
      this.ctx.fillStyle = '#FF0000';
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('游戏结束', GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 - 50);

      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = '24px Arial';
      this.ctx.fillText(`最终分数: ${this.player.score}`, GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 + 20);
      this.ctx.fillText(`等级: ${this.player.level}`, GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 + 60);

      this.ctx.fillStyle = '#FFD700';
      this.ctx.font = 'bold 18px Arial';
      this.ctx.fillText('按 R 键重新开始游戏', GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 + 120);
    }

    drawGameWin() {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight);

      this.ctx.fillStyle = '#00FF00';
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('胜利！', GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 - 50);

      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = '24px Arial';
      this.ctx.fillText(`最终分数: ${this.player.score}`, GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 + 20);

      this.ctx.fillStyle = '#FFD700';
      this.ctx.font = 'bold 18px Arial';
      this.ctx.fillText('按 R 键重新开始游戏', GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 + 120);
    }

    drawPauseScreen() {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight);

      this.ctx.fillStyle = '#FFFF00';
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('暂停', GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2);

      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = '20px Arial';
      this.ctx.fillText('按 P 键继续游戏', GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 + 80);
    }

    togglePause() {
      this.isPaused = !this.isPaused;
    }

    restart() {
      this.player.health = this.player.maxHealth;
      this.player.score = 0;
      this.player.level = 1;
      this.player.invincibleDuration = 0;
      this.player.powerUpDuration = 0;
      this.enemies = [];
      this.bosses = [];
      this.bullets = [];
      this.enemyBullets = [];
      this.powerUps = [];
      this.explosions = [];
      this.bossSpawned = false;
      this.gameOver = false;
      this.gameWin = false;
      this.isPaused = false;
      this.showStartScreen = true;
    }

    startGameLoop() {
      const gameLoop = () => {
        this.updateGameState();
        this.drawGameState();
        this.frameCount++;
        requestAnimationFrame(gameLoop);
      };
      gameLoop();
    }
  }

  // ==================== 初始化游戏 ====================

  /**
   * 页面导航和菜单管理
   */
  const initializeNavigation = () => {
    // 监听所有菜单链接点击
    const menuLinks = document.querySelectorAll('.menu a');
    const gameSection = document.getElementById('game-section');
    const header = document.getElementById('header');

    // 处理菜单链接
    menuLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        const isGameLink = link.id === 'game-menu-link' || link.textContent.includes('休闲游戏');
        
        // 如果是打飞机链接
        if (isGameLink) {
          event.preventDefault();
          
          // 添加游戏模式 class
          document.body.classList.add('game-mode');
          
          // 显示游戏区域
          if (gameSection) {
            gameSection.style.display = 'flex';
            // 页面滚动到顶部
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 0);
          }
          
          // 标记当前选中的菜单
          menuLinks.forEach(l => {
            l.classList.remove('selected');
          });
          link.classList.add('selected');
        } else if (href === 'index.html') {
          // 关于页面
          event.preventDefault();
          
          // 移除游戏模式 class
          document.body.classList.remove('game-mode');
          
          // 隐藏游戏区域
          if (gameSection) {
            gameSection.style.display = 'none';
          }
          menuLinks.forEach(l => {
            l.classList.remove('selected');
          });
          link.classList.add('selected');
          
          // 页面滚动到顶部
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
        }
      });
    });

    // 处理游戏内的游戏链接
    const gameLink = document.getElementById('game-link');
    if (gameLink) {
      gameLink.addEventListener('click', (event) => {
        event.preventDefault();
        
        // 添加游戏模式 class
        document.body.classList.add('game-mode');
        
        // 显示游戏区域
        if (gameSection) {
          gameSection.style.display = 'flex';
          // 重置游戏到开始屏幕
          if (window.gameInstance) {
            window.gameInstance.showStartScreen = true;
          }
          // 页面滚动到顶部
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
        }
      });
    }
  };

  /**
   * 初始化游戏引擎并设置导航
   */
  const initializeGame = () => {
    initializeNavigation();
    const game = new GameEngine('game-canvas');
    window.gameInstance = game;
  };

  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeGame();
    });
  } else {
    initializeGame();
  }
})();

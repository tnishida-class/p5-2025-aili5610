// 最終課題を制作しよう

let x, y;             // 花火の位置
let exploding = false; // 爆発中かどうか
let particles = [];   // 爆発した粒の情報

function setup() {
  createCanvas(400, 400);
  noStroke();
  colorMode(HSB); // 色相で簡単にランダム色
}

function draw() {
  background(0); // 夜空

  // 上昇中の玉
  if (!exploding && y !== undefined) {
    y -= 5;            // 上に移動
    fill(255);         // 白色
    ellipse(x, y, 8);  // 玉を描く

    if (y < mouseY - 80) explode(); // 高さ到達で爆発
  }

  // 爆発中
  if (exploding) {
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;

      if (p.life > 0) fill(p.color);
      if (p.life > 0) ellipse(p.x, p.y, 5);
    }

    // 全粒が寿命切れなら終了
    if (particles.every(p => p.life <= 0)) {
      exploding = false;
      y = undefined; // 次の花火を打てるように
    }
  }
}

// クリックで花火打ち上げ（前の花火が消えるまで無視）
function mousePressed() {
  if (y === undefined) {
    x = mouseX;
    y = height;      // 下から上へ
    exploding = false;
  }
}

// 爆発処理
function explode() {
  exploding = true;
  particles = [];
  let hue = random(360); // 色ランダム

  for (let i = 0; i < 40; i++) {
    let angle = TWO_PI * i / 40;
    let speed = 2;
    particles.push({
      x: x,
      y: y,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      life: 40,
      color: color(hue, 255, 255)
    });
  }
}
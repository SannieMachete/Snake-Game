const COLS = 18, ROWS = 18, CELL = 20;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const overlay = document.getElementById('overlay');
  const scoreEl = document.getElementById('score');
  const hiEl = document.getElementById('hi');
  const levelEl = document.getElementById('level');

  let snake, dir, nextDir, food, score, hi = 0, level, timer, running = false;

  function startGame() {
    snake = [{x:9,y:9},{x:8,y:9},{x:7,y:9}];
    dir = {x:1,y:0};
    nextDir = {x:1,y:0};
    score = 0; level = 1;
    scoreEl.textContent = 0;
    levelEl.textContent = 1;
    placeFood();
    overlay.style.display = 'none';
    running = true;
    clearInterval(timer);
    timer = setInterval(tick, 160);
  }

  function placeFood() {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;
  }

  function tick() {
    if (!running) return;
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
        snake.some(s => s.x === head.x && s.y === head.y)) {
      endGame(); return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += level * 10;
      if (score > hi) { hi = score; hiEl.textContent = hi; }
      scoreEl.textContent = score;
      level = Math.floor(score / 100) + 1;
      levelEl.textContent = level;
      clearInterval(timer);
      timer = setInterval(tick, Math.max(60, 160 - (level - 1) * 15));
      placeFood();
    } else {
      snake.pop();
    }

    draw();
  }

  function turn(dx, dy) {
    if (dx !== 0 && dir.x === 0) nextDir = { x: dx, y: 0 };
    if (dy !== 0 && dir.y === 0) nextDir = { x: 0, y: dy };
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y); ctx.arcTo(x+w, y, x+w, y+r, r);
    ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
    ctx.lineTo(x+r, y+h); ctx.arcTo(x, y+h, x, y+h-r, r);
    ctx.lineTo(x, y+r); ctx.arcTo(x, y, x+r, y, r);
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* grid */
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= COLS; c++) { ctx.beginPath(); ctx.moveTo(c*CELL,0); ctx.lineTo(c*CELL,ROWS*CELL); ctx.stroke(); }
    for (let r = 0; r <= ROWS; r++) { ctx.beginPath(); ctx.moveTo(0,r*CELL); ctx.lineTo(COLS*CELL,r*CELL); ctx.stroke(); }

    /* snake */
    snake.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? '#5DCA95' : '#1D9E75';
      ctx.globalAlpha = i === 0 ? 1 : Math.max(0.4, 1 - i / snake.length * 0.6);
      roundRect(s.x*CELL+1, s.y*CELL+1, CELL-2, CELL-2, i === 0 ? 5 : 3);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    /* food */
    ctx.fillStyle = '#F09575';
    roundRect(food.x*CELL+2, food.y*CELL+2, CELL-4, CELL-4, 5);
    ctx.fill();
  }

  function endGame() {
    running = false;
    clearInterval(timer);
    draw();
    document.getElementById('msg-title').textContent = 'Game over';
    document.getElementById('msg-sub').textContent = 'Score: ' + score;
    document.querySelector('#msg-box button').textContent = 'Play again';
    overlay.style.display = 'flex';
  }

  document.addEventListener('keydown', e => {
    if (!running && (e.key === 'Enter' || e.key === ' ')) { startGame(); return; }
    if (e.key === 'ArrowUp')    { e.preventDefault(); turn(0, -1); }
    if (e.key === 'ArrowDown')  { e.preventDefault(); turn(0,  1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); turn(-1, 0); }
    if (e.key === 'ArrowRight') { e.preventDefault(); turn( 1, 0); }
  });

  draw();
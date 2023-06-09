var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
        var fundoImg = new Image();
		var ballRadius = 10;
		var x = canvas.width/2;
		var y = canvas.height-30;
		var dx = 2;
		var dy = -2;
		var paddleHeight = 10;
		var paddleWidth = 75;
		var paddleX = (canvas.width-paddleWidth)/2;
		var rightPressed = false;
		var leftPressed = false;
		var brickRowCount = 3;
		var brickColumnCount = 5;
		var brickWidth = 75;
		var brickHeight = 20;
		var brickPadding = 10;
		var brickOffsetTop = 30;
		var brickOffsetLeft = 30;
		var score = 0;
		var ballSpeed = 1; // Aumente esse valor para aumentar a velocidade da bola a cada colisão
		var brickRowCount = 9; // Aumente o número de linhas de tijolos
		var brickColumnCount = 10; // Aumente o número de colunas de tijolos

		var bricks = [];
		for (var c = 0; c < brickColumnCount; c++) {
			bricks[c] = [];
			for (var r = 0; r < brickRowCount; r++) {
				bricks[c][r] = { x: 0, y: 0, status: 1 };
			}
		}
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("mousemove", mouseMoveHandler, false);

		function drawBall() {
			ctx.beginPath();
			ctx.arc(x, y, ballRadius, 0, Math.PI*2);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}

		function drawPaddle() {
			ctx.beginPath();
			ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}
		
		//função para neon
		function neon() {
			return 'white';
		  }
		  
		  function drawBricks() {
			for (var c = 0; c < brickColumnCount; c++) {
				for (var r = 0; r < brickRowCount; r++) {
					if (bricks[c][r].status == 1) {
						var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
						var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
						bricks[c][r].x = brickX;
						bricks[c][r].y = brickY;
						ctx.beginPath();
						ctx.rect(brickX, brickY, brickWidth, brickHeight);
						ctx.fillStyle = neon();
						ctx.shadowColor = '#fff';
						ctx.shadowBlur = 5;
						ctx.shadowOffsetX = 0;
						ctx.shadowOffsetY = 0;
						ctx.fill();
						ctx.closePath();
					}
				}
			}
		}
		
		  

		  function collisionDetection() {
			for (var c = 0; c < brickColumnCount; c++) {
				for (var r = 0; r < brickRowCount; r++) {
					var b = bricks[c][r];
					if (b.status == 1) {
						if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
							dy = -dy;
							b.status = 0;
							score++;
							ballSpeed += 0.1; // Aumenta a velocidade da bola a cada colisão com um tijolo
							if (score == brickRowCount * brickColumnCount) {
								alert("YOU WIN, CONGRATULATIONS!");
								document.location.reload();
							}
						}
					}
				}
			}
		}
		function drawScore() {
			ctx.font = "16px Arial";
			ctx.fillStyle = "#0095DD";
			ctx.fillText("Pontuação: "+score, 8, 20);
		}

		function keyDownHandler(e) {
			if(e.keyCode == 39) {
				rightPressed = true;
			}
			else if(e.keyCode == 37) {
				leftPressed = true;
			}
		}

		function keyUpHandler(e) {
			if(e.keyCode == 39) {
				rightPressed = false;
			}
			else if(e.keyCode == 37) {
				leftPressed = false;
			}
		}

		function mouseMoveHandler(e) {
			var relativeX = e.clientX - canvas.offsetLeft;
			if(relativeX > 0 && relativeX < canvas.width) {
				paddleX = relativeX - paddleWidth/2;
			}
		}

         //coloca imagem de fundo
    function fundo(){
        fundoImg.src = "univer.png";
        ctx.drawImage(fundoImg, 0, 0);  
    }

        function draw() {

    // Limpa o canvas antes de desenhar os elementos novamente
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //coloca o fundo
    fundo();

    // Desenha os tijolos
    drawBricks();

    // Desenha a bola
    drawBall();

    // Desenha a raquete
    drawPaddle();

    // Desenha a pontuação
    drawScore();

    // Verifica se houve colisão entre a bola e algum tijolo
    collisionDetection();

    // Verifica se a bola atingiu as bordas do canvas e muda sua direção
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // Verifica se a bola atingiu a parte inferior do canvas
        if (x > paddleX && x < paddleX + paddleWidth) {
            // Se a bola atingiu a raquete, muda sua direção
            dy = -dy;
        } else {
            // Se a bola não atingiu a raquete, o jogo acabou
            alert("GAME OVER");
            document.location.reload();
        }
    }

    // Move a raquete se as teclas de seta direita ou esquerda estiverem pressionadas
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Move a bola na direção definida pelas variáveis dx e dy
    x += dx;
    y += dy;

    // Chama a função draw novamente para atualizar a tela
    requestAnimationFrame(draw);
}

   draw();
	
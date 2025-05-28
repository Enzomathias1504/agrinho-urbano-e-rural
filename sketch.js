let scene = "urbano";  // Cena inicial: urbana
let vehicles = [];      // Veículos da cidade
let animals = [];       // Animais do campo
let transitionAlpha = 0; // Opacidade para a transição suave
let transitionDirection = 1; // Direção da transição (1 para entrando, -1 para saindo)

function setup() {
  createCanvas(800, 600);
  noStroke();
  
  // Criando veículos na cidade
  for (let i = 0; i < 3; i++) {
    vehicles.push(new Vehicle(random(100, 300), random(height - 150, height - 100)));
  }
  
  // Criando animais no campo
  for (let i = 0; i < 4; i++) {
    animals.push(new Animal(random(width - 300, width - 100), random(height - 200, height - 100)));
  }
}

function draw() {
  background(255);
  
  // Transição suave entre as cenas (fade in/out)
  if (transitionAlpha > 0) {
    fill(0, 0, 0, transitionAlpha);
    rect(0, 0, width, height);
    transitionAlpha -= 5 * transitionDirection;
    if (transitionAlpha <= 0 || transitionAlpha >= 255) {
      transitionDirection *= -1; // Alterna a direção da transição
    }
    return;  // Não desenha as cenas enquanto a transição está acontecendo
  }

  // Divisão entre urbano e rural
  let middle = width / 2;
  stroke(0);
  line(middle, 0, middle, height);

  // Desenha a cena de acordo com a variável 'scene'
  if (scene === "urbano") {
    drawUrbano();
  } else {
    drawRural();
  }

  // Atualiza veículos
  if (scene === "urbano") {
    for (let vehicle of vehicles) {
      vehicle.update();
      vehicle.display();
    }
  }

  // Atualiza animais
  if (scene === "rural") {
    for (let animal of animals) {
      animal.update();
      animal.display();
    }
  }

  // Instruções para alternar entre as cenas
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text("Clique para alternar entre Urbano e Rural", width / 2, height - 30);
}

// Função para desenhar a cena urbana
function drawUrbano() {
  // Céu cinza e prédios
  background(200);
  fill(150);
  for (let i = 0; i < 4; i++) {
    rect(50 + i * 150, height - 300, 100, 300);  // Prédios
  }

  // Rua
  fill(120);
  rect(0, height - 120, width / 2, 120);

  // Detalhes urbanos
  fill(0);
  textSize(32);
  text("Cidade", 120, 50);
}

// Função para desenhar a cena rural
function drawRural() {
  // Céu azul claro e campo
  background(135, 206, 235);  // Cor do céu
  fill(34, 139, 34);
  rect(width / 2, height / 2, width / 2, height / 2);  // Campo

  // Desenhando uma árvore
  fill(139, 69, 19);  // Tronco
  rect(width - 250, height - 250, 30, 100);

  fill(34, 139, 34);  // Folhas
  ellipse(width - 235, height - 300, 100, 100);

  // Casa simples
  fill(255, 0, 0);  // Cor da casa
  rect(width - 350, height - 250, 100, 100);

  fill(139, 69, 19);  // Telhado da casa
  triangle(width - 350, height - 250, width - 250, height - 250, width - 300, height - 300);

  // Detalhes rurais
  fill(0);
  textSize(32);
  text("Campo", width - 350, 50);
}

// Classe para criar veículos na cidade
class Vehicle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.speed = random(2, 4);
  }

  update() {
    this.x += this.speed;
    if (this.x > width / 2 + this.size) {
      this.x = -this.size; // Quando sair da tela, volta para o início
    }
  }

  display() {
    fill(255, 0, 0); // Cor do carro
    rect(this.x, this.y, this.size, 30); // Corpo do carro
    fill(0);
    ellipse(this.x + 15, this.y + 30, 10, 10); // Roda do carro
  }
}

// Classe para criar animais no campo
class Animal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.speed = random(0.5, 1.5);
  }

  update() {
    this.x += this.speed;
    if (this.x > width - 100) {
      this.speed *= -1; // Quando atingir a borda, vira para o outro lado
    } else if (this.x < width - 300) {
      this.speed *= -1; // Quando atingir a borda, vira para o outro lado
    }
  }

  display() {
    fill(255, 223, 0); // Cor do animal (por exemplo, um pato ou cavalo)
    ellipse(this.x, this.y, this.size, this.size); // Corpo do animal
    fill(0);
    ellipse(this.x - 5, this.y - 10, 10, 10); // Cabeça do animal
  }
}

// Alterna entre as cenas com o clique do mouse
function mousePressed() {
  // Evitar alternar durante a transição
  if (transitionAlpha > 0) return;

  // Alterna entre urbano e rural
  if (mouseX < width / 2) {
    scene = "urbano";
  } else {
    scene = "rural";
  }

  // Inicia a transição suave
  transitionDirection = 1; 
  transitionAlpha = 255; 
}

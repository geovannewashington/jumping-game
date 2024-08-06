const enemy = document.querySelector('.enemy');
const scoreElement = document.querySelector('.score-number');
let score = 0;

class Player {
    constructor() {
        this.element = document.querySelector('.hero');
    }

    jump() {
        if (this.element.classList.contains('jump')) return;
        this.element.classList.add('jump');
        
        setTimeout(() => {
            this.element.classList.remove('jump');
        }, 800);
    }
}

const hero = new Player();

const loop = setInterval(() => {
    const enemyPosition = enemy.offsetLeft;
    const heroPosition = +window.getComputedStyle(hero.element).bottom.replace('px', '');
    let failed = enemyPosition <= 85 && enemyPosition > 0 && heroPosition < 100;

    if (failed) {
        enemy.style.animation = 'none';
        enemy.style.left = `${enemyPosition}px`;
        
        hero.element.style.animation = 'none';
        hero.element.style.bottom = `${heroPosition}px`;
        
        clearInterval(loop);
    } else if (enemyPosition < 0 && !enemy.classList.contains('scored')) {
        // The player successfully jumped over the enemy
        score++;
        scoreElement.textContent = score;
        enemy.classList.add('scored');
    } else if (enemyPosition >= 0) {
        // Reset the scored state when the enemy resets its position
        enemy.classList.remove('scored');
    }
}, 10);

document.addEventListener('keydown', () => hero.jump());

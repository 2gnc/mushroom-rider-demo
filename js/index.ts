require('../styles/style.css');
import { Game } from './gameModels/game';

document.addEventListener('DOMContentLoaded', ready);

const { innerWidth, innerHeight } = window;

function ready(): void {
  const game = new Game(innerWidth, innerHeight);
  game.initialize();
}
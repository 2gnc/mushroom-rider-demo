require('../styles/style.css');
import { VideoBg } from './models/videoBg';
import { Intro } from './models/intro';
import { Game } from './models/game';

document.addEventListener('DOMContentLoaded', ready);

const { innerWidth, innerHeight } = window;

async function ready(): Promise<void> {
  const game = new Game(innerWidth, innerHeight);

  await game.initialize();
}
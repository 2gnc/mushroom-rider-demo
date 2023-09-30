import { GameObjectCoordsT, GameObjectCircleAreaT } from '../models/models';

export function isPointInCircle(point: GameObjectCoordsT, circle: GameObjectCircleAreaT): boolean {
  const { x, y } = point;
  const dx = x - circle.x;
  const dy = y - circle.y;

  return (dx * dx + dy * dy < circle.radius * circle.radius);
}
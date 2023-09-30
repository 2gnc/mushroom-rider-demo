import { GameObjectCircleAreaT } from '../models/models';

export function checkIsSirclesIntersected(circleOne: GameObjectCircleAreaT, circleTwo: GameObjectCircleAreaT): boolean {
  const dx = circleTwo.x - circleOne.x;
  const dy = circleTwo.y - circleOne.y;
  const rSum=circleOne.radius + circleTwo.radius;
  return dx * dx + dy * dy <= rSum * rSum;
}
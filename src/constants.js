const canvasDefinition = document.querySelector("canvas");
canvasDefinition.width = innerWidth;
canvasDefinition.height = innerHeight;

export const PLAYER_HEIGHT = (10 / 100) * innerHeight;
export const MOVE_SPEED = 20;
export const CANVAS = canvasDefinition;
export const CONTEXT = CANVAS.getContext("2d");
export const HALF_Y = CANVAS.height / 2;
export const HALF_X = CANVAS.width / 2;
export const HALF_Y_PLAYER = HALF_Y - PLAYER_HEIGHT / 2;

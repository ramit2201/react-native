import { COLORS } from '../constants/color';

const generateColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};

export default generateColor;

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

export const colors = {
  auth_background_color: '#FFF',
  main_background_color: '#F5F5F5',
  banner_background_color: '#ECECEC',
  button: '#222',
  // button: '#0A1931',
  textInputSelect: '#222',
  warning: '#FF6243',
  hero_border_color: '#F5F5F5'
}

export const fontSize = {
  title: 24,
  large: 20,
  medium: 16,
  small: 14,
  xsmall: 10,
}

export const spaces = {
  xl: 24,
  l: 20,
  m: 16,
  s: 12,
  xs: 10,
  xxs: 8,
}


export const basicDimensions = { // iPhone 13 기준
  height: 844,
  width: 390,
};

export const widthPercentage = (width) => {
  const percentage = (width / basicDimensions.width) * 100;

  return responsiveScreenWidth(percentage);
};
export const heightPercentage = (height) => {
  const percentage = (height / basicDimensions.height) * 100;

  return responsiveScreenHeight(percentage);
};
export const fontPercentage = (size) => {
  const percentage = size * 0.125;

  return responsiveScreenFontSize(percentage);
};


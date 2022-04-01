import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

export const colors = {
  primary: '#2979ff',
  secondary: '#2196f3',
  warning: '#f44336',
  white: '#fff',
  black: '#222',
  gray100: '#f5f5f5',
  gray300: '#e0e0e0',
  gray500: '#9e9e9e',
  gray700: '#616161',
  auth_background_color: '#FFF',
  main_background_color: '#F5F5F5',
  banner_background_color: '#ECECEC',
  button: '#2979ff',
  submit_button: '#222',
  textInputSelect: '#222',
  hero_border_color: '#EBF2FF',
  divider: '#EBF2FF',
}

export const fontSize = {
  title: 24,
  menu: 18,
  large: 20,
  medium: 16,
  small: 14,
  xsmall: 10,
}

export const spaces = {
  xxl: 30,
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


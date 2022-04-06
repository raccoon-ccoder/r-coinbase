import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    basicColor: string,
    bgColor: string;
    accentColor: string;
    mainColor: string;
    headerAccentColor: string;
    grayColor: string;
    coinNavColor: string,
    tableLineColor: string,
    shadowColor: string,
    desktop: string,
  }
}
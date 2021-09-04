import "@emotion/react";
import colors from "./color";

export {};

declare module "@emotion/react" {
  declare interface Theme {
    palette: Colors;
    viewportSize: {
      laptop: string;
      tablet: string;
      mobile: string;
    };
  }
}

type Color = {
  main: string;
  [key: number]: string;
};

interface Colors {
  green: Color;
  grey: Color;
  white: Color;
  black: Color;
  blue: Color;
}

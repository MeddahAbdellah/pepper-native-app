// styles may disobey naming convention
/* eslint-disable @typescript-eslint/naming-convention */
export const space_unit = 6;

export const white = '#F7F9F9';
export const grey_1 = '#E8E6E6';
export const grey_2 = '#C4C4C4';
export const grey_3 = '#444444';
export const pepper = '#DD2493';
export const pepper_2 = '#D30000';
export const indigo = '#972FFF';
export const indigo_2 = '#825DED';
export const indigo_3 = '#B819F0';
export const black = '#000';
export const raven = '#424242';
export const fire = '#EDA25D';
export const fire_2 = '#F06619';
export const sun = '#EDDE5D';
export const sun_2 = '#F09819';
export const heaven = '#00C566';
export const sea = '#006DD1';
export const sky = '#3498DB';

export const fontSizeTypo = 11;
export const fontSizeRegular = 13;
export const fontSizeBody = 14;
export const fontSizeSubSubHeader = 16;
export const fontSizeSubHeader = 20;
export const fontSizeHeader = 24;


export const color = (colorHex: string, opacity: number ): string => `rgba(${hexToRgb(colorHex)},${opacity})`;

const hexToRgb = (hex: string): string => {
  const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (normal) return normal.slice(1).map(e => parseInt(e, 16)).join(',');

  const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (shorthand) return shorthand.slice(1).map(e => 0x11 * parseInt(e, 16)).join(',');

  return '';
};

export const loremIpsium = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
    Quis eget in purus, consectetur turpis nunc. Vulputate cras aenean eros, lacus, in at.\
    Rhoncus, amet quam auctor integer hendrerit vel tellus. Dictum tincidunt eu augue pulvinar orci, posuere.';

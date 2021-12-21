export const space_unit = 6;

export const white = '#FFF';
export const grey_1 = '#E8E6E6';
export const grey_2 = '#C4C4C4';
export const grey_3 = '#444444';
export const pepper = '#DD2493';
export const black = '#000';

export const fontSizeRegular = 14;
export const fontSizeSubHeader = 21;
export const fontSizeHeader = 28;


export const color = (colorHex: string, opacity: number ) => `rgba(${hexToRgb(colorHex)},${opacity})`;

const hexToRgb = (hex: string): string => {
    const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (normal) return normal.slice(1).map(e => parseInt(e, 16)).join(',');

    const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);    
    if (shorthand) return shorthand.slice(1).map(e => 0x11 * parseInt(e, 16)).join(',');

    return '';
}
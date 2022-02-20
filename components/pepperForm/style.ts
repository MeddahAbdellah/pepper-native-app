import {
  space_unit, grey_3, color, grey_1, indigo, fontSizeSubHeader,
} from '../../styles/common';

export const inputStyle = {
  padding: 2 * space_unit,
  fontSize: fontSizeSubHeader,
  color: color(grey_3, .9),
  backgroundColor: color(grey_1, .4),
  borderRadius: space_unit,
};

export const inputErrorStyle = {
  marginTop: space_unit,
  marginLeft: space_unit,
  color: indigo,
};


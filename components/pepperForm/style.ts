import {
  space_unit, fontSizeRegular, grey_3, color, grey_1, indigo,
} from '../../styles/common';

export const inputStyle = {
  padding: 2 * space_unit,
  fontSize: fontSizeRegular,
  color: grey_3,
  backgroundColor: color(grey_1, .4),
  shadowColor: color(grey_3, .1),
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 1,
  shadowRadius: 2,
  elevation: 5,
  borderRadius: space_unit,
};

export const inputErrorStyle = {
  marginTop: space_unit,
  marginLeft: space_unit,
  color: indigo,
};


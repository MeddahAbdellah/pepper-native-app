import {StyleSheet} from "react-native";
import {
  fontSizeBody, grey_2, space_unit, white
} from "../../styles/common";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  description: {
    width: '80%',
    textAlign: 'center',
    fontSize: fontSizeBody,
  },

  dot: {
    width: 1.5 * space_unit,
    height: 1.5 * space_unit,
    borderRadius: space_unit,
    marginHorizontal: space_unit,
    backgroundColor: grey_2,
  },

  nextButton: {
    position: 'absolute',
    bottom: 3 * space_unit,
    right: 2 * space_unit,
    zIndex: 2,
    shadowColor: white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 2,
  },



  image: {
    height: '50%',
    marginBottom: 4 * space_unit,
  },
});

export default styles;
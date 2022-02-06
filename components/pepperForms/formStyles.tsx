import {StyleSheet} from "react-native";
import {
  color, fontSizeBody, grey_2, space_unit, white
} from "../../styles/common";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  addableFormContainer: {
    flexGrow: 1,
    padding:space_unit,
    flexDirection:'column',

  },
  image: {
    height: '50%',
    marginBottom: 4 * space_unit,
  },

  bottomImage:
	{
	  width:"100%",
	  height:"100%",
	},
  bottomImageHolder:
	{
	  position:"absolute",
	  bottom: 0,
	  left: 0,
	  height:"25%",
	  width:"80%",

	},
  newItemAddName:
	{
	  borderRadius:6,
	  borderWidth:1,
	  borderColor:"#CCCCCC",
	  height:8*space_unit,
	  padding:0.5*space_unit,
	  paddingStart:2*space_unit,
	  backgroundColor:"#FAFAFA",
	  fontSize:20,
	  fontWeight:"normal",
	  color:color("#595959",1),
	  elevation:1,
	  // fontFamily:'Sora'

	  marginLeft:"5%",
	  width:"65%",
	  marginRight:"6%"
	},

  newItemButton:
	{
	  color: '#dd24ce',
	  fontSize:18,
	  fontWeight:"normal",
	  textDecorationLine: 'underline'
	},

  newItemAddPrice:
	{
	  borderRadius:6,
	  borderWidth:1,
	  borderColor:"#CCCCCC",
	  height:8*space_unit,
	  padding:0.5*space_unit,
	  paddingStart:2*space_unit,
	  backgroundColor:"#FAFAFA",
	  fontSize:20,
	  // fontWeight:"bold",
	  color:color("#595959",1),
	  elevation:1,
	  // fontFamily:'Sora'
	  width:"20%",
	},

  chipsContainer: {
    flexDirection: 'row',
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    width: '80%',
    textAlign: 'center',
    fontSize: fontSizeBody,
  },
  menuDescriptionIn:
	{
	  marginTop: 3 * space_unit,
	  paddingHorizontal: 2*space_unit,
	  paddingStart:4*space_unit,
	  flex: 1,
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  textAlign:"left",
	  display:"flex",
	},
  menuDescriptionText:
	{
	  fontSize:20,
	  flex:20
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

  fullLineField:
		{
		  borderRadius:6,
		  borderWidth:1,
		  borderColor:"#CCCCCC",
		  height:8*space_unit,
		  padding:0.5*space_unit,
		  paddingStart:2*space_unit,
		  backgroundColor:"#FAFAFA",
		  fontSize:20,
		  fontWeight:"normal",
		  color:color("#595959",1),
		  elevation:1,
		  // fontFamily:'Sora'
		  marginLeft:"5%",
		  width:"90%",
		  marginRight:"5%"
		},

  fullLineFieldMultiline:
		{
		  borderRadius:6,
		  borderWidth:1,
		  borderColor:"#CCCCCC",
		  padding:0.5*space_unit,
		  paddingStart:2*space_unit,
		  backgroundColor:"#FAFAFA",
		  fontSize:18,
		  fontWeight:"normal",
		  color:color("#595959",1),
		  elevation:1,
		  textAlignVertical: 'top',
		  textAlign:"left",
		  marginLeft:"5%",
		  width:"90%",
		  marginRight:"5%"
		},

  containerInput: {
    flex: 1,
    backgroundColor: '#fff',
  },

  genderImage:
	{
	  width:"100%",
	  height:"100%",
	},

  genderImageHolder:
	{
	  backgroundColor:"#FAFAFA",
	  borderRadius:10,
	  borderWidth:2,
	  borderColor:"#CCCCCC",
	  alignSelf:"flex-end",
	  height:30*space_unit,
	  width:"42%",

	}

});

export default styles;
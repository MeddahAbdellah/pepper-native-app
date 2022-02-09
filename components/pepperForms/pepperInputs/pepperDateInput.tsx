import React, {useState} from "react";
import DateTimePicker  from "@react-native-community/datetimepicker";
import {
  Platform, Text, TouchableOpacity, View
} from "react-native";
import { space_unit} from "../../../styles/common";
import PepperIcon from "../../pepperIcon/pepperIcon";
import moment from "moment";
import 'moment/locale/fr';
import { StyleSheet } from "react-native";


const PepperDateInput = (inputProps:{ initialDate:Date, onChange:(value:Date)=>void, style?:any }): JSX.Element =>{
  const [date,setDate] = useState(inputProps.initialDate);
  const [displayedDate,setDisplayedDate] = useState(false);
  return (
    <View style={styles.dateHolder}>

      <View style={{...inputProps.style,padding:0,paddingTop:space_unit}}>

        <View style={{width:"100%",flexDirection:'row'}}>

          <TouchableOpacity testID={"date"} style={styles.dateField}
            onPressOut={()=>{setDisplayedDate(true);}}>
            <Text style={styles.dateText}>{moment(date).locale("fr").format('Do MMMM YYYY')}</Text>
          </TouchableOpacity>

          <View style={{width:"15%",position:"relative"}}>
					 <PepperIcon name={"date-add"} style={styles.dateIcon} size={26}/>
          </View>

        </View>

      </View>
      { displayedDate ?
        <DateTimePicker
          testID="dateTimePicker"
				 value={date}
				 // maximumDate={new Date()}
				 is24Hour={true}
				 onChange={(_event: any, date: any)=>{
					 setDisplayedDate(Platform.OS === 'ios');
					 if(date){
						 inputProps.onChange(date);
						 setDate(date);
					 }
          }}/> :
		  null
      }

    </View>);
};

export default PepperDateInput;

const styles = StyleSheet.create({
  dateField: {
    width:"85%", 
    alignSelf:"center",
    justifyContent:"center"
  },
  dateHolder:{
    flexDirection:'row',
    backgroundColor:"#fff",
    paddingBottom:space_unit*2
  },
  dateText:{
    fontSize:22,
    textAlign:"center",
    color:"#595959"
  },
  dateIcon:{
    color:"#595959",
    marginLeft:space_unit,
    top:space_unit*0.4,
    position:"absolute",
    right:space_unit*2,
  },
});
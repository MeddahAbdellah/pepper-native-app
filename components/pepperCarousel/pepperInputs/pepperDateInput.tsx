import React, {useState} from "react";
import DateTimePicker  from "@react-native-community/datetimepicker";
import {Platform, Text, TouchableOpacity, View} from "react-native";
import {pepper, space_unit} from "../../../styles/common";
import PepperIcon from "../../pepperIcon/pepperIcon";
import moment from "moment";
import 'moment/locale/fr'



const PepperDateInput = (InputProps:{initialDate:Date, onChange:(value:Date)=>void, style?:any})=>{
	const [date,setDate] = useState(InputProps.initialDate)
	const [displayedDate,setDisplayedDate] = useState(false)
	const [displayedTime,setDisplayedTime] = useState(false)



	/**
	 * The 21h that didnt come yet */

	return (

		<View style={{ flexDirection:'row',backgroundColor:"#fff",paddingBottom:space_unit*2 }}>

			<View style={{...InputProps.style,padding:0,paddingTop:space_unit}}>

				<View style={{width:"100%",flexDirection:'row'}}>

						<TouchableOpacity testID={"date"} style={{width:"55%", alignSelf:"center", justifyContent:"center"}}
															onPressOut={()=>{setDisplayedDate(true); console.log("Date")}}>
							<Text style={{fontSize:22,textAlign:"center",color:"#595959",borderRightWidth:1}}>{moment(date).locale("fr").format('Do MMMM ')}</Text>
						</TouchableOpacity>


					<TouchableOpacity testID={"time"} style={{
						width:"30%",
						alignSelf:"center",
						justifyContent:"center"}}
						onPressOut={()=>{setDisplayedTime(true); console.log("TIME")}}>
						<Text style={{fontSize:22,textAlign:"center",color:"#595959"}}>{moment(date).locale("fr").format('HH:mm')}</Text>
					</TouchableOpacity>


					<View style={{
						width:"15%",
						position:"relative"
						//backgroundColor:"blue"
				}}>
					 <PepperIcon name={"date-add"} style={{color:pepper,marginLeft:space_unit,top:space_unit*0.4,position:"absolute",right:space_unit*2}} size={26}/>
				</View>

				</View>

			</View>
			{displayedDate?
				<DateTimePicker
					testID="dateTimePicker"
				 value={date}
				 minimumDate={new Date()}
				 is24Hour={true}

				 onChange={(_event: any, date: any)=>{
					 setDisplayedDate(Platform.OS === 'ios');
					 if(date){
						 console.log(date)
						 InputProps.onChange(date)
						 setDate(date)

					 }}}/>
				:null
			}
			{displayedTime?
				<DateTimePicker
					testID="dateTimePicker"
				value={date}
				display={"default"} //spinner
				mode={"time"}

					style={{backgroundColor:"red"}}
				//minimumDate={new Date()}
				is24Hour={true}
				onChange={(_event: any, date: any)=>{
					setDisplayedTime(Platform.OS === 'ios');
					if(date){
						InputProps.onChange(date)
						setDate(date)
					}
				}}/>
				:null
			}
		</View>)
}

export default PepperDateInput;




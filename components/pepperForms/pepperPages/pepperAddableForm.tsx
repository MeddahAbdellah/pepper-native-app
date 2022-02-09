import PepperImage, {PepperImages} from "../../pepperImage/pepperImage";
import {
  ScrollView, Text, TextInput, TouchableOpacity, View
} from "react-native";
import {StyleSheet} from "react-native";
import styles from '../formStyles';
import {
  grey_2, indigo,pepper, space_unit
} from "../../../styles/common";
import React, {useEffect, useState} from "react";
import {PepperFormType,IProduct} from "../Interface";
import PepperRoundButton from "../../pepperRoundButton/pepperRoundButton";
import PepperIcon from "../../pepperIcon/pepperIcon";
import Toast from "react-native-root-toast";

const PepperItemAddableForm = (carouselProps: { item: { prefix:string, typeForm: PepperFormType, addableForm: {
  bottomImage:PepperImages,
  productCategory : string,
}
}, nextFormTrigger:()=>void, onDataSubmitted:(data: any)=>void}):JSX.Element => {

  useEffect(()=>{
    setProductList([]);
  },[carouselProps.item.prefix]);

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");

  const [productList,setProductList] = useState(Array<IProduct>());

  const addProduct = (name:string,price:number):void =>{
    setProductList([...productList,{name,price}]);
  };

  const removeProduct = (name:string):void=>{
    let newList = Array<IProduct>();
    productList.forEach((product)=>{
      if(product.name != name) {
        newList.push(product);
      }
    });
    setProductList(newList);
  };
  const capitalizeFirstLetter = (str:string):string => str.charAt(0).toUpperCase() + str.slice(1);

  const StaticMenuList = (items: IProduct[]):JSX.Element[] => items.map((item) => (
    <View key={item.name} style={localStyles.menuDescriptionIn}>
      <Text style={{fontSize:20,flex:40,color:"#6c6c6c"}}>{capitalizeFirstLetter(item.name)}</Text>
      <Text style={{fontSize:20,flex:10,color:"#6c6c6c"}}>{`${item.price}€`}</Text>
      <TouchableOpacity onPress={() =>{removeProduct(item.name);}}>
        <PepperIcon  name={"pepper-close"} style={{color:pepper,paddingTop:space_unit,marginLeft:space_unit}} size={14}/>
      </TouchableOpacity>
      
    </View>
  ));

  return (
    <>

      <ScrollView style={localStyles.addableFormContainer}>

        <View
          style={{height:18*space_unit, width:"100%",}}>
          <PepperImage src={carouselProps.item.addableForm.bottomImage} style={localStyles.bottomImage}/>
        </View>

        {StaticMenuList(productList)}

        <View style={{ flexDirection:'row',paddingTop:3*space_unit }}>
          <TextInput
            style={localStyles.newItemAddName}
            value={name}
            onChangeText={(text)=>{setName(text);}}
            autoCapitalize="characters"
            placeholder={carouselProps.item.addableForm.productCategory+" Name ..."}
            placeholderTextColor={grey_2}
          />

          <TextInput
            style={localStyles.newItemAddPrice}
            value={price}
            placeholder={"€"}
            keyboardType="decimal-pad"
            placeholderTextColor={grey_2}
            onChangeText={(text)=>{setPrice(text);}}
          />
        </View>
        <View style={localStyles.inputHolder}>

          <TouchableOpacity onPress={() => {
            if(name === "") {
              Toast.show('Fill in Name & Price first', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              });
              return;
            }
            addProduct(name,Number(price));
            setName("");
            setPrice("");
          }}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={localStyles.newItemButton}>Add {carouselProps.item.addableForm.productCategory}</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <PepperRoundButton
        size={7 * space_unit}
        style={styles.nextButton}
        colors={[indigo, pepper]}
        iconName="pepper-arrowRight"
        onPress={() => {
          carouselProps.onDataSubmitted(productList);
          carouselProps.nextFormTrigger();
        }}
      />
    </>
  );
};

export default PepperItemAddableForm;


const localStyles = StyleSheet.create({
  addableFormContainer: {
    flexGrow: 1,
    padding:space_unit,
    flexDirection:'column',
  },

  inputHolder:{
    flexDirection:'row',
    paddingTop:3*space_unit,
    paddingLeft:"10%",
    paddingBottom:space_unit*10 
  },

  bottomImage: {
	  width:"100%",
	  height:"100%",
  },

  bottomImageHolder: {
	  position:"absolute",
	  bottom: 0,
	  left: 0,
	  height:"25%",
	  width:"80%",
  },

  newItemAddName: {
	  borderRadius:6,
	  borderWidth:1,
	  borderColor:"#CCCCCC",
	  height:8*space_unit,
	  padding:0.5*space_unit,
	  paddingStart:2*space_unit,
	  backgroundColor:"#FAFAFA",
	  fontSize:20,
	  fontWeight:"normal",
	  color:"#595959",
	  elevation:1,
	  marginLeft:"5%",
	  width:"65%",
	  marginRight:"6%"
  },

  newItemButton: {
	  color: '#dd24ce',
	  fontSize:18,
	  fontWeight:"normal",
	  textDecorationLine: 'underline'
  },

  newItemAddPrice: {
	  borderRadius:6,
	  borderWidth:1,
	  borderColor:"#CCCCCC",
	  height:8*space_unit,
	  padding:0.5*space_unit,
	  paddingStart:2*space_unit,
	  backgroundColor:"#FAFAFA",
	  fontSize:20,
	  // fontWeight:"bold",
	  color:"#595959",
	  elevation:1,
	  // fontFamily:'Sora'
	  width:"20%",
  },

  menuDescriptionIn: {
	  marginTop: 3 * space_unit,
	  paddingHorizontal: 2*space_unit,
	  paddingStart:4*space_unit,
	  flex: 1,
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  textAlign:"left",
	  display:"flex",
  },
  
});

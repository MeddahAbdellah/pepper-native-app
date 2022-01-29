import PepperImage, {PepperImages} from "../../pepperImage/pepperImage";
// import {strict as assert} from "assert";
import {
  ScrollView, Text, TextInput, TouchableOpacity, View
} from "react-native";
import styles from "../styles";
import {
  grey_2, indigo,pepper, space_unit
} from "../../../styles/common";
import React, {useEffect, useState} from "react";
import {PepperFormType,IProduct} from "../Interface";
import PepperRoundButton from "../../pepperRoundButton/pepperRoundButton";
import PepperIcon from "../../pepperIcon/pepperIcon";
import Toast from "react-native-root-toast";

const PepperCarouselItemAddableForm = (carouselProps: { item: { prefix:string, typeForm: PepperFormType, addableForm: {
  bottomImage:PepperImages,
  productCategory : string,
}
}, nextFormTrigger:()=>void, concatResults:(data: any)=>void}):JSX.Element => {

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
    <View key={item.name} style={styles.menuDescriptionIn}>
      <Text style={{fontSize:20,flex:40,color:"#6c6c6c"}}>{capitalizeFirstLetter(item.name)}</Text>
      <Text style={{fontSize:20,flex:10,color:"#6c6c6c"}}>{`${item.price}€`}</Text>
      <TouchableOpacity onPress={() =>{removeProduct(item.name);}}>
        <PepperIcon  name={"pepper-close"} style={{color:pepper,paddingTop:space_unit,marginLeft:space_unit}} size={14}/>
      </TouchableOpacity>
      
    </View>
  ));

  return (
    <>

      <ScrollView style={styles.AddableFormContainer}>

        <View
          style={{height:18*space_unit, width:"100%",}}>
          <PepperImage src={carouselProps.item.addableForm.bottomImage} style={styles.bottom_image}/>
        </View>

        {StaticMenuList(productList)}

        <View style={{ flexDirection:'row',paddingTop:3*space_unit }}>
          <TextInput
            style={styles.NewItemAddName}
            value={name}
            onChangeText={(text)=>{setName(text);}}
            autoCapitalize="characters"
            placeholder={carouselProps.item.addableForm.productCategory+" Name ..."}
            placeholderTextColor={grey_2}
          />

          <TextInput
            style={styles.NewItemAddPrice}
            value={price}
            placeholder={"€"}
            keyboardType="decimal-pad"
            placeholderTextColor={grey_2}
            onChangeText={(text)=>{setPrice(text);}}
          />
        </View>
        <View style={{
          flexDirection:'row',paddingTop:3*space_unit,paddingLeft:"10%",paddingBottom:space_unit*10 
        }}>

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
              <Text style={styles.NewItemButton}>Add {carouselProps.item.addableForm.productCategory}</Text>
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
          carouselProps.concatResults(productList);
          carouselProps.nextFormTrigger();
        }}
      />
    </>
  );
};

export default PepperCarouselItemAddableForm;
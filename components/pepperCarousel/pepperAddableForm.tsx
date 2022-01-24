import PepperImage, {PepperImages} from "../pepperImage/pepperImage";
import {strict as assert} from "assert";
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {grey_2, indigo,pepper, space_unit} from "../../styles/common";
import React, {useState} from "react";
import {PepperFormType,IProduct} from "./Interface";
import PepperRoundButton from "../pepperRoundButton/pepperRoundButton";
import PepperIcon from "../pepperIcon/pepperIcon";

const CarouselItemAddableForm = (carouselProps: { item: { prefix:string, type_form: PepperFormType, addable_form?: {
			bottom_image:PepperImages,
			product_category : string,
		}
	}, nextFormTrigger:()=>void, concatResults: (data:any)=>void,}) => {

	assert(carouselProps.item.addable_form !== undefined);


	const [name,setName] = useState("")
	const [price,setPrice] = useState("")

	const [ProductList,SetProductList] = useState(Array<IProduct>());

	const addProduct = (name:string,price:number) =>{
		SetProductList([...ProductList,{name,price}])
	}

	const removeProduct = (name:String)=>{
		let newList = Array<IProduct>()
		ProductList.forEach((product)=>{
			if(product.name != name)
			{
				newList.push(product)
			}
		})
		SetProductList(newList)
	}
	const capitalizeFirstLetter = (str:string) =>
	{
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	const MenuList = (items: Array<IProduct>) => items.map((item) => (
		<View key={item.name} style={styles.menuDescriptionIn}>
			<Text style={{fontSize:20,flex:40,color:"#6c6c6c"}}>{capitalizeFirstLetter(item.name)}</Text>
			<Text style={{fontSize:20,flex:10,color:"#6c6c6c"}}>{`${item.price}€`}</Text>
			<PepperIcon onClickCall={()=>{removeProduct(item.name)}} name={"pepper-close"} style={{color:pepper,paddingTop:space_unit,marginLeft:space_unit}} size={14}/>
		</View>
	));


	return (
	<>

	<ScrollView style={styles.AddableFormContainer}>

		<View
			style={{height:18*space_unit, width:"100%",}}>
			<PepperImage src={carouselProps.item.addable_form.bottom_image} style={styles.bottom_image}/>
		</View>

		{MenuList(ProductList)}

			<View style={{ flexDirection:'row',paddingTop:3*space_unit }}>
							<TextInput
							style={styles.NewItemAddName}
							value={name}
							onChangeText={(text)=>{setName(text)}}
							autoCapitalize="characters"
							placeholder={carouselProps.item.addable_form.product_category+" Name ..."}
							placeholderTextColor={grey_2}
							/>

							<TextInput
							style={styles.NewItemAddPrice}
							value={price}
							placeholder={"€"}
							keyboardType="decimal-pad"
							placeholderTextColor={grey_2}
							onChangeText={(text)=>{setPrice(text)}}
							/>
			</View>
			<View style={{ flexDirection:'row',paddingTop:3*space_unit,paddingLeft:"10%",paddingBottom:space_unit*10 }}>

					<TouchableOpacity onPress={() => {
						if(name === "")
						{
							return
						}
							addProduct(name,Number(price))
							setName("")
							setPrice("")
					}}>
							<View style={{
								alignItems: 'center',
									justifyContent: 'center',
							}}
							>
									<Text style={styles.NewItemButton}>Add {carouselProps.item.addable_form.product_category}</Text>
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
				// may add conditions here
				//console.log(ProductList)
				carouselProps.concatResults(ProductList)
				carouselProps.nextFormTrigger()

			}}
		/>

		</>

	)

}

export default CarouselItemAddableForm
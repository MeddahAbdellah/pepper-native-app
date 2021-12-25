# Pepper native app
Multiple components are used throughout the app to accelerate work and factorize code

##Prerequisites
* Node v16 is required
* Expo-cli
```bash
npm install -g expo-cli
```

## PepperCarousel
```javascript
<PepperCarousel
  pages={[
   {image: 'PepperImages', text: 'string'},
   {image: 'PepperImages', text: 'string'},
   ...
   ]}
  nextStep='string'
  ></PepperCarousel>
```

## PepperDescriptionCarousel
```javascript
<PepperDescriptionCarousel carouselWidth={'number'} carouselImgs={'Array<{uri: \'string\'}>'}/>
```

## PepperIcon
You'll find the available icons on icomoon
user: meddeah.abdellah.spcx@gmail.com
password: 123pepper

```javascript
<PepperIcon name={'PepperIcons'} color={'string'} size={'number'} />;
```

## PepperImage
```javascript
<PepperImage src={'PepperImages'} style={'Object'}></PepperImage>
```
## PepperRoundButton
```javascript
<PepperRoundButton
    size={'number'}
    style={'Object'}
    colors={'Array'}
    iconName='PepperIcons'
    onPress={'() => void'}
  />
```
## PepperTag
```javascript
<PepperTag
  iconName='PepperIcons'
  text={'text'}
  firstGradientColor={'string'}
  secondGradientColor={'string'} style={'Object'}
/>
```

## Colors and constants
Refer to the common.tsx file for the available colors and constants you may use

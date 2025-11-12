import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

interface Slide {
  image: any;
  text: string;
}

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const slides: Slide[] = [
    { image: require('../assets/welcome1.png'), text: 'Welcome to my private dining experience, browse through my menu and select your dining experience of choice.' },
    { image: require('../assets/welcome2.png'), text: 'Do browse the menu and see what’s on offer, we have the evening and our private dining experience.' },
    { image: require('../assets/welcome3.png'), text: 'Place your order, select your table. And your order will be brought to you. Enjoy!' },
  ];

  return (
    <Swiper style={styles.wrapper} showsPagination={true} loop={false} onIndexChanged={(index) => index === 2 && navigation.replace('Menu')}>
      {slides.map((slide, index) => (
        <View style={styles.slide} key={index}>
          <Image source={slide.image} style={styles.image} />
          <Text style={styles.text}>{slide.text}</Text>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  image: { width: 200, height: 200, resizeMode: 'contain' },
  text: { color: '#FFF', fontSize: 16, textAlign: 'center', padding: 20 },
});

export default WelcomeScreen;
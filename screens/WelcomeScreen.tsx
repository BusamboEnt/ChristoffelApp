import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// Import your SVG files as components
import Icon1 from '../assets/1.svg';
import Icon2 from '../assets/2.svg';
import Icon3 from '../assets/3.svg';

const { width, height } = Dimensions.get('window');

interface SlideData {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const swiperRef = useRef<Swiper>(null);

  const slides: SlideData[] = [
    {
      icon: Icon1,
      title: 'Exquisite Cuisine',
      description: 'Experience the finest dining with our carefully curated menu featuring seasonal ingredients and masterful preparation.',
    },
    {
      icon: Icon2,
      title: 'Seamless Ordering',
      description: 'Browse our menu, customize your selections, and place orders effortlessly with our intuitive mobile experience.',
    },
    {
      icon: Icon3,
      title: 'Reserve Your Table',
      description: 'Choose your preferred table, track your orders in real-time, and enjoy a personalized dining experience.',
    },
  ];

  const handleGetStarted = () => {
    navigation.navigate('Menu');
  };

  const handleNext = (index: number) => {
    if (index < slides.length - 1 && swiperRef.current) {
      swiperRef.current.scrollBy(1);
    } else {
      handleGetStarted();
    }
  };

  const renderIcon = (IconComponent: React.ComponentType<any>) => {
    return <IconComponent width={220} height={220} />;
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            {/* SVG Icon Container */}
            <View style={styles.iconContainer}>
              {renderIcon(slide.icon)}
            </View>

            {/* Title */}
            <Text style={styles.title}>{slide.title}</Text>

            {/* Description */}
            <Text style={styles.description}>{slide.description}</Text>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNext(index)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {index === slides.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>

            {/* Skip Button (only on first two slides) */}
            {index < slides.length - 1 && (
              <TouchableOpacity
                style={styles.skipButton}
                onPress={handleGetStarted}
                activeOpacity={0.8}
              >
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#000',
  },
  iconContainer: {
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 18,
    color: '#CCC',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 50,
    paddingHorizontal: 10,
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 15,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  skipButtonText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
  },
  pagination: {
    bottom: 100,
  },
  dot: {
    backgroundColor: '#333',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  activeDot: {
    backgroundColor: '#FFF',
    width: 30,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default WelcomeScreen;
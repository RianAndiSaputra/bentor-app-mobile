import React, { createContext, useContext, useState } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

const AnimationContext = createContext(null);

export const AnimationProvider = ({ children }) => {
  // Animations for the becak image
  const [becakScale] = useState(new Animated.Value(1));
  const [becakRotate] = useState(new Animated.Value(0));
  
  // Animations for the green circle
  const [circleScale] = useState(new Animated.Value(1));
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);

  const animateTransition = (callback) => {
    setIsAnimating(true);
    
    // Reset rotation value before starting
    becakRotate.setValue(0);
    
    // Create parallel animations for more visual interest
    Animated.parallel([
      // Becak image animation sequence
      Animated.sequence([
        // Zoom out and slight rotate
        Animated.parallel([
          Animated.timing(becakScale, {
            toValue: 1.5,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.out(Easing.back(1.5)),
          }),
          Animated.timing(becakRotate, {
            toValue: 0.1, // 0.1 radians = about 5.7 degrees
            duration: 300,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ]),
        // Then zoom in with opposite rotation
        Animated.parallel([
          Animated.timing(becakScale, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.in(Easing.cubic),
          }),
          Animated.timing(becakRotate, {
            toValue: -0.05, // -0.05 radians = about -2.9 degrees
            duration: 300,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ]),
      ]),
      
      // Green circle animation
      Animated.sequence([
        Animated.timing(circleScale, {
          toValue: 1.2,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(circleScale, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
      ]),
    ]).start(() => {
      // Execute callback (navigation) when animation reaches its midpoint
      if (callback) callback();
      
      // Return everything to normal size with a bounce effect
      Animated.parallel([
        Animated.spring(becakScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(becakRotate, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.spring(circleScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsAnimating(false);
      });
    });
  };

  // Convert rotation value to interpolated string for transform
  const becakRotation = becakRotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-1rad', '1rad'],
  });

  return (
    <AnimationContext.Provider 
      value={{ 
        becakScale, 
        becakRotation, 
        circleScale, 
        animateTransition, 
        isAnimating 
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

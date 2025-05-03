import React from 'react';
import { Slot } from 'expo-router';
import CustomFooterNavigation from '../../components/CustomFooterNavigation';

export default function HalamanUtamaLayout() {
  return (
    <>
      <Slot />
      <CustomFooterNavigation />
    </>
  );
}

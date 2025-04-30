import { ColorSchemeName } from 'react-native';
import { useColorScheme as _useColorScheme } from 'react-native';

export function useColorScheme(): NonNullable<ColorSchemeName> {
  const colorScheme = _useColorScheme() as NonNullable<ColorSchemeName>;
  return colorScheme;
}
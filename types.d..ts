// types.d.ts
import 'expo-router';

declare module 'expo-router' {
  interface ArtisanParams {
    id: string;
  }
  
  interface LinkProps {
    params?: ArtisanParams;
  }
}
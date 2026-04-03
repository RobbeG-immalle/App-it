import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.apptracker.appit',
  appName: 'App-it',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

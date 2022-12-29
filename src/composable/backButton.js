import { App } from '@capacitor/app';
export default function useBackButton(){
  App.addListener('backButton', ({ isActive }) => {
    console.log('App state changed. Is active?', isActive);
  });
}

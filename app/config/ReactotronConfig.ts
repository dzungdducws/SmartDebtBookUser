import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import apisaucePlugin from 'reactotron-apisauce';

declare global {
  interface Console {
    tron: any;
  }
}

const reactotron = Reactotron
  .configure({
    name: 'SmartDebtBookUser',
    host: 'localhost', // for physical device, use your computer's IP
    port: 9090,
  })
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate|127.0.0.1/,
    },
    editor: false,
    errors: { veto: () => false },
    overlay: false,
  })
  .use(apisaucePlugin())
  .use(reactotronRedux())
  .connect();

// Add tron to console
console.tron = Reactotron;

export default reactotron;
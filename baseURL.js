import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://10.0.2.2:8080/shifts'
: baseURL = 'http://localhost:8080/shifts'
}

export default baseURL;

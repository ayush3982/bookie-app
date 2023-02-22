# bookie-app

## Issues in POST requests in the given API


Unfortunately, the API provided for the POST request was not functioning, and I was unable to book or cancel any shifts. I tried everything to make it work, and even used Postman to test the API, but was unable to send POST requests successfully.

As a result, I had to hardcode the data for the "My Shifts" part of the assignment, but I was able to complete the implementation for the "Available Shifts" section. I was able to fetch the shift data and display all of them as intended, but due to the issue with the API, I was unable to make any bookings or cancellations.

I have attached screenshots of the error for your reference. If there is anything else you would like me to try or any alternative solution you would suggest, please let me know.

### `GET /shifts`

> It is working

![Get Request](https://raw.githubusercontent.com/ayush3982/bookie-app/master/issues/1..png)


### `GET /shifts/{id}`

> This is working too

![Get/shifts/{id} Request](https://raw.githubusercontent.com/ayush3982/bookie-app/master/issues/2.png)

### `POST /shifts/{id}/book`

> This is not working

![POST/shifts/{id}/book Request](https://raw.githubusercontent.com/ayush3982/bookie-app/master/issues/3.png)

# HOW TO RUN THE APP

> Install Expo-CLI

```bash
npm install -g expo-cli
```

> Install all the packages

```bash
npm install
```

> Run the app

```bash
npm run start
```

## `Note`

I have tested this on Android Emulator as I had no access to Mac or any iOS device. If you want to run this on your own device, you need to host the API on your wifi's IP Address and make the following changes in baseURL.js

```javascript
import { Platform } from 'react-native'


let baseURL = 'http://YOUR_IP_ADDRESS:8080';

// {Platform.OS == 'android'
// ? baseURL = 'http://10.0.2.2:8080/shifts'
// : baseURL = 'http://localhost:8080/shifts'
// }

export default baseURL;



export default {
  WARNING_1: 'Your project is accessing the following APIs from a deprecated global rather than a module' +
    ' import: Constants (expo-constants).\n' + '\n' + 'The global "__expo" and "Expo" objects will be removed in' +
    ' SDK 41. Learn more about how to fix this warning: https://expo.fyi/deprecated-globals\n',

  WARNING_2: 'componentWillReceiveProps has been renamed, and is not recommended for use. See' +
    ' https://fb.me/react-unsafe-component-lifecycles for details.\n',

  WARNING_3: ' DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release. It can' +
    ' now be installed and imported from \'@react-native-community/datetimepicker\' instead of \'react-native\'.' +
    ' See https://github.com/react-native-community/datetimepicker\n',

  LOGIN_ERROR: 'Invalid email or password. Please try again!',

  ERROR: 'An unexpected error occurred. Please try again later!'
}

const Adapter = require('enzyme-adapter-react-16');
const Enzyme = require('enzyme');

const { setLocale } = require('bernie-l10n');

require('raf/polyfill');

Enzyme.configure({ adapter: new Adapter() });

global.Bernie = {
  localization: require('get-localization').localization
};

require('jest-enzyme');
require('jest-localstorage-mock');
setLocale('en_US');

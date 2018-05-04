/* eslint-disable no-var */

/*
React Hot Loader 3 requires ["env", { "modules": false }]
https://github.com/gaearon/react-hot-loader/tree/master/docs#webpack-2

So using the ES5 version of the recommended enzyme setup
http://airbnb.io/enzyme/docs/installation/react-16.html
*/

var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

const lifx = require('lifx-http-api');
require('dotenv').config();

// context.log("hey i am starting");
// console.log(process.env.LIFX_TOKEN);

let myColors = [
    'white',
    'red',
    'orange',
    'yellow',
    'cyan',
    'green',
    'blue',
    'purple',
    'pink'
];

// https://www.kirupa.com/html5/picking_random_item_from_array.htm
let randomColor = myColors[Math.floor(Math.random() * myColors.length)];

// context.log(randomColor);

module.exports = function(context, req) {
  // if a color was passed on the query string
  if (req.query.color) {
    let client = new lifx({
      //https://medium.com/bb-tutorials-and-thoughts/how-to-pass-environment-variables-in-nodejs-azure-functions-4713a9cb3f16
      bearerToken: process.env.LIFX_TOKEN
    });
    // This sets the options for the bulb
    let options = {
      color: randomColor
    };
    client
      .setState('all', options)
      .then(result => {
        context.res = {
          // status: 200, /* Defaults to 200 */
          body: result
        };
        context.done();
      })
      .catch(err => {
        context.res = {
          status: 500,
          body: err
        };
        context.done();
      });
  } 
  else {
    context.res = {
      body: 'Please pass a valid color',
      status: 500
    };
    
    context.done();  
  }
};

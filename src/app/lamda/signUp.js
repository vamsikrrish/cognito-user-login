const AWS = require('aws-sdk');
let cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
var params = {
    ClientId: '7krg8mdqt11scvuda5mbp37bli', /* required */
    Username: event.username, 
    Password: event.password, /* required */
    UserAttributes: [
        {
          Name: 'email',
          Value: event.email
        },
     ]
    };
    var res;
    await cognito.signUp(params,function(err, data) {
      if (err) {
        res = err;
      } else {
        res = data;
      }
    }).promise();
    return res;
};

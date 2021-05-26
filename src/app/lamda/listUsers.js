const AWS = require('aws-sdk');
let cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    const queryParams = event["queryStringParameters"];
    let filter;
    if(queryParams && queryParams['q']){
      filter ="username ^= "+queryParams['q'];
    }
    let res = { status: 'no changes' };
    
    const params = { 
      UserPoolId: 'us-east-1_fYgyCzvTr',
      Filter:filter
    };
    console.log('params:',params);
    await cognito.listUsers(params, function(err, data) {
      if (err) {
        res = err;
      } else {
        res = data;
      }
    }).promise();
    return res;
};

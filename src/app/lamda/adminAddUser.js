const AWS = require('aws-sdk');
let cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event, context, callback) => {
var params = {
      UserPoolId: 'us-east-1_fYgyCzvTr',
      Username: event.username, 
      ForceAliasCreation: false,
      TemporaryPassword: event.password,
      UserAttributes: [
        {
          Name: 'email',
          Value: event.email
        }
      ]
    };
    
    let res={status:"no change"};
    try{
    await cognito.adminCreateUser(params, function(err, data) {
      if (err) {
        res ={ 
          body: JSON.stringify(err),
          statusCode:400
        }
        context.fail(JSON.stringify(res));
      } else {
        res ={ 
         body: JSON.stringify(data),
         statusCode:200
        }
      }     
    }).promise();
    } catch(e){
       res ={ 
          body: JSON.stringify(e),
          statusCode:400
        }
        context.fail(JSON.stringify(res));
    }
    return res;
};

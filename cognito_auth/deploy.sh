npm install cognito-at-edge
zip -r9 cognito_auth.zip index.js node_modules

aws lambda update-function-code \
    --function-name cognitoAuth \
    --zip-file fileb://cognito_auth.zip

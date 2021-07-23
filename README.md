# cognito-demo
## Setup
### Install npm packages
```sh
npm install
```
### Create .env file
```sh
USER_POOL_ID=xxx
CLIENT_ID=xxx
```

&nbsp;

## Build
```sh
npm run build
```

&nbsp;

## Run locally
```sh
npm start
```

# User Management
## Set user's permanent password
```sh
aws cognito-idp admin-set-user-password --user-pool-id "USER_POOL_ID"  --username "USER_NAME" --password "NEW_PASSWORD" --permanent
```

## Set user's gender
```sh
sampleFrontend4Cognito % aws cognito-idp admin-update-user-attributes \
> --user-pool-id "USER_POOL_ID" \
> --username "USER_NAME" \
> --user-attributes Name="gender",Value="male"
```

## Set user's given name
```sh
aws cognito-idp admin-update-user-attributes \
--user-pool-id "USER_POOL_ID" \
--username "USER_NAME" \
--user-attributes Name="given_name",Value="Yukitaka"
```

## Set user's family name
```sh
aws cognito-idp admin-update-user-attributes \
--user-pool-id "USER_POOL_ID" \
--username "USER_NAME" \
--user-attributes Name="family_name",Value="Maeda" 
```

## URL
- http://kojinten.jp.s3-website-ap-northeast-1.amazonaws.com/


## References
- https://medium.com/@jith/a-practical-introduction-to-aws-lambda-api-gateway-cognito-dynamo-db-s3-hosting-and-60002b22947a
- https://qiita.com/nabezokodaikon/items/deea360304929e8bd42a

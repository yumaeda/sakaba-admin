# cognito-demo
## Setup
```sh
npm install
```
## Build
```sh
npm run build
```
## Run locally
```sh
npm start
```

# User Management
## Set user's permanent password
```sh
aws cognito-idp admin-set-user-password --user-pool-id "USER_POOL_ID"  --username "USER_NAME" --password "NEW_PASSWORD" --permanent
```

## URL
- http://kojinten.jp.s3-website-ap-northeast-1.amazonaws.com/


## References
- https://medium.com/@jith/a-practical-introduction-to-aws-lambda-api-gateway-cognito-dynamo-db-s3-hosting-and-60002b22947a
- https://qiita.com/nabezokodaikon/items/deea360304929e8bd42a

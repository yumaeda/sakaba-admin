# sakaba-admin
## Deploy
- Automatically deployed by GitHub action upon commit to main branch.

&nbsp;

## Run locally
### Create .env file
```sh
USER_POOL_ID=xxx
CLIENT_ID=xxx
API_KEY=xxx
```
### Install npm packages
```sh
npm install
```
### Build
```sh
npm run build
```
## Start
```sh
npm start
```

&nbsp;

## User Management
### Set user's permanent password
```sh
aws cognito-idp admin-set-user-password --user-pool-id "USER_POOL_ID"  --username "USER_NAME" --password "NEW_PASSWORD" --permanent
```

### Set user's gender
```sh
sampleFrontend4Cognito % aws cognito-idp admin-update-user-attributes \
--user-pool-id "USER_POOL_ID" \
--username "USER_NAME" \
--user-attributes Name="gender",Value="male"
```

### Set user's given name
```sh
aws cognito-idp admin-update-user-attributes \
--user-pool-id "USER_POOL_ID" \
--username "USER_NAME" \
--user-attributes Name="given_name",Value="Yukitaka"
```

### Set user's family name
```sh
aws cognito-idp admin-update-user-attributes \
--user-pool-id "USER_POOL_ID" \
--username "USER_NAME" \
--user-attributes Name="family_name",Value="Maeda" 
```


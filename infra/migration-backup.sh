#!/bin/bash
# run in docker container: node or alpine

apk add findutils aws-cli

export $(grep -v '^#' .env | xargs -d '\n')

cd infra

mkdir -p ./sqlite

EXECUTION_MODE=$1

aws configure set aws_access_key_id $BACKUP_AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $BACKUP_AWS_SECRET_ACCESS_KEY
aws configure set default.region $BACKUP_AWS_REGION

if [ "$EXECUTION_MODE" = "download" ]; then
  echo "sync database from s3 to local"
  aws s3 sync s3://$BACKUP_AWS_BUCKET_NAME/migration/db ./sqlite
fi

if [ "$EXECUTION_MODE" = "upload" ]; then
  echo -e "\n\n\n =================\nsync database from local to s3"
  aws s3 sync ./sqlite s3://$BACKUP_AWS_BUCKET_NAME/migration/db
fi

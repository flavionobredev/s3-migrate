# S3 Migrate

This is a simple tool to migrate files between S3 buckets. 

## Motivation

I needed to migrate files from one s3 bucket to another and due to some specific needs I created this tool. I needed:
- query a database table to search for upload files;
- download these files from a bucket without any organization;
- download and upload using nodejs streams
- save the states of media that have already been migrated so as not to migrate again

## Features

- Migrate files between buckets
- Load and save migrated files in sqlite database
- Backup and restore sqlite database

## How to use

1. create a `.env` file in the root directory of the project with the following content:

```
# source
SOURCE_AWS_ACCESS_KEY_ID=
SOURCE_AWS_SECRET_ACCESS_KEY=
SOURCE_AWS_REGION=
SOURCE_AWS_BUCKET=
SOURCE_AWS_BUCKET_FOLDER
SOURCE_FILES_DB_URI=

# target
TARGET_AWS_ACCESS_KEY_ID=
TARGET_AWS_SECRET_ACCESS_KEY=
TARGET_AWS_REGION=
TARGET_AWS_BUCKET=
TARGET_AWS_BUCKET_FOLDER=files/folder/

# backup
BACKUP_AWS_ACCESS_KEY_ID=
BACKUP_AWS_SECRET_ACCESS_KEY=
BACKUP_AWS_REGION=
BACKUP_AWS_BUCKET_NAME=

```

2. run `docker compose up -d` to start the container

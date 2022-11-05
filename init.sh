#!/usr/bin/env bash

cd project

npm run proto-generate

npm run start:dev $APP_NAME

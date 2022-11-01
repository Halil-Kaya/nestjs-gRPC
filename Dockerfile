FROM alpine

RUN apk add --update nodejs npm

WORKDIR /project
ADD . /project
COPY ./libs/grpc-types/src/protos/*.proto /project/dist/

ARG PROTOC_VERSION="3.19.1"
ARG ARCH="aarch_64"

RUN apk add bash
RUN apk add gcompat

ADD "https://github.com/protocolbuffers/protobuf/releases/download/v$PROTOC_VERSION/protoc-$PROTOC_VERSION-linux-$ARCH.zip" protoc.zip

RUN mkdir /usr/local/lib/protoc && unzip protoc.zip -d /usr/local/lib/protoc && rm protoc.zip
RUN ln -s /usr/local/lib/protoc/bin/protoc /usr/local/bin/protoc

RUN chmod -R 0777 init.sh

RUN npm install
[![](https://images.microbadger.com/badges/version/jgraph/drawio.svg)](https://microbadger.com/images/jgraph/drawio "Get your own version badge on microbadger.com")
[![Build Status](https://travis-ci.com/jgraph/docker-drawio.svg?branch=master)](https://travis-ci.com/jgraph/docker-drawio)

## Introduction

[draw.io](https://github.com/jgraph/drawio) (formerly Diagramly) is free online diagram software. You can use it as a flowchart maker, network diagram software, to create UML online, as an ER diagram tool, to design database schema, to build BPMN online, as a circuit diagram maker, and more. draw.io can import .vsdx, Gliffy™ and Lucidchart™ files.

In this repository:

* draw.io docker image that is always up-to-date with draw.io releases
* draw.io export server image which allow exporting draw.io diagrams to pdf and images
* docker-compose to run draw.io with the export server
* docker-compose to run draw.io integrated within nextcloud
* docker-compose to run draw.io with PlantUML support
* docker-compose to run draw.io self-contained without any dependency on draw.io website (with the export server, plantUml, Google Drive support, OneDrive support, and EMF conversion support (for VSDX export)

## Description

The Dockerfile builds from `tomcat:9-jre11-slim` and `tomcat:9-jre8-alpine` (see <https://hub.docker.com/_/tomcat/>)

Forked from [fjudith/draw.io](https://github.com/fjudith/docker-draw.io)

## Features

* Based on Tomcat so it can be used directly or behind a reverse-proxy
* Self-Signed certificate autogen
* Let's encrypt certificate autogen
* Support SSL Keystore mount to `/user/local/tomcat/.keystore`

## Quick Start

Run the container.

```bash
docker run -it --rm --name="draw" -p 8080:8080 -p 8443:8443 fjudith/draw.io
```

Start a web browser session to <http://localhost:8080/?offline=1&https=0> or <https://localhost:8443/?offline=1>

If you're running `Docker Toolbox` then start a web browser session to <http://192.168.99.100:8080/?offline=1&https=0> or <https://192.168.99.100:8443/?offline=1>

> `?offline=1` is a security feature that disables support of cloud storage.

## Environment variables

* **LETS_ENCRYPT_ENABLED**: Enables Let's Encrypt certificate instead of self-signed; default `false`
* **PUBLIC_DNS**: DNS domain to be used as certificate "CN" record; default `draw.example.com`
* **ORGANISATION_UNIT**: Organisation unit to be used as certificate "OU" record; default `Cloud Native Application`
* **ORGANISATION**: Organisation name to be used as certificate "O" record; default `example inc`
* **CITY**: City name to be used as certificate "L" record; default `Paris`
* **STATE**: State name to be used as certificate "ST" record; default `Paris`
* **COUNTRY_CODE**: Country code to be used as certificate "C" record; default `FR`
* **KEYSTORE_PASS**: ".keystore"/.jks" store password; default `V3ry1nS3cur3P4ssw0rd`
* **KEY_PASS**: Private key password; default `<ref:KEYSTORE_PASS>`

## HTTPS SSL Certificate via Let's Encrypt

### Prerequisites:

1. A Linux machine connected to the Internet with ports 443 and 80 open
1. A domain/subdomain name pointing to this machine's IP address. (e.g., drawio.example.com)

### Method:

1. Using jgraph/drawio docker image, run the following command
`docker run -it -m1g -e LETS_ENCRYPT_ENABLED=true -e PUBLIC_DNS=drawio.example.com --rm --name="draw" -p 80:80 -p 443:8443 jgraph/drawio`
Notice that mapping port 80 to container's port 80 allows certbot to work in stand-alone mode. Mapping port 443 to container's port 8443 allows the container tomcat to serve https requests directly.

## Changing draw.io configuration

### Method 1 (Build you custom image with setting pre-loaded)

1. Edit PreConfig.js & PostConfig.js files (next to Dockerfile in debian or alpine folders)
1. Build the docker image

### Method 2 (Using existing running docker container)

1. Edit PreConfig.js & PostConfig.js files (next to Dockerfile in debian or alpine folders)
1. Copy these files to docker container 

```
docker cp PreConfig.js draw:/usr/local/tomcat/webapps/draw/js/
docker cp PostConfig.js draw:/usr/local/tomcat/webapps/draw/js/
```

### Method 3 (Bind configuration files into the container when started)

1. This method allows changing the configuration files directly on the host without invoking any other docker commands. It can be used for testing
1. Edit PreConfig.js & PostConfig.js files (next to Dockerfile in debian or alpine folders)
1. From within the directory that contained the configuration files, run the following command to start docker container
1. Note: self-contained docker-compose file already mount the configuration files into the container

```
docker run -it  --rm --name="draw" --mount type=bind,source="$(pwd)"/PreConfig.js,target=/usr/local/tomcat/webapps/draw/js/PreConfig.js --mount type=bind,source="$(pwd)"/PostConfig.js,target=/usr/local/tomcat/webapps/draw/js/PostConfig.js -p 8080:8080 -p 8443:8443 fjudith/draw.io
```

## Reference

* <https://github.com/jgraph/draw.io>

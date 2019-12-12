Swagger to Envoy 
================

Simple cli tool to convert swagger definition to envoy edge proxy using Nodejs and oclif framework and 
a shell script to creat and run a docker continer 

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/toenvoy.svg)](https://npmjs.org/package/toenvoy)
[![License](https://img.shields.io/npm/l/toenvoy.svg)](https://github.com/VimukthiMayadunne/toenvoy/blob/master/package.json)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Downloads/week](https://img.shields.io/npm/dw/toenvoy.svg)](https://npmjs.org/package/toenvoy)

# Pre-requisite 
- node.js
- Docker


# Installation
You can install `toenvoy` either through `npm` or by cloning the code from this GitHub repo.  This README covers the installation steps with `npm`.


# Setup

1) Run the following command  in the terminal 

```bash
$ npm install -g toenvoy
```

         
# Runnig the Cli-Tool

### Metord 1)
1) Navigate to the location where the swagger file is located 
   Make Sure the swagger file is named as swagger.yaml  
2) Run the command 'toenvoy'
    This will create a directory called envoy-proxy  in the current directory. 

###  Methord 2)

1) Navigate to the location where the swagger/OAS definition is located
   
2) Run the command 'toenvoy -n=${filename.yaml}'
    This will create a directory called envoy-proxy  in the current directory. 


# Buiding and Runnig the Docker Container

1) Once the `envoy-proxy` directory is genarated navigate in to the folder
2) Make `run.sh` file executable
3) Run the file `run.sh` 

This will create an Docker container which runs on port :10000

# <a name="reference"></a>Command reference and examples

* [toenvoy](#generateapi)

## <a name="generateapi"></a>toenvoy

Generates Envoy Proxy bundle in the folder calle envoy-proxy from Swagger specification file named as swagger.yaml.


#### Example

#### Methord 1)
```bash
$ toenvoy
$ cd envoy-proxy
$ chmod 777 run.sh
$ ./run.sh
```
#### Methord 2)

```bash
$ toenvoy -n=myfile.yaml
$ cd envoy-proxy
$ chmod 777 run.sh
$ ./run.sh
```




Credits - oclif framework  https://oclif.io


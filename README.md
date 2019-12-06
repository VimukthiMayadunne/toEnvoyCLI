Swagger to Envoy 
================

Simple cli tool to convert swagger definition to envoy edge proxy using Nodejs and oclif framework

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/toenvoy.svg)](https://npmjs.org/package/toenvoy)
[![Downloads/week](https://img.shields.io/npm/dw/toenvoy.svg)](https://npmjs.org/package/toenvoy)
[![License](https://img.shields.io/npm/l/toenvoy.svg)](https://github.com/VimukthiMayadunne/toenvoy/blob/master/package.json)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


# Pre-requisite 
- node.js


# Installation
You can install `toenvoy` either through `npm` or by cloning the code from this GitHub repo.  This README covers the installation steps with `npm`.


# Setup

1) Run the following command  in the terminal 

```bash
$ npm install -g toenvoy
```

         
# Runnig the Cli-Tool
1) Navigate to the location where the swagger file is located 
   Make Sure the swagger file is named as swagger.yaml  
2) Run the command toenvoy
    This will create a directory called envoy-proxy  in the current directory. 
credits - oclif framework  https://oclif.io

# <a name="reference"></a>Command reference and examples

* [generateApi](#generateapi)

## <a name="generateapi"></a>generateApi

Generates Envoy Proxy bundle from Swagger specification file named as swagger.yaml.

#### Example

```bash
$ toenvoy
```


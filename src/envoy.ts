export {}
const fs = require("fs");
const readYaml = require("read-yaml");

async function write() {
  return new Promise(async function(resolve, reject) {
    try {
      let lyrics =
        "# This envoy.yaml file is created by the cli tool \n" +
        "# Change the files according to user requirments\n" +
        '# Created by - Vimukthi Mayyadunne\n'+
        '# Credits - oclif freamwork \n'+
        "admin:\n" +
        "  access_log_path: /tmp/admin_access.log\n" +
        "  address:\n" +
        "    socket_address:\n" +
        "      protocol: TCP\n" +
        "      address: 127.0.0.1\n" +
        "      port_value: 9901\n" +
        "static_resources:\n" +
        "  listeners:\n" +
        "  - name: listener_0\n" +
        "    address:\n" +
        "      socket_address:\n" +
        "        protocol: TCP\n" +
        "        address: 0.0.0.0\n" +
        "        port_value: 10000\n" +
        "    filter_chains:\n" +
        "    - filters:\n" +
        "      - name: envoy.http_connection_manager\n" +
        "        typed_config:\n" +
        '          "@type": type.googleapis.com/envoy.config.filter.network.http_connection_manager.v2.HttpConnectionManager\n' +
        "          stat_prefix: ingress_http\n" +
        "          route_config:\n" +
        "            name: local_route\n" +
        "            virtual_hosts:\n" +
        "            - name: local_service\n" +
        '              domains: ["*"]\n' +
        "              routes:\n";
      const dirpath="./envoy-proxy"
      var prom=await fs.mkdir(dirpath, { recursive: true })
      console.info(prom)
      fs.writeFile("./envoy-proxy/envoy.yaml", lyrics, (err: any) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log("File Created!");
        resolve(0);
      });
    } catch (error) {
      console.error("Unable To Create The File");
      return reject(error);
    }
  });
}

async function append(data: string) {
  try {
    fs.appendFile("./envoy-proxy/envoy.yaml", data, (err: any) => {
      if (err) throw err;
      console.log("Content Added!");
    });
  } catch (err) {
    console.error("Error while appending to the file");
  }
}

async function readSwaggerAndAddContent() {
  return new Promise(async function(resolve, reject) {
    try {
      readYaml("swagger.yaml", async function(err: any, data: any) {
        if (err) {
          console.log("Unable To Read the Swagger File");
        } else {
          var swagger = await data;
          try {
            var host = swagger.host;
            var port = swagger.schemes["0"] == "HTTPS" ? 443 : 80;
            var basePath = swagger.basePath;
            var name = data.info.title;
            name = name.replace(/\W/g, "");
            getpaths(name, swagger.paths, basePath, host, port);
            resolve(swagger);
          } catch (error) {
            console.log(
              "Please make sure the Swagger filr contains the following fileds"
            );
            console.log("1.Schemse 2.Host 3.BasePath");
            return reject(error);
          }
        }
      });
    } catch (Error) {
      console.log("Error While reading the swagger file");
      return reject(Error);
    }
  });
}

async function createCluster(name: any, host: any, port: number) {
  let data =
    "  clusters:\n" +
    `  - name: ${name}\n` +
    "    connect_timeout: 5.25s\n" +
    "    type: LOGICAL_DNS\n" +
    "    # Comment out the following line to test on v6 networks\n" +
    "    dns_lookup_family: V4_ONLY\n" +
    "    lb_policy: ROUND_ROBIN\n" +
    "    load_assignment:\n" +
    `      cluster_name: ${name}\n` +
    "      endpoints:\n" +
    "      - lb_endpoints:\n" +
    "        - endpoint:\n" +
    "            address:\n" +
    "              socket_address:\n" +
    `                address: ${host}\n` +
    `                port_value: ${port}\n` +
    "    transport_socket:\n" +
    "      name: envoy.transport_sockets.tls\n" +
    "      typed_config:\n" +
    '        "@type": type.googleapis.com/envoy.api.v2.auth.UpstreamTlsContext\n' +
    "        sni: www.google.com\n";
  append(data);
}

async function getpaths(
  name: any,
  data: any,
  basePath: any,
  host: any,
  port: number
) {
  for (var route in data) {
    await createRoutes(name, route, basePath, host);
  }
  var rslt = await httpFilters();
  var rsltn = await createCluster(name, host, port);
}

async function createRoutes(
  name: any,
  route: string,
  basePath: any,
  host: any
) {
  var data =
    "              - match:\n" +
    `                  prefix: ${route}\n` +
    "                route:\n" +
    `                  host_rewrite: ${host}\n` +
    `                  prefix_rewrite: ${basePath}${route}\n` +
    `                  cluster: ${name}\n`;

  append(data);
}

async function httpFilters() {
  let data = "          http_filters:\n" + "          - name: envoy.router\n";
  append(data);
}

async function createDockerFile(){
    return new Promise(async function(resolve, reject) {
    try{
    let data=
    'FROM envoyproxy/envoy:v1.12.0\n'+
    'COPY envoy.yaml /etc/envoy/envoy.yaml\n';
    fs.writeFile("./envoy-proxy/Dockerfile", data, (err: any) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log("Docker File File Created!");
        resolve(0);
      });
    }
    catch(err){
        console.error(err)
        return reject(err)
    }
});
}
module.exports = { readSwaggerAndAddContent, write ,createDockerFile };
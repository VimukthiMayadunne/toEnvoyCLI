export {}
const fs = require("fs");

async function shellScriptFile(){
    return new Promise(async function(resolve, reject) {
    try{
    let data=
    "sudo docker inspect -f \'{{.State.Running}}\' envoy\n"+
    'rc=$?\n'+
    'if [ $rc == 0 ]\n'+
    'then\n'+
	    '   sudo docker stop envoy\n'+
	    '   sudo docker rm envoy\n'+
    'fi\n'+
    'sudo docker build -t envoy:v1 .\n'+
    'sudo docker run -d --name envoy -p 9901:9901 -p 10000:10000 envoy:v1\n';

    fs.writeFile("./envoy-proxy/run.sh", data, (err: any) => {
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

module.exports={shellScriptFile};
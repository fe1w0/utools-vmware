const childProcess = require('child_process')
const iconv = require('iconv-lite');
const encoding = 'cp936';
const binaryEncoding = 'binary';


let tmpVmxPathString = '';
let vmxPathList = []
let tmpVmxDirectories = ["G:\\V M(x64)"]
tmpVmxDirectories.forEach(function (vmxDirectory){
let searchCmd = 'for /r "'+ vmxDirectory +'" %i in (*.vmx) do @echo %i';
console.log(searchCmd)
let searchExec = childProcess.execSync(
    searchCmd,
    {encoding: binaryEncoding, windowsHide: true});
    let searchResult = iconv.decode(new Buffer.from(searchExec.toString(), binaryEncoding), encoding);
    tmpVmxPathString = tmpVmxPathString + searchResult;
});
let tmpVmxPathList = tmpVmxPathString.split(/\r\n/);
tmpVmxPathList.forEach(function (tmpVmxPath){
if (tmpVmxPath && tmpVmxPath.endsWith(".vmx")){
vmxPathList.push(tmpVmxPath);
}
});

console.log(vmxPathList)




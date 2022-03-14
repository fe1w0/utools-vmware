const fs = require('fs')
const childProcess = require('child_process')
const iconv = require('iconv-lite');
const encoding = 'cp936';
const binaryEncoding = 'binary';

// 1. 读取数据库
// 2. 检测参数，并处理(初始化)
// Todo: 添加异常处理
var vmwareObject = {
    // vmware 程序地址
    vmProgramPath: '',
    // 虚拟机地址,未分割前
    vmxDirectory: '',
    // 虚拟机地址,以;号进行分割得到
    vmxDirectories: [],
    // 扫描得到的vmx文件
    vmxPathList: [],
    // 扫描得到的 正在运行的 vmx文件
    vmwareLivePathList: [],
    // 后台开启-默认关 
    isBackground: false,
    // 通知栏-默认开
    isNotificationBar: true
}


function readUtoolsDB() {
    // 1. 读取数据库
    // 暂时先直接读取，但感觉这样会有速度影响
    // 后续更新采用 json 存储和读取
    // 以及将 vmxPathList 进行存储
    vmwareObject.vmProgramPath = utools.dbStorage.getItem('vmProgramPath')
    vmwareObject.vmProgramPath == null ? vmwareObject.vmProgramPath = '' : vmwareObject.vmProgramPath

    vmwareObject.vmxDirectory = utools.dbStorage.getItem('vmxDirectory')
    vmwareObject.vmxDirectory == null ? vmwareObject.vmxDirectory = '' : vmwareObject.vmxDirectory

    vmwareObject.isBackground = utools.dbStorage.getItem('isBackground')
    vmwareObject.isBackground == null ? vmwareObject.isBackground = false : vmwareObject.isBackground

    vmwareObject.isNotificationBar = utools.dbStorage.getItem('isNotificationBar')
    vmwareObject.isNotificationBar == null ? vmwareObject.isNotificationBar = true : vmwareObject.isNotificationBar
    // 若 vmProgramPath 空，自动获取VMWARE配置中的程序地址
    if (!vmwareObject.vmProgramPath) {
      setVmProgramPath()
    }
}


function checkParameter(){
    // vmwareObject.vmxDirectories 清空
    vmwareObject.vmxDirectories = []
    setVmxDirectories()
    // vmwareObject.vmxPathList 清空
    vmwareObject.vmxPathList = []
    setVmxPathList()
    // vmwareObject.vmwareLivePathList 清空
    vmwareObject.vmwareLivePathList = [] 
    setVmwareLivePathList()
}

function setVmProgramPath() {
    // 若 vmProgramPath 空，自动获取VMWARE配置中的程序地址
    // 在自动获取失败时，设置为空
    // 同时将其保存在数据库中，并可在settingUI中显示
    // 新版本没有这个功能了
    try{
        let VmwareConfigPath = 'C:\\ProgramData\\VMware\\hostd\\config.xml';
        let configRegx =  /<defaultInstallPath> (.+?) </;
        let configContent = fs.readFileSync(VmwareConfigPath).toString();
        vmwareObject.vmProgramPath = configRegx.exec(configContent)[1];
      }catch(e){
        vmwareObject.vmProgramPath = '' // 未找到默认地址
      }
      if (vmwareObject.vmProgramPath != '') {
        // vmProgramPath 自动获取成功时，将默认地址保存到数据库
        // alert(vmwareObject.vmProgramPath)
        utools.dbStorage.setItem('vmProgramPath', vmwareObject.vmProgramPath)
      }
}

function setVmxDirectories() {
    // 设置 vmxDirectories ，从 vmxDirectory

    let dirInput = vmwareObject.vmxDirectory
    let tmpVmxDirectories = dirInput.split(';');
    tmpVmxDirectories.forEach(function (tmpVmxDirectory){
    vmwareObject.vmxDirectories.push(tmpVmxDirectory);
    });
}

function setVmxPathList() {
    // 若 vmxPathList 为空，从 vmxDirectories 获取 setVmxPathList
    // 扫描vmx文件,并将信息保存在内存
    let tmpVmxPathString = '';
    let tmpVmxDirectories = vmwareObject.vmxDirectories
    console.log(`setVmxPathList vmwareObject.vmxDirectories: ${vmwareObject.vmxDirectories}`)
    try {
      tmpVmxDirectories.forEach(function (vmxDirectory){
        let searchCmd = 'for /r "'+ vmxDirectory +'" %i in (*.vmx) do @echo %i';
        let searchExec = childProcess.execSync(
            searchCmd,
            {encoding: binaryEncoding, windowsHide: true});
            let searchResult = iconv.decode(new Buffer.from(searchExec.toString(), binaryEncoding), encoding);
            tmpVmxPathString = tmpVmxPathString + searchResult;
      });
    let tmpVmxPathList = tmpVmxPathString.split(/\r\n/);
    tmpVmxPathList.forEach(function (tmpVmxPath){
      if (tmpVmxPath && tmpVmxPath.endsWith(".vmx")){
        vmwareObject.vmxPathList.push(tmpVmxPath);
      }
    });
    }catch(e){
      return
    }
}


function setVmwareLivePathList() {
  let searchCmd = `"${vmwareObject.vmProgramPath}\\vmrun.exe" list`
  try{
    let searchExec = childProcess.execSync(
      searchCmd,
      {encoding: binaryEncoding, windowsHide: true});

  let searchResult = iconv.decode(new Buffer.from(searchExec.toString(), binaryEncoding), "UTF-8");
  let tmpVmxLivePathList = searchResult.split(/\r\n/);
  console.log(`searchResult: ${searchResult}`)
  tmpVmxLivePathList.forEach(function (tmpVmxLivePath){
    if (tmpVmxLivePath && tmpVmxLivePath.endsWith(".vmx")){
      vmwareObject.vmwareLivePathList.push(tmpVmxLivePath);
    }
  });
  } catch(e){
    return
  }
}


module.exports = {
    binaryEncoding: binaryEncoding,
    encoding: binaryEncoding,
    readUtoolsDB: readUtoolsDB,
    checkParameter: checkParameter,
    vmwareObject: vmwareObject
}
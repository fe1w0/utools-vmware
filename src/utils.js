// window.export 中使用的组件
const loadPlugin = require('./loadplugin')
const path = require('path')
const vmwareObject = loadPlugin.vmwareObject
const childProcess = require('child_process')
const iconv = require('iconv-lite');

function listAllVmxPath() {
    /*
    利用 utools 列表列出信息
    */
   // 1.0.9 按代码逻辑来说，应该不需要这个。。。。
    document.getElementById('settings')?.remove()
    
    console.log(`vmxPathList: ${vmwareObject.vmxPathList}`)
    let vmwarePathList = [];
    vmwareObject.vmxPathList.forEach(function (vmxPath){
        let vmxName = path.parse(vmxPath).name;
        vmwarePathList.push({title: vmxName, description: vmxPath})
    })
    return vmwarePathList; 
}


function searchVmxPath(searchWord) {
    /*
    根据 searchWord 列出 虚拟机
     */
    let tmpSearchVmxPath = [];
    vmwareObject.vmxPathList.forEach(function (vmxPath){
      if (vmxPath.search(new RegExp(searchWord,"i")) !== -1 ){
        let vmxName = path.parse(vmxPath).name;
        tmpSearchVmxPath.push({title: vmxName, description: vmxPath})
      }
    })
    return tmpSearchVmxPath
  }

  function listAllLiveVmxPath() {
    console.log(`vmwareLivePathList: ${vmwareObject.vmwareLivePathList}`)
    let vmwareLivePathList = [];
    vmwareObject.vmwareLivePathList.forEach(function (vmxPath){
        let vmxName = path.parse(vmxPath).name;
        vmwareLivePathList.push({title: vmxName, description: vmxPath})
    })
    return vmwareLivePathList; 
  }
  
  function searchLiveVmxPath(searchWord) {
    /*
    根据 searchWord 列出 虚拟机
     */
    let tmpSearchVmxPath = [];
    vmwareObject.vmwareLivePathList.forEach(function (vmxPath){
      if (vmxPath.search(new RegExp(searchWord,"i")) !== -1 ){
        let vmxName = path.parse(vmxPath).name;
        tmpSearchVmxPath.push({title: vmxName, description: vmxPath})
      }
    })
    return tmpSearchVmxPath
  }
  
function vmwareOpen(vmxPath) {
    /*
    以open的方法打开 被选择的虚拟机, -p
        */
    let execCmd = `"${vmwareObject.vmProgramPath}\\vmware.exe" -p "${vmxPath}"`;
    if(vmwareObject.isNotificationBar == 'checked'){
        utools.showNotification(vmxPath + '打开中')
    }
    childProcess.execSync(execCmd, {encoding: loadPlugin.binaryEncoding, windowsHide: true});
    window.utools.outPlugin()
}

function vmwareRun(vmxPath) {
    /*
    以 vmrun 开启虚拟机
     */
    let execCmdTmp = `"${vmwareObject.vmProgramPath}\\vmrun.exe" start "${vmxPath}"`
    let execCmdVmrun = vmwareObject.isBackground ? `${execCmdTmp}  nogui`: `${execCmdTmp}  gui`
    if(vmwareObject.isNotificationBar == 'checked'){
      message = vmwareObject.isBackground ? vmxPath + '打开中(nogui)' : vmxPath + '打开中(gui)'
      utools.showNotification(message)
    }
    childProcess.execSync(execCmdVmrun, {encoding: loadPlugin.binaryEncoding, windowsHide: true});
    window.utools.outPlugin()
}



function vmwareStop(vmxPath) {
  /*
  以open的方法打开 被选择的虚拟机, -p
      */
  let execCmd = `"${vmwareObject.vmProgramPath}\\vmrun.exe" stop "${vmxPath}"`;
  if(vmwareObject.isNotificationBar == 'checked'){
      utools.showNotification(vmxPath + '关闭中')
  }
  childProcess.execSync(execCmd, {encoding: loadPlugin.binaryEncoding, windowsHide: true});
  window.utools.outPlugin()
}


module.exports = {
    listAllVmxPath: listAllVmxPath,
    searchVmxPath: searchVmxPath,
    vmwareOpen: vmwareOpen,
    vmwareRun: vmwareRun,
    listAllLiveVmxPath: listAllLiveVmxPath,
    searchLiveVmxPath: searchLiveVmxPath,
    vmwareStop: vmwareStop
}
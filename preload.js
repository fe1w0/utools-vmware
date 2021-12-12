const Nano = require('nano-jsx')
const {Fragment, jsx} = require('nano-jsx')
const childProcess = require('child_process');
const iconv = require('iconv-lite');
const encoding = 'cp936';
const binaryEncoding = 'binary';
const fs = require('fs');
const path = require('path');
const nodeCmd = require('node-cmd');


var vmwareObject = {
  vmwarePath: '',
  vmxDirectories: [],
  vmxPathList: [],
  isNotified: null,
  isBack: null
}

var dbVmxDirectories = ''
var dbVmwarePath = ''
var isNotifiedValue = ''
var isBackValue = ''

function setVmwarePath(dirInput=''){
  /*
    当默认配置文件下,没有查询到 vmware.exe 地址时,改为用户 手动设置
  */
  if(dirInput != ''){
    utools.dbStorage.setItem('dbVmwarePath', dirInput)
  }
}


function setVmxDirectories(dirInput=''){
  /*
  根据 dirInput 设置 vmxDirectories,分号作为目录分割
   */
  if (dirInput == '') {
    return null
  }
  vmwareObject.vmxDirectories = [] // 清空 vmwareObject.vmxDirectories
  let tmpVmxDirectories = dirInput.split(';');
  tmpVmxDirectories.forEach(function (tmpVmxDirectory){
    vmwareObject.vmxDirectories.push(tmpVmxDirectory);
  });
  // 将 dbVmxDirectories 保存在db数据库中
  dbVmxDirectories = utools.dbStorage.getItem('dbVmxDirectories')
  if (dbVmxDirectories !== dirInput && dirInput != '') {
    utools.dbStorage.setItem('dbVmxDirectories', dirInput)
  }
  else if (dbVmxDirectories == '') {
    utools.dbStorage.setItem('dbVmxDirectories', dirInput)
  }
  vmxScan(vmwareObject.vmxDirectories)
}


function setConfig(isNotified, isBack){
  /*
  设置 是否通知和后台选项
  */
  if(isNotified == true){
    utools.dbStorage.setItem('isNotified', 'checked')
  }else{
    utools.dbStorage.setItem('isNotified', '')
  }
  if(isBack == true){
    utools.dbStorage.setItem('isBack', 'checked')
  }else{
    utools.dbStorage.setItem('isBack', '')
  }
}

function loadConfig(){
  /*
  加载配置信息
  */
  try{
    isNotified =  utools.dbStorage.getItem('isNotified')
    isBack = utools.dbStorage.getItem('isBack')
    vmwareObject.isNotified = isNotified == 'checked' ? true : false
    vmwareObject.isBack = isBack == 'checked' ? true : false
  }catch(e){
    vmwareObject.isNotified = true
    vmwareObject.isBack = false
    alert(e)
  }
}

function searchVmwarePath(){
  /*
   寻找 vmware.exe地址
  */
  try{
    let VmwareConfigPath = 'C:\\ProgramData\\VMware\\hostd\\config.xml';
    let configRegx =  /<defaultInstallPath> (.+?) </;
    let configContent = fs.readFileSync(VmwareConfigPath).toString();
    vmwareObject.vmwarePath = configRegx.exec(configContent)[1];
  }catch(e){
    vmwareObject.vmwarePath = '' // 未找到默认配置文件
  }
  dbVmwarePath = utools.dbStorage.getItem('dbVmwarePath') // 没有时, return null
  if (dbVmwarePath == null && vmwareObject.vmwarePath != '') {
    // dbVmwarePath 查询为空时，将默认地址保存到数据库
    utools.dbStorage.setItem('dbVmwarePath', vmwareObject.vmwarePath)
  }
}


function vmxScan(vmxDirectories){
  /*
  扫描vmx文件,并将信息保存在内存
   */
  vmwareObject.vmxPathList = []
  let tmpVmxPathString = '';
  let vmxRegx = /(.+)\n/g;
  vmxDirectories.forEach(function (vmxDirectory){
    let searchCmd = 'for /r "'+ vmxDirectory +'" %i in (*.vmx) do @echo %i';
    let searchExec = childProcess.execSync(
        searchCmd,
        {encoding: binaryEncoding});
    let searchResult = iconv.decode(new Buffer.from(searchExec.toString(), binaryEncoding), encoding);
    tmpVmxPathString = tmpVmxPathString + searchResult;
  });
  let tmpVmxPathList = tmpVmxPathString.split(/\r\n/);
  tmpVmxPathList.forEach(function (tmpVmxPath){
    if (tmpVmxPath && tmpVmxPath.slice(-4) === '.vmx'){
      vmwareObject.vmxPathList.push(tmpVmxPath);
    }
  });
}

function vmwareOpen(vmxPath){
  /*
  以open的方法打开 被选择的虚拟机, -p
   */
  let execCmd = '"' + utools.dbStorage.getItem('dbVmwarePath') + 'vmware.exe"'  + ' -p "' + vmxPath + '"';
  if(vmwareObject.isNotified == 'checked'){
    utools.showNotification(vmxPath + '打开中')
  }
  nodeCmd.run(execCmd)
  windows.utools.outPlugin()
}

function vmwareRun(vmxPath){
  /*
  以 vmrun 开启虚拟机
   */
  let execCmdTmp = '"' + utools.dbStorage.getItem('dbVmwarePath') + 'vmrun.exe"' + ' start "' + vmxPath
  let execCmdVmrun = vmwareObject.isBack ? execCmdTmp + '" nogui' :  execCmdTmp + '" gui'
  if(vmwareObject.isNotified == 'checked'){
    message = vmwareObject.isBack ? vmxPath + '打开中(nogui)' : vmxPath + '打开中(gui)'
    utools.showNotification(message)
  }
  nodeCmd.run(execCmdVmrun)
  windows.utools.outPlugin()
}
function vmwareStop(vmxPath){
  /*
  以 vmrun 关闭虚拟机
   */
  let execCmdTmp = '"' + utools.dbStorage.getItem('dbVmwarePath') + 'vmrun.exe"' + ' stop "' + vmxPath
  let execCmdVmrun = vmwareObject.isBack ? execCmdTmp + '" nogui' :  execCmdTmp + '" gui'
  if(vmwareObject.isNotified == 'checked'){
    message = vmwareObject.isBack ? vmxPath + '打开中(nogui)' : vmxPath + '打开中(gui)'
    utools.showNotification(message)
  }
  nodeCmd.run(execCmdVmrun)
  windows.utools.outPlugin()
}
utools.onPluginReady(() => {
  /*
  首次插件启动时：
  1. 读取数据库，读取 dbVmxDirectories , loadConfig
  2. setVmxDirectories
  3. searchVmwarePath()
  4. vmxScan()
   */
  searchVmwarePath();
  loadConfig();
  // 添加异常处理，防止utools报错
  try{
    dbVmxDirectories = utools.dbStorage.getItem('dbVmxDirectories')
  }catch(e){
    dbVmxDirectories = ''
  }
  setVmxDirectories(dbVmxDirectories);
})


function ListAllVmxPath(){
  /*
  利用utools列表列出信息
   */
  let vmwarePathList = [];
  vmwareObject.vmxPathList.forEach(function (vmxPath){
    let vmxName = path.parse(vmxPath).name;
    vmwarePathList.push({title: vmxName, description: vmxPath})
  })
  return vmwarePathList; 
}

function SearchVmxPath(searchWord){
  /*
  根据 searchWord 列出 虚拟机
   */
  let searchVmxPath = [];
  vmwareObject.vmxPathList.forEach(function (vmxPath){
    if (vmxPath.search(new RegExp(searchWord,"i")) !== -1 ){
      let vmxName = path.parse(vmxPath).name;
      searchVmxPath.push({title: vmxName, description: vmxPath})
    }
  })
  return searchVmxPath
}

const SettingUI = () => {
  /* 
  utools UI 设置 函数
  */
  // 设置UI参数
  dbVmxDirectories = utools.dbStorage.getItem('dbVmxDirectories')
  dbVmwarePath = utools.dbStorage.getItem('dbVmwarePath')
  isNotifiedValue = utools.dbStorage.getItem('isNotified') ? 'Yes' : 'No'
  isBackValue = utools.dbStorage.getItem('isBack') ? 'Yes' : 'No'
  // 处理 submit 事件
  let submit = () => {
    try{
      let vmxDir = document.getElementById('vmxDir')
      setVmxDirectories(vmxDir.value)

      let vmwarePath =  document.getElementById('vmwarePath').value
      setVmwarePath(vmwarePath)

      let isNotified = document.getElementById('isNotified').checked
      let isBack = document.getElementById('isBack').checked
      setConfig(isNotified, isBack)
    }catch(e){
      alert(e)
    }
    // window.utools.hideMainWindow()
    utools.showNotification('设置完成')
    setTimeout(() => {
      utools.redirect('vmopen', '')
    }, 200);
  }
  return jsx`
<${Fragment}>
<head>
  <title>Setting</title>
  <script src="index.js"/>
</head>
<body>
  <div id="root"/>
  <form id="vmsetting">
    <fieldset>
        <legend>虚拟机地址设置</legend>
        <p>请输入虚拟机地址设置,用分号进行分割,如 "E:\\VM\\;G:\\VM\\".</p>
        <p>地址选择适当的大小，如G:\\VM\\下有多台虚拟机，可以直接设置 G:\\VM\\</p>
        <p>当前虚拟机地址为:    ${dbVmxDirectories}</p>
        <label>虚拟机地址:</label>
        <input name="vmxDir" id="vmxDir" type="text" placeholder="请输入地址" />
        <p>当前 vmware 文件夹地址为:    ${dbVmwarePath}</p>
        <p>若未能通过配置文件找到 vmware 文件夹,可在下面输入框中输入地址</p>
        <p>如 "F:\\VMware\\",其中"F:\\VMware\\"为含有"vmrun.exe" 和 "vmware.exe"两个文件夹</p>
        <label> vmware 文件夹地址:  </label>
        <input name="vmwarePath" id="vmwarePath" type="text" placeholder="请输入地址" />
        <p> 开启通知栏 (默认为:开启) 
          <input type="checkbox" id="isNotified" name="isNotified" /> ${isNotifiedValue}
        </p>
        <p>  后台开启虚拟机 (默认为: 关闭) 
          <input type="checkbox" id="isBack" name="isBack"/> ${isBackValue}
        </p>
        <div style="text-align: center">
        <button type="submit" onclick=${() => submit()}>保存</button>
        </div>
    </fieldset>
  </form>
</body>
</${Fragment}>`
}


window.exports = {
  /*
  vmware_init 的 UI 分为两种用法:
  1. 显示当前数据库中的 配置信息 vmwareObject
  2. 配置 vmwareObject.vmxDirectories
   */
  'vmware_init': {
    mode: 'none',
    args: {
      enter(action, callback) {
        utools.setExpendHeight(400)
        Nano.render(jsx`${SettingUI}`, document.documentElement)
      }
    }
  },
  'vmware_open': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        document.getElementById('vmsetting')?.remove()
        callbackSetList(ListAllVmxPath());
      },
      search: (action, searchWord, callbackSetList) => {
        document.getElementById('vmsetting')?.remove()
        callbackSetList(SearchVmxPath(searchWord))
      },
      select: (action, itemData) => {
        document.getElementById('vmsetting')?.remove()
        // itemData 为被选择的数据项
        window.utools.hideMainWindow()
        vmwareOpen(itemData.description)
      },
      placeholder: '虚拟机列表'
    }
  },
  'vmware_run': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        document.getElementById('vmsetting')?.remove()
        callbackSetList(ListAllVmxPath());
      },
      search: (action, searchWord, callbackSetList) => {
        document.getElementById('vmsetting')?.remove()
        callbackSetList(SearchVmxPath(searchWord))
      },
      select: (action, itemData) => {
        document.getElementById('vmsetting')?.remove()
        // itemData 为被选择的数据项
        window.utools.hideMainWindow()
        vmwareRun(itemData.description)
        },
      placeholder: '虚拟机列表'
    }
  },
  'vmware_stop': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        document.getElementById('vmsetting')?.remove()
        callbackSetList(ListAllVmxPath());
      },
      search: (action, searchWord, callbackSetList) => {
        document.getElementById('vmsetting')?.remove()
        callbackSetList(SearchVmxPath(searchWord))
      },
      select: (action, itemData) => {
        document.getElementById('vmsetting')?.remove()
        // itemData 为被选择的数据项
        window.utools.hideMainWindow()
        vmwareStop(itemData.description)
      },
      placeholder: '虚拟机列表'
    }
  }
}
const Nano = require('nano-jsx')
const {Fragment, jsx} = require('nano-jsx')
const childProcess = require('child_process');
const iconv = require('iconv-lite');
const encoding = 'cp936';
const binaryEncoding = 'binary';
const fs = require('fs');
const path = require('path');



var vmwareObject = {
  vmwarePath: '',
  vmxDirectories: [],
  vmxPathList: []
};

var dbVmxDirectories = '';


function setVmxDirectories(dirInput){
  /*
  根据 dirInput 设置 vmxDirectories,分号作为目录分割
   */
  vmwareObject.vmxDirectories = [] // 清空 vmwareObject.vmxDirectories
  let tmpVmxDirectories = dirInput.split(';');
  tmpVmxDirectories.forEach(function (tmpVmxDirectory){
    vmwareObject.vmxDirectories.push(tmpVmxDirectory.replace(/(^s*)|(s*$)/g, ""));
  });
  // 将 dbVmxDirectories 保存在db数据库中
  var dbVmxDirectories = utools.db.get('dbVmxDirectories')
  if (dbVmxDirectories && dbVmxDirectories.data !== dirInput) {
    utools.db.put({
      _id: 'dbVmxDirectories',
      data: dirInput,
      _rev: dbVmxDirectories._rev
    })
  }
  else if (dbVmxDirectories === null) {
    utools.db.put({
      _id: 'dbVmxDirectories',
      data: dirInput,
    })
  }
  vmxScan(vmwareObject.vmxDirectories);
}

function searchVmwarePath(){
  /*
   寻找 vmware.exe地址
  */
  let VmwareConfigPath = 'C:\\ProgramData\\VMware\\hostd\\config.xml';
  let configRegx =  /<defaultInstallPath> (.+?) </;
  let configContent = fs.readFileSync(VmwareConfigPath).toString();
  vmwareObject.vmwarePath = configRegx.exec(configContent)[1] + 'vmware.exe';
}


function vmxScan(vmxDirectories){
  /*
  扫描vmx文件,并将信息保存在内存
   */
  vmwareObject.vmxPathList = []
  let tmpVmxPathString = '';
  let vmxRegx = /(.+)\n/g;
  vmxDirectories.forEach(function (vmxDirectory){
    let searchCmd = 'for /r '+ vmxDirectory +' %i in (*.vmx) do @echo %i';
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
  let execCmd = vmwareObject.vmwarePath + ' -p "' + vmxPath + '"';
  let execRes = childProcess.exec(execCmd, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
  }).toString();
  
}

function vmwareRun(vmxPath){
  /*
  以run的方法打开 被选择的虚拟机, -x
   */
  let execCmd = vmwareObject.vmwarePath + ' -x "' + vmxPath + '"';
  let execRes = childProcess.exec(execCmd,function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
  }).toString();
}


utools.onPluginReady(() => {
  /*
  首次插件启动时：
  1. 读取数据库，读取 dbVmxDirectories
  2. setVmxDirectories
  3. searchVmwarePath()
  4. vmxScan()
   */
  searchVmwarePath();
  dbVmxDirectories = utools.db.get('dbVmxDirectories').data;
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
  dbVmxDirectories = utools.db.get('dbVmxDirectories').data;
  let submit = () => {
    let vmxDir = document.getElementById("vmxDir");
    setVmxDirectories(vmxDir.value);
    // window.utools.hideMainWindow()
    utools.showNotification("设置完成")
    setTimeout(() => {
      utools.redirect("vmopen",'')
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
        <p>请输入虚拟机地址设置,用分号进行分割,如 "E:\\VM\\;G:\\VM\\" </p>
        <p>当前虚拟机地址为: ${dbVmxDirectories}</p>
        <label for="stacked-email">虚拟机地址:</label>
        <input name="vmxDir" id="vmxDir" type="text" placeholder="请输入地址" />
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
        utools.setExpendHeight(180)
        Nano.render(jsx`${SettingUI}`, document.documentElement)
      }
    }
  },
  'vmware_open': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        document.getElementById("vmsetting")?.remove()
        callbackSetList(ListAllVmxPath());
      },
      search: (action, searchWord, callbackSetList) => {
        document.getElementById("vmsetting")?.remove()
        callbackSetList(SearchVmxPath(searchWord))
      },
      select: (action, itemData) => {
        document.getElementById("vmsetting")?.remove()
        // itemData 为被选择的数据项
        window.utools.hideMainWindow()
        utools.showNotification(itemData.title + '打开中')
        vmwareOpen(itemData.description)
        window.utools.outPlugin()
      },
      placeholder: '虚拟机列表'
    }
  },
  'vmware_run': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        document.getElementById("vmsetting")?.remove()
        callbackSetList(ListAllVmxPath());
      },
      search: (action, searchWord, callbackSetList) => {
        document.getElementById("vmsetting")?.remove()
        callbackSetList(SearchVmxPath(searchWord))
      },
      select: (action, itemData) => {
        document.getElementById("vmsetting")?.remove()
        // itemData 为被选择的数据项
        window.utools.hideMainWindow()
        utools.showNotification(itemData.title + '开启中')
        vmwareRun(itemData.description)
        window.utools.outPlugin()
      },
      placeholder: '虚拟机列表'
    }
  }
}
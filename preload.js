const settingUI = require('./src/settingUI')
const loadPlugin = require('./src/loadplugin')
const utils = require('./src/utils')
const vmwareObject = loadPlugin.vmwareObject

utools.onPluginReady(() => {
  loadPlugin.readUtoolsDB()
});

window.exports = {
  'vmware_init': {
    mode: 'none',
    args: {
      enter(action, callback) {
        utools.setExpendHeight(600)
        settingUI();
      }
    }
  },
  'vmware_open': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        callbackSetList(utils.listAllVmxPath());
      },
      search: (action, searchWord, callbackSetList) => {
        callbackSetList(utils.searchVmxPath(searchWord))
      },
      select: (action, itemData) => {
        // // itemData 为被选择的数据项
        // window.utools.hideMainWindow()
        utils.vmwareOpen(itemData.description)
      },
      placeholder: '虚拟机列表'
    }
  },
  'vmware_run': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        document.getElementById('settings')?.remove()
        callbackSetList(utils.listAllVmxPath());
      },
      search: (action, searchWord, callbackSetList) => {
        document.getElementById('settings')?.remove()
        callbackSetList(utils.searchVmxPath(searchWord))
      },
      select: (action, itemData) => {
        document.getElementById('settings')?.remove()
        // itemData 为被选择的数据项
        window.utools.hideMainWindow()
        utils.vmwareRun(itemData.description)
        },
      placeholder: '虚拟机列表'
    }
  },
  'vmware_stop': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        document.getElementById('settings')?.remove()
        callbackSetList(utils.listAllLiveVmxPath());
      },
      search: (action, searchWord, callbackSetList) => {
        document.getElementById('settings')?.remove()
        callbackSetList(utils.searchLiveVmxPath(searchWord))
      },
      select: (action, itemData) => {
        document.getElementById('settings')?.remove()
        // itemData 为被选择的数据项
        window.utools.hideMainWindow()
        utils.vmwareStop(itemData.description)
        },
      placeholder: '虚拟机列表'
    },
  },
  'vmware_suspend': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        document.getElementById('settings')?.remove()
        callbackSetList(utils.listAllLiveVmxPath());
      },
      search: (action, searchWord, callbackSetList) => {
        document.getElementById('settings')?.remove()
        callbackSetList(utils.searchLiveVmxPath(searchWord))
      },
      select: (action, itemData) => {
        document.getElementById('settings')?.remove()
        // itemData 为被选择的数据项
        window.utools.hideMainWindow()
        utils.vmwareSuspend(itemData.description)
        },
      placeholder: '虚拟机列表'
    }
  }
}
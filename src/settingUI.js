const path = require('path');
const loadPlugin = require('./loadplugin')


function settingUI() {
    /*
    Ref:
    https://github.com/mohuishou/utools/blob/318802607f92f6aee45198d4996e36b4897c11b1/helper/src/config/setting.ts#L80
    */
    // 删除 settings 
    document.getElementById('settings')?.remove()

    let body = document.querySelector("body");
    let layui = path.join(__dirname, "../node_modules/layui/dist/")
    let settings = document.createElement("div");
    // 需要注意的是，当插件从后台到前台时，utools.onPluginReady 不会再次启动
    // 添加 判断条件到 reset 中
    loadPlugin.readUtoolsDB()
    // \\ 的 BUG
    let uiVmxDirectory = loadPlugin.vmwareObject.vmxDirectory.replaceAll("\\", "\\\\")
    let uiVmProgramPath = loadPlugin.vmwareObject.vmProgramPath.replaceAll("\\", "\\\\")
    
    console.log(`loadPlugin.vmwareObject.isBackground:${loadPlugin.vmwareObject.isBackground}`)
    console.log(`loadPlugin.vmwareObject.isNotificationBar:${loadPlugin.vmwareObject.isNotificationBar}`)

    if (loadPlugin.vmwareObject.isBackground === "false") {
        uiIsBackground = false
    } else {
        uiIsBackground = true
    }

    if (loadPlugin.vmwareObject.isNotificationBar === "false") {
        uiIsNotificationBar = false
    } else {
        uiIsNotificationBar = true
    }

    console.log(uiIsBackground, uiIsNotificationBar)
    console.log(`uiVmxDirectory:${uiVmxDirectory}`)
    console.log(`uiVmProgramPath:${uiVmProgramPath}`)
    settings.innerHTML = `
        <link rel="stylesheet" href="${layui}css/layui.css"  media="all">
        <style>
        #root{
            display: none !important;
        }
        form {
            margin-bottom: 20px;
        }
        #save {
            position: fixed;
            bottom: 0;
            width: 100%;
        }
        footer {
            text-align: center;
            margin-top: 10px;
        }
        </style>
        <div class="layui-collapse">
            <div class="layui-colla-item">
                <h2 class="layui-colla-title">Vmware插件设置</h2>
                <div class="layui-colla-content layui-show">
                    <form id="config" class="layui-form" lay-filter="vmware" action="">
                        
                        <blockquote class="layui-elem-quote layui-text">
                            请输入虚拟机地址设置,用分号进行分割,如 "E:\\VM\\;G:\\VM\\"。地址选择适当的大小，如G:\\VM\\下有多台虚拟机，可以直接设置 G:\\VM\\。
                        </blockquote>
                        
                        <div class="layui-form-item">
                            <label class="layui-form-label">虚拟机地址</label>
                            <div class="layui-input-block">
                            <input type="text" name="vmxDirectory" id="vmxDirectory" autocomplete="off" 
                            placeholder="请输入虚拟机地址" class="layui-input">
                            </div>
                        </div>

                        <blockquote class="layui-elem-quote layui-text">
                        若未能通过配置文件找到 vmware 文件夹,可在下面输入框中输入地址。如 "F:\\VMware\\",其中"F:\\VMware\\"为含有"vmrun.exe" 和 "vmware.exe"两个应用程序。
                        </blockquote>

                        <div class="layui-form-item">
                            <label class="layui-form-label">vmware程序地址</label>
                            <div class="layui-input-block">
                            <input type="text" name="vmProgramPath" id="vmProgramPath" autocomplete="off" 
                            placeholder="请输入vmware程序地址" class="layui-input">
                            </div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">后台开启-默认关</label>
                            <div class="layui-input-block">
                            <input type="checkbox" name="isBackground"
                            lay-skin="switch"  lay-text="ON|OFF">
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">通知栏-默认开</label>
                            <div class="layui-input-block">
                            <input type="checkbox" name="isNotificationBar"
                            lay-skin="switch" lay-filter="config" lay-text="ON|OFF">
                            </div>
                        </div>
                        <footer style="text-align: -webkit-auto">
                            <button id="save" type="submit" class="layui-btn layui-btn-fluid" lay-submit="" lay-filter="config">保存</button>
                        </footer>
                    </form>
                </div>
            </div>
            <div class="layui-colla-item">
                <h2 class="layui-colla-title">About</h2>
                <div class="layui-colla-content layui-show="false">
                    <form class="layui-form" action="" style="text-align: center;">
                        <div class="layui-inline">
                            <div class="layui-form-item">
                                <label class="layui-form-label">😴作者</label>
                                <label class="layui-form-label">fe1w0</label>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">🌟项目地址</label>
                                <label class="layui-form-label"><a class="link-one" href="https://github.com/fe1w0/utools-vmware">https://github.com/fe1w0/utools-vmware</a></label>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">😱Issues</label>
                                <label class="layui-form-label"><a class="link-two" href="https://github.com/fe1w0/utools-vmware/issues"> https://github.com/fe1w0/utools-vmware/issues</a></label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    `;
    settings.setAttribute("id", "settings")
    let layjs = document.createElement("script");
    layjs.type = "text/javascript";
    layjs.src = path.join(layui, "layui.js");
    layjs.id = "layui";
    settings.append(layjs);
    let script = document.createElement("script");
    script.text = `
    document.querySelector("#layui").onload = () => {
        layui.use('element', function(){
            var element = layui.element;
        });
        layui.form.on("submit(config)", function (data) {
            console.log("submit:")
            window.updateConfig(data.field)
        });

        layui.form.val("vmware", {
            "vmxDirectory": "${uiVmxDirectory}",
            "vmProgramPath": "${uiVmProgramPath}",
            "isBackground": ${uiIsBackground},
            "isNotificationBar": ${uiIsNotificationBar},
        })
    };
    document.querySelector(".link-one").onclick = (e) => {
        utools.shellOpenExternal(e.target.getAttribute("href"))
    }
    document.querySelector(".link-two").onclick = (e) => {
        utools.shellOpenExternal(e.target.getAttribute("href"))
    }
    `;

    settings.append(script);

    body.append(settings);
}


window.updateConfig = function(data) {
    // 更新数据库    
    utools.dbStorage.setItem('vmxDirectory', data.vmxDirectory)
    utools.dbStorage.setItem('vmProgramPath', data.vmProgramPath)

    if (typeof(data.isBackground) === "undefined" || data.isBackground === "false" || data.isBackground === false) {
        data.isBackground = "false"
    } else {
        data.isBackground = "true"
    }
    utools.dbStorage.setItem('isBackground', data.isBackground)
    if (typeof(data.isNotificationBar) === "undefined" || data.isNotificationBar === "false" || data.isNotificationBar === false) {
        data.isNotificationBar = "false"
    } else {
        data.isNotificationBar = "true"
    }
    utools.dbStorage.setItem('isNotificationBar', data.isNotificationBar)

    if (data.isNotificationBar === "true"){
        utools.showNotification('设置完成')
    }
    // setTimeout(() => {
    //   utools.redirect('vmopen', '')
    // }, 200);
    utools.hideMainWindow()
    utools.outPlugin()
  }

module.exports = settingUI
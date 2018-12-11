import './common/common';
import './common/laya.custom';
import './common/requestAnimationFrame';
import './sail/sail.utils';
import './sail/keyboard';

import GAME_CONFIG from './config/config';
import UTILS from './config/utils';
import { RESOURCE, GAME_VERSION } from './config/resource';

//io模块 && 顶层观察者，各模块间可以通过观察者来通信 && 场景管理器
import { messageCenter, observer, sceneManager, setViewCenter } from './module/init_module';
import CommonGameModule from './module/com/commonGameModule';
// 弹层初始化
import initAllPop from './pop/init_pop';

import LoadingScene from './uiScene/loading';
import RoomScene from './uiScene/room';
import AudioMudule from './module/com/audio';
import MonitorSet from './uiScene/com/monitor';

// laya初始化
{
    //配置宽高以及启用webgl(如果浏览器支持的话);
    Laya.init(GAME_CONFIG.gameWidth, GAME_CONFIG.gameHeight, Laya.WebGL);

    //设置横屏
    Laya.stage.screenMode = GAME_CONFIG.screenMode;

    //设置适配模式
    Laya.stage.scaleMode = GAME_CONFIG.scaleMode;

    // Laya.stage.fullScreenEnabled = true; //禁止横竖屏

    // iPhone x 适配
    var changeScaleMode = function(){
        var scaleMode;
        switch(Laya.stage.screenMode){
            case 'horizontal':
                scaleMode = Laya.Browser.width / Laya.Browser.height > 1334 / 750 ? Laya.Stage.SCALE_SHOWALL : Laya.Stage.SCALE_FIXED_WIDTH;
                break;
            case 'vertical':
                scaleMode = Laya.Browser.width / Laya.Browser.height < 750 / 1334 ? Laya.Stage.SCALE_SHOWALL : Laya.Stage.SCALE_FIXED_HEIGHT;
                break;
            default:
                scaleMode = Laya.Stage.SCALE_SHOWALL;
                break;
        }
        Laya.stage.scaleMode = scaleMode;
        Laya.stage.setScreenSize(Laya.Browser.clientWidth * Laya.Browser.pixelRatio, Laya.Browser.clientHeight * Laya.Browser.pixelRatio);
    }
    var resizeListen = function(){
        var timeoutResize;
        var resizeFunc = function(){
            clearTimeout(timeoutResize);
            timeoutResize = setTimeout(function(){
                changeScaleMode();
            }, 200);
        }
        window.addEventListener('resize', resizeFunc);
    }
    var resizeOnce = false;
    Laya.stage.once('resize', this, function(){

        if(resizeOnce){
            return;
        }
        resizeOnce = true;
        changeScaleMode();
        resizeListen();
        main();
    });
    setTimeout(function(){
        changeScaleMode();
    }, 0);
    //设置水平对齐
    Laya.stage.alignH = GAME_CONFIG.alignH;
    //设置垂直对齐
    Laya.stage.alignV = GAME_CONFIG.alignV;
    //设置basepath
    Laya.URL.basePath = typeof window.cdnpath === "string" ? window.cdnpath : "";
    //版本号
    Laya.URL.version = GAME_VERSION;

    Laya.UIConfig.popupBgAlpha = 0.5;

}

// 开启调试
if (GAME_CONFIG.localStatus || GAME_CONFIG.debug) {
    Object.assign(window, { messageCenter, observer, UTILS, sceneManager, RoomScene, LoadingScene, AudioMudule, CommonGameModule})

    window.checheEmit = messageCenter.emit.bind(messageCenter);

    //是否开启FPS监听
    // Laya.Stat.show(0, 0);
}


// loading页优先加载并渲染
function main() {
    Laya.loader.load(RESOURCE.loadingRes, Laya.Handler.create(this, () => {
        if(window.bigRender){
            window.bigRender.clear();
        }

        // loading场景
        sceneManager.loadScene(LoadingScene.getInstance());

        // 浏览器窗口大小变化
        Laya.stage.on(Laya.Event.RESIZE, this, setViewCenter);

        // 加载字体&&图片
        loadFontAndImage();
    }))
}

// 加载字体&&图片
function loadFontAndImage() {
    let count = 0;
    let length = RESOURCE.fonts.length;
    //全局字体资源
    RESOURCE.fonts.forEach((item, i, arr) => {
        let bitmapfont = new Laya.BitmapFont();
        bitmapfont.loadFont(item.url, Laya.Handler.create(this, () => {
            Laya.Text.registerBitmapFont(item.name, bitmapfont);

            // 字体全部加载完成
            if (++count === length) {
                // 加载图片
                loadImages();
            }
        }));
    })
}

// 加载图片
function loadImages() {
    // 资源加载完毕后
    let onLoaded = () => {
        console.warn('大厅&房间————资源加载完成');

        // 初始化所有弹层
        initAllPop({ messageCenter, observer });
        // MonitorSet.init();
        // 有socket地址
        if (window.websocketurl) {

            // 绑定消息
            messageCenter.initAction();

            // 连接服务器
            messageCenter.connectSocket();
        } else {
            // 直接进房间
            sceneManager.loadScene(RoomScene.getInstance(messageCenter));
        }
    }

    let loadView = LoadingScene.getInstance();

    // 加载资源
    Laya.loader.load(RESOURCE.disLoadingRes, Laya.Handler.create(this, onLoaded), Laya.Handler.create(loadView, loadView.loading, null, false));
}

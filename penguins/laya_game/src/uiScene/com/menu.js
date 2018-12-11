import CommonGameModule from '../../module/com/commonGameModule';
import UTILS from '../../config/utils';
import GAME_CONFIG from '../../config/config';
import AudioMudule from '../../module/com/audio';
import { observer,messageCenter } from '../../module/init_module';

/**
 * Menu ui visualization of the data that model contains.
 * 菜单
 * @class      MenuUIView (name)
 */
export default class MenuUIView extends menuUI {
    constructor() {
        super()
        this.init()

        MenuUIView.instance = this;
    }

    static getInstance() {
        return this.instance || new this();
    }

    init() {

        // 初始化公告按钮
        CommonGameModule.getInstance().noticeSystem(this, 266);

        this.initEvent();
        observer.subscribe('pop::menu', this.toggle.bind(this));
        this.initSoundState();
        this.hide();

    }

    initEvent() {
        // 声音
        this.btn_voice.on(Laya.Event.CLICK, this, () => {
            // this.visible = false;
            AudioMudule.getInstance().play('btn');
            this.changeSoundState();
        });

        // 帮助
        this.btn_help.on(Laya.Event.CLICK, this, () => {
            AudioMudule.getInstance().play('btn');
            observer.publish('pop::help',messageCenter);
            this.visible = false;

        });


    }

    // 初始化声音状态
    initSoundState() {
        // 取cookie
        let _current = UTILS.getCookie(GAME_CONFIG.SOUND_STATE_KEY);

        if (_current === 'false') {
            this.voice.index = 1;
            observer.publish('game::voice', false);

        } else {
            UTILS.setCookie(GAME_CONFIG.SOUND_STATE_KEY, 'true');
            this.voice.index = 0;
            observer.publish('game::voice', true);
        }

    }

    // 改变声音状态
    changeSoundState() {
        // 取cookie
        let _current = UTILS.getCookie(GAME_CONFIG.SOUND_STATE_KEY);
        let bool;
        if (_current === 'true') {
            _current = 'false';
            this.voice.index = 1;
            bool = false;
        } else {
            AudioMudule.getInstance().play('btn');
            _current = 'true';
            this.voice.index = 0;
            bool = true;
        }

        observer.publish('game::voice', bool);
        UTILS.setCookie(GAME_CONFIG.SOUND_STATE_KEY, _current);
    }

    // 设置中心点
    setAnchor() {
        let attr = null;
        if (this.x === 0) {
            attr = { pivotX: 0.5 * this.width, x: 0.5 * this.width };
        } else {
            attr = { pivotX: 0, x: 0 };
        }

        this.set(attr);
    }

    toggle() {
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        this.visible = true;
        this.setAnchor();
        Laya.Tween.from(this, { scaleX: 0, scaleY: 0 }, 200, Laya.Ease.backOut, Laya.Handler.create(this, this.setAnchor));
    }

    hide() {
        this.visible = false;
    }

}
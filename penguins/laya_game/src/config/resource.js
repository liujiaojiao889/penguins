import GAME_CONFIG from './config';


let XML = Laya.Loader.XML;
let IMAGE = Laya.Loader.IMAGE;
let ATLAS = Laya.Loader.ATLAS;
let BUFFER = Laya.Loader.BUFFER;
let SOUND = Laya.Loader.SOUND;

// 所有的资源
const RESOURCE = {};
// 游戏版本号
const GAME_VERSION = {};

// 字体资源
let fonts = [
    { url: "images/font/auto.fnt", name: 'auto', type: XML },
    { url: "images/font/auto_font.fnt", name: 'auto_font', type: XML },
    { url: "images/font/fudai_amount.fnt", name: 'fudai_amount', type: XML },
    { url: "images/font/new_font.fnt", name: 'new_font', type: XML },
    { url: "images/font/queenwin_font.fnt", name: 'queenwin_font', type: XML },
    { url: "images/font/guide_font.fnt", name: 'guide_font', type: XML },
    { url: "images/font/font_bet.fnt", name: 'font_bet', type: XML },
    { url: "images/font/jin.fnt", name: 'jin', type: XML }
];

// loading需要的资源优先加载
let loadingRes = [
    { url: "images/font/load_font.fnt", name: 'load_font', type: Laya.Loader.FONT },
    { url: 'images/load/bg.jpg', type: IMAGE },
    { url: 'images/load/barbg.png', type: IMAGE },
    { url: 'images/load/notice.png', type: IMAGE },
    { url: 'res/atlas/images/load.json', type: ATLAS },
    { url: 'images/animate/loading.sk', type: BUFFER },
    { url: 'images/animate/loading.png', type: IMAGE },
]

// 不打包图片资源
let unPackRes = [
    // room
    { url: "images/room/bg.jpg", type: IMAGE },
    { url: "images/room/bottom.png", type: IMAGE },

    // 模拟中奖
   { url: 'images/animate/win_queen.sk', type: BUFFER },
    { url: 'images/animate/win_queen.png', type: IMAGE },
    // 企鹅骨骼动画的资源
    { url: 'images/animate/penguin_0.sk', type: BUFFER },
    { url: 'images/animate/penguin_0.png', type: IMAGE },
    { url: 'images/animate/penguin_1.sk', type: BUFFER },
    { url: 'images/animate/penguin_1.png', type: IMAGE },
    { url: 'images/animate/penguin_2.sk', type: BUFFER },
    { url: 'images/animate/penguin_2.png', type: IMAGE },
    { url: 'images/animate/penguin_3.sk', type: BUFFER },
    { url: 'images/animate/penguin_3.png', type: IMAGE },

    // 雪坑
    { url: 'images/animate/keng.sk', type: BUFFER },
    { url: 'images/animate/keng.png', type: IMAGE },

    { url: 'images/animate/snow.sk', type: BUFFER },
    { url: 'images/animate/snow.png', type: IMAGE },

    //按钮
    { url: 'images/animate/button.sk', type: BUFFER },
    { url: 'images/animate/button.png', type: IMAGE },
    // 福袋
    { url: 'images/animate/fudai.sk', type: BUFFER },
    { url: 'images/animate/fudai.png', type: IMAGE },

    // 语句
    { url: 'images/animate/talk.sk', type: BUFFER },
    { url: 'images/animate/talk.png', type: IMAGE },
     //女王
    { url: 'images/animate/queen.sk', type: BUFFER },
    { url: 'images/animate/queen.png', type: IMAGE },
    //女王
    { url: 'images/animate/hand.sk', type: BUFFER },
    { url: 'images/animate/hand.png', type: IMAGE },

    // 排行榜弹层的资源
    { url: 'images/pop/rank/bg_rank.png', type: IMAGE },
    { url: 'images/pop/rank/bg_con1.png', type: IMAGE },
    { url: 'images/pop/rank/rank.png', type: IMAGE },

    // 帮助资源
    { url: 'images/pop/help/banner_01.png', type: IMAGE },
    { url: 'images/pop/help/banner_02.png', type: IMAGE },

    // 福袋
    { url: 'images/pop/fudai/bg_01.png', type: IMAGE },
    { url: 'images/pop/fudai/bg_02.png', type: IMAGE },
    { url: 'images/pop/fudai/txt_header.png', type: IMAGE },
    { url: 'images/pop/fudai/txt_title.png', type: IMAGE },

    // 宝藏说明弹层
    { url: 'images/pop/precious/bg_precious.png', type: IMAGE },
    // 充值弹层
    { url: 'images/pop/recharge/bg.png', type: IMAGE },


    //  公共弹层
    { url: 'images/pop/tips/bg_tips.png', type: IMAGE },
    { url: 'images/pop/tips/bg_bet.png', type: IMAGE }
];

// 打包的json文件
let packRes = [
    // room
    { url: 'res/atlas/images/room.json', type: ATLAS },
    //pop
    { url: 'res/atlas/images/pop/rank.json', type: ATLAS },
    { url: 'res/atlas/images/pop/help.json', type: ATLAS },
    { url: 'res/atlas/images/pop/fudai.json', type: ATLAS },
    { url: 'res/atlas/images/pop/recharge.json', type: ATLAS },
    { url: 'res/atlas/images/pop/tips.json', type: ATLAS }
];

//音效
let audioRes = [
    { url: 'audio/bg.mp3', type: SOUND},
    { url: 'audio/btn.mp3', type: SOUND },
    { url: 'audio/bian.mp3', type: SOUND},
    { url: 'audio/dig_0.mp3', type:SOUND},
    { url: 'audio/dig_1.mp3', type: SOUND},
    { url: 'audio/dig_2.mp3', type: SOUND},
    { url: 'audio/dig_3.mp3', type: SOUND },
    { url: 'audio/queen.mp3', type: SOUND },
    { url: 'audio/receive.mp3', type: SOUND},
    { url: 'audio/run.mp3', type: SOUND },
    { url: 'audio/runbeak.mp3', type: SOUND },
    { url: 'audio/win.mp3', type: SOUND },
    { url: 'audio/winqueen.mp3', type: SOUND },
    { url: 'audio/zha.mp3', type: SOUND }
];


// 字体
RESOURCE.fonts = fonts;
// 加载页资源
RESOURCE.loadingRes = loadingRes;
// 非加载页资源
RESOURCE.disLoadingRes = [...audioRes, ...unPackRes, ...packRes];

// 总的资源
RESOURCE.images = [...RESOURCE.disLoadingRes, ...loadingRes];

let loop = (arr) => {
    if (typeof arr !== 'object') {
        return;
    }
    arr.forEach(function(item, i) {
        let newUrl;
        let jsonIndex;
        let fntIndex;
        let atlasIndex;
        if (typeof item.url === 'string') {
              // 若加载后缀有 .json 和.fnt 的, 则连它们对应的 png一起添加了
            jsonIndex = item.url.indexOf('.json');
            fntIndex = item.url.indexOf('.fnt');
            atlasIndex = item.url.indexOf('.atlas');
            if (jsonIndex > -1) {
                newUrl = item.url.substr(0, jsonIndex) + '.png';
            } else if (fntIndex > -1) {
                newUrl = item.url.substr(0, fntIndex) + '.png';
            }else if (atlasIndex > -1) {
                newUrl = item.url.substr(0, atlasIndex) + '.png';
            }

            if (newUrl) {
                GAME_VERSION[newUrl] = GAME_CONFIG.STATIC_VERTION;
            }

            GAME_VERSION[item.url] = GAME_CONFIG.STATIC_VERTION;
        } else {
            loop(item);
        }
    });
}

loop([...RESOURCE.fonts, ...RESOURCE.images]);


export { RESOURCE, GAME_VERSION };

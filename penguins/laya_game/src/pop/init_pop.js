
import { HelpPopDialog } from './com/helpPop';
import { InstructPopDialog } from './com/instructPop';
import { RechargePopDialog } from './com/rechargePop';
import { RankPopDialog } from './com/rankPop';
import { FudaiPopDialog } from './com/fudaiPop';
import {CommonTipsPopDialog} from './com/commonPop';
import DefaultBetView from './com/defaultBetPop';
import {QueenDialog} from './com/queenPop';
import {HinderPopDialog} from './com/hinderPop';

// 初始化所有弹层

export default function initAllPop({messageCenter, observer}) {
	// 帮助弹层
	new HelpPopDialog().registerAction({messageCenter, observer});
    // 宝藏说明
    new InstructPopDialog().registerAction({messageCenter, observer});
    // 充值弹层
    new RechargePopDialog().registerAction({messageCenter, observer});

    // 排行榜
    new RankPopDialog().registerAction({messageCenter, observer});

    //福袋
    new FudaiPopDialog().registerAction({messageCenter, observer});

    //  公共提示弹层
    new CommonTipsPopDialog().registerAction({messageCenter, observer});

    // 女王
    new QueenDialog().registerAction({messageCenter, observer});

    // 障碍物提示
    new HinderPopDialog().registerAction({messageCenter, observer});

    // 默认投币额
    new DefaultBetView();

}










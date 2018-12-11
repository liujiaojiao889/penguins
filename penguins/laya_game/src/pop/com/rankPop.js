
/**
	排行榜
*/
import UTILS from '../../config/utils.js';
import { messageCenter, observer} from '../../module/init_module';
export class RankPopDialog extends rankPopUI {
	constructor(...args){
		super(...args);
		this.init();
	}

	init() {
		this.initDom();

		this.initConfig();

		this.initEvent();

	}

	// 注册

	registerAction({messageCenter, observer}) {
		// 数据传输

		messageCenter.registerAction("day", this.renderRankList.bind(this));   // 日周月
		messageCenter.registerAction("week", this.renderRankList.bind(this));
		messageCenter.registerAction("month", this.renderRankList.bind(this));

		messageCenter.registerAction("top3",this.renderRichList.bind(this)) //富豪榜

		messageCenter.registerAction("myPrizeLog", this.rendermMyPrizeLog.bind(this));  // 战绩



		// 订阅弹层
		observer.subscribe("pop::rank",this.myShow.bind(this));
	}


	// 触发
	dispatchAction(messageCenter) {
		this.isLoadingOrContent(1);

		messageCenter.emit('top3');
		this.tab_nav.selectedIndex = this.config.index;

		if(this.config.index === 3){
			messageCenter.emit('myPrizeLog');
		}else{
			messageCenter.emitAjax('day');
		}
	}


	initDom() {
		// 关闭按钮
		this.dom_close_btn = this.getChildByName("close_btn");

		// 土豪榜列表
		this.dom_rich_list = this.getChildByName("richList").find("item",true);

	}

	// 初始化配置参数
	initConfig() {
		this.config = {
			isFirstMyList : true ,  //第一次渲染我的战绩
			perioArr : ["day", "week", "month"] ,  //日周月排行榜
			isFirst : true,
			index : 0
		}
	}

	// 初始化事件
	initEvent() {
		this.dom_close_btn.on(Laya.Event.CLICK, this, this.close);

		// 未登录
		this.dom_unloaded.on(Laya.Event.CLICK, this, UTILS.gotoLogin);

		// tab切换
		this.tab_nav.selectHandler = Laya.Handler.create(this, this.tabSwitchHandler, null, false);

	}

	// tab切换
	tabSwitchHandler(index) {
		let target = 0;
		let type;

		if(index === 3){
			target = 1;
			this.isLoadingOrContent(1);
			// 发送分奖socket请求
			messageCenter.emit('myPrizeLog');

		}else{
			target = 0;
			type = this.config.perioArr[index];

			// 先是(1)加载中，，在请求成功后会执行(2)，显示数据
			this.isLoadingOrContent(1);

			// 发送排行榜ajax请求
			messageCenter.emitAjax(type);
			// this.renderRankList();

		}

		this.tab_con.selectedIndex = target;

	}

	// 加载中或者显示数据
	isLoadingOrContent(type) {
		// 暂无数据
		if(type === 0){

			this.dom_loading.visible=true;
			this.dom_loading.text="暂无排名纪录……";
			this.tab_con.visible=false;
			this.dom_unloaded.visible=false;

		// 加载中
		}else if(type === 1){

			this.dom_loading.visible=true;
			this.dom_loading.text="加载中……";
			this.tab_con.visible=false;
			this.dom_unloaded.visible=false;

		// 显示内容
		}else if(type ===2){
			this.dom_loading.visible=false;
			this.tab_con.visible=true;
			this.dom_unloaded.visible=false;

		// 未登录
		}else if(type ===3){
			this.dom_loading.visible=false;
			this.tab_con.visible=false;
			this.dom_unloaded.visible=true;
		}

	}

	// 富豪榜渲染
	renderRichList(data) {
		let infoArray = data.res;
		// let infoArray =[{"amount":578050333333300,"name":"fffffffffffffffffffffffffff"}];
		if(data.code !== 0 ){
			return;
		}

		this.dom_rich_list.forEach((item , index) => {
			let _infoArray = infoArray[index];
			let _dom_rank  = item.getChildByName("rank");
			let _dom_name  = item.getChildByName("name");
			let _dom_point = item.getChildByName("point");

			if(_infoArray){
				_dom_rank.index = index;
				_dom_name.text  = UTILS.getActiveStr(_infoArray.name, 10);
				_dom_point.text = UTILS.getActiveStr(parseInt(_infoArray.amount), 8);
			}else{
				_dom_rank.index = index;
				_dom_name.text = "虚位以待";
				_dom_point.visible = false;
			}
		})



	}

	// 我的战绩
	rendermMyPrizeLog(data) {

		let myRewards = data.res ;
		let result = [] ;

		if(data.code !== 0 ){
			return;
		}

		myRewards.forEach((item , index) => {
			let _myRewards = myRewards[index];
			let _Time =_myRewards.addTime.split(' ');
			let cutIndex = _Time[1].lastIndexOf(":");
			let _myTime;
			_Time[1].slice(0, cutIndex);
			_myTime = _Time[0] + ' '+  _Time[1].slice(0, cutIndex);

			result.push({
				time: _myTime,
				amount:  UTILS.getActiveStr(parseInt(_myRewards.winAmount), 10),
				queen:{
					visible : _myRewards.isQueen === 1 ? true : false
				}
			})

		})

		// 我的战绩
		this.list_rank_gains.array = result;

		if(myRewards.length === 0 ){

			// 已经登陆
			if(UTILS.checkLoginStatus()){
				this.dom_loading.visible=true;
				this.dom_loading.text="暂无奖励记录，赶紧去游戏赢大奖吧！";
				this.tab_con.visible=false;
				this.dom_unloaded.visible=false;
			}else{
				this.isLoadingOrContent(3);
			}

		}else{
			this.isLoadingOrContent(2);
		}
	}

	// 日周月排行榜
	renderRankList(data) {
/*		let data = {
        	"code":"000",
        	"data":[
	        	{amount:"500000.0000",gameid:"40080",nickname:"我的天ll",period:1,rank:1,rank_trend:3},
	        	{amount:"500000.0000",gameid:"40080",nickname:"我的天l2l",period:1,rank:1,rank_trend:3},
	        	{amount:"500000.0000",gameid:"40080",nickname:"我的天ll11",period:1,rank:1,rank_trend:3},
	        	{amount:"500000.0000",gameid:"40080",nickname:"我的天ll",period:1,rank:1,rank_trend:1},
	        	{amount:"500000.0000",gameid:"40080",nickname:"我的天ll",period:1,rank:1,rank_trend:2},
	        	{amount:"500000.0000",gameid:"40080",nickname:"我的天ll",period:1,rank:1,rank_trend:3},
	        	{amount:"500000.0000",gameid:"40080",nickname:"我的天ll",period:1,rank:1,rank_trend:3},
	        	{amount:"500000.0000",gameid:"40080",nickname:"我的天ll",period:1,rank:1,rank_trend:3},
	        	{amount:"500000.0000",gameid:"40080",nickname:"我的天ll",period:1,rank:1,rank_trend:3},
	        	{amount:"500000.0000",gameid:"40080",nickname:"我的天ll",period:1,rank:1,rank_trend:3}
	        ],
	        "myRank":{
	        	amount:"407777770.0000",
	        	nickname:"啊哈哈哈阿斯顿福建某个地方，闪退vhhrtmwhrh",
	        	rank:"29",
	        	rank_trend:"1"
	        }
    	}*/

		if(data.code !== '000'){
			return;
		}
		// 我的排名
		let newMyRank = data.myRank;

		if(UTILS.checkLoginStatus()){
			this.myRankBox.visible = true;
			this.list_rank_all.height = 380;
			this.my_rank.text =newMyRank.rank;
			this.my_name.text = UTILS.getActiveStr(newMyRank.nickname , 10);
			this.my_amount.text =UTILS.getActiveStr(parseInt(newMyRank.amount) , 10);
			this.my_trend.index = newMyRank.rank_trend === 3 ? 0 : newMyRank.rank_trend ;
		}else{
			this.myRankBox.visible = false;
			this.list_rank_all.height = 430;
		}

		let result = [];
		data.data.forEach((item , index) => {
			let trend = Number(item.rank_trend);

			result.push({
				rankNum : index+1,
				name : UTILS.getActiveStr(item.nickname , 10),
				point : UTILS.getActiveStr(parseInt(item.amount) , 10),
				trend :  {
					index : trend === 3 ? 0 : trend
				}
			})
		})

		this.tab_con.selectedIndex =0;
		this.list_rank_all.array = result;

		if(data.data.length === 0 ){
			// 已经登陆
			if(UTILS.checkLoginStatus()){
				this.isLoadingOrContent(0);

			}else{
				this.isLoadingOrContent(0);      //日周月不用判断是否是登陆状态
			}
		}else{
			this.isLoadingOrContent(2);
		}

	}

	// 出现
	myShow(messageCenter, index) {

		this.config.index = index;
		if(this.config.isFirst){
			// 触发
			this.dispatchAction(messageCenter);
			this.config.isFirst = false;
		}else{
				if(index === 3){
					this.tab_nav.selectedIndex = 3;
					messageCenter.emit('myPrizeLog');
				}
				if(index === 0){
					this.tab_nav.selectedIndex = 0;
					messageCenter.emitAjax('day');
				}
		}

		// 弹层显示

		this.popup();
	}


}
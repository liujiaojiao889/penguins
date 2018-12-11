var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var loadUI=(function(_super){
		function loadUI(){
			
		    this.middle_box=null;
		    this.loading_box=null;
		    this.load_img=null;
		    this.load_txt=null;

			loadUI.__super.call(this);
		}

		CLASS$(loadUI,'ui.loading.loadUI',_super);
		var __proto__=loadUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(loadUI.uiView);
		}
		loadUI.uiView={"type":"View","props":{"y":0,"width":1334,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1334,"skin":"images/load/bg.jpg","height":1334}},{"type":"Box","props":{"width":1334,"var":"middle_box","height":750,"centerY":0},"child":[{"type":"Box","props":{"y":470,"x":277,"var":"loading_box"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/load/barbg.png"}},{"type":"Image","props":{"y":21,"x":50,"width":60,"var":"load_img","skin":"images/load/loadbar.png","height":44,"sizeGrid":"9,22,15,21"}},{"type":"Label","props":{"y":-44,"x":488,"width":79,"var":"load_txt","text":"21%","height":28,"fontSize":34,"font":"load_font","align":"left"}},{"type":"Image","props":{"y":-47,"x":263,"skin":"images/load/load.png"}},{"type":"Image","props":{"y":-35,"x":376,"skin":"images/load/dian.png"}}]},{"type":"Image","props":{"y":604,"x":365,"skin":"images/load/notice.png"}},{"type":"SkeletonPlayer","props":{"y":372,"x":664,"url":"images/animate/loading.sk","scaleY":2,"scaleX":2}}]}]};
		return loadUI;
	})(View);
var gainNoticeUI=(function(_super){
		function gainNoticeUI(){
			
		    this.domName=null;
		    this.domGame=null;
		    this.domAmount=null;

			gainNoticeUI.__super.call(this);
		}

		CLASS$(gainNoticeUI,'ui.minpop.gainNoticeUI',_super);
		var __proto__=gainNoticeUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(gainNoticeUI.uiView);
		}
		gainNoticeUI.uiView={"type":"View","props":{"width":350,"height":188},"child":[{"type":"Image","props":{"y":0,"x":-3,"skin":"images/room/zanhuo.png"}},{"type":"Label","props":{"y":36,"x":23,"width":295,"var":"domName","text":"车车在兜风","height":33,"fontSize":22,"font":"Microsoft YaHei","color":"#a0f7ff","align":"center"}},{"type":"Label","props":{"y":69,"x":92,"width":134,"var":"domGame","valign":"middle","text":"覆盖广泛覆盖翻过","overflow":"hidden","height":38,"fontSize":28,"font":"Microsoft YaHei","color":"#ffe632","align":"center"}},{"type":"Label","props":{"y":122,"x":18,"width":303,"var":"domAmount","text":"800","height":38,"fontSize":26,"font":"guide_font","color":"#ffdc89","align":"center"}}]};
		return gainNoticeUI;
	})(View);
var hinderUI=(function(_super){
		function hinderUI(){
			

			hinderUI.__super.call(this);
		}

		CLASS$(hinderUI,'ui.minpop.hinderUI',_super);
		var __proto__=hinderUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(hinderUI.uiView);
		}
		hinderUI.uiView={"type":"Dialog","props":{"width":831,"height":77},"child":[{"type":"Image","props":{"y":-1,"x":18,"skin":"images/pop/tips/bg_bet.png"}},{"type":"Label","props":{"y":17,"x":216,"width":398,"text":"当前位置不能挖宝哦~","height":56,"fontSize":30,"font":"Microsoft YaHei","color":"#c0cf16","bold":true,"align":"center"}}]};
		return hinderUI;
	})(Dialog);
var menuUI=(function(_super){
		function menuUI(){
			
		    this.btn_voice=null;
		    this.voice=null;
		    this.btn_help=null;

			menuUI.__super.call(this);
		}

		CLASS$(menuUI,'ui.minpop.menuUI',_super);
		var __proto__=menuUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(menuUI.uiView);
		}
		menuUI.uiView={"type":"View","props":{"width":131,"mouseThrough":true,"mouseEnabled":true,"height":273},"child":[{"type":"Image","props":{"y":4,"x":0,"width":133,"skin":"images/room/set_bg.png","name":"bg","height":185,"sizeGrid":"32,22,27,25"}},{"type":"Box","props":{"y":36,"x":9,"width":115,"var":"btn_voice","height":62},"child":[{"type":"Clip","props":{"y":0,"x":23,"var":"voice","skin":"images/room/clip_voice.png","index":0,"clipY":2}}]},{"type":"Box","props":{"y":111,"x":9,"width":115,"var":"btn_help","height":62},"child":[{"type":"Button","props":{"y":0,"x":26,"stateNum":1,"skin":"images/room/help.png"}}]},{"type":"Box","props":{"y":191.00000000000006,"x":9,"width":115,"visible":false,"name":"btn_notice","height":62},"child":[{"type":"Image","props":{"y":-1,"x":91,"skin":"images/room/red.png","name":"red"}},{"type":"Button","props":{"y":0,"x":26,"visible":false,"stateNum":1,"skin":"images/room/notice.png","name":"notice"}}]}]};
		return menuUI;
	})(View);
var commonPopTipsUI=(function(_super){
		function commonPopTipsUI(){
			
		    this.pop_bg=null;
		    this.txt_content=null;

			commonPopTipsUI.__super.call(this);
		}

		CLASS$(commonPopTipsUI,'ui.popup.commonPopTipsUI',_super);
		var __proto__=commonPopTipsUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(commonPopTipsUI.uiView);
		}
		commonPopTipsUI.uiView={"type":"Dialog","props":{"y":0,"x":0,"width":591,"height":364},"child":[{"type":"Image","props":{"y":7,"x":0,"width":582,"var":"pop_bg","skin":"images/pop/tips/bg_tips.png","height":357,"sizeGrid":"69,76,74,99"}},{"type":"Label","props":{"y":78,"x":64,"wordWrap":true,"width":457,"var":"txt_content","valign":"middle","text":"网络异常网络异常网络异常网络异常网络异常网络异常","leading":10,"height":168,"fontSize":28,"font":"Microsoft YaHei","color":"#e69400","align":"center"}},{"type":"Button","props":{"y":0,"x":510,"stateNum":"1","skin":"images/pop/tips/close.png","name":"close_btn"}},{"type":"Button","props":{"y":246,"x":83,"stateNum":"1","skin":"images/pop/tips/confirm.png","name":"btn_sure"}},{"type":"Button","props":{"y":246,"x":340,"stateNum":"1","skin":"images/pop/tips/cancle.png","name":"btn_cancle"}}]};
		return commonPopTipsUI;
	})(Dialog);
var defaultBetPopUI=(function(_super){
		function defaultBetPopUI(){
			
		    this.bg_bet=null;
		    this.dom_text=null;

			defaultBetPopUI.__super.call(this);
		}

		CLASS$(defaultBetPopUI,'ui.popup.defaultBetPopUI',_super);
		var __proto__=defaultBetPopUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(defaultBetPopUI.uiView);
		}
		defaultBetPopUI.uiView={"type":"View","props":{"y":66,"x":375,"width":831,"height":77,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-29,"x":42,"var":"bg_bet","skin":"images/pop/tips/bg_bet.png"}},{"type":"Label","props":{"y":-5,"x":538,"width":140,"var":"dom_text","text":"5","height":37,"fontSize":32,"font":"font_bet","color":"#ecd6d6","align":"left"}},{"type":"Image","props":{"y":-10,"x":238,"skin":"images/pop/tips/bet_title.png"}}]};
		return defaultBetPopUI;
	})(View);
var fudaiPopUI=(function(_super){
		function fudaiPopUI(){
			
		    this.fudai_amount=null;
		    this.dom_loading=null;
		    this.dom_unloaded=null;
		    this.tab_con=null;
		    this.title=null;
		    this.list_fudai_all=null;
		    this.list_config=null;

			fudaiPopUI.__super.call(this);
		}

		CLASS$(fudaiPopUI,'ui.popup.fudaiPopUI',_super);
		var __proto__=fudaiPopUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(fudaiPopUI.uiView);
		}
		fudaiPopUI.uiView={"type":"Dialog","props":{"width":1040,"height":665},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":47,"x":0,"width":1020,"skin":"images/pop/fudai/bg_01.png","height":618,"sizeGrid":"28,35,28,35"}},{"type":"Image","props":{"y":74,"x":27,"skin":"images/pop/fudai/bg_02.png","height":252,"sizeGrid":"18,30,18,30"}},{"type":"Image","props":{"y":93,"x":29,"skin":"images/pop/fudai/fudai.png"}},{"type":"Image","props":{"y":0,"x":177,"skin":"images/pop/fudai/txt_header.png"}},{"type":"Image","props":{"y":143,"x":239,"skin":"images/pop/fudai/txt_title.png"}}]},{"type":"Image","props":{"y":15,"x":959,"skin":"images/pop/tips/close.png","name":"close_btn"}},{"type":"Label","props":{"y":242,"x":89,"width":162,"var":"fudai_amount","text":"8888,888","height":30,"fontSize":24,"font":"jin","color":"#e2ffff","align":"center"}},{"type":"Label","props":{"y":463,"x":486,"width":152,"var":"dom_loading","text":"加载中……","height":34,"fontSize":24,"font":"Microsoft YaHei","color":"#0a4f73","align":"center"}},{"type":"Label","props":{"y":463,"x":486,"width":152,"var":"dom_unloaded","text":"请登录","height":34,"fontSize":24,"font":"Microsoft YaHei","color":"#0a4f73","align":"center"}},{"type":"Box","props":{"y":351,"x":29,"width":971,"var":"tab_con","height":278},"child":[{"type":"Box","props":{"y":0,"x":97,"var":"title"},"child":[{"type":"Image","props":{"skin":"images/pop/fudai/txt_name.png"}},{"type":"Image","props":{"x":347,"skin":"images/pop/fudai/txt_win.png"}},{"type":"Image","props":{"x":660,"skin":"images/pop/fudai/txt_time.png"}}]},{"type":"List","props":{"y":47,"x":24,"width":939,"var":"list_fudai_all","height":229},"child":[{"type":"VScrollBar","props":{"name":"scrollBar"}},{"type":"Box","props":{"y":0,"x":0,"width":896,"renderType":"render","height":40},"child":[{"type":"Label","props":{"y":0,"x":-8,"width":279,"text":"猫头鹰猫头鹰猫头鹰猫头鹰猫头鹰猫头鹰猫头鹰","overflow":"hidden","name":"name","height":33,"fontSize":24,"font":"Microsoft YaHei","color":"#0a4f73","align":"center"}},{"type":"Label","props":{"y":0,"x":376,"width":214,"text":"猫头鹰","name":"amount","height":33,"fontSize":24,"font":"Microsoft YaHei","color":"#0a4f73","align":"center"}},{"type":"Label","props":{"y":0,"x":633,"width":267,"text":"2018-01-19 15:56","name":"time","height":33,"fontSize":24,"font":"Microsoft YaHei","color":"#0a4f73","align":"center"}}]}]}]},{"type":"List","props":{"y":178,"x":328,"width":655,"var":"list_config","height":133},"child":[{"type":"VScrollBar","props":{"name":"scrollBar"}},{"type":"Box","props":{"y":0,"x":0,"width":643,"renderType":"render","height":40},"child":[{"type":"Label","props":{"y":0,"x":0,"width":638,"text":"猫头鹰猫头鹰猫头鹰猫头鹰猫头鹰猫头鹰猫头鹰","overflow":"hidden","name":"descript","height":33,"fontSize":22,"font":"Microsoft YaHei","color":"#f3fdff","align":"left"}}]}]}]};
		return fudaiPopUI;
	})(Dialog);
var helpPopUI=(function(_super){
		function helpPopUI(){
			
		    this.help_glr=null;
		    this.config=null;

			helpPopUI.__super.call(this);
		}

		CLASS$(helpPopUI,'ui.popup.helpPopUI',_super);
		var __proto__=helpPopUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(helpPopUI.uiView);
		}
		helpPopUI.uiView={"type":"Dialog","props":{"width":926,"height":650},"child":[{"type":"Image","props":{"y":43,"x":0,"width":880,"skin":"images/pop/help/bg.png","height":607,"sizeGrid":"42,47,116,43"}},{"type":"Button","props":{"y":6,"x":833,"stateNum":"1","skin":"images/pop/tips/close.png","name":"close_btn1"}},{"type":"Box","props":{"y":568,"x":333,"name":"close_btn2"},"child":[{"type":"Button","props":{"stateNum":"1","skin":"images/pop/help/txt_btn.png"}}]},{"type":"Box","props":{"y":80,"x":33,"width":810,"var":"help_glr","height":458},"child":[{"type":"Tab","props":{"y":443,"x":370,"width":67,"selectedIndex":0,"name":"pagination","height":27},"child":[{"type":"Button","props":{"y":8,"x":2,"width":20,"stateNum":"2","skin":"images/pop/help/btn_help.png","pivotY":8.499124621995861,"pivotX":2.976285214069719,"name":"item0","height":20}},{"type":"Button","props":{"y":8,"x":49,"width":20,"stateNum":"2","skin":"images/pop/help/btn_help.png","pivotY":8.499124621995861,"pivotX":2.976285214069719,"name":"item1","height":20}}]},{"type":"Box","props":{"y":0,"x":0,"width":810,"name":"con","height":450},"child":[{"type":"ViewStack","props":{"y":0,"x":0,"width":810,"selectedIndex":1,"name":"list","height":450},"child":[{"type":"Box","props":{"y":0,"x":0,"width":810,"name":"item0","height":438},"child":[{"type":"Image","props":{"y":7,"x":22,"skin":"images/pop/help/banner_01.png"}}]},{"type":"Box","props":{"y":0,"x":0,"width":810,"name":"item1","height":438},"child":[{"type":"Image","props":{"y":7,"x":22,"skin":"images/pop/help/banner_02.png"}},{"type":"Label","props":{"y":140,"x":88,"width":73,"text":"2被","name":"multiply","height":28,"fontSize":20,"font":"Microsoft YaHei","color":"#ffe400","align":"center"}},{"type":"Label","props":{"y":140,"x":181,"width":73,"text":"2被","name":"multiply","height":28,"fontSize":20,"font":"Microsoft YaHei","color":"#ffe400","align":"center"}},{"type":"Label","props":{"y":140,"x":271,"width":73,"text":"2被","name":"multiply","height":28,"fontSize":20,"font":"Microsoft YaHei","color":"#ffe400","align":"center"}},{"type":"Label","props":{"y":140,"x":361,"width":73,"text":"2被","name":"multiply","height":28,"fontSize":20,"font":"Microsoft YaHei","color":"#ffe400","align":"center"}},{"type":"Label","props":{"y":140,"x":455,"width":73,"text":"2被","name":"multiply","height":28,"fontSize":20,"font":"Microsoft YaHei","color":"#ffe400","align":"center"}},{"type":"Label","props":{"y":140,"x":546,"width":73,"text":"2被","name":"multiply","height":28,"fontSize":20,"font":"Microsoft YaHei","color":"#ffe400","align":"center"}},{"type":"Label","props":{"y":140,"x":633,"width":73,"text":"2被","name":"multiply","height":28,"fontSize":20,"font":"Microsoft YaHei","color":"#ffe400","align":"center"}},{"type":"Label","props":{"y":140,"x":725,"width":73,"text":"2被","name":"multiply","height":28,"fontSize":20,"font":"Microsoft YaHei","color":"#ffe400","align":"center"}},{"type":"List","props":{"y":307,"x":222,"width":587,"var":"config","height":130},"child":[{"type":"VScrollBar","props":{"y":0,"x":0,"name":"scrollBar"}},{"type":"Box","props":{"y":0,"x":0,"width":582,"renderType":"render","height":40},"child":[{"type":"Label","props":{"width":522,"text":"发反反复复","name":"descript","height":25,"fontSize":22,"font":"Microsoft YaHei","color":"#f3fdff","align":"left"}}]}]}]}]}]}]}]};
		return helpPopUI;
	})(Dialog);
var instructPopUI=(function(_super){
		function instructPopUI(){
			
		    this.btn_close=null;
		    this.multiply_box=null;

			instructPopUI.__super.call(this);
		}

		CLASS$(instructPopUI,'ui.popup.instructPopUI',_super);
		var __proto__=instructPopUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(instructPopUI.uiView);
		}
		instructPopUI.uiView={"type":"Dialog","props":{"width":901,"height":393},"child":[{"type":"Image","props":{"y":22,"x":0,"skin":"images/pop/precious/bg_precious.png"}},{"type":"Image","props":{"y":0,"x":820,"var":"btn_close","skin":"images/pop/tips/close.png"}},{"type":"Box","props":{"y":252,"x":36,"var":"multiply_box"},"child":[{"type":"Label","props":{"width":105,"text":"label","name":"item","height":38,"fontSize":28,"font":"Microsoft YaHei","color":"#f9dd75","align":"center"}},{"type":"Label","props":{"x":107,"width":105,"text":"label","name":"item","height":38,"fontSize":28,"font":"Microsoft YaHei","color":"#f9dd75","align":"center"}},{"type":"Label","props":{"x":210,"width":105,"text":"label","name":"item","height":38,"fontSize":28,"font":"Microsoft YaHei","color":"#f9dd75","align":"center"}},{"type":"Label","props":{"x":315,"width":105,"text":"label","name":"item","height":38,"fontSize":28,"font":"Microsoft YaHei","color":"#f9dd75","align":"center"}},{"type":"Label","props":{"x":411,"width":105,"text":"label","name":"item","height":38,"fontSize":28,"font":"Microsoft YaHei","color":"#f9dd75","align":"center"}},{"type":"Label","props":{"x":511,"width":105,"text":"label","name":"item","height":38,"fontSize":28,"font":"Microsoft YaHei","color":"#f9dd75","align":"center"}},{"type":"Label","props":{"x":612,"width":105,"text":"label","name":"item","height":38,"fontSize":28,"font":"Microsoft YaHei","color":"#f9dd75","align":"center"}},{"type":"Label","props":{"x":711,"width":105,"text":"label","name":"item","height":38,"fontSize":28,"font":"Microsoft YaHei","color":"#f9dd75","align":"center"}}]}]};
		return instructPopUI;
	})(Dialog);
var queenUI=(function(_super){
		function queenUI(){
			
		    this.queenAmount=null;
		    this.btn_close=null;

			queenUI.__super.call(this);
		}

		CLASS$(queenUI,'ui.popup.queenUI',_super);
		var __proto__=queenUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(queenUI.uiView);
		}
		queenUI.uiView={"type":"Dialog","props":{"y":-3,"x":-15,"width":1100,"height":580},"child":[{"type":"Label","props":{"y":442,"x":668,"var":"queenAmount","text":"0","scaleY":1,"scaleX":1,"fontSize":50,"font":"queenwin_font","color":"#c9d71e","bold":true,"anchorY":1,"anchorX":0,"align":"left"}},{"type":"Image","props":{"y":118,"x":908,"var":"btn_close","skin":"images/pop/tips/close.png"}}]};
		return queenUI;
	})(Dialog);
var rankPopUI=(function(_super){
		function rankPopUI(){
			
		    this.tab_nav=null;
		    this.tab_con=null;
		    this.list_rank_all=null;
		    this.myRankBox=null;
		    this.my_rank=null;
		    this.my_name=null;
		    this.my_amount=null;
		    this.my_trend=null;
		    this.list_rank_gains=null;
		    this.dom_loading=null;
		    this.dom_unloaded=null;

			rankPopUI.__super.call(this);
		}

		CLASS$(rankPopUI,'ui.popup.rankPopUI',_super);
		var __proto__=rankPopUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ui.popup.richitemUI",ui.popup.richitemUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(rankPopUI.uiView);
		}
		rankPopUI.uiView={"type":"Dialog","props":{"width":1274,"height":750},"child":[{"type":"Image","props":{"y":10,"x":0,"skin":"images/pop/rank/bg_rank.png"}},{"type":"Button","props":{"y":40,"x":1193,"stateNum":"1","skin":"images/pop/tips/close.png","name":"close_btn"}},{"type":"Image","props":{"y":123,"x":209,"skin":"images/pop/rank/rich.png"}},{"type":"Box","props":{"y":335,"x":178,"width":240,"name":"richList","height":340},"child":[{"type":"Image","props":{"y":0,"x":0,"width":240,"skin":"images/pop/rank/bg_rich3.png","height":340,"sizeGrid":"15,22,19,22"}},{"type":"richitem","props":{"y":11,"x":13,"name":"item","runtime":"ui.popup.richitemUI"}},{"type":"richitem","props":{"y":119,"x":13,"name":"item","runtime":"ui.popup.richitemUI"}},{"type":"richitem","props":{"y":226,"x":13,"name":"item","runtime":"ui.popup.richitemUI"}}]},{"type":"Tab","props":{"y":145,"x":1150,"width":86,"var":"tab_nav","selectedIndex":0,"height":542},"child":[{"type":"Button","props":{"y":0,"x":-6,"stateNum":"2","skin":"images/pop/rank/btn_day.png","name":"item0"}},{"type":"Button","props":{"y":132,"x":-6,"stateNum":"2","skin":"images/pop/rank/btn_week.png","name":"item1"}},{"type":"Button","props":{"y":270,"x":-6,"stateNum":"2","skin":"images/pop/rank/btn_month.png","name":"item2"}},{"type":"Button","props":{"y":400,"x":-6,"stateNum":"2","skin":"images/pop/rank/btn_gains.png","name":"item3"}}]},{"type":"Image","props":{"y":140,"x":429,"skin":"images/pop/rank/bg_con1.png"}},{"type":"ViewStack","props":{"y":166,"x":429,"width":728,"var":"tab_con","selectedIndex":1,"height":442},"child":[{"type":"Box","props":{"y":-23,"x":6,"width":722,"name":"item0","height":529},"child":[{"type":"Box","props":{"y":12,"x":22,"width":685,"height":52},"child":[{"type":"Clip","props":{"y":9,"x":-8,"skin":"images/pop/rank/clip_title.png","name":"item0","index":0,"clipY":4}},{"type":"Clip","props":{"y":9,"x":155,"skin":"images/pop/rank/clip_title.png","name":"item1","index":1,"clipY":4}},{"type":"Clip","props":{"y":9,"x":347,"skin":"images/pop/rank/clip_title.png","name":"item2","index":2,"clipY":4}},{"type":"Clip","props":{"y":9,"x":525,"skin":"images/pop/rank/clip_title.png","name":"item3","index":3,"clipY":4}}]},{"type":"List","props":{"y":80,"x":9,"width":687,"var":"list_rank_all","spaceY":2,"height":386},"child":[{"type":"Box","props":{"y":-1,"x":0,"renderType":"render","height":52},"child":[{"type":"Label","props":{"y":11,"x":41,"width":31,"text":"1","name":"rankNum","height":39,"fontSize":22,"color":"#8cd8ec","align":"center"}},{"type":"Label","props":{"y":11,"x":136,"wordWrap":true,"width":197,"text":"汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子汉子","overflow":"hidden","name":"name","height":39,"fontSize":22,"font":"Microsoft YaHei","color":"#8cd8ec","align":"center"}},{"type":"Label","props":{"y":11,"x":352,"width":155,"text":"3443","name":"point","height":39,"fontSize":22,"font":"Microsoft YaHei","color":"#dff8ff","align":"center"}},{"type":"Clip","props":{"y":12,"x":594,"skin":"images/pop/rank/clip_trend.png","name":"trend","index":0,"clipY":3}}]},{"type":"VScrollBar","props":{"y":-9,"x":10,"name":"scrollBar"}}]},{"type":"Box","props":{"y":461,"x":2,"visible":false,"var":"myRankBox"},"child":[{"type":"Image","props":{"y":11,"x":1,"width":710,"skin":"images/pop/rank/rank.png","height":64,"sizeGrid":"8,9,12,8"}},{"type":"Label","props":{"y":25,"x":20,"width":107,"var":"my_rank","text":">30","height":44,"fontSize":28,"font":"Microsoft YaHei","color":"#2b7184","bold":true,"align":"center"}},{"type":"Label","props":{"y":22,"x":162,"width":189,"var":"my_name","text":">30","height":44,"fontSize":28,"font":"Microsoft YaHei","color":"#2b7184","bold":true,"align":"left"}},{"type":"Label","props":{"y":25,"x":363,"width":157,"var":"my_amount","text":"5500","height":44,"fontSize":28,"font":"Microsoft YaHei","color":"#2b7184","bold":true,"align":"center"}},{"type":"Clip","props":{"y":33,"x":602,"var":"my_trend","skin":"images/pop/rank/clip_trend.png","index":1,"clipY":3}}]}]},{"type":"Box","props":{"y":-26,"x":18,"width":704,"name":"item1","height":528},"child":[{"type":"Box","props":{"y":7,"x":26,"width":635,"height":56},"child":[{"type":"Image","props":{"y":19,"x":147,"skin":"images/pop/rank/time.png"}},{"type":"Image","props":{"y":19,"x":389,"skin":"images/pop/rank/win.png"}}]},{"type":"List","props":{"y":80,"x":5,"width":657,"var":"list_rank_gains","spaceY":2,"height":437},"child":[{"type":"Box","props":{"y":3,"x":10,"width":657,"renderType":"render","height":52},"child":[{"type":"Label","props":{"y":2,"x":40,"width":300,"valign":"middle","text":"2018-01-16 11:10","name":"time","height":52,"fontSize":22,"font":"Microsoft YaHei","color":"#dff8ff","align":"center"}},{"type":"Label","props":{"y":2,"x":380,"width":153,"valign":"middle","text":"444444","name":"amount","height":52,"fontSize":22,"font":"Microsoft YaHei","color":"#dff8ff","align":"center"}},{"type":"Image","props":{"y":13,"x":528,"skin":"images/pop/rank/icon.png","name":"queen"}}]},{"type":"VScrollBar","props":{"y":3,"x":10,"name":"scrollBar"}}]}]}]},{"type":"Label","props":{"y":435,"x":635,"width":329,"var":"dom_loading","text":"加载中……","height":24,"fontSize":22,"font":"Microsoft YaHei","color":"#fff","align":"center"}},{"type":"Label","props":{"y":435,"x":615,"width":399,"var":"dom_unloaded","text":"您尚未登录，点击请登录……","height":30,"fontSize":22,"font":"Microsoft YaHei","color":"#d9e200","align":"center"}}]};
		return rankPopUI;
	})(Dialog);
var rechargePopUI=(function(_super){
		function rechargePopUI(){
			
		    this.tab_nav=null;
		    this.btn_input=null;
		    this.btn_buy=null;
		    this.dom_exchange=null;

			rechargePopUI.__super.call(this);
		}

		CLASS$(rechargePopUI,'ui.popup.rechargePopUI',_super);
		var __proto__=rechargePopUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(rechargePopUI.uiView);
		}
		rechargePopUI.uiView={"type":"Dialog","props":{"width":936,"height":656},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/pop/recharge/bg.png"}},{"type":"Button","props":{"y":95,"x":799,"stateNum":"1","skin":"images/pop/tips/close.png","name":"close_btn"}},{"type":"Tab","props":{"y":161,"x":-15,"var":"tab_nav","selectedIndex":2},"child":[{"type":"Button","props":{"y":42,"x":132,"width":170,"stateNum":"2","skin":"images/pop/recharge/btn_tab.png","name":"item0","height":186}},{"type":"Button","props":{"y":42,"x":308,"stateNum":"2","skin":"images/pop/recharge/btn_tab.png","name":"item1"}},{"type":"Button","props":{"y":42,"x":490,"stateNum":"2","skin":"images/pop/recharge/btn_tab.png","name":"item2"}},{"type":"Button","props":{"y":42,"x":663,"stateNum":"2","skin":"images/pop/recharge/btn_tab.png","name":"item3"}}]},{"type":"Box","props":{"y":171,"x":12},"child":[{"type":"Box","props":{"y":43,"x":113,"width":152,"name":"item0","height":165},"child":[{"type":"Image","props":{"y":121,"x":42,"skin":"images/pop/recharge/10.png"}},{"type":"Image","props":{"y":39,"x":23,"skin":"images/pop/recharge/zuan1.png"}}]},{"type":"Box","props":{"y":43,"x":289,"width":152,"name":"item1","height":165},"child":[{"type":"Image","props":{"y":121,"x":42,"skin":"images/pop/recharge/50.png"}},{"type":"Image","props":{"y":27,"x":29,"skin":"images/pop/recharge/zuan2.png"}}]},{"type":"Box","props":{"y":43,"x":472,"width":152,"pivotY":1.923076923076934,"pivotX":1.9230769230769056,"name":"item2","height":165},"child":[{"type":"Image","props":{"y":121,"x":34,"skin":"images/pop/recharge/100.png"}},{"type":"Image","props":{"y":26,"x":40,"skin":"images/pop/recharge/zuan3.png"}}]},{"type":"Box","props":{"y":43,"x":644,"width":152,"name":"item3","height":165},"child":[{"type":"Image","props":{"y":121,"x":34,"skin":"images/pop/recharge/500.png"}},{"type":"Image","props":{"y":30,"x":31,"skin":"images/pop/recharge/zuan4.png"}}]}]},{"type":"Box","props":{"y":447,"x":151,"var":"btn_input"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":634,"skin":"images/pop/recharge/bg_input.png","height":59,"sizeGrid":"23,31,24,30"}},{"type":"Label","props":{"y":13,"x":39,"width":516,"text":"1","name":"input_txt","height":35,"fontSize":24,"font":"Microsoft YaHei","color":"#0942b4"}}]},{"type":"Box","props":{"y":510,"x":348,"var":"btn_buy"},"child":[{"type":"Button","props":{"stateNum":"1","skin":"images/pop/recharge/btn_recharge.png"}}]},{"type":"Box","props":{"y":84,"x":325,"width":285,"height":108,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":-4,"x":30,"skin":"images/pop/recharge/title.png"}},{"type":"Label","props":{"y":68,"x":-47,"width":379,"var":"dom_exchange","height":35,"fontSize":26,"font":"Microsoft YaHei","color":"#0942b4","align":"center"}}]},{"type":"Label","props":{"y":404,"x":168,"width":616,"text":"充值钻石成功后将为您自动兑换为欢乐豆","height":42,"fontSize":26,"font":"Microsoft YaHei","color":"#0942b4","bold":false,"align":"center"}}]};
		return rechargePopUI;
	})(Dialog);
var richitemUI=(function(_super){
		function richitemUI(){
			

			richitemUI.__super.call(this);
		}

		CLASS$(richitemUI,'ui.popup.richitemUI',_super);
		var __proto__=richitemUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(richitemUI.uiView);
		}
		richitemUI.uiView={"type":"View","props":{"width":214,"height":102},"child":[{"type":"Image","props":{"y":2,"x":4,"width":210,"skin":"images/pop/rank/bg_rich2.png","height":98,"sizeGrid":"10,15,12,16"}},{"type":"Image","props":{"y":11,"x":79,"skin":"images/pop/rank/bg_rich1.png"}},{"type":"Clip","props":{"y":19,"x":13,"skin":"images/pop/rank/clip_rank.png","name":"rank","clipY":3}},{"type":"Label","props":{"y":16,"x":84,"width":120,"text":"套马的汉子","name":"name","height":31,"fontSize":20,"font":"Microsoft YaHei","color":"#1a739e","align":"center"}},{"type":"Label","props":{"y":61,"x":91,"width":110,"text":"23,123,456","name":"point","height":21,"fontSize":17,"font":"Microsoft YaHei","color":"#e88518","align":"center"}}]};
		return richitemUI;
	})(View);
var bottomUI=(function(_super){
		function bottomUI(){
			
		    this.input_box=null;
		    this.btn_add=null;
		    this.btn_sub=null;
		    this.bg_input=null;
		    this.btn_input=null;
		    this.input_txt=null;
		    this.btn_max=null;
		    this.btn_auto=null;
		    this.auto_btn=null;
		    this.auto=null;
		    this.dom_auto=null;
		    this.autoplay_box=null;
		    this.btn_recharge=null;
		    this.hammer=null;

			bottomUI.__super.call(this);
		}

		CLASS$(bottomUI,'ui.room.bottomUI',_super);
		var __proto__=bottomUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(bottomUI.uiView);
		}
		bottomUI.uiView={"type":"View","props":{"width":1334,"mouseThrough":true,"mouseEnabled":true,"height":170},"child":[{"type":"Image","props":{"y":112,"x":239,"skin":"images/room/bottom.png"}},{"type":"Box","props":{"y":17,"x":263,"width":808,"var":"input_box","height":156},"child":[{"type":"Image","props":{"y":17,"x":527,"var":"btn_add","skin":"images/room/add.png"}},{"type":"Image","props":{"y":17,"x":16,"var":"btn_sub","skin":"images/room/sub.png"}},{"type":"Image","props":{"y":17,"x":126,"var":"bg_input","skin":"images/room/inputbg.png"}},{"type":"Box","props":{"y":50,"x":254,"width":270,"var":"btn_input","height":91},"child":[{"type":"Label","props":{"y":12,"x":17,"width":224,"var":"input_txt","valign":"middle","text":"5000000","height":58,"fontSize":38,"font":"Arial","color":"#f1f1f4","align":"center"}}]},{"type":"Image","props":{"y":48,"x":659,"var":"btn_max","skin":"images/room/max.png"}}]},{"type":"Button","props":{"y":27,"x":1061,"width":270,"var":"btn_auto","height":142},"child":[{"type":"SkeletonPlayer","props":{"y":70,"x":125,"var":"auto_btn","url":"images/animate/button.sk"}},{"type":"Box","props":{"y":87,"x":95,"visible":false,"var":"auto"},"child":[{"type":"Image","props":{"skin":"images/room/sheng.png"}},{"type":"Label","props":{"y":3,"x":42,"width":47,"var":"dom_auto","text":"10","height":27,"fontSize":20,"font":"auto_font","color":"#993406","align":"center"}}]}]},{"type":"Box","props":{"y":40,"x":1081,"var":"autoplay_box"}},{"type":"Button","props":{"y":-4,"x":20,"var":"btn_recharge","stateNum":"1","skin":"images/room/btn_chong.png"}},{"type":"Clip","props":{"y":54,"x":427,"var":"hammer","skin":"images/room/clip_stage.png","index":0,"clipY":4}}]};
		return bottomUI;
	})(View);
var headerUI=(function(_super){
		function headerUI(){
			
		    this.btn_back=null;
		    this.btn_rank=null;
		    this.yu_box=null;
		    this.dou_box=null;
		    this.btn_chong=null;
		    this.btn_more=null;
		    this.btn_home=null;
		    this.menu_box=null;

			headerUI.__super.call(this);
		}

		CLASS$(headerUI,'ui.room.headerUI',_super);
		var __proto__=headerUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(headerUI.uiView);
		}
		headerUI.uiView={"type":"View","props":{"y":0,"x":0,"width":1334,"mouseThrough":true,"mouseEnabled":true,"height":112},"child":[{"type":"Image","props":{"y":12,"x":36,"visible":false,"var":"btn_back","skin":"images/room/back.png"}},{"type":"Image","props":{"y":12,"x":160,"var":"btn_rank","skin":"images/room/rank.png"}},{"type":"Box","props":{"y":34,"x":297,"var":"yu_box"},"child":[{"type":"Image","props":{"y":5,"x":-1,"width":200,"skin":"images/room/txt_bg.png","height":43,"sizeGrid":"9,22,14,26"}},{"type":"Image","props":{"y":-1,"x":-19,"skin":"images/room/zuan.png"}},{"type":"Label","props":{"y":13,"x":32,"width":147,"text":"0","name":"yu_num","height":27,"fontSize":24,"font":"Arial","color":"#fff","align":"center"}}]},{"type":"Box","props":{"y":35,"x":831,"var":"dou_box"},"child":[{"type":"Image","props":{"y":5,"x":-12,"width":200,"skin":"images/room/txt_bg.png","height":43,"sizeGrid":"9,22,14,26"}},{"type":"Image","props":{"y":4,"x":-28,"skin":"images/room/dou.png"}},{"type":"Label","props":{"y":13,"x":15,"width":156,"text":"0","name":"dou_num","height":27,"fontSize":24,"font":"Arial","color":"#fff","align":"center"}},{"type":"Image","props":{"y":-3,"x":157,"var":"btn_chong","skin":"images/room/chong.png"}}]},{"type":"Image","props":{"y":12,"var":"btn_more","skin":"images/room/more.png","right":32}},{"type":"Image","props":{"y":12,"visible":false,"var":"btn_home","skin":"images/room/home.png","right":152}},{"type":"Box","props":{"y":106,"var":"menu_box","right":145,"mouseThrough":true,"mouseEnabled":true}}]};
		return headerUI;
	})(View);
var penguinUI=(function(_super){
		function penguinUI(){
			
		    this.digArea=null;
		    this.area=null;
		    this.hinder_three=null;
		    this.receivePenguin=null;
		    this.dom_receive=null;
		    this.digPenguin=null;
		    this.talk_box=null;
		    this.talking=null;
		    this.totalAmount=null;
		    this.hinder_one=null;
		    this.hinder_two=null;

			penguinUI.__super.call(this);
		}

		CLASS$(penguinUI,'ui.room.penguinUI',_super);
		var __proto__=penguinUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(penguinUI.uiView);
		}
		penguinUI.uiView={"type":"View","props":{"y":0,"width":1334,"height":750},"child":[{"type":"Box","props":{"y":0,"x":67,"width":1200,"var":"digArea"},"child":[{"type":"Label","props":{"y":0,"x":0,"width":1200,"var":"area"}}]},{"type":"Label","props":{"y":0,"x":1054,"width":280,"var":"hinder_three","height":235}},{"type":"Box","props":{"y":40,"x":1099,"width":162,"var":"receivePenguin","height":163},"child":[{"type":"SkeletonPlayer","props":{"y":110,"x":56,"var":"dom_receive","url":"images/animate/receive.sk"}}]},{"type":"Box","props":{"y":246,"x":451,"width":100,"var":"digPenguin","height":109,"anchorY":1,"anchorX":0.5},"child":[{"type":"Label","props":{"y":39,"x":67}}]},{"type":"Box","props":{"y":68,"x":1066,"width":87,"visible":false,"var":"talk_box","height":48},"child":[{"type":"SkeletonPlayer","props":{"y":-26,"x":-7,"var":"talking","url":"images/animate/talk.sk"}}]},{"type":"Label","props":{"y":270,"x":1135,"width":180,"visible":false,"var":"totalAmount","text":"+1221","scaleY":0,"scaleX":0,"font":"new_font","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":0,"x":0,"width":180,"var":"hinder_one","height":70}},{"type":"Label","props":{"y":150,"x":0,"width":130,"var":"hinder_two","height":230}}]};
		return penguinUI;
	})(View);
var roomUI=(function(_super){
		function roomUI(){
			
		    this.btn_fudai=null;
		    this.fudai_amount=null;
		    this.btn_instruct=null;
		    this.top_box=null;
		    this.game_box=null;
		    this.bottom_box=null;
		    this.menu_box=null;

			roomUI.__super.call(this);
		}

		CLASS$(roomUI,'ui.room.roomUI',_super);
		var __proto__=roomUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(roomUI.uiView);
		}
		roomUI.uiView={"type":"View","props":{"y":0,"width":1334,"height":750},"child":[{"type":"Image","props":{"x":0,"width":1334,"skin":"images/room/bg.jpg","height":1334,"centerY":0}},{"type":"Box","props":{"y":23,"x":441,"var":"btn_fudai"},"child":[{"type":"SkeletonPlayer","props":{"y":105,"x":205,"url":"images/animate/fudai.sk"}},{"type":"Label","props":{"y":94,"x":80,"width":258,"var":"fudai_amount","valign":"middle","text":"0,","height":50,"font":"fudai_amount","align":"center"}}]},{"type":"Box","props":{"y":120,"x":0,"width":188,"var":"btn_instruct","height":145},"child":[{"type":"Image","props":{"y":0,"x":35,"skin":"images/room/precious.png"}}]},{"type":"Box","props":{"x":0,"width":1334,"var":"top_box","top":0,"height":112}},{"type":"Box","props":{"y":210,"x":0,"width":1334,"var":"game_box","height":370}},{"type":"Box","props":{"y":607,"x":0,"width":1334,"var":"bottom_box","height":170,"bottom":0}},{"type":"Box","props":{"y":102,"width":135,"var":"menu_box","right":22,"mouseThrough":true,"height":280}},{"type":"SkeletonPlayer","props":{"y":354,"x":683,"url":"images/animate/snow.sk"}}]};
		return roomUI;
	})(View);
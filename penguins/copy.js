'use strict';

const fs = require('fs');
const path = require('path');

let fileNameArr = ['main.js', 'layaUI.max.all.js'];

fileNameArr.forEach((item, index)=>{
	let sourcePath, targetPath;
	if(index === 0){
		sourcePath = './laya_game/bin';
		targetPath = '../../gameHall/www/files/game/polarhunter/js';
	}else if(index === 1){
		sourcePath = './laya_game/src/ui';
		targetPath = '../../gameHall/www/files/game/polarhunter/js/ui';
	}


	let sourceFile = path.join(__dirname, sourcePath, item);
	let targetFile = path.join(__dirname, targetPath, item);

	let readStream = fs.createReadStream(sourceFile);
	let writeStream = fs.createWriteStream(targetFile);

	readStream.pipe(writeStream);


	console.log(sourceFile);
	console.log(targetFile);
})


// 同步操作删除文件夹
var deleteFolder = module.exports.deleteFolder= function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};






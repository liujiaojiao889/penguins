const ORTHOGONAL = 7;
const LIMIT = {x:1220, y:500};
const directions = ['l', 'r', 'u', 'd', 'lu', 'ru', 'ld', 'rd'];
const obstacles = [
    {x:{start:0, end:130}, y:{start:0, end:70}},
    {x:{start:0, end:100}, y:{start:150, end:380}},
    {x:{start:1000, end:1220}, y:{start:0, end:235}}
];

/*
 * 企鹅走路
 * @params from 开始坐标
 * @params to 终点坐标
 */
export function PenguinWalk(from, to) {
    let route = [],
        chosable = [],
        counter = Math.ceil((LIMIT.x + LIMIT.y) / ORTHOGONAL); // 理论最远距离

    // 获取x轴可走方向(x坐标差值大于半小格)
    if (Math.abs(from.x-to.x) > ORTHOGONAL/2) {
        chosable.push(from.x < to.x ? 'r' : 'l');
    }

    // 获取y轴可走方向(y坐标差值大于半小格)
    if (Math.abs(from.y-to.y) > ORTHOGONAL/2) {
        chosable.push(from.y < to.y ? 'd' : 'u');
    }

    // 如果有两个方向，则合成斜方向，并放到数组开头
    if (chosable.length == 2) {
        chosable.splice(0, 0, chosable[0]+chosable[1])
    }

    let base = {x:from.x, y:from.y};
    while (counter-- > 0) {
        for (let d of chosable) {
            let firstD = d.charAt(0),
                lastD = d.charAt(d.length-1);

            // 判断x轴和y轴是否越界
            if ((firstD == 'r' && base.x > to.x) || (firstD == 'l' && base.x < to.x) ||
                        (lastD == 'u' && base.y < to.y) || (lastD == 'd' && base.y > to.y)) {
                continue;
            }

            // 根据方向移动x轴和y轴
            let temp = {
                x : firstD == 'r' ? (base.x+ORTHOGONAL) : firstD == 'l' ? (base.x-ORTHOGONAL) : base.x,
                y : lastD == 'u' ? (base.y-ORTHOGONAL) : lastD == 'd' ? (base.y+ORTHOGONAL) : base.y
            };

            // 判断是否可走到此位置
            let walkable = true;
            for (let v of obstacles) {
                if (v.x.start < temp.x && v.x.end > temp.x && v.y.start < temp.y && v.y.end > temp.y) {
                    walkable = false;
                    break;
                }
            }

            if (walkable) {
                route.push({x:temp.x, y:temp.y, d:d});
                base.x = temp.x;
                base.y = temp.y;
                break;
            }
        }

        // 判断是否结束
        if (Math.abs(base.x-to.x) <= ORTHOGONAL && Math.abs(base.y-to.y) <= ORTHOGONAL) {
            return route;
        }
    }

    return [];
}
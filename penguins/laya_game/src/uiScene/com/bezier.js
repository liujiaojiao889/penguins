// var animate_bezier_move = (function () {


export  function animate_bezier_move(sprite, ps, pe, time, callback, time_fn) {
      var getBezierPoint = function (p0, p1, p2, t) {
      var x, y;
      x = Math.ceil(getBezierVal(p0.x, p1.x, p2.x, t));
      y = Math.ceil(getBezierVal(p0.y, p1.y, p2.y, t));
      return {
        x: x,
        y: y
      };
    };
    var getBezierVal = function (a, b, c, t) {
      return (Math.pow(1 - t, 2) * a + 2 * t * (1 - t) * b + Math.pow(t, 2) * c);
    };
    var getMiddlePoint = function (p1, p2) {
      /* 贝塞尔曲线的偏移点 y为两者y最小值, x另一个的x 保持始终呈拱形 */
      var p = {};
      if (p1.y > p2.y) {
        p.y = p2.y;
        p.x = p1.x;
      } else {
        p.y = p1.y;
        p.x = p2.x;
      }
      return p;
    };
    // 开始结束
    var Ease = Laya.Ease;
    var time_fn = time_fn ? Ease[time_fn] : Ease['cubicOut'];
    var pc = getMiddlePoint(ps, pe);

    var x_step = 1;
    var nums_step = time / 16;
    var x_space = pe.x - ps.x;
    var y_space = pe.y - ps.y;

    if (x_space < 0) {
      x_step = -1 * x_step;
    }
    var y_step = y_space / x_space * x_step;

    sprite.x = ps.x;
    sprite.y = ps.y;

    Laya.timer.loop(16, sprite, moveLoop);

    var num = 0;

    function moveLoop() {
      var t = time_fn(num, 0, 1, nums_step);
      num++;
      var p = getBezierPoint(ps, pc, pe, t);
      sprite.x = p.x;
      sprite.y = p.y;
      if (num >= nums_step) {
        Laya.timer.clear(sprite, moveLoop);
        if (callback && typeof (callback) == 'function') {
          callback();
        }
      }
    }
  }
  // return animate_bezier_move;
// }
// })();


//https://www.desmos.com/calculator/lzl99vqirw

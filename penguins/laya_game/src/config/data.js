// ajax地址数据
export const AJAX_URL = {
    day: `/?act=game_polarhunter&st=get_bet_rank&type=day&userId=${userId}`,
    week: `/?act=game_polarhunter&st=get_bet_rank&type=week&userId=${userId}`,
    month: `?act=game_polarhunter&st=get_bet_rank&type=month&userId=${userId}`,
    userAccount: `/?act=game_gamebase&st=queryUserAccount&data=*&gameId=${gameId}&type=1` //用户余额
}

// 错误信息
export const ERROR_TEXT = {
    '1' : '用户未登录',
    '2' : '配置获取失败',
    '3' : '参数有误',
    '4' : '服务器开小差了，投币额以欢乐值的形式已退回到您的账号了哟~',
    '5' : '余额不足，请充值...',
    '6' : '本轮结算延迟，奖励将稍后到账~',
    '7' : '地球信号不好，请稍后重试~',

    '50': '单笔上限',
    '51': '单日上限',
    '81' : '触发OTP验证',
    '82': '支付渠道禁用',
}

// 声音集合
export const AUDIO_SOURCES = ['bg', 'btn', 'bian', 'dig_0', 'dig_1', 'dig_2', 'dig_3', 'queen', 'receive', 'run', 'runbeak', 'win', 'winqueen', 'zha'];

// 自动玩的次数
export const AUTOPLAY_TIMES = ['500', '100', '50', '25', '10'];





/* ==========================================================
   TWS · 韩振的手机 · 数据
   时间线：2026.10.23 深夜（高雄）— TO US 曲目表公开日
   第二天 10.24 高雄巨蛋 24/7:FOR:YOU 巡演
   ========================================================== */

const MEMBERS = {
  dohoon:   { name: '道勋', emoji: '🐺', color: '#e07b39' },
  shinyu:   { name: '申惟', emoji: '🦒', color: '#5b8def' },
  youngjae: { name: '英宰', emoji: '🐶', color: '#e0688f' },
  hanjin:   { name: '韩振', emoji: '🐰', color: '#2fbf71' },
  jihoon:   { name: '志薰', emoji: '🪼', color: '#dcb02a' },
  kyungmin: { name: '炅潣', emoji: '🐹', color: '#9a6ae0' }
};

/* ---------------- 聊天 ---------------- */
const CHATS = [

/* ========== 1. TWS 群 ========== */
{
  id: 'tws', name: 'TWS', group: true, unread: 7, time: '23:41',
  preview: '申惟：明天 6点 大堂集合',
  msgs: [
    { t:'day', v:'10月22日 周四' },
    { t:'them', who:'kyungmin', v:'哥 你们睡了吗' },
    { t:'them', who:'kyungmin', v:'我睡不着' },
    { t:'them', who:'dohoon', v:'睡' },
    { t:'them', who:'dohoon', v:'明天还要唱' },
    { t:'them', who:'kyungmin', v:'可是明天是巨蛋' },
    { t:'them', who:'kyungmin', v:'我们第一次巨蛋' },
    { t:'them', who:'youngjae', v:'我也是第一次' },
    { t:'them', who:'youngjae', v:'手心一直出汗' },
    { t:'them', who:'jihoon', v:'那你去洗个手' },
    { t:'them', who:'youngjae', v:'……' },
    { t:'them', who:'shinyu', v:'孩子们' },
    { t:'them', who:'shinyu', v:'都睡' },
    { t:'them', who:'kyungmin', v:'哥你也没睡' },
    { t:'them', who:'shinyu', v:'我在看曲目表' },
    { t:'them', who:'dohoon', v:'ㅋㅋㅋㅋㅋㅋ' },
    { t:'them', who:'dohoon', v:'队长也睡不着' },
    { t:'them', who:'shinyu', v:'我在确认顺序' },
    { t:'them', who:'shinyu', v:'不是紧张' },
    { t:'me', v:'哥 我们信你' },
    { t:'them', who:'shinyu', v:'……' },
    { t:'them', who:'shinyu', v:'嗯' },
    { t:'them', who:'shinyu', v:'谢谢' },

    { t:'them', who:'dohoon', v:'今天那个 曲目表' },
    { t:'them', who:'dohoon', v:'第三首' },
    { t:'them', who:'dohoon', v:'你们听了吗' },
    { t:'them', who:'youngjae', v:'听了' },
    { t:'them', who:'youngjae', v:'那句「就算慢一点」' },
    { t:'me', v:'我也喜欢那句' },
    { t:'them', who:'jihoon', v:'嗯' },
    { t:'them', who:'kyungmin', v:'我听了三十遍' },
    { t:'them', who:'dohoon', v:'三十遍？' },
    { t:'them', who:'kyungmin', v:'三十一遍了' },
    { t:'them', who:'dohoon', v:'ㅋㅋㅋㅋㅋ' },

    { t:'me', v:'对了' },
    { t:'photo', art:'window', cap:'饭店窗外 23:12' },
    { t:'me', v:'高雄的灯好多' },
    { t:'them', who:'dohoon', v:'你又在拍' },
    { t:'me', v:'因为好看' },
    { t:'them', who:'kyungmin', v:'哥 你拍我一张' },
    { t:'me', v:'你已经在拍了' },
    { t:'them', who:'kyungmin', v:'？' },
    { t:'them', who:'youngjae', v:'ㅋㅋㅋㅋㅋㅋ' },

    { t:'me', v:'明天结束之后' },
    { t:'me', v:'要不要去吃那个' },
    { t:'them', who:'dohoon', v:'哪个' },
    { t:'me', v:'就是 那个 麻辣锅' },
    { t:'them', who:'dohoon', v:'你明天要唱歌' },
    { t:'them', who:'dohoon', v:'吃辣' },
    { t:'me', v:'……' },
    { t:'me', v:'那吃完再唱' },
    { t:'them', who:'dohoon', v:'ㅋㅋㅋㅋㅋ' },
    { t:'them', who:'youngjae', v:'他每次都这样' },
    { t:'them', who:'jihoon', v:'上次也是' },
    { t:'them', who:'shinyu', v:'吃可以' },
    { t:'them', who:'shinyu', v:'别吃太多' },
    { t:'me', v:'好！' },

    { t:'them', who:'shinyu', v:'明天 6点 大堂集合' },
    { t:'them', who:'shinyu', v:'别迟到' },
    { t:'them', who:'dohoon', v:'6点？' },
    { t:'them', who:'dohoon', v:'哥 你知道现在几点吗' },
    { t:'them', who:'kyungmin', v:'我定七个闹钟' },
    { t:'them', who:'youngjae', v:'我定八个' },
    { t:'them', who:'jihoon', v:'我不用闹钟' },
    { t:'them', who:'dohoon', v:'你几点睡' },
    { t:'them', who:'jihoon', v:'4点' },
    { t:'them', who:'dohoon', v:'……' },
    { t:'them', who:'shinyu', v:'志薰啊' },
    { t:'them', who:'jihoon', v:'知道了 我现在睡' },
    { t:'them', who:'kyungmin', v:'哥你每次都这么说' }
  ]
},

/* ========== 2. 道勋 1:1 ========== */
{
  id: 'dohoon', name: '道勋哥', unread: 2, time: '23:44',
  preview: '下来吧 我买了两个',
  msgs: [
    { t:'day', v:'10月20日 周二' },
    { t:'them', who:'dohoon', v:'睡了吗' },
    { t:'me', v:'还没' },
    { t:'them', who:'dohoon', v:'你今天在练习室' },
    { t:'them', who:'dohoon', v:'那个动作 第七遍的时候' },
    { t:'them', who:'dohoon', v:'你笑了' },
    { t:'me', v:'我笑了？' },
    { t:'them', who:'dohoon', v:'嗯' },
    { t:'them', who:'dohoon', v:'为什么' },
    { t:'me', v:'因为哥跳错了' },
    { t:'them', who:'dohoon', v:'……' },
    { t:'them', who:'dohoon', v:'我那是故意的' },
    { t:'me', v:'ㅋㅋㅋㅋㅋ' },
    { t:'me', v:'哥 你跳错的时候会先看地板' },
    { t:'them', who:'dohoon', v:'你还观察这个' },
    { t:'me', v:'我是 memory maker' },
    { t:'me', v:'我记很多东西' },
    { t:'them', who:'dohoon', v:'那你记我什么' },
    { t:'me', v:'……' },
    { t:'me', v:'不告诉你' },
    { t:'them', who:'dohoon', v:'那我猜' },
    { t:'me', v:'哥猜不到' },
    { t:'them', who:'dohoon', v:'哦' },
    { t:'them', who:'dohoon', v:'那我慢慢猜' },
    { t:'them', who:'dohoon', v:'反正练习室每天都有' },
    { t:'me', v:'……' },
    { t:'me', v:'哥' },
    { t:'me', v:'第七遍我笑' },
    { t:'me', v:'其实不是因为哥跳错' },
    { t:'them', who:'dohoon', v:'那是因为什么' },
    { t:'me', v:'这个也不告诉你' },
    { t:'them', who:'dohoon', v:'ㅋㅋㅋㅋ' },
    { t:'them', who:'dohoon', v:'行' },
    { t:'them', who:'dohoon', v:'那我下次继续跳错' },

    { t:'day', v:'10月22日 周四' },
    { t:'them', who:'dohoon', v:'你在飞机上睡着了' },
    { t:'them', who:'dohoon', v:'靠在我这边' },
    { t:'me', v:'真的？' },
    { t:'them', who:'dohoon', v:'嗯' },
    { t:'me', v:'那哥怎么不推我' },
    { t:'them', who:'dohoon', v:'推了' },
    { t:'them', who:'dohoon', v:'推不动' },
    { t:'me', v:'ㅋㅋㅋㅋ 对不起' },
    { t:'them', who:'dohoon', v:'没关系' },
    { t:'them', who:'dohoon', v:'反正我也没睡着' },

    { t:'day', v:'今天 23:07' },
    { t:'them', who:'dohoon', v:'曲目表 看了吗' },
    { t:'me', v:'看了' },
    { t:'me', v:'第三首' },
    { t:'them', who:'dohoon', v:'我也是第三首' },
    { t:'me', v:'……' },
    { t:'them', who:'dohoon', v:'怎么了' },
    { t:'me', v:'没什么' },
    { t:'me', v:'就是 哥和我一样' },
    { t:'them', who:'dohoon', v:'那当然一样' },
    { t:'them', who:'dohoon', v:'我们不是一起听的吗' },

    { t:'them', who:'dohoon', v:'明天' },
    { t:'them', who:'dohoon', v:'你在台上别看我' },
    { t:'me', v:'为什么' },
    { t:'them', who:'dohoon', v:'你会忘词' },
    { t:'me', v:'我不会' },
    { t:'them', who:'dohoon', v:'上次你看了我一眼' },
    { t:'them', who:'dohoon', v:'然后就唱错了' },
    { t:'me', v:'那是因为哥在笑' },
    { t:'them', who:'dohoon', v:'我没笑' },
    { t:'me', v:'哥笑了' },
    { t:'them', who:'dohoon', v:'……' },
    { t:'them', who:'dohoon', v:'好吧 我笑了' },
    { t:'them', who:'dohoon', v:'那你别看' },
    { t:'me', v:'我尽量' },

    { t:'me', v:'哥' },
    { t:'me', v:'第三首那句' },
    { t:'me', v:'哥录的时候 想的是什么' },
    { t:'them', who:'dohoon', v:'什么什么' },
    { t:'them', who:'dohoon', v:'「就算慢一点也没关系」' },
    { t:'me', v:'嗯' },
    { t:'them', who:'dohoon', v:'不告诉你' },
    { t:'me', v:'……' },
    { t:'me', v:'哥学我' },
    { t:'them', who:'dohoon', v:'谁先想说的' },
    { t:'them', who:'dohoon', v:'谁就输了' },
    { t:'me', v:'那比什么' },
    { t:'them', who:'dohoon', v:'比到说完为止' },
    { t:'me', v:'……' },
    { t:'me', v:'好' },
    { t:'them', who:'dohoon', v:'明天那句' },
    { t:'them', who:'dohoon', v:'你要是看我' },
    { t:'them', who:'dohoon', v:'我就当你想起来了' },

    { t:'them', who:'dohoon', v:'韩振啊', dyn:1 },
    { t:'them', who:'dohoon', v:'睡了吗' },
    { t:'them', who:'dohoon', v:'我下来了' },
    { t:'them', who:'dohoon', v:'楼下便利店' },
    { t:'them', who:'dohoon', v:'这个 拉面 只有台湾有' },
    { t:'them', who:'dohoon', v:'我买了两个' },
    { t:'them', who:'dohoon', v:'下来吧 我买了两个' },
    { t:'choice', opts:[
        '等我 我穿个外套',
        '哥怎么不叫我一起',
        '我刷个牙就来'
      ], reply:'快点 凉了就不好吃了' },
    { t:'them', who:'dohoon', v:'外面有点风' },
    { t:'them', who:'dohoon', v:'穿厚一点' },
    { t:'call' }
  ]
},

/* ========== 3. 妈妈 ========== */
{
  id: 'mom', name: '妈妈', unread: 3, time: '23:19',
  preview: '你爸睡了 我跟你说个事',
  msgs: [
    { t:'day', v:'今天 22:48' },
    { t:'them', who:'mom', v:'振振 睡了吗' },
    { t:'them', who:'mom', v:'妈看你那个预告了' },
    { t:'them', who:'mom', v:'你那个头发 是不是太长了' },
    { t:'them', who:'mom', v:'遮眼睛' },
    { t:'me', v:'妈 那是造型' },
    { t:'them', who:'mom', v:'哦' },
    { t:'them', who:'mom', v:'好看' },
    { t:'them', who:'mom', v:'你爸说好看' },
    { t:'me', v:'他说了？' },
    { t:'them', who:'mom', v:'他跟我说的' },
    { t:'them', who:'mom', v:'没跟你说' },
    { t:'me', v:'……' },
    { t:'me', v:'妈 明天有演唱会' },
    { t:'them', who:'mom', v:'在哪' },
    { t:'me', v:'高雄 台湾' },
    { t:'them', who:'mom', v:'那边热不热' },
    { t:'me', v:'挺热的' },
    { t:'them', who:'mom', v:'那你别穿太多' },
    { t:'them', who:'mom', v:'你从小就怕热' },
    { t:'me', v:'知道了' },

    { t:'them', who:'mom', v:'对了' },
    { t:'them', who:'mom', v:'你二弟这次考试 考了班里第五' },
    { t:'them', who:'mom', v:'他说要跟你说' },
    { t:'them', who:'mom', v:'结果你打电话他又不接' },
    { t:'me', v:'我明天打给他' },
    { t:'them', who:'mom', v:'嗯 他等你呢' },
    { t:'them', who:'mom', v:'他把你那个舞台视频存手机里了' },
    { t:'them', who:'mom', v:'天天看' },

    { t:'them', who:'mom', v:'振振' },
    { t:'them', who:'mom', v:'妈不催你' },
    { t:'them', who:'mom', v:'但是你什么时候回来一趟' },
    { t:'them', who:'mom', v:'你爸不说 他天天看你那个视频' },
    { t:'me', v:'……' },
    { t:'me', v:'过年' },
    { t:'them', who:'mom', v:'真的？' },
    { t:'me', v:'嗯 我跟公司说' },
    { t:'them', who:'mom', v:'好' },
    { t:'them', who:'mom', v:'那妈给你包饺子' },
    { t:'them', who:'mom', v:'韭菜鸡蛋的' },
    { t:'me', v:'多放点虾皮' },
    { t:'them', who:'mom', v:'你爸不吃虾皮' },
    { t:'me', v:'那分两锅' },
    { t:'them', who:'mom', v:'行 分两锅' },
    { t:'them', who:'mom', v:'你爸睡了 我跟你说个事' },
    { t:'them', who:'mom', v:'新乡这边降温了 你那边要是冷 就说' },
    { t:'them', who:'mom', v:'妈给你寄衣服' },
    { t:'me', v:'妈 我这边三十度' },
    { t:'them', who:'mom', v:'哦' },
    { t:'them', who:'mom', v:'那算了' },
    { t:'me', v:'ㅋㅋㅋㅋ' },
    { t:'them', who:'mom', v:'早点睡 别老看手机' }
  ]
},

/* ========== 4. 申惟 ========== */
{
  id: 'shinyu', name: '申惟哥', unread: 0, time: '22:56',
  preview: '明天我在你旁边',
  msgs: [
    { t:'day', v:'今天 22:31' },
    { t:'them', who:'shinyu', v:'韩振' },
    { t:'them', who:'shinyu', v:'明天的采访 有个问题' },
    { t:'them', who:'shinyu', v:'问「最想对成员说的话」' },
    { t:'them', who:'shinyu', v:'你想好怎么说了吗' },
    { t:'me', v:'还没' },
    { t:'them', who:'shinyu', v:'不用长' },
    { t:'them', who:'shinyu', v:'说真的就行' },
    { t:'me', v:'那我说哥' },
    { t:'me', v:'说哥一直都做得很好' },
    { t:'them', who:'shinyu', v:'……' },
    { t:'them', who:'shinyu', v:'别说我' },
    { t:'them', who:'shinyu', v:'说你自己想说的' },
    { t:'me', v:'我就是想说哥' },
    { t:'them', who:'shinyu', v:'……' },
    { t:'them', who:'shinyu', v:'那随便你' },
    { t:'them', who:'shinyu', v:'早点睡' },
    { t:'them', who:'shinyu', v:'明天我在你旁边' },
    { t:'them', who:'shinyu', v:'忘词就看一眼' },
    { t:'day', v:'今天 23:36' },
    { t:'them', who:'shinyu', v:'刚才看了明天的流程' },
    { t:'them', who:'shinyu', v:'到场先吃点东西 别空着肚子彩排' },
    { t:'me', v:'哥又在检查流程' },
    { t:'them', who:'shinyu', v:'队长的工作' },
    { t:'them', who:'shinyu', v:'也是我自己睡不着' }
  ]
},

/* ========== 5. 英宰 ========== */
{
  id: 'youngjae', name: '英宰哥', unread: 0, time: '22:40',
  preview: '感冒药我放你包里了',
  msgs: [
    { t:'day', v:'今天 22:14' },
    { t:'them', who:'youngjae', v:'韩振' },
    { t:'them', who:'youngjae', v:'感冒药我放你包里了' },
    { t:'them', who:'youngjae', v:'外侧那个口袋' },
    { t:'them', who:'youngjae', v:'你嗓子昨天有点哑' },
    { t:'me', v:'谢谢哥' },
    { t:'them', who:'youngjae', v:'还有' },
    { t:'them', who:'youngjae', v:'你空调别开那么低' },
    { t:'me', v:'我怕热' },
    { t:'them', who:'youngjae', v:'那盖被子' },
    { t:'me', v:'……' },
    { t:'me', v:'好' },
    { t:'them', who:'youngjae', v:'嗯' },
    { t:'them', who:'youngjae', v:'明天早上我叫你' },
    { t:'them', who:'youngjae', v:'你肯定起不来' },
    { t:'me', v:'我起得来' },
    { t:'them', who:'youngjae', v:'嗯 起得来' },
    { t:'them', who:'youngjae', v:'晚安' },
    { t:'day', v:'今天 23:29' },
    { t:'them', who:'youngjae', v:'药带了吗' },
    { t:'me', v:'放包里了' },
    { t:'them', who:'youngjae', v:'明早我再确认一次' },
    { t:'me', v:'哥你是移动药箱吗' },
    { t:'them', who:'youngjae', v:'嗯 你专属的' }
  ]
},

/* ========== 6. 志薰 ========== */
{
  id: 'jihoon', name: '志薰', unread: 0, time: '22:22',
  preview: '第二段副歌 你往左半步',
  msgs: [
    { t:'day', v:'今天 21:50' },
    { t:'them', who:'jihoon', v:'明天 第二段副歌' },
    { t:'them', who:'jihoon', v:'你往左半步' },
    { t:'them', who:'jihoon', v:'今天走位 你被灯挡了' },
    { t:'me', v:'好' },
    { t:'them', who:'jihoon', v:'我看了三遍回放' },
    { t:'me', v:'三遍？' },
    { t:'them', who:'jihoon', v:'嗯' },
    { t:'them', who:'jihoon', v:'还有 你手再抬一点' },
    { t:'them', who:'jihoon', v:'不是我挑你' },
    { t:'me', v:'我知道' },
    { t:'me', v:'谢谢哥' },
    { t:'them', who:'jihoon', v:'嗯' },
    { t:'them', who:'jihoon', v:'早点睡' },
    { t:'them', who:'jihoon', v:'别剪视频' },
    { t:'me', v:'……' },
    { t:'me', v:'好' },
    { t:'them', who:'jihoon', v:'你每次都答应得很快' },
    { t:'them', who:'jihoon', v:'然后三点还在发' },
    { t:'day', v:'今天 23:18' },
    { t:'them', who:'jihoon', v:'给你截了走位图' },
    { t:'photo', art:'practice', cap:'第二段副歌 · 站位' },
    { t:'them', who:'jihoon', v:'红线是灯位 别踩进去' },
    { t:'me', v:'收到老师' },
    { t:'them', who:'jihoon', v:'别叫老师' }
  ]
},

/* ========== 7. 炅潣 ========== */
{
  id: 'kyungmin', name: '炅潣', unread: 1, time: '23:31',
  preview: '哥 我有点怕',
  msgs: [
    { t:'day', v:'今天 23:24' },
    { t:'them', who:'kyungmin', v:'哥' },
    { t:'them', who:'kyungmin', v:'哥你睡了吗' },
    { t:'them', who:'kyungmin', v:'哥' },
    { t:'me', v:'干嘛' },
    { t:'them', who:'kyungmin', v:'明天 我要是唱错了' },
    { t:'them', who:'kyungmin', v:'你别说我' },
    { t:'me', v:'我不说你' },
    { t:'them', who:'kyungmin', v:'真的？' },
    { t:'me', v:'嗯 我唱错了 你也别说我' },
    { t:'them', who:'kyungmin', v:'那我肯定说' },
    { t:'me', v:'ㅋㅋㅋㅋㅋ' },
    { t:'them', who:'kyungmin', v:'开玩笑的' },
    { t:'them', who:'kyungmin', v:'哥' },
    { t:'them', who:'kyungmin', v:'我有点怕' },
    { t:'me', v:'怕什么' },
    { t:'them', who:'kyungmin', v:'巨蛋' },
    { t:'them', who:'kyungmin', v:'两万个座位' },
    { t:'me', v:'我也怕' },
    { t:'them', who:'kyungmin', v:'哥也怕？' },
    { t:'me', v:'嗯' },
    { t:'me', v:'但是我们一起' },
    { t:'them', who:'kyungmin', v:'……' },
    { t:'them', who:'kyungmin', v:'嗯' },
    { t:'them', who:'kyungmin', v:'哥 晚安' },
    { t:'them', who:'kyungmin', v:'明天我站你旁边' },
    { t:'day', v:'今天 23:38' },
    { t:'them', who:'kyungmin', v:'哥我刚刚又搜了高雄巨蛋', time:'23:39' },
    { t:'me', v:'搜到什么了' },
    { t:'them', who:'kyungmin', v:'座位真的好多' },
    { t:'them', who:'kyungmin', v:'我把手机放下了', time:'23:41' },
    { t:'them', who:'kyungmin', v:'现在应该能睡了', time:'23:42' }
  ]
},

/* ========== 8. 室长 ========== */
{
  id: 'manager', name: '室长', unread: 0, time: '21:05',
  preview: '明天 8:20 大堂集合',
  msgs: [
    { t:'day', v:'今天 20:40' },
    { t:'them', who:'manager', v:'明天 8:20 大堂集合' },
    { t:'them', who:'manager', v:'9:00 彩排' },
    { t:'them', who:'manager', v:'中午用餐 不要吃辣' },
    { t:'them', who:'manager', v:'下午 3:00 待机' },
    { t:'them', who:'manager', v:'韩振 你的麦明天换新的' },
    { t:'me', v:'收到' },
    { t:'them', who:'manager', v:'还有 别熬夜' },
    { t:'them', who:'manager', v:'你眼袋' },
    { t:'me', v:'……' },
    { t:'me', v:'我知道了' },
    { t:'them', who:'manager', v:'曲目表 公司发了' },
    { t:'them', who:'manager', v:'你们别自己先发' },
    { t:'them', who:'manager', v:'等官方' },
    { t:'me', v:'好' }
  ]
}
];

/* ---------------- 锁屏通知 ---------------- */
const NOTIFICATIONS = [
  { app:'weverse', icon:'💚', title:'Weverse', time:'现在', text:'[NOTICE] TWS 2nd Single Album 「TO US」 Tracklist 公开', go:'chat:tws' },
  { app:'kakao', icon:'💬', title:'道勋哥', time:'3分钟前', text:'下来吧 我买了两个', go:'chat:dohoon' },
  { app:'kakao', icon:'💬', title:'妈妈', time:'28分钟前', text:'你爸睡了 我跟你说个事', go:'chat:mom' },
  { app:'kakao', icon:'💬', title:'炅潣', time:'刚刚', text:'哥我把手机放下了 现在应该能睡了', go:'chat:kyungmin' }
];

/* ---------------- 相册 ---------------- */
const PHOTOS = [
  { sec:'2026年10月', items:[
    { art:'window',  t:'高雄的房间', d:'10月23日 · 23:12', desc:'灯是暖的。比首尔的房间暖一点。' },
    { art:'stageEmpty', t:'场馆', d:'10月23日 · 18:40', desc:'从包装口往外看了一眼。等一下这里会坐满。' },
    { art:'audFront', t:'侧幕', d:'10月23日 · 19:48', desc:'从侧幕往外看。灯还没暗，人已经坐满了。' },
    { art:'ramen',   t:'楼下的拉面', d:'10月23日 · 23:51', desc:'只有台湾有。道勋哥说这个口味最好吃。' },
    { art:'airport', t:'仁川 → 高雄', d:'10月22日 · 09:26', desc:'申惟哥在数人数。数了三遍。' },
    { art:'planeWing', t:'飞机上', d:'10月22日 · 11:03', desc:'睡着了。醒的时候肩上有点重。' },
    { art:'planeMeal', t:'飞机餐', d:'10月22日 · 12:40', desc:'吃了三口。剩下的给炅潣了。' },
    { art:'metro',   t:'高雄捷运', d:'10月22日 · 15:10', desc:'戴了口罩。没有人认出来。' },
    { art:'practice',t:'第七遍', d:'10月20日 · 22:47', desc:'镜子里的六个人。这天练到很晚。' },
    { art:'parcel',  t:'快递', d:'10月20日 · 14:20', desc:'妈妈寄的辣酱。六瓶，怕我分完。' },
    { art:'six',     t:'公司的灯', d:'10月19日 · 20:15', desc:'练完出来天刚黑。这条路的灯一下全亮。' },
    { art:'seoulRiver', t:'汉江', d:'10月18日 · 18:02', desc:'想拍下来给 42 看，结果只拍到了天。' },
    { art:'cam', t:'我的相机', d:'10月17日 · 15:30', desc:'胶卷第 34 张。不知道拍了什么。' },
    { art:'food',    t:'麻辣锅', d:'10月16日 · 21:10', desc:'一个人吃的。他们不能吃辣。' },
    { art:'milktea', t:'五十岚', d:'10月16日 · 16:02', desc:'全糖。炅潣说我不怕胖。' },
    { art:'oden',    t:'便利店', d:'10月15日 · 23:40', desc:'关东煮第二份半价。' },
    { art:'roomDorm', t:'宿舍', d:'10月15日 · 01:24', desc:'英宰哥说再开空调就把我扔出去。' },
    { art:'street',  t:'练习室楼下', d:'10月14日 · 23:58', desc:'公司门口那盏灯总是闪。' }
  ]},
  { sec:'2026年9月', items:[
    { art:'bkNight', t:'曼谷', d:'9月26日', desc:'巡演第七站。热得像蒸笼。' },
    { art:'bkMarket', t:'曼谷的夜市', d:'9月26日', desc:'收工后跟炅潣溜出去。一人一串。' },
    { art:'stage',   t:'曼谷的返场', d:'9月26日', desc:'返场唱了两遍。' },
    { art:'audCrowd',t:'台下', d:'9月26日', desc:'有人举了我的手幅。举反了。' },
    { art:'macauNight', t:'澳门', d:'9月20日', desc:'大三巴下面全是人。我们也在里面。' },
    { art:'street',  t:'偷跑', d:'9月20日', desc:'跟炅潣溜出去。刚走到第二个路口，室长在群里 @ 我们了。' },
    { art:'cake',    t:'蛋糕', d:'9月19日', desc:'不是生日。就是想买。' },
    { art:'chicken', t:'炸鸡', d:'9月18日', desc:'凌晨两点。六个人分一只。' },
    { art:'taipeiCity', t:'台北', d:'9月14日', desc:'转机。机场外面只待了四十分钟。' },
    { art:'sea',     t:'海', d:'9月12日', desc:'从哪里看到的来着。' }
  ]},
  { sec:'2026年8月', items:[
    { art:'fukuokaCity', t:'福冈', d:'8月28日', desc:'日本巡演第一场。全满。' },
    { art:'stageBlue',   t:'返场前', d:'8月28日', desc:'在侧台站着，听见台下在喊名字。' },
    { art:'fukuokaCity',   t:'福冈的夜', d:'8月28日', desc:'回饭店的路。' },
    { art:'ramenDark', t:'一兰', d:'8月29日', desc:'一个人去的。排队四十分钟。' },
    { art:'danceRoom', t:'借的练习室', d:'8月25日', desc:'地板很硬。练到腿抽筋。' },
    { art:'cupNoodle', t:'泡面', d:'8月25日', desc:'饭店没有热水，用咖啡机烧的。' },
    { art:'rainGlass', t:'下雨', d:'8月22日', desc:'台风。行程取消了一天。' },
    { art:'planeCloud', t:'回来的飞机', d:'8月31日', desc:'窗外的云像棉花糖。' }
  ]},
  { sec:'2026年 · 更早', items:[
    { art:'cherry',  t:'樱花', d:'4月5日', desc:'说好一起拍 vlog 的那天。' },
    { art:'cat',     t:'楼下的猫', d:'3月18日', desc:'喂了三个月。它还是不让摸。' },
    { art:'rainStreet', t:'雨', d:'3月2日', desc:'从公司走回宿舍。伞忘在练习室了。' },
    { art:'deskNight', t:'桌上', d:'2月11日', desc:'凌晨。歌词写到第三版。' },
    { art:'snow',    t:'第一场雪', d:'1月12日', desc:'新乡的雪比首尔大。' },
    { art:'candle',  t:'生日', d:'1月5日', desc:'二十岁。许了三个愿望。' },
    { art:'debut',   t:'出道那天', d:'2024年1月22日', desc:'六个人在后台，谁都没说话。' }
  ]}
];

/* ---------------- 备忘录 ---------------- */
const NOTES = [
  { t:'10月23日 高雄', d:'今天 23:58', p:'饭店 窗 / 拉面 / 曲目表',
    body:`明天。
高雄巨蛋。
第一次。

今天彩排的时候，站在舞台中间往上看，
上面是空的。
空的才好，空的说明明天会满。

室长说不要熬夜。
我知道。
但是我一躺下就会想事情。

曲目表出来了。
第三首，那句「就算慢一点也没关系」。
我第一次听到 demo 的时候在车里，
外面在下雨。
我没说话，道勋哥也没说话。
后来他说：这首不错吧。
我说嗯。

就这样。`},

  { t:'10月20日 练习室', d:'10月20日 23:40', p:'第七遍 / 先看地板',
    body:`第七遍的时候他又跳错了。
他先看了地板，又看我。
我看他的时候，他假装在看镜子。

第三首是同一天录的。
「就算慢一点也没关系」。
他说录那句的时候，想的不是慢。
我问他想的是什么。
他说不告诉你。

那就比。
看谁先说。

但今天他在楼下便利店，
给我买了那个拉面。
说「下来吧 我买了两个」。

两个。
不是给我一个，是买了两个。
然后说「凉了就不好吃了」。

……

我明明说想的是慢。
他明明也没说不。

就先不说了。`},

  { t:'采访 我不知道怎么说', d:'10月23日 22:40', p:'最想对成员说的话…',
    body:`明天采访有个问题。
问「最想对成员说的话」。

如果是三年前的我，
大概会说「谢谢大家，我会更努力」。
这种话很安全，谁都不会出错。

但是我不想说了。

我想说的是：
申惟哥总是最后一个睡。
英宰哥会记住每个人的嗓子状态。
志薰会看三遍回放，然后说「不是我挑你」。
炅潣明明怕得要死，还说要站我旁边。
道勋哥……

道勋哥的事情我不能在采访里说。
说了会被剪掉。
或者说，说了就太多了。

所以我大概会说：
「我很幸运。
因为我身边的人，都在很认真地活着。」
这样就行了。`},

  { t:'成员 TMI（我记的）', d:'10月21日 01:12', p:'memory maker 的笔记',
    body:`申惟哥
· 紧张的时候会数人数
· 不吃香菜，但会挑出来不说什么
· 睡前一定要把明天的衣服摆好

道勋哥
· 跳错会先看地板
· 耳机永远只戴一边
· 说「随便」的时候其实有想法
· 生日那天我送他耳机，他当场没拆
  晚上回房间才发消息说「谢谢」

英宰哥
· 会记得所有人吃什么药
· 空调温度永远是 26
· 生气的时候更小声

志薰
· 看回放会看三遍
· 不说「你跳错了」，说「你往左半步」

炅潣
· 怕的时候话会变多
· 说「我不怕」的时候最怕`},

  { t:'韩语 错题本', d:'10月18日 23:30', p:'敬语 / 发音 / 用错的词',
    body:`① 「수고했어요」和「고생했어요」
   对哥哥们用后者更自然。
   但是对 42 说的时候，用前者。

② 「좋아요」说得太多次了。
   道勋哥说听起来像在敷衍。
   他说可以说「진짜 좋아요」。
   我说那不是很奇怪吗。
   他说不奇怪。

③ 采访的时候不要说「저는 아직 부족합니다」。
   室长说这句说多了，粉丝会难过。
   可以说「더 잘하고 싶어요」。
   意思差不多。
   但是听起来不一样。

④ 「보고 싶다」。
   这个我一直用不好。
   中文里「想你了」可以说得很轻。
   韩语里说重了，就有点像别的意思。

   所以我都说「얼굴 보고 싶다」。
   加一个脸，就安全了。`},

  { t:'给 42', d:'10月17日 02:05', p:'没发出去的一段',
    body:`你们总是问我，累不累。

累的。
说实话是累的。

但是今天在机场，
有个 42 举着一个牌子，
上面用中文写「韩振 我们一直在」。
字写得歪歪的，应该是自己做的。

我走过去的时候她没看见我。
我看了两秒，就走了。

我后来一直在想那两秒。
我不知道她会不会知道我看过。

如果有一天我能说一句话，
我想说：
你们写给我的字，我都看见了。
一个都没漏。`},

  { t:'回去要做的事', d:'10月12日 20:20', p:'过年 / 新乡 / 妈妈',
    body:`· 跟公司说春节的假
· 给二弟买个耳机（他的坏了）
· 带妈妈去拍一张照片（她说她不上相）
· 吃一次家里的饺子，分两锅
· 去高中门口看一眼
· 把相机里的照片洗出来
· 给爸爸买那个他一直不买的保温杯`},

  { t:'妈妈说的话', d:'10月8日 21:44', p:'存一下，怕忘',
    body:`「你不用非得是第一。」
「妈看电视上那些孩子，一个个都好瘦。」
「你要是累了就回来住几天，谁也不知道。」
「你爸不说，他天天看你那个视频。」
「韭菜鸡蛋的，多放点虾皮。」

最后一句是今天说的。
我说爸不吃虾皮。
她说那就分两锅。

我在这边笑了一下。
然后就没笑出来。`}
];

/* ---------------- 日历 ---------------- */
const CAL = {
  month: '2026年10月',
  today: 23,
  marks: { 23:[1], 24:[2], 26:[1], 28:[1], 30:[1], 31:[1], 2:[3] },
  events: [
    { d:'10月23日 · 今天', t:'TO US 曲目表公开', s:'18:00 KST · 官方' },
    { d:'10月24日 · 明天', t:'24/7:FOR:YOU 高雄巨蛋', s:'19:00 · 高雄巨蛋' },
    { d:'10月24日 · 明天', t:'庆功 · 楼下便利店拉面', s:'22:30 · 他说凉了不好吃' },
    { d:'10月26日', t:'Highlight Medley', s:'18:00 KST' },
    { d:'10月28日', t:'Teaser 1', s:'0:00 KST' },
    { d:'10月30日', t:'Teaser 2', s:'0:00 KST' },
    { d:'10月31日', t:'返回首尔', s:'航班 14:20' },
    { d:'11月2日', t:'TO US 发行', s:'18:00 KST · 主打曲 MV' }
  ]
};

/* ---------------- Safari ---------------- */
const SEARCHES = [
  { q:'就算慢一点也没关系 demo 玻璃外', s:'www.google.com' },
  { q:'老爹站 是谁', s:'www.baidu.com' },
  { q:'TWS 韩振 门面 评价', s:'www.google.com' },
  { q:'高雄巨蛋 座位 视角', s:'www.google.com' },
  { q:'TWS TO US tracklist', s:'weverse.io' },
  { q:'台湾 麻辣锅 推荐 高雄', s:'www.google.com' },
  { q:'眼袋 怎么消 快速', s:'search.naver.com' },
  { q:'麻辣香锅 做法 简单 家用', s:'www.xiachufang.com' },
  { q:'新乡 到 首尔 机票 价格', s:'www.ctrip.com' },
  { q:'采访 回答 韩语 模板', s:'search.naver.com' },
  { q:'胶卷相机 夜间 拍摄 参数', s:'www.google.com' },
  { q:'TWS 高雄 演唱会 应援', s:'weibo.com' },
  { q:'河南话 怎么说 好久不见', s:'www.baidu.com' }
];

/* ---------------- 音乐 ---------------- */
const MUSIC = {
  now: { title:'就算慢一点', artist:'TWS · TO US', dur:214, cur:78, art:'stage' },
  list: [
    { t:'就算慢一点', a:'TWS · TO US (2026)', art:'stage', new:true },
    { t:'You, You', a:'TWS · NO TRAGEDY', art:'sunset' },
    { t:'OVERDRIVE', a:'TWS · play hard', art:'night' },
    { t:'Last Festival', a:'TWS · Last Bell', art:'cherry' },
    { t:'plot twist', a:'TWS · Sparkling Blue', art:'six' },
    { t:'hey! hey!', a:'TWS · SUMMER BEAT!', art:'sky' },
    { t:'Soda Soda', a:'TWS · 日本单曲', art:'sea' },
    { t:'Every Day, Every Moment', a:'Paul Kim', art:'window' },
    { t:'晴天', a:'周杰伦', art:'city' }
  ]
};

/* ---------------- 地图 ---------------- */
const PLACES = [
  { n:'高雄巨蛋', s:'明天 19:00', c:'#ff3b30', x:64, y:52 },
  { n:'饭店', s:'步行 6 分钟', c:'#007aff', x:40, y:38 },
  { n:'便利店', s:'楼下', c:'#34c759', x:46, y:47 },
  { n:'六合夜市', s:'打车 12 分钟', c:'#ff9500', x:74, y:70 },
  { n:'高雄机场', s:'40 分钟', c:'#8e8e93', x:22, y:20 }
];

/* ---------------- 通话 ---------------- */
const CALLS = [
  { n:'道勋哥', t:'今天 23:52', type:'in' },
  { n:'妈妈', t:'昨天 21:30', type:'miss' },
  { n:'室长', t:'昨天 14:02', type:'in' },
  { n:'申惟哥', t:'10月21日', type:'out' },
  { n:'二弟', t:'10月19日', type:'miss' },
  { n:'道勋哥', t:'10月19日', type:'out' },
  { n:'英宰哥', t:'10月17日', type:'in' }
];

/* ---------------- 通话字幕 ---------------- */
const CALL_SCRIPT = [
  { who:'dohoon', v:'喂' },
  { who:'me', v:'哥' },
  { who:'dohoon', v:'下来了？' },
  { who:'me', v:'嗯 在电梯里' },
  { who:'dohoon', v:'外面有风 你把拉链拉上' },
  { who:'me', v:'……知道了' },
  { who:'dohoon', v:'我坐在门口那个台阶上' },
  { who:'me', v:'哥 你不冷吗' },
  { who:'dohoon', v:'我穿了外套' },
  { who:'dohoon', v:'……' },
  { who:'dohoon', v:'韩振啊' },
  { who:'me', v:'嗯' },
  { who:'dohoon', v:'明天 你别怕' },
  { who:'me', v:'我没怕' },
  { who:'dohoon', v:'你今天彩排的时候 手在抖' },
  { who:'me', v:'……' },
  { who:'me', v:'哥看见了' },
  { who:'dohoon', v:'嗯' },
  { who:'dohoon', v:'我一直看着' },
  { who:'me', v:'……' },
  { who:'dohoon', v:'两万个人而已' },
  { who:'dohoon', v:'你就当 只有六个人' },
  { who:'me', v:'六个人？' },
  { who:'dohoon', v:'嗯' },
  { who:'dohoon', v:'我在最右边' },
  { who:'me', v:'哥在右边吗' },
  { who:'dohoon', v:'明天我在' },
  { who:'dohoon', v:'……' },
  { who:'dohoon', v:'拉面要凉了' },
  { who:'me', v:'我跑' },
  { who:'dohoon', v:'慢点 别摔' }
];

/* ---------------- 天气 ---------------- */
const WEATHER = {
  city:'高雄', temp:29, cond:'多云', hi:31, lo:25,
  hours:[
    {h:'现在',t:29,r:''},{h:'01',t:28,r:''},{h:'02',t:28,r:''},{h:'03',t:27,r:''},
    {h:'06',t:27,r:'10%'},{h:'09',t:29,r:''},{h:'12',t:31,r:''},{h:'15',t:31,r:'20%'}
  ],
  note:'明天演出时段降雨概率 20%，场馆内不受影响。'
};

/* ==========================================================
   微信 —— 韩振的国内那一半
   ========================================================== */
const WX_PEOPLE = {
  junjin:  { n:'俊尼', c:'#7a9ec9', e:'俊' },
  minghao: { n:'明浩', c:'#c98b6b', e:'浩' },
  mom:     { n:'妈',   c:'#d9604f', e:'妈' },
  dad:     { n:'爸',   c:'#6b7a8a', e:'爸' },
  sister:  { n:'姐',   c:'#b0836b', e:'姐' },
  bro2:    { n:'二弟', c:'#4f9a8a', e:'弟' },
  wanghao: { n:'王浩', c:'#7a8a9c', e:'浩' },
  pay:     { n:'微信支付', c:'#3f9d5a', e:'支' },
  mp:      { n:'订阅号消息', c:'#8a8a94', e:'阅' },
  classgroup:{ n:'同学群', c:'#8a8a94', e:'班' }
};

const WECHAT_CHATS = [
  {
    id:'lvhka', name:'🇨🇳 绿卡互助会', unread:9, time:'22:31',
    preview:'俊尼：你们那个曲目表我看了',
    group:'🇨🇳',
    msgs:[
      { t:'day', v:'今天 21:04' },
      { t:'them', who:'junjin', v:'韩振 明天几点彩排' },
      { t:'me', v:'四点' },
      { t:'them', who:'junjin', v:'我台北这边收工早 下去一趟' },
      { t:'me', v:'哥 你别专门跑' },
      { t:'them', who:'junjin', v:'谁专门了' },
      { t:'them', who:'junjin', v:'我顺路' },
      { t:'me', v:'台北到高雄不顺路' },
      { t:'them', who:'junjin', v:'高铁顺路' },
      { t:'me', v:'……' },

      { t:'them', who:'junjin', v:'给你带点东西' },
      { t:'me', v:'什么' },
      { t:'them', who:'junjin', v:'我妈寄的辣酱 还有一袋牛肉干' },
      { t:'them', who:'junjin', v:'两瓶 不多' },
      { t:'me', v:'哥' },
      { t:'me', v:'你怎么每次都这样' },
      { t:'them', who:'junjin', v:'哪样' },
      { t:'me', v:'什么都不说 直接带过来' },
      { t:'them', who:'junjin', v:'说了你会拒绝' },
      { t:'me', v:'不会' },
      { t:'them', who:'junjin', v:'你上次就拒绝了' },
      { t:'me', v:'上次是六瓶' },
      { t:'them', who:'minghao', v:'他给我也塞过六瓶' },
      { t:'them', who:'minghao', v:'我到现在还剩三瓶' },
      { t:'them', who:'junjin', v:'那是你不吃' },
      { t:'them', who:'minghao', v:'我吃 但是六瓶' },
      { t:'me', v:'ㅋㅋㅋㅋ' },

      { t:'them', who:'junjin', v:'说正事' },
      { t:'them', who:'junjin', v:'你们那个曲目表我看了' },
      { t:'them', who:'junjin', v:'第三首不错' },
      { t:'me', v:'谢谢哥' },
      { t:'them', who:'minghao', v:'别谢 请他吃饭就行' },
      { t:'them', who:'junjin', v:'对' },
      { t:'them', who:'junjin', v:'这句话我等一年了' },
      { t:'me', v:'哥 我请' },
      { t:'me', v:'明天演完就请' },
      { t:'them', who:'junjin', v:'演完你还有力气' },
      { t:'me', v:'有' },
      { t:'them', who:'junjin', v:'那行 我记下了' },
      { t:'them', who:'minghao', v:'我也去' },
      { t:'me', v:'哥你也来' },
      { t:'them', who:'minghao', v:'他请客我不来' },

      { t:'them', who:'minghao', v:'话说 这群就我们三个' },
      { t:'them', who:'junjin', v:'对' },
      { t:'them', who:'minghao', v:'三个人的互助会' },
      { t:'them', who:'minghao', v:'以前还有几个 后来都回国了' },
      { t:'them', who:'junjin', v:'剩下我们三个' },
      { t:'them', who:'junjin', v:'互助' },
      { t:'them', who:'minghao', v:'互助什么' },
      { t:'them', who:'junjin', v:'互相知道对方还没吃饭' },
      { t:'me', v:'ㅋㅋㅋㅋㅋ' },
      { t:'them', who:'minghao', v:'……' },

      { t:'them', who:'minghao', v:'韩振啊' },
      { t:'them', who:'minghao', v:'明天别想太多' },
      { t:'me', v:'嗯' },
      { t:'them', who:'minghao', v:'我第一次上巨蛋 上台前在洗手间吐了' },
      { t:'them', who:'junjin', v:'这个我知道 我在门口等他' },
      { t:'them', who:'minghao', v:'你在门口笑' },
      { t:'them', who:'junjin', v:'我那是鼓励' },
      { t:'them', who:'minghao', v:'你笑得我更想吐' },
      { t:'me', v:'ㅋㅋㅋㅋ' },
      { t:'them', who:'minghao', v:'说正经的' },
      { t:'them', who:'minghao', v:'前三十秒最难熬' },
      { t:'them', who:'minghao', v:'唱完第一句 后面身体自己会做完' },
      { t:'me', v:'……' },
      { t:'me', v:'哥 你怎么什么都记得' },
      { t:'them', who:'minghao', v:'因为当年没人跟我说过' },

      { t:'them', who:'junjin', v:'行了 睡吧' },
      { t:'them', who:'junjin', v:'明天三点半 我在后门' },
      { t:'me', v:'哥 你别站风口' },
      { t:'them', who:'junjin', v:'我知道' },
      { t:'them', who:'junjin', v:'高雄又不冷' },
      { t:'me', v:'那也' },
      { t:'them', who:'minghao', v:'让他站' },
      { t:'them', who:'minghao', v:'他喜欢等' },
      { t:'them', who:'junjin', v:'……' },
      { t:'them', who:'junjin', v:'睡' }
    ]
  },
  {
    id:'family', name:'家(5)', unread:9, time:'21:58',
    preview:'爸：挺好',
    group:'家',
    msgs:[
      { t:'day', v:'今天 21:20' },
      { t:'them', who:'mom', v:'振振 你二弟说要跟你视频' },
      { t:'them', who:'dad', v:'【链接】这个视频里是不是你' },
      { t:'them', who:'sister', v:'爸 你都发第八遍了' },
      { t:'them', who:'mom', v:'你爸不会用' },
      { t:'them', who:'bro2', v:'哥！！！！' },
      { t:'them', who:'bro2', v:'哥你在吗' },
      { t:'me', v:'是我' },
      { t:'them', who:'dad', v:'哦' },
      { t:'them', who:'dad', v:'挺好' },
      { t:'them', who:'sister', v:'爸你就说这两个字？' },
      { t:'them', who:'dad', v:'那说什么' },
      { t:'them', who:'mom', v:'你爸昨天在单位跟人说了' },
      { t:'them', who:'mom', v:'说他儿子上电视了' },
      { t:'them', who:'dad', v:'……' },
      { t:'them', who:'sister', v:'哈哈哈哈哈哈哈' },
      { t:'me', v:'爸 我看到了' },
      { t:'them', who:'dad', v:'嗯' },
      { t:'them', who:'dad', v:'别累着' },
      { t:'them', who:'bro2', v:'哥 你什么时候回来' },
      { t:'them', who:'bro2', v:'我同桌说想见你' },
      { t:'me', v:'过年' },
      { t:'them', who:'bro2', v:'真的！！！' },
      { t:'them', who:'mom', v:'你弟这两天乖了 就是老问你' },
      { t:'me', v:'妈 我明天有演出' },
      { t:'them', who:'mom', v:'知道 你姐给我们投屏看' },
      { t:'them', who:'sister', v:'我请假了' },
      { t:'them', who:'dad', v:'几点' },
      { t:'me', v:'七点 台湾这边' },
      { t:'them', who:'dad', v:'那我调好闹钟' }
    ]
  },
  {
    id:'minghao', name:'明浩哥', unread:0, time:'22:47',
    preview:'这种东西 越看越难受',
    msgs:[
      { t:'day', v:'今天 22:35' },
      { t:'them', who:'minghao', v:'韩振' },
      { t:'them', who:'minghao', v:'你看那个热搜了吗' },
      { t:'them', who:'minghao', v:'老爹站那个' },
      { t:'me', v:'看了' },
      { t:'them', who:'minghao', v:'别往心里去' },
      { t:'them', who:'minghao', v:'这种东西 越看越难受' },
      { t:'me', v:'我知道' },
      { t:'them', who:'minghao', v:'我刚开始那两年也看' },
      { t:'them', who:'minghao', v:'一天能搜自己名字八十遍' },
      { t:'them', who:'minghao', v:'后来就不看了' },
      { t:'them', who:'minghao', v:'不是想通了 是懒得看了' },
      { t:'me', v:'……' },
      { t:'me', v:'哥 我有时候会想' },
      { t:'me', v:'他们说的 是不是真的' },
      { t:'them', who:'minghao', v:'哪句' },
      { t:'me', v:'说我韩语像背的' },
      { t:'them', who:'minghao', v:'那本来就是你背的啊' },
      { t:'me', v:'……' },
      { t:'them', who:'minghao', v:'我韩语现在也像背的' },
      { t:'them', who:'minghao', v:'但我背了六年' },
      { t:'them', who:'minghao', v:'背到后来 就变成我自己的了' },
      { t:'me', v:'……' },
      { t:'me', v:'哥' },
      { t:'me', v:'谢谢' },
      { t:'them', who:'minghao', v:'谢什么' },
      { t:'them', who:'minghao', v:'明天唱好点' },
      { t:'them', who:'minghao', v:'我在家看直播' }
    ]
  },
  {
    id:'wanghao', name:'王浩 新乡', unread:2, time:'19:02',
    preview:'哥们 你现在真火了啊',
    msgs:[
      { t:'day', v:'今天 18:40' },
      { t:'them', who:'wanghao', v:'哥们' },
      { t:'them', who:'wanghao', v:'你现在真火了啊' },
      { t:'them', who:'wanghao', v:'我妈都认识你了' },
      { t:'me', v:'哈哈 阿姨好' },
      { t:'them', who:'wanghao', v:'我妈问你啥时候回来 说要给你包饺子' },
      { t:'me', v:'替我谢谢阿姨' },
      { t:'them', who:'wanghao', v:'你啥时候回来' },
      { t:'me', v:'过年' },
      { t:'them', who:'wanghao', v:'行 到时候我去接你' },
      { t:'them', who:'wanghao', v:'别装不认识我啊' },
      { t:'me', v:'不会' },
      { t:'me', v:'你是我同桌' },
      { t:'them', who:'wanghao', v:'那必须的' },
      { t:'them', who:'wanghao', v:'对了 班上群里都在传你那个视频' },
      { t:'them', who:'wanghao', v:'老班还转发了' },
      { t:'me', v:'……' },
      { t:'me', v:'别' },
      { t:'them', who:'wanghao', v:'已经转了' }
    ]
  },
  {
    id:'classgroup', name:'新乡一中 2018级3班', unread:0, time:'昨天',
    preview:'[免打扰] 有人@我：这是咱班韩振吗',
    msgs:[
      { t:'day', v:'昨天' },
      { t:'them', who:'wanghao', v:'这是咱班韩振吗' },
      { t:'them', who:'wanghao', v:'我看了三遍' },
      { t:'them', who:'sister', v:'是' },
      { t:'them', who:'bro2', v:'那是我哥' }
    ]
  },
  {
    id:'pay', name:'微信支付', unread:0, time:'昨天',
    preview:'10月账单已生成', sys:1,
    msgs:[]
  },
  {
    id:'mp', name:'订阅号消息', unread:3, time:'10/21',
    preview:'你关注的 3 个公众号更新了', sys:1,
    msgs:[]
  }
];

/* ==========================================================
   微博 —— 小号 @今天不营业_0405
   ========================================================== */
const WEIBO_HOT = [
  { t:'TWS TO US 曲目表', tag:'爆', n:'4,102,338' },
  { t:'崔秀彬照片', tag:'沸', n:'3,204,118', topic:'soobin' },
  { t:'卡黄旧物料又被考古', tag:'热', n:'2,886,402', topic:'kahuang' },
  { t:'综艺切片怎么又刷屏了', tag:'热', n:'2,104,776' },
  { t:'回归预告到底要看几遍', tag:'新', n:'1,882,003' },
  { t:'今天追星人的耳机使用时长', tag:'热', n:'1,604,220' },
  { t:'内娱售后到底算不算售后', tag:'新', n:'1,402,338' },
  { t:'TWS 高雄场饭拍repo', tag:'新', n:'1,204,331' },
  { t:'老爹站 被开', tag:'新', n:'1,004,331', topic:'laodie' },
  { t:'追星人相册到底有多少张截图', tag:'新', n:'986,220' }
];

const WEIBO_FEED = [
  { av:'速', name:'TWS打歌repo_', v:1, time:'12分钟前', from:'微博视频',
    text:'#TWS TO US 曲目表# 公开。第二张单曲专辑《TO US》全曲目今日 18:00 释出，主打曲 MV 将于 11 月 2 日 18:00 同步上线。这是继《Last Bell》之后时隔约一年的单曲专辑。',
    imgs:['twsOfficial'], like:'2.3万', cmt:'1,842', rep:'4,102' },

  { av:'站', name:'韩振站今天也在', time:'38分钟前', from:'超话',
    text:'261023 高雄 彩排repo\n今天状态很好。头发有点长了。\n图源见水印，禁二改，转载请注明出处',
    imgs:['twsOfficial','window','stage'], like:'8,721', cmt:'312', rep:'1,006' },

  { av:'播', name:'音源空瓶接力赛', time:'45分钟前', from:'音乐超话',
    text:'今天时间线像大型耳机测试现场：这家刚放预告，那家又开直播。\n本来只想试听一遍，结果播放列表自己循环到第 17 遍。\n#追星人的自我管理#',
    imgs:[], like:'1.8万', cmt:'2,104', rep:'5,331' },

  { av:'考', name:'旧物料挖掘机', time:'53分钟前', from:'广场',
    text:'首页突然刷到卡黄旧切片，顺手点进去，然后一晚上没出来。\n评论区一边“这是哪年的物料求补课”，一边“别考古了我刚平复”。\n互联网记忆力：该记的不记，不该记的全给你存着。',
    imgs:[], like:'2.6万', cmt:'3,812', rep:'7,204' },

  { av:'勋', name:'四季_道勋', time:'26分钟前', from:'超话',
    text:'考古到 demo 物料了。\n《TO US》第三首「就算慢一点也没关系」这句词，怎么越听越像写给一路陪他们慢慢长大的42。\n先不造谣哈，单纯觉得很适合演唱会大合唱。\n评论区别替正主发言，听歌就好。',
    imgs:[], like:'9,802', cmt:'1,204', rep:'3,447' },

  { av:'吃', name:'内娱追踪器', v:1, time:'40分钟前', from:'',
    text:'A2O LITE 那个事，母公司到现在还是没发声明。\n只有妈妈发了道歉，说责任由父母承担、跟孩子无关。\n评论区最扎心的还是那句：「祸不及子女的前提，是惠及子女。」',
    imgs:[], like:'3.2万', cmt:'4,102', rep:'1,204' },

  { av:'城', name:'首尔夜班车', v:1, time:'1小时前', from:'',
    text:'【多地提前启动供暖】受冷空气影响，北方多个城市今日陆续开栓。\n供热公司提醒：管网升温需要一个过程，头两天室内温度不稳定属正常现象，不要反复放水，容易越放越凉。',
    imgs:[], like:'4,102', cmt:'683', rep:'1,204' },

  { av:'厕', name:'老爹站重生版', time:'1小时前', from:'',
    text:'投稿：TWS 那位中国成员，是不是每次采访都那几句啊。听得出来在背。不是黑，就是觉得有点可惜。',
    imgs:[], like:'6,204', cmt:'1,842', rep:'2,318', loo:true },

  { av:'锐', name:'锐化的原因', time:'1小时前', from:'超话',
    text:'考古到一条 2024 年的评论。\n那时候申惟还没出道，被人在论坛说了很难听的话，\n有个刚注册的小号回了一句「锐化的原因吧」，\n然后就再也没出现过。\n……\n我今天才反应过来，那是他。',
    imgs:[], like:'2.4万', cmt:'1,806', rep:'4,102' },

  { av:'剧', name:'剧荒急救站', time:'2小时前', from:'',
    text:'《长夜行》今晚大结局。三十六集，没有一场吻戏，最后十分钟全靠两个人站在雪地里说话。\n有人嫌它慢。但能把"告别"拍得这么不着急的剧，今年好像只有这一部。',
    imgs:['snow'], like:'1.8万', cmt:'1,204', rep:'3,022' },

  { av:'咸', name:'今天不营业_0405', time:'2小时前', from:'', mine:true,
    text:'今天有个 staff 说我韩语像背下来的。\n我笑着说谢谢。\n回房间想了一会儿，好像也没什么好反驳的。\n本来就是背的。',
    imgs:['night'], like:'3', cmt:'0', rep:'0' },

  { av:'律', name:'追星法律课代表', time:'3小时前', from:'',
    text:'关于网传照片：粉丝已列出四处硬伤——美巡期间是金发、左手臂有痣、背景插座是国内制式、第三方 AI 检测 79%。\n但截至今天，本人和公司仍然没有任何声明。\n不站队，只提醒一句：转发未经核实的私密影像，本身就有法律风险。',
    imgs:[], like:'5.6万', cmt:'3,204', rep:'8,102' },

  { av:'首', name:'TWS中国粉丝站', time:'3小时前', from:'超话',
    text:'【安利】河南新乡的孩子，十八岁一个人来首尔。练习一年半出道。\n会说四种语言，字写得比很多韩国人都好看。\n团里一半的照片是他拍的。\n——他不只是"门面"。',
    imgs:['six'], like:'1.2万', cmt:'876', rep:'2,041' }
];

/* 热搜话题页 */
const WEIBO_TOPICS = {
  kahuang: {
    title:'#卡黄旧物料又被考古#',
    read:'1.8亿 阅读',
    posts:[
      { av:'考', name:'旧物料挖掘机', time:'53分钟前',
        text:'本来只是想找一段老采访，结果推荐页把卡黄剪辑推到我脸上。\n发卡还是那个发卡，黄婷婷还是那个黄婷婷，弹幕已经从“当年嗑得好认真”刷到“现在看还是意难平”。',
        like:'2.6万', cmt:'3,812' },
      { av:'补', name:'SNH考古课代表', time:'41分钟前',
        text:'路人求补课：卡黄是哪两位？\n老粉：李艺彤（发卡）和黄婷婷。\n老粉补完课：好了别问了，我去把当年的物料再看一遍。',
        like:'1.8万', cmt:'2,406' },
      { av:'理', name:'今天先不嗑了', time:'28分钟前',
        text:'友情提醒：喜欢当年的舞台和互动就留在作品里聊，别去打扰本人，也别把剪辑当现实关系证明。\n但那个时期的故事感，确实很难不让人感慨。',
        like:'9,204', cmt:'1,126' },
      { av:'咸', name:'今天不营业_0405', time:'16分钟前', mine:true,
        text:'我只是路过看了一眼。\n怎么评论区每个人都像刚从2018年回来。',
        like:'14', cmt:'3' }
    ]
  },
  laodie: {
    title:'#老爹站 被开#',
    read:'3.9亿 阅读',
    posts:[
      { av:'吃', name:'瓜田里的猹_', time:'1小时前',
        text:'老爹站皮下被扒，疑似某团粉丝。之前那段时间它安静得反常，时间线还正好对得上。不过这波开盒本身也挺吓人的，有人说可能开错人了，别急着网暴。',
        like:'4.1万', cmt:'3,204' },
      { av:'路', name:'路过的甲乙丙', time:'52分钟前',
        text:'我不关心皮下是谁。我只关心一件事：靠发别人丑图赚钱的号，为什么能有 160 万粉丝。',
        like:'8.8万', cmt:'5,120' },
      { av:'咸', name:'今天不营业_0405', time:'36分钟前', mine:true,
        text:'……',
        like:'0', cmt:'0' },
      { av:'粉', name:'等回归的第900天', time:'28分钟前',
        text:'说实话看到这个热搜我第一反应是害怕。我们家孩子被这个号发过多少次，没人统计过。',
        like:'2,102', cmt:'341' }
    ]
  },

  soobin: {
    title:'#崔秀彬照片#',
    read:'4.2亿 阅读',
    posts:[
      { av:'澄', name:'崔秀彬_OurHome', time:'3小时前',
        text:'【关于网传图片的严正声明】\n一、美巡期间本人为金发，图中人物为深色头发，时间线不符；\n二、本人左手臂有辨识度较高的痣，图中对应位置没有；\n三、背景插座为国内制式，与所称拍摄地点矛盾；\n四、第三方 AI 检测显示生成概率 79%。\n恳请停止传播未经核实的私密影像。',
        like:'12.4万', cmt:'2.1万' },
      { av:'吃', name:'瓜田里的猹_', time:'2小时前',
        text:'公司到现在一声不吭，只有粉丝在前面挡。\n这个操作熟悉吗，熟悉的。',
        like:'6.8万', cmt:'5,204' },
      { av:'路', name:'路过的甲乙丙', time:'1小时前',
        text:'我不敢转。就算图是假的，转一次也是帮他们传播。\n等官方。',
        like:'3.2万', cmt:'1,102' },
      { av:'咸', name:'今天不营业_0405', time:'52分钟前', mine:true,
        text:'……',
        like:'0', cmt:'0' }
    ]
  },

  a2o: {
    title:'#A2O赖#',
    read:'2.8亿 阅读',
    posts:[
      { av:'记', name:'娱乐记事簿_', time:'5小时前',
        text:'简单复盘：\n10/12 A2O LITE 出道，中国成员 Aijing 因舞蹈实力出圈；\n当天晚上，其父母名下公司被曝欠薪，法院执行标的 345 万；\n10/14 母亲发文道歉，称责任由父母承担；\n至今 A2O 娱乐未发布任何声明。',
        like:'4.1万', cmt:'2,204' },
      { av:'评', name:'周一不想上班', time:'4小时前',
        text:'最刺眼的不是欠钱。是同一段时间里，那边在给孩子报一节 1198 的私教课。',
        like:'9.2万', cmt:'6,102' },
      { av:'路', name:'吃瓜不吐皮儿', time:'2小时前',
        text:'同样是中国人，18 岁自己拖着箱子来首尔，练习一年半出道，家里没欠过谁一分钱。\n不比了，没法比。',
        like:'1.2万', cmt:'806' }
    ]
  }
};

/* ==========================================================
   小红书
   ========================================================== */
const XHS_NOTES = [
  { cover:'ramenClose', t:'TWS 韩振同款拉面 真的好吃吗', a:'泡面测评不加蛋', like:'1.2万', tag:'红',
    body:`在台湾便利店买的，据说他彩排完会吃这个。

汤头偏咸，面是非油炸的，泡三分钟刚好。
加一个溏心蛋会更像样。

结论：好吃，但不是那种值得排队的好吃。
是那种——练完一天，坐在台阶上，会觉得很幸福的好吃。`,
    cmts:[['小圆','姐妹你这句话写得太好了'],['momo','所以到底哪里买'],['豆豆','我买了 真的咸']] },

  { cover:'seoulNight', t:'在韩务工第三年，我学会的第一件事是少说话', a:'首尔打工人momo', like:'3.4万', tag:'',
    body:`不是不想说，是说了会被截。

一句话，从中文翻成韩文，再翻回中文，意思就变了。
后来我学会只说安全的句子：
"谢谢大家""我会更努力的""请多多期待"。

有一次采访，我说了一句真心话。
播出的时候被剪掉了。
剪得很干净，连气口都没留。

从那以后我就知道，
真心话在这个行业里，是奢侈品。`,
    cmts:[['aaaa','看哭了'],['L','抱抱'],['夏天','这句话好重']] },

  { cover:'twsOfficial', t:'客观说，TWS 的门面担当有点尴尬', a:'显微镜追星小陈', like:'8,204', tag:'黑',
    body:`先说结论：不是不好看，是定位模糊。

门面这个位置，要么有压倒性的视觉记忆点，要么有能撑住镜头的气场。
他两样都差一口气。

再加上语言问题，采访里永远是那几句，很难建立人格魅力。
团里其他成员的存在感反而更强。

不是黑，客观讨论。`,
    cmts:[['路人甲','客观说 你说得挺客观'],['珍丝','他练习一年半就出道了 你行你上'],['kk','语言这个确实没办法 慢慢来吧'],['匿名','门面本来就是看脸的 他脸不够吗']] },

  { cover:'skyPink', t:'韩国打歌后台真实样子（不是你们想的那样）', a:'今天也去看打歌', like:'6,712', tag:'',
    body:`凌晨三点化妆，五点彩排，七点录影。
候机室是一间教室那么大的房间，六个人挤在一起。

没有传说中那么光鲜。
但是有一件事是真的：
他们上台前会围成一圈，把手叠在一起。`,
    cmts:[['一颗糖','这个细节好戳'],['ovo','想看现场']] },

  { cover:'hotpotMix', t:'首尔麻辣香锅 3 家实测', a:'大林洞辣妹', like:'9,431', tag:'',
    body:`1. 大林洞那家最正宗，但远。
2. 建大这家味道够，价格贵。
3. 弘大那家是给韩国人改良的，不辣。

结论：想吃家里那个味道，还是得自己做。`,
    cmts:[['辣妹','大林洞那家我常去'],['小七','自己做+1']] },

  { cover:'fashion', t:'巴黎时装周 Celine 生图｜男团六个人', a:'秀场边角料', like:'2.1万', tag:'红',
    body:`秀场后台，六个人穿得很克制。
黑色系，剪裁利落。

有一个细节：他们进场前，最高的那个一直在帮最小的整理领口。
没有人拍，但是很好看。`,
    cmts:[['fashion','这组图质感很好'],['42','是我们家'],['kkk','整理领口那个我磕到了']] }
];

/* ==========================================================
   TikTok —— 小号 @jin_0405
   ========================================================== */
const TIKTOK = {
  me: { handle:'@jin_0405', name:'jin', following:12, followers:3, likes:38, posts:0 },
  feed: [
    { art:'stage', user:'@tws_official',
      desc:'TO US.\n2026.11.02 18:00',
      music:'TO US - TWS', like:'128.4万', cmt:'3.2万', share:'8.1万', mine:false },

    { art:'city', user:'@daydream.42',
      desc:'高雄巨蛋门口 排了六个小时\n有人带了小凳子 有人带了毯子\n明天见 🌙 #TWS #42',
      music:'OVERDRIVE - TWS', like:'12.4万', cmt:'2,104', share:'3,220', mine:false },

    { art:'practice', user:'@dohoon.zip',
      desc:'这段撒娇舞我看了八百遍\n到底是谁教他这么扭的 #TWS #OVERDRIVE',
      music:'OVERDRIVE (Angtal Ver.) - TWS', like:'30.2万', cmt:'6,842', share:'1.2万', mine:false },

    { art:'empty', user:'@hanjin.moments',
      desc:'彩排结束 他对着空场馆鞠了一躬\n没有人拍 我在二楼\n#韩振 #TWS',
      music:'Last Festival - TWS', like:'5.6万', cmt:'1,203', share:'842', mine:true },

    { art:'night', user:'@seoul.night.zip',
      desc:'在便利店遇到爱豆的概率有多大\n（真实经历 我 tm 手都在抖）',
      music:'original sound', like:'88.1万', cmt:'1.4万', share:'6.2万', mine:false },

    { art:'window', user:'@hanguo.riji',
      desc:'在韩务工第三年\n我还是不会说「我想家了」这句话\n#在韩务工',
      music:'original sound', like:'2.1万', cmt:'3,102', share:'1,844', mine:false }
  ]
};

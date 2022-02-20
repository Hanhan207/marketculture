import React from "react";
import { List, Typography, Divider } from "antd";

function Pappers() {
  return (
    <div>
      <h1>相关文献</h1>
      <List
        bordered
        dataSource={pappers}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
}

export default Pappers;

const pappers = [
  [
    "[1] 徐增林,盛泳潘,贺丽荣,王雅芳.知识图谱技术综述[J].电子科技大学学报,2016,45(04):589-606.",
  ],
  [
    "[2] Kawa Nazemi. Adaptive Semantics Visualization[M].Springer, Cham:2016-01-01.",
  ],
  [
    "[3] Zhang L , Stoffel A , Behrisch M , et al. Visual analytics for the big data era — A comparative review of state-of-the-art commercial systems[C]// Visual Analytics Science & Technology. IEEE, 2013.",
  ],
  ["[4] 鲁威:《中国文化五大层面—市井文化》,第 2—4 页,辽宁教育出版社,1993 年版"],
  [
    "[5] 周时奋:《市井》引《后汉书循吏传刘宠传》注引《春秋景田记》,第 23 页,山东书报出版社,2003年版",
  ],
  [
    "[6] 蒋和宝､俞家栋,《雅俗文化书系—市井文化》,第 4 页,中国经济出版社,1995 年版",
  ],
  ["[7] 赵伯陶:《市井文化与市民心态》,第 20 页,湖北教育出版社,1996 年版"],
  [
    "[8] Munzner T. A Nested Model for Visualization Design and Validation[M]. IEEE Educational Activities Department, 2009.",
  ],
  [
    "[9] 康家兴, 牛保宁, 郝晋瑶. 多参数的城市时空热点查询[J]. 计算机工程与应用, 2019, 55(10): 233-239",
  ],
  [
    "[10] NIKITOPOULOS P, DOULKERIDIS C, PELEKIS N, ET AL. BIGCAB: DISTRIBUTED HOT SPOT ANALYSIS OVER BIG SPATIO-TEMPORAL DATA USING APACHE SPARK (GIS CUP 2016)[OL]. [2020-01-07].",
  ],
  [
    "[11] PENG S F, WEI H, LI H, ET AL. SIMPLIFICATION AND REFINEMENT FOR SPEEDY SPATIO-TEMPORAL HOT SPOT DETECTION USING SPARK (GIS CUP)[OL]. [2020-01-07].",
  ],
  [
    "[12] ALFEO A L, CIMINO M G C A, EGIDI S, ET AL. A STIGMERGY-BASED ANALYSIS OF CITY HOTSPOTS TO DISCOVER TRENDS AND ANOMALIES IN URBAN TRANSPORTATION USAGE[J]. IEEE TRANSACTIONS ON INTELLIGENT TRANSPORTATION SYSTEMS, 2018, 19(7): 2258-2267",
  ],
  [
    "[13] LI C H, BACIU G, HAN Y. STREAMMAP: SMOOTH DYNAMIC VISUALIZATION OF HIGH-DENSITY STREAMING POINTS[J]. IEEE TRANSACTIONS ON VISUALIZATION AND COMPUTER GRAPHICS, 2018, 24(3): 1381-1393",
  ],
  [
    "[14] 王胜开, 徐志洁, 张健钦, 等. 逆向热力图的绘制方法[J]. 地球信息科学学报, 2018, 20(4): 515-522",
  ],
  [
    "[15] Barchiesi D, Preis T, Bishop S, et al. Modelling human mobility patterns using photographic data shared online[J]. Royal Society Open Science, 2015, 2(8): Article No.150046",
  ],
  [
    "[16] 曹劲舟, 武红宇. 基于微博位置签到数据的POI 更新方法[J]. 地理空间信息, 2013, 11(2): 15-18+8)",
  ],
  [
    "[17] KIM S, JEONG S, WOO I, ET AL. DATA FLOW ANALYSIS AND VISUALIZATION FOR SPATIOTEMPORAL STATISTICAL DATA WITHOUT TRAJECTORY INFORMATION[ J]. IEEE TRANSACTIONS ON VISUALIZATION AND COMPUTER GRAPHICS, 2018, 24(3): 1287-1300",
  ],
  [
    "[18] 禹文豪, 艾廷华, 杨敏, 等. 利用核密度与空间自相关进行城市设施兴趣点分布热点探测[J]. 武汉大学学报: 信息科学版, 2016, 41(2): 221-227",
  ],
  [
    "[19] SEIFERT C, KUMP B, KIENREICH W, ET AL. ON THE BEAUTY AND USABILITY OF TAG CLOUDS[C] //PROCEEDINGS OF THE 12TH INTERNATIONAL CONFERENCE INFORMATION VISUALISATION. LOS ALAMITOS: IEEE COMPUTER SOCIETY PRESS, 2008: 17-25",
  ],
  [
    "[20] CUI W W, WU Y C, LIU S X, ET AL. CONTEXT PRESERVING DYNAMIC WORD CLOUD VISUALIZATION[C] //PROCEEDINGS OF THE IEEE PACIFIC VISUALIZATION SYMPOSIUM. LOS ALAMITOS: IEEE COMPUTER SOCIETY PRESS, 2010: 121-128",
  ],
  [
    "[21] ANDRIENKO G, ANDRIENKO N, FUCHS G, ET AL. REVEALING PATTERNS AND TRENDS OF MASS MOBILITY THROUGH SPATIAL AND TEMPORAL ABSTRACTION OF ORIGIN-DESTINATION MOVEMENT DATA[J]. IEEE TRANSACTIONS ON VISUALIZATION AND COMPUTER GRAPHICS, 2017, 23(9): 2120-2136",
  ],
  [
    "[22] LI C L, DONG X J, YUAN X R. METRO-WORDLE: AN INTERACTIVE VISUALIZATION FOR URBAN TEXT DISTRIBUTIONS BASED ON WORDLE[J]. VISUAL INFORMATICS, 2018, 2(1): 50-59",
  ],
  ["[23] MILLER AND HAN,2009; TANGETAL.,2016;BERGMAN ANDOKSANEN,2016"],
  [
    "[24] 陈涛,刘炜,单蓉蓉,朱庆华.知识图谱在数字人文中的应用研究[J].中国图书馆学报,2019,45(06):34-49.",
  ],
  [
    "[25] 曹倩,赵一鸣. 知识图谱的技术实现流程及相关应用[J]. 情报理论与实践,2015,12( 38) : 127-132.",
  ],
  [
    "[26] 华一新, 曹亚妮, 李响. 地理空间可视分析及其研究方向综述[J]. 测绘科学技术学报, 2012, 29(004):235-239.",
  ],
  [
    "[27] JENSEN M. VISUALIZING COMPLEX SEMANTIC TIMELINES, NEWSBLIP TECHNICAL REPORT 2003001,2003",
  ],
  [
    "[28] TARA ZEPEL.VISUALIZATION AS A DIGITAL HUMANITIES_?, HTTPS://WWW.HASTAC.ORG/BLOGS/TZEPEL/ 2013/05/02/VISUALIZATION-DIGITAL-HUMANITIES",
  ],
  [
    "[29] TORGET A J,MIHALCEA R,CHRISTENSEN J,ET AL. MAPPING TEXTS: COMBINING TEXT-MINING AND GEO-VISUALIZATION TO UN- LOCK THE RESEARCH POTENTIAL OF HISTORICAL NEWSPAPERS[EB/OL]. [2015-09-03].HTTP://MAPPINGTEXTS.STANFORD. EDU/WHITEPAPER/MAPPING TEXTS_WHITE PAPER. PDF",
  ],
  [
    "[30] SCHICH M,SONG C M,AHN Y Y,ET AL. A NETWORK FRAMEWORK OF CULTURAL HISTORY.SCIENCE,2014,345(6196):558-562",
  ],
  [
    "[31] CHO I,DOU W,WANG D X,ET AL. VAI ROMA: A VISUAL ANALYTICS SYSTEM FOR MAKING SENSE OF PLACES,TIMES,AND E- VENTS IN ROMAN HISTORY.IEEE TRANSACTIONS ON VISUALIZATION & COMPUTER GRAPHICS,2016,22(1):210-219",
  ],
  [
    "[32] BRADLEY A J, EL-ASSADY M , COLES K, ET AL. VISUALIZATION AND THE DIGITAL HUMANITIES. IEEE COMPUTER GRAPHICS AND APPLICATIONS, 2018, 38(6):26-38",
  ],
  ['[33] 张苑. "逝去影像与北京记忆." 艺术市场 05(2006):153-154.'],
  [
    '[34] 王强,and 刘飒."基于文化旅游视角的北京市南锣鼓巷名人故居开发研究." 经济研究导刊 .27(2011):170-172. ',
  ],
  [
    '[35] 李悦. "老字号品牌对城市意象影响力研究综述." 前沿 000.023(2010):96-98.',
  ],
  [
    "[36] 刘易斯・芒福德. 城市发展史:起源,演变和前景. 城市发展史：起源、演变和前景. 中国建筑工业出版社, 2005.",
  ],
  ["[37] 周露阳. 老字号的文化属性如何影响其延伸评价?. Diss. 浙江工商大学."],
  ['[38] 龚桂英. "北京餐饮业老字号的现状与发展对策." 商业文化 2(2014):18-21.'],
  ["[39] 赵伯陶. 市井文化刍议[J]. 学习与探索,1993(5):108-113."],
  [
    "[40] 侯凯. 天津南市地区市井空间及市井文化研究[D]. 天津:天津大学,2010. DOI:10.7666/d.y1925118.",
  ],
  ["[41] 高春光. 论老舍作品中的京味城市文化. Diss. 上海社会科学院, 2006."],
  [
    '[42] 于启莹. Beijing taste townspeople novel -- "Beijing Taste Resident Novel Three". Diss. 2008.',
  ],
  [
    '[43] 崔志远. "论邓友梅的京味小说." 中国现代文学研究丛刊 000.010(2011):159-171.',
  ],
  [
    "[44] Tosa N,Matsuoka S, Ellis B, Ueda H, Nakatsu R. Cultural computing with context-awareapplication. In: Kishino F, etal. Eds. ICEC 2005, LNCS 3711, 2005. 13-23.",
  ],
  [
    "[45] 赵海英, 贾耕云, and 潘志庚. 文化计算方法与应用综述. 计算机系统应用 25.006(2016):1-8.",
  ],
  [
    "[46] 苟秉宸,于辉,李振方,陈丽伶,王伟伟.半坡彩陶文化基因提取与设计应用研究.JOURNAL OF NORTHWESTERN POLYTECHNICAL UNIVERSTTY(社会科学版),2011,4:66-69,104",
  ],
  ["[47] 杨保安. 多目标决策分析理论、方法与应用研究. 东华大学出版社, 2008."],
  ["[48] 线索利用理论视角下的网络百科词条感知质量影响因素研究（录用定稿）"],
  [
    "[49] 李明泽, et al.The Factors of Articles’ Perceived Quality in the Internet Encyclopedia fromthe Perspective of Cue Utilization Theory.情报理论与实践 .():. doi:.",
  ],
];

/**
 * HKJC Tip Board — meetings → races → top3
 * Loads data/meetings.json; falls back to embedded EMBEDDED_DATA for file://
 */

const RANK_MARKS = { 1: "①", 2: "②", 3: "③" };
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

/** @type {typeof EMBEDDED_DATA} */
const EMBEDDED_DATA = {
  "meetings": [
    {
      "id": "20260919-s1",
      "date": "2026-09-19",
      "venue": "澳洲考菲爾德 · 羅柏奇勒爵士錦標賽馬日",
      "type": "overseas",
      "bettable": "馬會可投（S1）",
      "status": "已完成",
      "races": [
        {
          "no": "S1-6",
          "name": "功必有因錦標",
          "postTimeHkt": "13:00",
          "note": "賽果（已完）",
          "resulted": true,
          "top3": [],
          "result": [
            {
              "rank": 1,
              "number": 3,
              "nameZh": "北極角",
              "nameEn": "Point Barrow",
              "winOdds": 4.6
            },
            {
              "rank": 2,
              "number": 10,
              "nameZh": "新娘舞曲",
              "nameEn": "Bridal Waltz",
              "winOdds": 2.1
            },
            {
              "rank": 3,
              "number": 2,
              "nameZh": "慈悲之行",
              "nameEn": "Inkaruna",
              "winOdds": 15
            }
          ]
        },
        {
          "no": "S1-7",
          "name": "木下錦標",
          "postTimeHkt": "13:35",
          "note": "賽果（已完）",
          "resulted": true,
          "top3": [
            {
              "rank": 1,
              "number": 5,
              "nameZh": "星辰征駕",
              "nameEn": "Cosmic Crusader",
              "winOdds": 2.8
            },
            {
              "rank": 2,
              "number": 1,
              "nameZh": "力先生",
              "nameEn": "Lindermann",
              "winOdds": 3.5
            },
            {
              "rank": 3,
              "number": 6,
              "nameZh": "天鳥俠義",
              "nameEn": "Birdman",
              "winOdds": 5.5
            }
          ],
          "result": [
            {
              "rank": 1,
              "number": 6,
              "nameZh": "天鳥俠義",
              "nameEn": "Birdman",
              "winOdds": 6.2
            },
            {
              "rank": 2,
              "number": 5,
              "nameZh": "星辰征駕",
              "nameEn": "Cosmic Crusader",
              "winOdds": 2.3
            },
            {
              "rank": 3,
              "number": 3,
              "nameZh": "耗敵",
              "nameEn": "Attrition",
              "winOdds": 101
            }
          ]
        },
        {
          "no": "S1-8",
          "name": "自然派錦標",
          "postTimeHkt": "14:15",
          "note": "賽果（已完）",
          "resulted": true,
          "top3": [
            {
              "rank": 1,
              "number": 14,
              "nameZh": "Zahrann",
              "nameEn": "Zahrann",
              "winOdds": 4.5
            },
            {
              "rank": 2,
              "number": 3,
              "nameZh": "Saint George",
              "nameEn": "Saint George",
              "winOdds": 6
            },
            {
              "rank": 3,
              "nameZh": "Campaldino",
              "nameEn": "Campaldino",
              "winOdds": 14
            }
          ],
          "result": [
            {
              "rank": 1,
              "number": 14,
              "nameZh": "Zahrann",
              "nameEn": "Zahrann",
              "winOdds": 2.8
            },
            {
              "rank": 2,
              "number": 3,
              "nameZh": "Saint George",
              "nameEn": "Saint George",
              "winOdds": 3.6
            },
            {
              "rank": 3,
              "number": 2,
              "nameZh": "Asterix",
              "nameEn": "Asterix",
              "winOdds": 26
            }
          ]
        },
        {
          "no": "S1-9",
          "name": "羅柏奇勒爵士錦標",
          "postTimeHkt": "14:50",
          "note": "賽果（已完）",
          "resulted": true,
          "top3": [
            {
              "rank": 1,
              "nameZh": "星彩女兒",
              "nameEn": "Lady Shenandoah",
              "winOdds": 5
            },
            {
              "rank": 2,
              "nameZh": "天使資金",
              "nameEn": "Angel Capital",
              "winOdds": 7
            },
            {
              "rank": 3,
              "nameZh": "花之萼",
              "nameEn": "Sepals",
              "winOdds": 11
            }
          ],
          "result": [
            {
              "rank": 1,
              "number": 5,
              "nameZh": "天使資金",
              "nameEn": "Angel Capital",
              "winOdds": 7.3
            },
            {
              "rank": 2,
              "number": 3,
              "nameZh": "花之萼",
              "nameEn": "Sepals",
              "winOdds": 11
            },
            {
              "rank": 3,
              "number": 13,
              "nameZh": "Regal Award",
              "nameEn": "Regal Award",
              "winOdds": 7
            }
          ]
        },
        {
          "no": "S1-10",
          "name": "指標評分84讓賽",
          "postTimeHkt": "15:25",
          "note": "賽果（已完）",
          "resulted": true,
          "top3": [],
          "result": [
            {
              "rank": 1,
              "number": 9,
              "nameZh": "繁花浪",
              "winOdds": 12.7
            },
            {
              "rank": 2,
              "number": 5,
              "nameZh": "力勁速"
            },
            {
              "rank": 3,
              "number": 6,
              "nameZh": "發佈會"
            }
          ]
        }
      ]
    },
    {
      "id": "20260923-hv",
      "date": "2026-09-23",
      "venue": "跑馬地夜賽",
      "type": "local",
      "bettable": "本地賽事",
      "status": "全日完（第9場已完）",
      "races": [
        {
          "no": "1",
          "name": "南風讓賽",
          "postTimeHkt": "18:40",
          "distance": "1650米",
          "track": "草地 C／好地",
          "note": "賽果（已完）",
          "top3": [
            {
              "rank": 1,
              "number": 3,
              "nameZh": "神駒馬靈",
              "nameEn": "Soaring Bronco",
              "winOdds": 5.1
            },
            {
              "rank": 2,
              "number": 11,
              "nameZh": "東方魅影",
              "nameEn": "Oriental Surprise",
              "winOdds": 3.2
            },
            {
              "rank": 3,
              "number": 8,
              "nameZh": "電訊驕陽",
              "nameEn": "Telecom Power",
              "winOdds": 4.7
            }
          ],
          "predictedAt": "2026-09-23 18:17 HKT",
          "brief": {
            "bets": [
              "獨贏/位置 #3",
              "連贏/位置Q 3-11、3-8",
              "三重彩 3-11-8 匣"
            ],
            "confidence": "中高",
            "reasons": [
              "#3 近績 5/3/3/2/1，轉投廖房後穩定上名；今檔4、初戴眼罩，路程適性佳",
              "#11 潘頓、檔3、負119；近績常季軍亞軍，位置線穩但港未開齋",
              "#8 近績穩定，袁幸堯減10磅增程1650，盤口有值"
            ],
            "risks": "五班混戰；#6 開心三多外檔要位、#4 紅磚戰士內檔變數；#11 長期未贏或成位置馬"
          },
          "resulted": true,
          "result": [
            {
              "rank": 1,
              "number": 4,
              "nameZh": "紅磚戰士",
              "nameEn": "RED BRICK WARRIOR",
              "winOdds": 4.5
            },
            {
              "rank": 2,
              "number": 11,
              "nameZh": "東方魅影",
              "nameEn": "ORIENTAL SURPRISE",
              "winOdds": 3.8
            },
            {
              "rank": 3,
              "number": 10,
              "nameZh": "威威父子",
              "nameEn": "WINDICATOR FAMILY",
              "winOdds": 13
            }
          ],
          "cold3": [
            {
              "rank": 1,
              "number": 4,
              "nameZh": "紅磚戰士",
              "nameEn": "RED BRICK WARRIOR",
              "winOdds": 9.0
            },
            {
              "rank": 2,
              "number": 6,
              "nameZh": "開心三多",
              "nameEn": "",
              "winOdds": 10
            },
            {
              "rank": 3,
              "number": 10,
              "nameZh": "威威父子",
              "nameEn": "WINDICATOR FAMILY",
              "winOdds": 16
            }
          ]
        },
        {
          "no": "2",
          "name": "深水灣讓賽",
          "postTimeHkt": "19:10",
          "distance": "1200米",
          "track": "草地 C／好地",
          "note": "賽果（已完）",
          "top3": [
            {
              "rank": 1,
              "number": 10,
              "nameZh": "比特星",
              "nameEn": "Bits Superstar",
              "winOdds": 5.6
            },
            {
              "rank": 2,
              "number": 4,
              "nameZh": "馬馳登",
              "nameEn": "Matzden",
              "winOdds": 4.3
            },
            {
              "rank": 3,
              "number": 7,
              "nameZh": "銀刺勇士",
              "nameEn": "Silver Spurs",
              "winOdds": 8.3
            }
          ],
          "predictedAt": "2026-09-23 18:40 HKT",
          "brief": {
            "bets": [
              "獨贏/位置 #10",
              "連贏/位置Q 10-4、10-7",
              "三重彩 10-4-7 匣（可加#9）"
            ],
            "confidence": "中高",
            "reasons": [
              "#10 近績11/5/10/5/2/2；上仗出閘笨拙＋直路難望空受阻；今潘頓重配、檔5、負119，所期後上有力",
              "#4 近績2/4/5/2/4/6；上仗沙田復出亞軍狀態已起；檔7艾兆禮，1200適性佳，今仗預期可再爭勝",
              "#7 一檔搶位、黃智弘減3磅；早段速度快，C欄1200有利控速入位"
            ],
            "risks": "四班1200混戰；#9開心五月盤口熱門（上仗同場季軍）內欄爭勝；#3路路勁領放後乏力，步速變數大",
            "coldBets": [
              "冷獨/位 #5/#3/#8",
              "連贏 7-5、10-5、3-5",
              "三重彩軸7或3腳5/8/1"
            ]
          },
          "resulted": true,
          "result": [
            {
              "rank": 1,
              "number": 10,
              "nameZh": "比特星",
              "nameEn": "BITS SUPERSTAR",
              "winOdds": 6.3
            },
            {
              "rank": 2,
              "number": 11,
              "nameZh": "有盈勇士",
              "nameEn": "LEGEND STAR",
              "winOdds": 20
            },
            {
              "rank": 3,
              "number": 8,
              "nameZh": "鄉村威龍",
              "nameEn": "COUNTRY PRIDE",
              "winOdds": 12
            }
          ],
          "cold3": [
            {
              "rank": 1,
              "number": 5,
              "nameZh": "飛輪霸",
              "nameEn": "",
              "winOdds": 15
            },
            {
              "rank": 2,
              "number": 3,
              "nameZh": "路路勁",
              "nameEn": "",
              "winOdds": 9.6
            },
            {
              "rank": 3,
              "number": 8,
              "nameZh": "鄉村威龍",
              "nameEn": "COUNTRY PRIDE",
              "winOdds": 18
            }
          ]
        },
        {
          "no": "3",
          "name": "黃竹坑讓賽",
          "postTimeHkt": "19:40",
          "distance": "1650米",
          "track": "草地 C／好地",
          "note": "賽果（已完）",
          "top3": [
            {
              "rank": 1,
              "number": 5,
              "nameZh": "凝妙星",
              "nameEn": "Amazing Gaze",
              "winOdds": 4.1
            },
            {
              "rank": 2,
              "number": 2,
              "nameZh": "贏玥",
              "nameEn": "Shooting To Top",
              "winOdds": 5.4
            },
            {
              "rank": 3,
              "number": 8,
              "nameZh": "蹺妙",
              "nameEn": "Akermanis Gold",
              "winOdds": 5.2
            }
          ],
          "predictedAt": "2026-09-23 19:16 HKT",
          "brief": {
            "bets": [
              "獨贏/位置 #5",
              "連贏/位置Q 5-2、5-8",
              "三重彩 5-2-8 匣（可加#7）"
            ],
            "confidence": "中高",
            "reasons": [
              "#5 近績1/6/6/6/8/3；今季初出同程谷草1650一勝開齋；檔3奧爾民，路程適性已證，所期再爭連捷（評分+8為主要顧慮）",
              "#2 近績6/2/4/5/1/6；上仗大部分途程無遮擋走外疊仍有跑；今潘頓、檔7（與之前勝仗同檔），磅勢穩定，今仗預期可覓更佳走勢",
              "#8 近績5/9/6/9/6/9；上季末同程外檔閃入第五屬個人最佳；今檔2＋周俊樂減2磅、評分-4，試閘理想，步速圖有利貼欄"
            ],
            "risks": "四班1650混戰；#5 升8分後連捷難度升；#7 有情有義檔4減磅有力攪局；盤口#5/#2/#8 接近，冷門#9內欄變數",
            "coldBets": [
              "冷獨/位 #7",
              "連贏 5-7、2-7"
            ]
          },
          "cold3": [
            {
              "rank": 1,
              "number": 7,
              "nameZh": "有情有義",
              "nameEn": "",
              "winOdds": null
            }
          ],
          "resulted": true,
          "result": [
            {
              "rank": 1,
              "number": 8,
              "nameZh": "蹺妙",
              "nameEn": "AKERMANIS GOLD",
              "winOdds": 4.4
            },
            {
              "rank": 2,
              "number": 2,
              "nameZh": "贏玥",
              "nameEn": "SHOOTING TO TOP",
              "winOdds": null
            },
            {
              "rank": 3,
              "number": 12,
              "nameZh": "得意佳作",
              "nameEn": "SURE JOYFUL",
              "winOdds": null
            }
          ]
        },
        {
          "no": "4",
          "name": "深水灣讓賽",
          "postTimeHkt": "20:10",
          "distance": "1200米",
          "track": "草地 C／好地",
          "note": "賽果（已完）",
          "top3": [
            {
              "rank": 1,
              "number": 6,
              "nameZh": "快樂神駒",
              "nameEn": "Cloud Nine",
              "winOdds": 1.7
            },
            {
              "rank": 2,
              "number": 4,
              "nameZh": "星辰千帥",
              "nameEn": "Brownneedsfurther",
              "winOdds": 9.4
            },
            {
              "rank": 3,
              "number": 9,
              "nameZh": "將傲",
              "nameEn": "Will Power",
              "winOdds": 7.6
            }
          ],
          "predictedAt": "2026-09-23 19:46 HKT",
          "cold3": [
            {
              "rank": 1,
              "number": 11,
              "nameZh": "焦點",
              "nameEn": "Podium",
              "winOdds": 14
            },
            {
              "rank": 2,
              "number": 1,
              "nameZh": "沙井之友",
              "nameEn": "Friends Of Shajing",
              "winOdds": 7.0
            },
            {
              "rank": 3,
              "number": 8,
              "nameZh": "禪勝閃亮",
              "nameEn": "",
              "winOdds": 21
            }
          ],
          "brief": {
            "bets": [
              "獨贏/位置 #6",
              "連贏/位置Q 6-4、6-9",
              "三重彩 6-4-9 匣（可加#1）"
            ],
            "confidence": "中高（熱門濃）",
            "reasons": [
              "#6 近績4/2/12/4/2/4；上季谷草1200兩亞一季未開齋，上仗外檔受阻第四；今檔2＋潘頓初配（曾試閘第二），所期貼欄跟前有力轉勝；貼士指數最佳、獨贏約1.7",
              "#4 近績1/2/5/2/11/3；谷草1200場同程勝出紀錄（同場1-3-1），評分+5磅增；檔6艾道拿，今仗預期再爭位置；#3/#7退出後盤口有值",
              "#9 近績4/4/3/7；檔4奧爾民、負126較輕，配備XB/H/P；貼士指數次熱門之一，今仗預期可跟步入位"
            ],
            "risks": "#6 獨贏約1.7過熱，賠率薄；#3應龍飛影、#7震撼人心已退出改圖；#1沙井之友急再出＋外檔變數；#11一檔可攪局",
            "coldBets": [
              "冷獨/位 #11/#1",
              "連贏 6-11、6-1",
              "三重彩軸6腳11/1/8"
            ]
          },
          "resulted": true,
          "result": [
            {
              "rank": 1,
              "number": 4,
              "nameZh": "星辰千帥",
              "nameEn": "BROWNNEEDSFURTHER",
              "winOdds": 10.3
            },
            {
              "rank": 2,
              "number": 6,
              "nameZh": "快樂神駒",
              "nameEn": "CLOUD NINE",
              "winOdds": null
            },
            {
              "rank": 3,
              "number": 1,
              "nameZh": "沙井之友",
              "nameEn": "FRIENDS OF SHAJING",
              "winOdds": null
            }
          ]
        },
        {
          "no": "5",
          "name": "香港鄉村俱樂部挑戰盃（讓賽）",
          "postTimeHkt": "20:40",
          "distance": "1650米",
          "track": "草地 C／好地",
          "note": "賽果（已完）",
          "top3": [
            {
              "rank": 1,
              "number": 5,
              "nameZh": "創科群英",
              "nameEn": "Inno Super",
              "winOdds": 4.8
            },
            {
              "rank": 2,
              "number": 6,
              "nameZh": "越駿聯歡",
              "nameEn": "Happy Smile",
              "winOdds": 5.3
            },
            {
              "rank": 3,
              "number": 7,
              "nameZh": "滿洛城",
              "nameEn": "Dashing Maurison",
              "winOdds": 7.7
            }
          ],
          "resulted": true,
          "cold3": [
            {
              "rank": 1,
              "number": 3,
              "nameZh": "大學生",
              "nameEn": "Ivy League",
              "winOdds": 9.0
            },
            {
              "rank": 2,
              "number": 4,
              "nameZh": "赤風驪",
              "nameEn": "Vermilion Tempest",
              "winOdds": 12
            },
            {
              "rank": 3,
              "number": 8,
              "nameZh": "金駒永騰",
              "nameEn": "Luck Is Back",
              "winOdds": 11
            }
          ],
          "predictedAt": "2026-09-23 20:22 HKT",
          "brief": {
            "bets": [
              "獨贏/位置 #5",
              "連贏/位置Q 5-6、5-7",
              "三重彩 5為軸配 6/7/3（可加#4）"
            ],
            "confidence": "中（散盤開放）",
            "reasons": [
              "#5創科群英 近績3/3/6/6/8/1；上仗谷草1650第三（熱身後再同程），往績同程曾勝（2月檔1），今檔3＋周俊樂減2負126，所期跟前／中間位有力轉勝；貼士指數最佳、獨贏約4.8，Flame／Standard均有捧",
              "#6越駿聯歡 近績3/6/5/6；出道未勝但場場有獎金，初戰谷草1650殺入季席；今檔6梁家俊負124，所期再跟步入位；賠率約5.3次熱、貼士指數次席",
              "#7滿洛城 近績6/2/1/9/6/6；重返四班後取勝＋亞（谷草1650／1800適性佳），今檔7班德禮負123戴B，所期中前位爭位置；Flame亦點名不可輕視"
            ],
            "risks": "散盤無絕對大熱；#9爆竹上季末領放勝但檔11吃虧；#3大學生一檔＋減分重戴鼻箍可反彈攪局；#4赤風驪低檔Standard首選但中文貼士較淡；步速若慢可能利前領",
            "coldBets": [
              "冷獨/位 #3/#4/#8",
              "連贏 5-3、5-4",
              "三重彩軸5腳3/4/8"
            ]
          },
          "result": [
            {
              "rank": 1,
              "number": 6,
              "nameZh": "越駿聯歡",
              "nameEn": "HAPPY SMILE",
              "winOdds": 8.7
            },
            {
              "rank": 2,
              "number": 12,
              "nameZh": "同心",
              "nameEn": "GAZELEY",
              "winOdds": null
            },
            {
              "rank": 3,
              "number": 1,
              "nameZh": "本領非凡",
              "nameEn": "GLORIOUS JOURNEY",
              "winOdds": null
            }
          ]
        },
        {
          "no": "6",
          "name": "香島讓賽",
          "postTimeHkt": "21:10",
          "distance": "1000米",
          "track": "草地 C／好地",
          "note": "賽果（已完）",
          "top3": [
            {
              "rank": 1,
              "number": 4,
              "nameZh": "巴閉王",
              "nameEn": "Superb King",
              "winOdds": 2.9
            },
            {
              "rank": 2,
              "number": 1,
              "nameZh": "福進",
              "nameEn": "Jumbo Blessing",
              "winOdds": 3.1
            },
            {
              "rank": 3,
              "number": 5,
              "nameZh": "佐治傳奇",
              "nameEn": "Georgian Sigma",
              "winOdds": 9.3
            }
          ],
          "cold3": [
            {
              "rank": 1,
              "number": 12,
              "nameZh": "馬運高",
              "nameEn": "Mapogo",
              "winOdds": 5.7
            },
            {
              "rank": 2,
              "number": 9,
              "nameZh": "天火同人",
              "nameEn": "Harmony Fire",
              "winOdds": 13
            },
            {
              "rank": 3,
              "number": 11,
              "nameZh": "萬眾開心",
              "nameEn": "Happy United",
              "winOdds": 21
            }
          ],
          "resulted": true,
          "predictedAt": "2026-09-23 20:57 HKT",
          "brief": {
            "bets": [
              "獨贏/位置 #4",
              "連贏/位置Q 4-1、4-5",
              "三重彩 4為軸配 1/5/12"
            ],
            "confidence": "中高（雙熱對壘）",
            "reasons": [
              "#4巴閉王 近績2/6/4/2/2/3；上仗谷草1000外疊仍亞軍（輸冠軍僅¾），今檔3＋周俊樂減2負131，所期貼欄跟前有力轉勝；獨贏約2.9大熱、貼士指數次席（賽日約3.1）",
              "#1福進 近績1/1/6/4/7/5；上仗同程同班勝出（獨贏約5.4），今檔6何澤堯但評分+7負頂磅135，所期仍具班次優勢爭勝；貼士指數最佳（約3.0）、獨贏約3.1",
              "#5佐治傳奇 近績3/7/3/3/3/4；上仗同場季席，往績谷草1000穩定入位；今檔12外吃虧但艾兆禮續配負128，所期中後位追擊爭位置；貼士指數第三（約8.1）、獨贏約9.3"
            ],
            "risks": "#4/#1 雙熱壓縮賠率；#5檔12谷草1000起步吃虧；#12馬運高一檔＋輕磅118盤口縮至約5.7可攪局；#9天火同人上仗同場第四＋黃寶妮減7；步速若亂利跟前列",
            "coldBets": [
              "冷獨/位 #12/#9/#11",
              "連贏 4-12、1-12",
              "三重彩軸4腳12/9/11"
            ]
          },
          "result": [
            {
              "rank": 1,
              "number": 1,
              "nameZh": "福進",
              "nameEn": "JUMBO BLESSING",
              "winOdds": 3.5
            },
            {
              "rank": 2,
              "number": 5,
              "nameZh": "佐治傳奇",
              "nameEn": "GEORGIAN SIGMA",
              "winOdds": 4.0
            },
            {
              "rank": 3,
              "number": 4,
              "nameZh": "巴閉王",
              "nameEn": "SUPERB KING",
              "winOdds": 2.6
            }
          ]
        },
        {
          "no": "7",
          "name": "畢拿山讓賽",
          "postTimeHkt": "21:45",
          "distance": "1200米",
          "track": "草地 C／好地",
          "note": "賽果（已完）",
          "top3": [
            {
              "rank": 1,
              "number": 1,
              "nameZh": "東來欣賞",
              "nameEn": "Flying Wrote",
              "winOdds": 4.5
            },
            {
              "rank": 2,
              "number": 3,
              "nameZh": "天星",
              "nameEn": "Akashvani",
              "winOdds": 7.3
            },
            {
              "rank": 3,
              "number": 8,
              "nameZh": "首飾悟空",
              "nameEn": "Wukong Jewellery",
              "winOdds": 3.8
            }
          ],
          "resulted": true,
          "predictedAt": "2026-09-23 21:33 HKT",
          "cold3": [
            {
              "rank": 1,
              "number": 12,
              "nameZh": "丞匡掠影",
              "nameEn": "Daryl Flash",
              "winOdds": 5.8
            },
            {
              "rank": 2,
              "number": 2,
              "nameZh": "乘數表",
              "nameEn": "Symbol Of Strength",
              "winOdds": 11
            },
            {
              "rank": 3,
              "number": 9,
              "nameZh": "安康萬里",
              "nameEn": "King Miles",
              "winOdds": 15
            }
          ],
          "brief": {
            "bets": [
              "獨贏/位置 #1",
              "連贏/位置Q 1-3、1-8",
              "三重彩 1為軸配 3/8/12"
            ],
            "confidence": "中（貼士與大熱分歧）",
            "reasons": [
              "#1東來欣賞 近績9/2/1/2/5/6；谷草1200專家（5月A草勝、6月C+3亞、4月C草亞），上仗檔9碰撞＋天雨鬆軟失準，賽後無異；今檔4＋周俊樂減2負134，所期跟前／中間位反彈爭勝；賽日貼士指數最佳（4.0）、獨贏約4.5",
              "#3天星 近績6/13/8/10/7/6；近況平平但賽日貼士指數次席（4.6），今檔10外疊配潘頓負133戴B，所期從後覆上爭位置；獨贏約7.3屬貼士／賠率錯位值博",
              "#8首飾悟空 近績2/5/8/12/1/6；上仗沙田1200亞軍後休約192日（曾流鼻血，其後試閘及格），今檔2＋艾兆禮負124，所期貼欄跟前；市場大熱約3.8但賽日貼士指數僅7.6，新鮮度風險"
            ],
            "risks": "#8大熱久休不確定；#3檔10谷草1200起步吃虧；#12丞匡掠影盤口約5.8但近績疲弱、貼士指數10.3可攪；#2乘數表檔3亦有人氣；步速若慢利#8/#1跟前列",
            "coldBets": [
              "冷獨/位 #12/#2/#9",
              "連贏 1-12、3-12",
              "三重彩軸1腳12/2/9"
            ]
          },
          "result": [
            {
              "rank": 1,
              "number": 11,
              "nameZh": "盈妍威楓",
              "nameEn": "PRESTIGE ALWAYS",
              "winOdds": 8.1
            },
            {
              "rank": 2,
              "number": 12,
              "nameZh": "丞匡掠影",
              "nameEn": "DARYL FLASH",
              "winOdds": 3.5
            },
            {
              "rank": 3,
              "number": 8,
              "nameZh": "首飾悟空",
              "nameEn": "WUKONG JEWELLERY",
              "winOdds": 5.9
            }
          ]
        },
        {
          "no": "8",
          "name": "畢拿山讓賽",
          "postTimeHkt": "22:15",
          "distance": "1200米",
          "track": "草地 C／好地",
          "note": "賽果（已完）",
          "top3": [],
          "result": [
            {
              "rank": 1,
              "number": 8,
              "nameZh": "繼往開來",
              "nameEn": "DANICA'S CHOICE",
              "winOdds": 2.0
            },
            {
              "rank": 2,
              "number": 11,
              "nameZh": "驕陽雄心",
              "nameEn": "LEADING AGILITY",
              "winOdds": 6.5
            },
            {
              "rank": 3,
              "number": 6,
              "nameZh": "富國兄弟",
              "nameEn": "THRIVING BROTHERS",
              "winOdds": 22
            }
          ],
          "resulted": true
        },
        {
          "no": "9",
          "name": "大坑讓賽",
          "postTimeHkt": "22:50",
          "distance": "1800米",
          "track": "草地 C／好地",
          "note": "賽果（已完）",
          "top3": [
            {
              "rank": 1,
              "number": 10,
              "nameZh": "風將",
              "nameEn": "Windlord",
              "winOdds": 5.4
            },
            {
              "rank": 2,
              "number": 2,
              "nameZh": "紫荊傳令",
              "nameEn": "Seraph Gabriel",
              "winOdds": 2.8
            },
            {
              "rank": 3,
              "number": 1,
              "nameZh": "嘉應傳承",
              "nameEn": "Ka Ying Generation",
              "winOdds": 8.1
            }
          ],
          "cold3": [
            {
              "rank": 1,
              "number": 6,
              "nameZh": "將義",
              "nameEn": "Fortunate Son",
              "winOdds": 11
            },
            {
              "rank": 2,
              "number": 9,
              "nameZh": "中國心",
              "nameEn": "China Win",
              "winOdds": 8.4
            },
            {
              "rank": 3,
              "number": 3,
              "nameZh": "凌登",
              "nameEn": "Without Compare",
              "winOdds": 16
            }
          ],
          "brief": {
            "bets": [
              "獨贏/位置 #10",
              "連贏/位置Q 10-2、10-1",
              "三重彩 10為軸配 2/1/6"
            ],
            "confidence": "中（貼士捧#10、市場捧#2）",
            "reasons": [
              "#10風將 近績2/9/13/7/10/7；轉投告東尼首仗谷草1650檔12仍亞軍（獨贏12），直線受阻仍追近；今檔10外疊但輕磅122蔡明紹續配，所期中後位覆上爭勝；賽日貼士指數最佳（3.9）、獨贏約5.4",
              "#2紫荊傳令 近績4/7/5/12/2/11；打吡第五＋上季末沙田1800外疊第四，試閘回勇首戰跑馬地，潘頓重配負135檔5；所期中間位首次谷草衝關；市場大熱約2.8、賽日貼士指數5.3",
              "#1嘉應傳承 近績5/7/2/3/7/7；上季多跑二班／分組賽今落三班，檔1谷草1800地利＋艾兆禮負135；所期貼欄跟前／中間位反彈爭位；賽日貼士指數第三（6.2）、獨贏約8.1"
            ],
            "risks": "#2大熱壓縮賠率且首戰跑馬地未證適性；#10檔10谷草1800起步吃虧；#6將義上仗同班勝出評分+6盤口約11可攪；#9中國心上仗季席但檔11；#7浪漫鬥士貼士指數99／市場淡倉",
            "coldBets": [
              "冷獨/位 #6/#9/#3",
              "連贏 10-6、2-6",
              "三重彩軸10腳6/9/3"
            ]
          },
          "predictedAt": "2026-09-23 22:35 HKT",
          "resulted": true,
          "result": [
            {
              "rank": 1,
              "number": 6,
              "nameZh": "將義",
              "nameEn": "Fortunate Son",
              "winOdds": 11
            },
            {
              "rank": 2,
              "number": 5,
              "nameZh": "好實力",
              "nameEn": "Fivefortwo",
              "winOdds": 24
            },
            {
              "rank": 3,
              "number": 2,
              "nameZh": "紫荊傳令",
              "nameEn": "Seraph Gabriel",
              "winOdds": 4.4
            }
          ]
        }
      ],
      "updatedAt": "2026-09-23 23:27 HKT"
    },
    {
      "id": "20260926-s1",
      "date": "2026-09-26",
      "venue": "澳洲玫瑰崗 · 金玫瑰錦標日",
      "type": "overseas",
      "bettable": "馬會可投（S1）",
      "status": "進行中（S1-6 預測已出）",
      "races": [
        {
          "no": "S1-6",
          "name": "Grant Burge Heritage Stakes（G3）",
          "postTimeHkt": "12:50",
          "distance": "1100米",
          "track": "草地／Good 4（Racing Australia）",
          "note": "預測已出",
          "resulted": false,
          "predictedAt": "2026-09-26 12:15 HKT",
          "top3": [
            {
              "rank": 1,
              "number": 1,
              "nameZh": "Blue Door",
              "nameEn": "Blue Door",
              "winOdds": 1.8
            },
            {
              "rank": 2,
              "number": 3,
              "nameZh": "Omolong",
              "nameEn": "Omolong",
              "winOdds": 4.0
            },
            {
              "rank": 3,
              "number": 5,
              "nameZh": "Our Emperor",
              "nameEn": "Our Emperor",
              "winOdds": 7.5
            }
          ],
          "cold3": [
            {
              "rank": 1,
              "number": 7,
              "nameZh": "Ciaron's Star",
              "nameEn": "Ciaron's Star",
              "winOdds": 14
            },
            {
              "rank": 2,
              "number": 2,
              "nameZh": "Half Pipe",
              "nameEn": "Half Pipe",
              "winOdds": 10
            },
            {
              "rank": 3,
              "number": 4,
              "nameZh": "Outspan",
              "nameEn": "Outspan",
              "winOdds": 18
            }
          ],
          "brief": {
            "bets": [
              "獨贏/位置 #1 Blue Door",
              "連贏/位置Q 1-3、1-5",
              "三重彩 1為軸配 3/5/7"
            ],
            "confidence": "中高（熱門濃；貼士與 SEN AI 略有分歧）",
            "reasons": [
              "#1 Blue Door 近績 1x22；復出後兩仗均亞軍，曾交手 Chilly Girl／Guest House 等強敵；今檔6＋Nash Rawiller 負56.5，路程1100適性已證。所期表現：中前位跟步，月餘休息後再衝關。Canberra Times／RSN Miles／GoBet 均捧獨贏；JustHorseRacing 報獨贏約1.8大熱。",
              "#3 Omolong 近績 11x；兩出兩勝均跑1100（Warwick Farm／Rosehill），週二試閘保狀態；今檔5＋James McDonald 負56。所期表現：後上／中間位再展末段。SEN AI Winner、Neds 主推；與大熱形成貼士分歧值博。",
              "#5 Our Emperor 近績 1x；5月重地 Warwick Farm 新馬一勝後休養，試閘理想；今檔8＋Tim Clark、Waterhouse/Bott 房。所期表現：新鮮度＋班次跳升有變數，但一勝幅度大，位置線有值。SEN AI best value、Canberra Times 次選提及。"
            ],
            "risks": "小場8匹但 #1 獨贏約1.8過熱；SEN AI 捧 #3 與市場大熱分歧。#6 Freshman 無往績（NZ）變數；#7 Ciaron's Star 上季 G2/G3 有跑可冷門攪局；步速若慢利前領 #1。",
            "coldBets": [
              "冷獨/位 #7/#2/#4",
              "連贏 1-7、3-7",
              "三重彩軸1腳7/2/4"
            ],
            "sources": [
              "Racing Australia final fields / results (Good 4)",
              "Canberra Times Rosehill tips (24 Sep): Blue Door WIN",
              "RSN/SEN AI (23 Sep): Winner Omolong; value Our Emperor; roughie Ciaron's Star; Top4 3-1-5-7",
              "RSN tip sheet: Miles Pfitzner R6 Blue Door",
              "GoBet / Neds previews; JustHorseRacing odds ~Blue Door $1.80 / Omolong $4"
            ]
          }
        }
      ],
      "updatedAt": "2026-09-26 12:15 HKT"
    }
  ],
  "calendarDays": [
    {
      "date": "2026-09-06",
      "label": "沙田",
      "type": "local"
    },
    {
      "date": "2026-09-09",
      "label": "跑馬地",
      "type": "local"
    },
    {
      "date": "2026-09-13",
      "label": "沙田",
      "type": "local"
    },
    {
      "date": "2026-09-16",
      "label": "跑馬地",
      "type": "local"
    },
    {
      "date": "2026-09-19",
      "label": "海外S1",
      "type": "overseas"
    },
    {
      "date": "2026-09-23",
      "label": "跑馬地",
      "type": "local"
    },
    {
      "date": "2026-09-26",
      "label": "海外玫瑰崗",
      "type": "overseas"
    },
    {
      "date": "2026-09-27",
      "label": "沙田",
      "type": "local"
    }
  ],
  "updatedAt": "2026-09-26 12:15 HKT"
};
const state = {
  data: null,
  view: "meetings", // "meetings" | "races"
  meetingId: null,
  calYear: null,
  calMonth: null, // 0-indexed
  resultsOpen: false, // mobile collapsible 「賽果」
};

const $ = (sel) => document.querySelector(sel);

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function isoFromYMD(y, m0, d) {
  return `${y}-${pad2(m0 + 1)}-${pad2(d)}`;
}

function todayIsoHkt() {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Hong_Kong",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  } catch {
    const d = new Date();
    return isoFromYMD(d.getFullYear(), d.getMonth(), d.getDate());
  }
}

function statusClass(status) {
  if (!status) return "pending";
  if (status.includes("進行") || status.includes("直播") || status.includes("賽中")) {
    return "live";
  }
  return "pending";
}

function isOverseasMeeting(m) {
  return (
    m.type === "overseas" ||
    (m.venue || "").includes("海外") ||
    (m.bettable || "").includes("馬會可投")
  );
}

function formatOdds(val) {
  if (val == null || val === "") return null;
  const n = typeof val === "number" ? val : parseFloat(String(val).replace(/\$/g, ""));
  if (!Number.isFinite(n)) {
    const s = String(val).trim();
    return s ? (s.startsWith("$") ? s : `$${s}`) : null;
  }
  const formatted = Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, "");
  return `$${formatted}`;
}

/** Merge calendarDays + meeting dates → Map<iso, { types, labels, meetingIds }> */
function buildDayIndex() {
  const map = new Map();
  const ensure = (date) => {
    if (!map.has(date)) {
      map.set(date, { types: new Set(), labels: [], meetingIds: [] });
    }
    return map.get(date);
  };

  for (const cd of state.data.calendarDays || []) {
    if (!cd || !cd.date) continue;
    const e = ensure(cd.date);
    const t = cd.type === "overseas" ? "overseas" : "local";
    e.types.add(t);
    if (cd.label) e.labels.push(cd.label);
  }

  for (const m of state.data.meetings || []) {
    if (!m || !m.date) continue;
    const e = ensure(m.date);
    e.types.add(isOverseasMeeting(m) ? "overseas" : "local");
    if (m.id) e.meetingIds.push(m.id);
  }

  return map;
}

function defaultCalendarMonth() {
  const today = todayIsoHkt();
  const [ty, tm] = today.split("-").map((x) => parseInt(x, 10));
  const meetings = state.data.meetings || [];
  const calDays = state.data.calendarDays || [];
  const allDates = [
    ...meetings.map((m) => m.date).filter(Boolean),
    ...calDays.map((c) => c.date).filter(Boolean),
  ].sort();

  // Prefer current month if it has race days; else first meeting/calendar month
  const hasThisMonth = allDates.some((d) => d.startsWith(`${ty}-${pad2(tm)}`));
  if (hasThisMonth || !allDates.length) {
    return { year: ty, month: tm - 1 };
  }
  const [fy, fm] = allDates[0].split("-").map((x) => parseInt(x, 10));
  return { year: fy, month: fm - 1 };
}

function ensureCalMonth() {
  if (state.calYear == null || state.calMonth == null) {
    const d = defaultCalendarMonth();
    state.calYear = d.year;
    state.calMonth = d.month;
  }
}

function showToast(msg) {
  let el = $("#toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove("show"), 2200);
}

async function loadData() {
  try {
    const res = await fetch("data/meetings.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json || !Array.isArray(json.meetings)) throw new Error("Invalid schema");
    return json;
  } catch (err) {
    console.warn("fetch meetings.json failed, using embedded data:", err.message);
    return EMBEDDED_DATA;
  }
}

function renderCalendar() {
  ensureCalMonth();
  const y = state.calYear;
  const m0 = state.calMonth;
  const dayIndex = buildDayIndex();
  const today = todayIsoHkt();

  const firstDow = new Date(y, m0, 1).getDay();
  const daysInMonth = new Date(y, m0 + 1, 0).getDate();
  const title = `${y}年${m0 + 1}月`;

  const cells = [];
  for (let i = 0; i < firstDow; i++) {
    cells.push(`<div class="cal-cell empty" aria-hidden="true"></div>`);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const iso = isoFromYMD(y, m0, d);
    const info = dayIndex.get(iso);
    const isToday = iso === today;
    const hasRace = !!info;
    const hasMeeting = info && info.meetingIds.length > 0;
    const types = info ? [...info.types] : [];
    const typeClass = types.includes("overseas") && types.includes("local")
      ? "both"
      : types.includes("overseas")
        ? "overseas"
        : types.includes("local")
          ? "local"
          : "";

    const dots = types.length
      ? `<span class="cal-dots">${types
          .map((t) => `<span class="cal-dot ${t}" title="${t === "overseas" ? "海外" : "本地"}"></span>`)
          .join("")}</span>`
      : "";

    const label = info && info.labels[0]
      ? `<span class="cal-day-label">${escapeHtml(info.labels[0])}</span>`
      : "";

    const classes = [
      "cal-cell",
      hasRace ? "race-day" : "",
      hasMeeting ? "has-meeting" : "",
      isToday ? "today" : "",
      typeClass,
    ]
      .filter(Boolean)
      .join(" ");

    const clickable = hasRace ? `data-date="${escapeAttr(iso)}" role="button" tabindex="0"` : "";

    cells.push(`
      <div class="${classes}" ${clickable} aria-label="${escapeAttr(iso)}${hasRace ? " 賽日" : ""}">
        <span class="cal-num">${d}</span>
        ${dots}
        ${label}
      </div>
    `);
  }

  return `
    <section class="calendar-panel" aria-label="賽日月曆">
      <div class="cal-header">
        <button type="button" class="cal-nav" id="cal-prev" aria-label="上一個月">‹</button>
        <h2 class="cal-title">${escapeHtml(title)}</h2>
        <button type="button" class="cal-nav" id="cal-next" aria-label="下一個月">›</button>
      </div>
      <div class="cal-weekdays">
        ${WEEKDAYS.map((w) => `<div class="cal-wd">${w}</div>`).join("")}
      </div>
      <div class="cal-grid">
        ${cells.join("")}
      </div>
      <div class="cal-legend">
        <span><i class="cal-dot local"></i> 本地</span>
        <span><i class="cal-dot overseas"></i> 海外</span>
      </div>
    </section>
  `;
}

function bindCalendarEvents(root) {
  const prev = root.querySelector("#cal-prev");
  const next = root.querySelector("#cal-next");
  if (prev) {
    prev.addEventListener("click", () => {
      state.calMonth -= 1;
      if (state.calMonth < 0) {
        state.calMonth = 11;
        state.calYear -= 1;
      }
      render();
    });
  }
  if (next) {
    next.addEventListener("click", () => {
      state.calMonth += 1;
      if (state.calMonth > 11) {
        state.calMonth = 0;
        state.calYear += 1;
      }
      render();
    });
  }

  const dayIndex = buildDayIndex();
  root.querySelectorAll(".cal-cell.race-day").forEach((cell) => {
    const open = () => {
      const iso = cell.dataset.date;
      const info = dayIndex.get(iso);
      if (!info) return;
      if (info.meetingIds.length) {
        state.meetingId = info.meetingIds[0];
        state.view = "races";
        render();
      } else {
        showToast("未有預測");
      }
    };
    cell.addEventListener("click", open);
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}


/** Official finishing places for a race (never overwrite tip top3). */
function getRaceResult(race) {
  if (!race) return [];
  if (Array.isArray(race.result) && race.result.length) {
    return [...race.result].sort((a, b) => (a.rank || 0) - (b.rank || 0));
  }
  return [];
}

/** Race has official results — result[], resulted, or note「賽果」 */
function isResultedRace(race) {
  if (!race) return false;
  if (race.resulted === true) return true;
  if (Array.isArray(race.result) && race.result.length) return true;
  const note = race.note != null ? String(race.note) : "";
  if (note.includes("賽果")) return true;
  const st = race.status != null ? String(race.status) : "";
  if (st && /(已完|完賽|賽果|finished|resulted)/i.test(st)) return true;
  return false;
}

function shortRaceName(name) {
  if (!name) return "";
  const s = String(name).trim();
  return s.length > 14 ? s.slice(0, 14) + "…" : s;
}

/** Meeting whose results should appear in the sidebar */
function getResultsMeeting() {
  const meetings = state.data && state.data.meetings ? state.data.meetings : [];
  if (state.view === "races" && state.meetingId) {
    return meetings.find((m) => m.id === state.meetingId) || null;
  }
  // Home: latest by date; prefer one that already has results
  const sorted = [...meetings].sort((a, b) =>
    String(b.date || "").localeCompare(String(a.date || ""))
  );
  const withResults = sorted.find((m) =>
    (m.races || []).some(isResultedRace)
  );
  return withResults || sorted[0] || null;
}

function renderResultPlace(h) {
  const rank = h.rank || 0;
  const mark = RANK_MARKS[rank] || String(rank);
  const winFmt = formatOdds(h.winOdds);
  const odds = winFmt
    ? `<span class="wo">${escapeHtml(winFmt)}</span>`
    : `<span class="wo"></span>`;
  return `
    <li class="result-place r${rank}">
      <span class="rm r${rank}">${mark}</span>
      <span class="sn">${escapeHtml(h.number != null && h.number !== "" ? String(h.number) : "—")}</span>
      <span class="hz">${escapeHtml(h.nameZh || "")}</span>
      ${odds}
    </li>
  `;
}

function renderResultRow(race) {
  const placesArr = getRaceResult(race);
  const places = placesArr.length
    ? `<ul class="result-places">${placesArr.map(renderResultPlace).join("")}</ul>`
    : `<div class="results-empty" style="padding:0.35rem 0;letter-spacing:0.06em;font-size:0.8rem">—</div>`;

  return `
    <article class="result-row">
      <div class="result-race-head">
        <span class="result-race-no">${escapeHtml(String(race.no))}</span>
        <span class="result-race-name">${escapeHtml(shortRaceName(race.name))}</span>
      </div>
      ${places}
    </article>
  `;
}

function renderResultsSidebar() {
  const body = $("#results-body");
  const countEl = $("#results-count");
  const sidebar = $("#results-sidebar");
  const panel = $("#results-panel");
  if (!body || !sidebar) return;

  const meeting = getResultsMeeting();
  const resulted = meeting
    ? (meeting.races || []).filter(isResultedRace)
    : [];

  if (countEl) {
    countEl.textContent = resulted.length
      ? `${resulted.length} 場`
      : "";
  }

  if (!resulted.length) {
    body.innerHTML = `<div class="results-empty">暫未有賽果</div>`;
  } else {
    body.innerHTML = resulted.map(renderResultRow).join("");
  }

  // Mobile: honour collapse; desktop CSS forces panel visible
  if (panel) {
    if (state.resultsOpen) {
      panel.removeAttribute("hidden");
      sidebar.classList.add("is-open");
    } else {
      panel.setAttribute("hidden", "");
      sidebar.classList.remove("is-open");
    }
  }

  const toggle = $("#results-toggle");
  if (toggle) {
    toggle.setAttribute("aria-expanded", state.resultsOpen ? "true" : "false");
  }
}

function renderMeetings() {
  const list = $("#view-meetings");
  const racesView = $("#view-races");
  const nav = $("#nav-bar");
  list.classList.remove("hidden");
  racesView.classList.add("hidden");
  nav.classList.add("hidden");

  const meetings = state.data.meetings || [];
  const calHtml = renderCalendar();

  let listHtml;
  if (!meetings.length) {
    listHtml = `<div class="state-msg">暫無賽日資料</div>`;
  } else {
    listHtml = `
      <div class="meeting-list-inner">
        <h2 class="section-heading">賽日列表</h2>
        ${meetings
          .map((m) => {
            const raceCount = (m.races || []).length;
            const sc = statusClass(m.status);
            const overseas = isOverseasMeeting(m);
            const typeClass = overseas ? "overseas" : "local";
            const typeLabel = escapeHtml(
              m.bettable || (overseas ? "馬會可投海外賽" : "本地賽事")
            );
            return `
              <button type="button" class="meeting-card" data-id="${escapeAttr(m.id)}" aria-label="${escapeAttr(m.venue)}">
                <div class="meeting-card-top">
                  <span class="meeting-date">${escapeHtml(formatDate(m.date))}</span>
                  <span class="status-pill ${sc}">${escapeHtml(m.status || "待更新")}</span>
                </div>
                <div class="meeting-venue">${escapeHtml(m.venue)}</div>
                <div class="meeting-meta-row">
                  <span class="type-pill ${typeClass}">${typeLabel}</span>
                  <span>${raceCount} 場賽事</span>
                </div>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  list.innerHTML = calHtml + listHtml;
  bindCalendarEvents(list);

  list.querySelectorAll(".meeting-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.meetingId = btn.dataset.id;
      state.view = "races";
      render();
    });
  });
}

function renderRaces() {
  const list = $("#view-meetings");
  const racesView = $("#view-races");
  const nav = $("#nav-bar");
  const navTitle = $("#nav-title");

  list.classList.add("hidden");
  racesView.classList.remove("hidden");
  nav.classList.remove("hidden");

  const meeting = (state.data.meetings || []).find((m) => m.id === state.meetingId);
  if (!meeting) {
    racesView.innerHTML = `<div class="state-msg error">找不到此賽日</div>`;
    return;
  }

  navTitle.textContent = `${formatDate(meeting.date)} · ${meeting.venue}`;

  const races = meeting.races || [];
  if (!races.length) {
    racesView.innerHTML = `<div class="state-msg">暫無場次</div>`;
    return;
  }

  racesView.innerHTML = `<div class="race-list">${races.map(renderRaceBlock).join("")}</div>`;
}

function saddleKey(h) {
  if (!h || h.number == null || h.number === "") return null;
  return String(h.number);
}

function renderBetsLine(items, className) {
  if (!Array.isArray(items) || !items.length) return "";
  const lines = items
    .filter((x) => typeof x === "string" && x.trim())
    .map((x) => escapeHtml(x.trim()));
  if (!lines.length) return "";
  return `<div class="${className}">${lines.join(" · ")}</div>`;
}

function renderRaceBlock(race) {
  const top3 = Array.isArray(race.top3)
    ? [...race.top3].sort((a, b) => (a.rank || 0) - (b.rank || 0))
    : [];
  const cold3 = Array.isArray(race.cold3)
    ? [...race.cold3].sort((a, b) => (a.rank || 0) - (b.rank || 0))
    : [];
  const result = getRaceResult(race);
  const hasResult = result.length > 0 || isResultedRace(race);

  const tipNums = new Set(top3.map(saddleKey).filter(Boolean));
  const coldNums = new Set(cold3.map(saddleKey).filter(Boolean));
  const tipOrColdNums = new Set([...tipNums, ...coldNums]);
  const resultNums = new Set(result.map(saddleKey).filter(Boolean));
  const matchedNums = new Set([...tipOrColdNums].filter((n) => resultNums.has(n)));

  const note = race.note
    ? `<span class="race-note">${escapeHtml(race.note)}</span>`
    : "";
  const postTime = race.postTimeHkt
    ? `<span class="race-post" title="開跑時間（香港時間）">${escapeHtml(race.postTimeHkt)}</span>`
    : "";

  const brief = race.brief || {};
  const hotBets = renderBetsLine(brief.bets, "hot-bets");
  const coldBets = renderBetsLine(brief.coldBets, "cold-bets");

  let tipBody;
  if (!top3.length) {
    tipBody = `<div class="empty-tip">待更新</div>`;
  } else {
    tipBody = `
      <ul class="top3-list">
        ${top3.map((h) => renderHorseRow(h, matchedNums)).join("")}
      </ul>
      ${hotBets}
    `;
  }

  let coldBody;
  if (!cold3.length) {
    coldBody = `<div class="empty-tip">待補</div>`;
  } else {
    coldBody = `
      <ul class="top3-list cold-list">
        ${cold3.map((h) => renderHorseRow(h, matchedNums)).join("")}
      </ul>
      ${coldBets}
    `;
  }

  let resultBody;
  if (!hasResult) {
    resultBody = `<div class="empty-tip pending-result">待賽果</div>`;
  } else if (!result.length) {
    resultBody = `<div class="empty-tip">—</div>`;
  } else {
    resultBody = `
      <ul class="top3-list result-list">
        ${result.map((h) => renderHorseRow(h, matchedNums, { compact: true })).join("")}
      </ul>
    `;
  }

  const compareClass = hasResult ? "has-result" : "awaiting-result";

  return `
    <article class="race-block ${compareClass}">
      <header class="race-header">
        <div class="race-no-name">
          <span class="race-no">${escapeHtml(String(race.no))}</span>
          ${postTime}
          <span class="race-name">${escapeHtml(race.name || "")}</span>
        </div>
        ${note}
      </header>
      <div class="race-compare">
        <div class="compare-col tip-col">
          <div class="section-label">熱門</div>
          ${tipBody}
        </div>
        <div class="compare-col cold-col">
          <div class="section-label">冷門</div>
          ${coldBody}
        </div>
        <div class="compare-col result-col">
          <div class="section-label">賽果</div>
          ${resultBody}
        </div>
      </div>
    </article>
  `;
}

function renderHorseRow(h, matchedNums, opts) {
  const rank = h.rank || 0;
  const mark = RANK_MARKS[rank] || String(rank);
  const compact = opts && opts.compact;
  const sk = saddleKey(h);
  const matched = sk && matchedNums && matchedNums.has(sk);
  const badge =
    !compact && rank === 1
      ? `<span class="badge-win">獨贏首選</span>`
      : "";
  const en = h.nameEn
    ? `<div class="horse-en">${escapeHtml(h.nameEn)}</div>`
    : "";

  const winFmt = formatOdds(h.winOdds);
  const placeFmt = formatOdds(h.placeOdds);
  const winDisplay = winFmt || "—";
  const placeHtml = !compact && placeFmt
    ? `<span class="odds-place">位置 ${escapeHtml(placeFmt)}</span>`
    : "";

  const matchClass = matched ? " match" : "";
  const compactClass = compact ? " compact" : "";

  return `
    <li class="horse-row rank-${rank}${matchClass}${compactClass}">
      <span class="rank-mark r${rank}" aria-label="第${rank}名">${mark}</span>
      <span class="saddle">${escapeHtml(h.number != null && h.number !== "" ? String(h.number) : "—")}</span>
      <div class="horse-names">
        <div class="horse-zh-row">
          <span class="horse-zh">${escapeHtml(h.nameZh || "")}</span>
          ${badge}
        </div>
        ${en}
      </div>
      <div class="odds-block" title="參考賠率">
        <span class="odds-label">獨贏</span>
        <span class="odds-win">${escapeHtml(winDisplay)}</span>
        ${placeHtml}
      </div>
    </li>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/'/g, "&#39;");
}

function render() {
  if (state.view === "races" && state.meetingId) {
    renderRaces();
  } else {
    renderMeetings();
  }
  renderResultsSidebar();
}

function bindNav() {
  $("#btn-back").addEventListener("click", () => {
    state.view = "meetings";
    state.meetingId = null;
    render();
  });

  const toggle = $("#results-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      state.resultsOpen = !state.resultsOpen;
      renderResultsSidebar();
    });
  }
}

async function init() {
  const loading = $("#loading");
  bindNav();
  try {
    state.data = await loadData();
    loading.classList.add("hidden");
    const upd = document.getElementById("header-updated");
    if (upd) {
      upd.textContent = state.data.updatedAt
        ? `資料更新：${state.data.updatedAt}`
        : "";
    }
    render();
  } catch (e) {
    loading.textContent = "載入失敗";
    loading.classList.add("error");
    console.error(e);
  }
}

document.addEventListener("DOMContentLoaded", init);

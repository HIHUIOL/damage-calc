// ============================================================
// 技能数据文件
// 以后要加技能、改数值，只改这个文件就行，不用动 index.html
// ============================================================
//
// 每个技能的格式说明：
//
// 技能名: {
//   label: '界面上显示的名字',
//   type: '技能类型（决定这个技能怎么参与计算）',
//   minAbsorb: 数字,   // 可选，属性吸收达到这个值才生效
//   options: [         // 下拉框里的选项
//     { key: '唯一标识', value: 倍率, flat: 固定加点, text: '下拉框显示的文字' }
//   ]
// }
//
// type 有以下几种：
//   physCrit   = 物理会心倍率（影响物理部分）
//   physPanelMult  = 物理面板乘区（乘在武器面板上，如 攻击、火场怪力、太鼓、笛子旋律）
//   physPanelFlat  = 物理面板固定加点（加在乘区之后，如 花链、物品、各技能攻击力）
//   physCritRate   = 会心率加点（直接加到会心率上，如 攻击猫）
//   melody     = 笛子旋律（5 个复选框，用 items 定义，可同时生效）
//   elemBase   = 属性基础倍率 + 固定加点（乘在属贯自带属性上，并加固定值）
//   elemMult   = 属性乘区（乘在属性伤害上）
//   elemFlat   = 属性固定加点（直接加到属性值上）
//   resist     = 耐性加成（每项耐性 +N）
//
// ============================================================

const SKILLS = {

  // ============================================================
  // 物理面板相关
  // ============================================================

  // ---------- 攻击：0级倍率1，Lv1~3纯加点，Lv4~7倍率+加点 ----------
  攻击: {
    label: '攻击',
    type: 'physPanelMult',
    options: [
      { key: '0', value: 1.00, flat: 0,  text: '无' },
      { key: '1', value: 1.00, flat: 3,  text: 'Lv1（+3）' },
      { key: '2', value: 1.00, flat: 6,  text: 'Lv2（+6）' },
      { key: '3', value: 1.00, flat: 9,  text: 'Lv3（+9）' },
      { key: '4', value: 1.05, flat: 7,  text: 'Lv4（×1.05 +7）' },
      { key: '5', value: 1.06, flat: 8,  text: 'Lv5（×1.06 +8）' },
      { key: '6', value: 1.08, flat: 9,  text: 'Lv6（×1.08 +9）' },
      { key: '7', value: 1.10, flat: 10, text: 'Lv7（×1.10 +10）' }
    ]
  },

  // ---------- 不屈：Lv1 物理面板 ×1.20（和「攻击」同一乘区） ----------
  不屈: {
    label: '不屈',
    type: 'physPanelMult',
    options: [
      { key: '0', value: 1.00, text: '无' },
      { key: '1', value: 1.20, text: 'Lv1（×1.20）' }
    ]
  },

  // ---------- 火场怪力：人火 / 猫火 二选一 ----------
  火场怪力: {
    label: '火场怪力',
    type: 'physPanelMult',
    options: [
      { key: '0',  value: 1.00, text: '无' },
      { key: 'hr', value: 1.30, text: '人火（×1.30）' },
      { key: 'cat', value: 1.35, text: '猫火（×1.35）' }
    ]
  },

  // ---------- 重弩客制：强力枪管 + 零件改造 ----------
  强力枪管: {
    label: '强力枪管',
    type: 'physPanelMult',
    options: [
      { key: '0', value: 1.00,  text: '无' },
      { key: '1', value: 1.125, text: '有（×1.125）' }
    ]
  },

  零件改造: {
    label: '零件改造',
    type: 'physPanelMult',
    options: [
      { key: '0', value: 0,     text: '无' },
      { key: '2', value: 0.025, text: 'Lv2（强力枪管倍率 +0.025）' }
    ]
  },

  // ---------- 随从：强化太鼓之技 ----------
  强化太鼓之技: {
    label: '强化太鼓之技',
    type: 'physPanelMult',
    options: [
      { key: '0', value: 1.00, text: '无' },
      { key: '1', value: 1.05, text: '有（×1.05）' }
    ]
  },
  // ---------- 笛子旋律：5 个可同时生效的开关 ----------
  // 说明：这不是下拉，而是 5 个独立复选框，可任意组合同时生效。
  //   atk   攻击力提升     → 物理面板 ×1.10
  //   fire  气炎旋律       → 物理面板 ×1.20（与 atk 互斥，只生效一个）
  //   crit  会心率提升     → 会心 +20
  //   elem  属性攻击力提升 → 属性伤害 ×1.10
  //   resist 全耐性异常状态无效 → 全耐性 +10
  笛子旋律: {
    label: '笛子旋律',
    type: 'melody',
    items: [
      { key: 'atk',    label: '攻击力提升',       kind: 'physMult', value: 1.10 },
      { key: 'fire',   label: '气炎旋律',         kind: 'physMult', value: 1.20, exclusive: 'atk' },
      { key: 'crit',   label: '会心率提升',       kind: 'crit',     value: 20 },
      { key: 'elem',   label: '属性攻击力提升',   kind: 'elemMult', value: 1.10 },
      { key: 'resist', label: '全耐性异常状态无效', kind: 'resist', value: 10 }
    ]
  },


  // ---------- 激励：固定加点 10（笛子旋律常见，一般只有笛子出） ----------
  激励: {
    label: '激励',
    type: 'physPanelFlat',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 10, text: 'Lv1（+10）' }
    ]
  },

  // ---------- 怨恨：每级 +5 攻击力，最高 Lv5 ----------
  怨恨: {
    label: '怨恨',
    type: 'physPanelFlat',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 5,  text: 'Lv1（+5）' },
      { key: '2', value: 10, text: 'Lv2（+10）' },
      { key: '3', value: 15, text: 'Lv3（+15）' },
      { key: '4', value: 20, text: 'Lv4（+20）' },
      { key: '5', value: 25, text: 'Lv5（+25）' }
    ]
  },

  // ---------- 业铠【修罗】：红书 +N 攻击力；蓝书改为属性倍率（奋斗同乘区）并扣全耐性 ----------
  业铠修罗: {
    label: '业铠【修罗】',
    type: 'physPanelFlat',
    options: [
      { key: '0', value: 0,  text: '无', blueText: '无' },
      { key: '1', value: 15, text: 'Lv1（+15）',  blueText: 'Lv1（属性 ×1.05，全耐性 −10）', blueElemMult: 1.05, blueResist: -10 },
      { key: '2', value: 25, text: 'Lv2（+25）',  blueText: 'Lv2（属性 ×1.10，全耐性 −25）', blueElemMult: 1.10, blueResist: -25 },
      { key: '3', value: 35, text: 'Lv3（+35）',  blueText: 'Lv3（属性 ×1.20，全耐性 −50）', blueElemMult: 1.20, blueResist: -50 }
    ]
  },

  // ---------- 气血觉醒：同时加物理攻击力 + 属性值，分一阶段/二阶段 ----------
  // atk = 物理加法区加点；elem = 属性固定加点
  气血觉醒: {
    label: '气血觉醒',
    type: 'physElemFlat',
    options: [
      { key: '0',  value: 0,  atk: 0,  elem: 0,  text: '无' },
      { key: '1a', value: 1,  atk: 4,  elem: 4,  text: 'Lv1 一阶段（攻击 +4，属性 +4）' },
      { key: '1b', value: 1,  atk: 8,  elem: 8,  text: 'Lv1 二阶段（攻击 +8，属性 +8）' },
      { key: '2a', value: 2,  atk: 4,  elem: 4,  text: 'Lv2 一阶段（攻击 +4，属性 +4）' },
      { key: '2b', value: 2,  atk: 15, elem: 10, text: 'Lv2 二阶段（攻击 +15，属性 +10）' },
      { key: '3a', value: 3,  atk: 10, elem: 8,  text: 'Lv3 一阶段（攻击 +10，属性 +8）' },
      { key: '3b', value: 3,  atk: 25, elem: 15, text: 'Lv3 二阶段（攻击 +25，属性 +15）' }
    ]
  },

  // ---------- 花链：选一个 ----------
  花链: {
    label: '花链',
    type: 'physPanelFlat',
    options: [
      { key: '0',  value: 0,  text: '无' },
      { key: 'l1', value: 13, text: '猎香（+13）' },
      { key: 'l2', value: 10, text: '强香（+10）' },
      { key: 'l3', value: 8,  text: '硬香（+8）' },
      { key: 'l4', value: 20, text: '鬼香（+20）' },
      { key: 'l5', value: 15, text: '绝香（+15）' },
      { key: 'l6', value: 15, text: '冥香（+15）' }
    ]
  },

  // ---------- 随从：攻击猫·强化咆哮之技（加会心） ----------
  攻击猫: {
    label: '攻击猫·强化咆哮之技',
    type: 'physCritRate',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 30, text: '有（会心 +30）' }
    ]
  },

  // ---------- 看破：会心率加点，Lv1~7 = 5/10/15/25/25/30/40 ----------
  看破: {
    label: '看破',
    type: 'physCritRate',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 5,  text: 'Lv1（会心 +5）' },
      { key: '2', value: 10, text: 'Lv2（会心 +10）' },
      { key: '3', value: 15, text: 'Lv3（会心 +15）' },
      { key: '4', value: 25, text: 'Lv4（会心 +25）' },
      { key: '5', value: 25, text: 'Lv5（会心 +25）' },
      { key: '6', value: 30, text: 'Lv6（会心 +30）' },
      { key: '7', value: 40, text: 'Lv7（会心 +40）' }
    ]
  },

  // ---------- 精神抖擞：满耐力时加会心 ----------
  精神抖擞: {
    label: '精神抖擞',
    type: 'physCritRate',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 10, text: 'Lv1（会心 +10）' },
      { key: '2', value: 20, text: 'Lv2（会心 +20）' },
      { key: '3', value: 30, text: 'Lv3（会心 +30）' }
    ]
  },

  // ---------- 超会心：物理会心倍率 ----------
  超会心: {
    label: '超会心',
    type: 'physCrit',
    options: [
      { key: '0', value: 1.25, text: '无（会心 ×1.25）' },
      { key: '1', value: 1.30, text: 'Lv1（会心 ×1.30）' },
      { key: '2', value: 1.35, text: 'Lv2（会心 ×1.35）' },
      { key: '3', value: 1.40, text: 'Lv3（会心 ×1.40）' }
    ]
  },

  // ---------- 属性攻击力强化：属性倍率 + 固定加点 ----------
  属性攻击力强化: {
    label: '属性攻击力强化',
    type: 'elemBase',
    options: [
      { key: '0', value: 1.00, flat: 0, text: '无' },
      { key: '1', value: 1.00, flat: 2, text: 'Lv1（属性 +2）' },
      { key: '2', value: 1.00, flat: 3, text: 'Lv2（属性 +3）' },
      { key: '3', value: 1.05, flat: 4, text: 'Lv3（属性 ×1.05 +4）' },
      { key: '4', value: 1.10, flat: 4, text: 'Lv4（属性 ×1.10 +4）' },
      { key: '5', value: 1.20, flat: 4, text: 'Lv5（属性 ×1.20 +4）' }
    ]
  },

  // ---------- 奋斗：属性基础乘区，分一阶段/二阶段；同时加会心 ----------
  // crit：一阶段 Lv1/2/3 = +5/+10/+10；二阶段 Lv1/2/3 = +10/+15/+20
  奋斗: {
    label: '奋斗',
    type: 'elemBase',
    options: [
      { key: '0',  value: 1.00, crit: 0,  text: '无' },
      { key: '1a', value: 1.05, crit: 5,  text: 'Lv1 一阶段（属性 ×1.05，会心 +5）' },
      { key: '1b', value: 1.10, crit: 10, text: 'Lv1 二阶段（属性 ×1.10，会心 +10）' },
      { key: '2a', value: 1.10, crit: 10, text: 'Lv2 一阶段（属性 ×1.10，会心 +10）' },
      { key: '2b', value: 1.15, crit: 15, text: 'Lv2 二阶段（属性 ×1.15，会心 +15）' },
      { key: '3a', value: 1.15, crit: 10, text: 'Lv3 一阶段（属性 ×1.15，会心 +10）' },
      { key: '3b', value: 1.20, crit: 20, text: 'Lv3 二阶段（属性 ×1.20，会心 +20）' }
    ]
  },

  // ---------- 钢壳/炎鳞：属性基础乘区 ----------
  钢壳炎鳞: {
    label: '钢壳/炎鳞',
    type: 'elemBase',
    options: [
      { key: '0', value: 1.00, text: '无' },
      { key: '1', value: 1.05, text: 'Lv1（属性 ×1.05）' },
      { key: '2', value: 1.10, text: 'Lv2（属性 ×1.10）' }
    ]
  },

  // ---------- 连击：属性固定加点 + 物理攻击力 ----------
  // value = 属性加点；atk = 物理攻击加点
  连击: {
    label: '连击',
    type: 'elemFlat',
    options: [
      { key: '0',  value: 0, atk: 0,  text: '无' },
      { key: 's1', value: 5, atk: 5,  text: 'Lv1~3 一阶段（攻击 +5，属性 +5）' },
      { key: '1',  value: 6, atk: 8,  text: 'Lv1（攻击 +8，属性 +6）' },
      { key: '2',  value: 7, atk: 9,  text: 'Lv2（攻击 +9，属性 +7）' },
      { key: '3',  value: 8, atk: 10, text: 'Lv3（攻击 +10，属性 +8）' }
    ]
  },

  // ---------- 伏魔耗命：红书加属性值；蓝书改为加攻击力（blueAtk） ----------
  伏魔耗命: {
    label: '伏魔耗命',
    type: 'elemFlat',
    options: [
      { key: '0',   value: 0,  blueAtk: 0,  text: '无', blueText: '无' },
      { key: '1-1', value: 5,  blueAtk: 15, text: 'Lv1·1虫（属性 +5）', blueText: 'Lv1·1虫（攻击 +15）' },
      { key: '1-2', value: 8,  blueAtk: 20, text: 'Lv1·2虫（属性 +8）', blueText: 'Lv1·2虫（攻击 +20）' },
      { key: '1-3', value: 12, blueAtk: 25, text: 'Lv1·3虫（属性 +12）', blueText: 'Lv1·3虫（攻击 +25）' },
      { key: '2-1', value: 7,  blueAtk: 20, text: 'Lv2·1虫（属性 +7）', blueText: 'Lv2·1虫（攻击 +20）' },
      { key: '2-2', value: 12, blueAtk: 25, text: 'Lv2·2虫（属性 +12）', blueText: 'Lv2·2虫（攻击 +25）' },
      { key: '2-3', value: 15, blueAtk: 30, text: 'Lv2·3虫（属性 +15）', blueText: 'Lv2·3虫（攻击 +30）' },
      { key: '3-1', value: 10, blueAtk: 25, text: 'Lv3·1虫（属性 +10）', blueText: 'Lv3·1虫（攻击 +25）' },
      { key: '3-2', value: 15, blueAtk: 30, text: 'Lv3·2虫（属性 +15）', blueText: 'Lv3·2虫（攻击 +30）' },
      { key: '3-3', value: 20, blueAtk: 35, text: 'Lv3·3虫（属性 +20）', blueText: 'Lv3·3虫（攻击 +35）' }
    ]
  },

  // ---------- 属痛龙珠：属性乘区，吸收≥25 才生效 ----------
  属痛龙珠: {
    label: '属痛龙珠',
    type: 'elemMult',
    minAbsorb: 25,
    options: [
      { key: '0', value: 1.00, text: '无' },
      { key: '1', value: 1.15, text: '有（属性 ×1.15，吸收 ≥25 才生效）' }
    ]
  },

  // ---------- 弱点特效【属性】：属性乘区，吸收≥20 才生效 ----------
  弱点特效属性: {
    label: '弱点特效【属性】',
    type: 'elemMult',
    minAbsorb: 20,
    options: [
      { key: '0', value: 1.000, text: '无' },
      { key: '1', value: 1.100, text: 'Lv1（属性 ×1.10）' },
      { key: '2', value: 1.125, text: 'Lv2（属性 ×1.125）' },
      { key: '3', value: 1.150, text: 'Lv3（属性 ×1.15）' }
    ]
  },

  // ---------- 会心击【属性】：属性乘区 ----------
  会心击属性: {
    label: '会心击【属性】',
    type: 'elemMult',
    options: [
      { key: '0', value: 1.00, text: '无' },
      { key: '1', value: 1.05, text: 'Lv1（会心时属性 ×1.05）' },
      { key: '2', value: 1.10, text: 'Lv2（会心时属性 ×1.10）' },
      { key: '3', value: 1.15, text: 'Lv3（会心时属性 ×1.15）' }
    ]
  },

  // ============================================================
  // 耐性相关（每项耐性 +N）
  // ============================================================

  // ---------- 激昂：每项耐性 +N（蓝书下不增加耐性） ----------
  激昂: {
    label: '激昂',
    type: 'resist',
    blueOff: true,
    options: [
      { key: '0', value: 0,  text: '无', blueText: '无' },
      { key: '1', value: 5,  text: 'Lv1（全耐性 +5）', blueText: 'Lv1（蓝书不加耐性）' },
      { key: '2', value: 10, text: 'Lv2（全耐性 +10）', blueText: 'Lv2（蓝书不加耐性）' },
      { key: '3', value: 20, text: 'Lv3（全耐性 +20）', blueText: 'Lv3（蓝书不加耐性）' }
    ]
  },

  // ---------- 防御：高等级加全耐性 ----------
  防御: {
    label: '防御',
    type: 'resist',
    options: [
      { key: '0', value: 0, text: '无' },
      { key: '4', value: 3, text: 'Lv4（全耐性 +3）' },
      { key: '6', value: 5, text: 'Lv6（全耐性 +5）' }
    ]
  },

  // ---------- 火耐性：只加火耐性 ----------
  火耐性: {
    label: '火耐性',
    type: 'resistSingle',
    element: 'fire',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 6,  text: 'Lv1（火耐性 +6）' },
      { key: '2', value: 12, text: 'Lv2（火耐性 +12）' },
      { key: '3', value: 20, text: 'Lv3（火耐性 +20）' }
    ]
  },

  // ---------- 水耐性：只加水耐性 ----------
  水耐性: {
    label: '水耐性',
    type: 'resistSingle',
    element: 'water',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 6,  text: 'Lv1（水耐性 +6）' },
      { key: '2', value: 12, text: 'Lv2（水耐性 +12）' },
      { key: '3', value: 20, text: 'Lv3（水耐性 +20）' }
    ]
  },

  // ---------- 雷耐性：只加雷耐性 ----------
  雷耐性: {
    label: '雷耐性',
    type: 'resistSingle',
    element: 'thunder',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 6,  text: 'Lv1（雷耐性 +6）' },
      { key: '2', value: 12, text: 'Lv2（雷耐性 +12）' },
      { key: '3', value: 20, text: 'Lv3（雷耐性 +20）' }
    ]
  },

  // ---------- 冰耐性：只加冰耐性 ----------
  冰耐性: {
    label: '冰耐性',
    type: 'resistSingle',
    element: 'ice',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 6,  text: 'Lv1（冰耐性 +6）' },
      { key: '2', value: 12, text: 'Lv2（冰耐性 +12）' },
      { key: '3', value: 20, text: 'Lv3（冰耐性 +20）' }
    ]
  },

  // ---------- 龙耐性：只加龙耐性 ----------
  龙耐性: {
    label: '龙耐性',
    type: 'resistSingle',
    element: 'dragon',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 6,  text: 'Lv1（龙耐性 +6）' },
      { key: '2', value: 12, text: 'Lv2（龙耐性 +12）' },
      { key: '3', value: 20, text: 'Lv3（龙耐性 +20）' }
    ]
  },

  // ---------- 龙气转换：红书 +10 全耐性 + 耐性转属性；蓝书不转属性（保留 +10 全耐性） ----------
  龙气转换: {
    label: '龙气转换',
    type: 'dragonConv',
    blueNoConv: true,
    options: [
      { key: '0', value: 0,    text: '无', blueText: '无' },
      { key: '3', value: 12.5, text: 'Lv3（全耐性 +10，总耐性÷12.5 转属性）', blueText: 'Lv3（全耐性 +10，蓝书不转属性）' }
    ]
  }

};
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
// type 有五种：
//   physCrit  = 物理会心倍率（影响物理部分）
//   elemBase  = 属性基础倍率 + 固定加点（乘在属贯自带属性上，并加固定值）
//   elemMult  = 属性乘区（乘在属性伤害上）
//   elemFlat  = 属性固定加点（直接加到属性值上）
//   resist    = 耐性加成（每项耐性 +N）
//
// ============================================================

const SKILLS = {

  // ---------- 超会心：物理会心倍率 ----------
  超会心: {
    label: '超会心',
    type: 'physCrit',
    options: [
      { key: '0', value: 1.25, text: '无' },
      { key: '1', value: 1.30, text: 'Lv1' },
      { key: '2', value: 1.35, text: 'Lv2' },
      { key: '3', value: 1.40, text: 'Lv3' }
    ]
  },

  // ---------- 属性攻击力强化：属性倍率 + 固定加点 ----------
  属性攻击力强化: {
    label: '属性攻击力强化',
    type: 'elemBase',
    options: [
      { key: '0', value: 1.00, flat: 0, text: '无' },
      { key: '1', value: 1.00, flat: 2, text: 'Lv1' },
      { key: '2', value: 1.00, flat: 3, text: 'Lv2' },
      { key: '3', value: 1.05, flat: 4, text: 'Lv3' },
      { key: '4', value: 1.10, flat: 4, text: 'Lv4' },
      { key: '5', value: 1.20, flat: 4, text: 'Lv5' }
    ]
  },

  // ---------- 奋斗：属性基础乘区，分一阶段/二阶段 ----------
  奋斗: {
    label: '奋斗',
    type: 'elemBase',
    options: [
      { key: '0',  value: 1.00, text: '无' },
      { key: '1a', value: 1.05, text: 'Lv1 一阶段' },
      { key: '1b', value: 1.10, text: 'Lv1 二阶段' },
      { key: '2a', value: 1.10, text: 'Lv2 一阶段' },
      { key: '2b', value: 1.15, text: 'Lv2 二阶段' },
      { key: '3a', value: 1.15, text: 'Lv3 一阶段' },
      { key: '3b', value: 1.20, text: 'Lv3 二阶段' }
    ]
  },

  // ---------- 钢壳/炎鳞：属性基础乘区 ----------
  钢壳炎鳞: {
    label: '钢壳/炎鳞',
    type: 'elemBase',
    options: [
      { key: '0', value: 1.00, text: '无' },
      { key: '1', value: 1.05, text: 'Lv1' },
      { key: '2', value: 1.10, text: 'Lv2' }
    ]
  },

  // ---------- 连击：属性固定加点 ----------
  连击: {
    label: '连击',
    type: 'elemFlat',
    options: [
      { key: '0', value: 0, text: '无' },
      { key: '1', value: 6, text: 'Lv1' },
      { key: '2', value: 7, text: 'Lv2' },
      { key: '3', value: 8, text: 'Lv3' }
    ]
  },

  // ---------- 伏魔耗命：属性固定加点 ----------
  伏魔耗命: {
    label: '伏魔耗命',
    type: 'elemFlat',
    options: [
      { key: '0',   value: 0,  text: '无' },
      { key: '1-1', value: 5,  text: 'Lv1·1虫' },
      { key: '1-2', value: 8,  text: 'Lv1·2虫' },
      { key: '1-3', value: 12, text: 'Lv1·3虫' },
      { key: '2-1', value: 7,  text: 'Lv2·1虫' },
      { key: '2-2', value: 12, text: 'Lv2·2虫' },
      { key: '2-3', value: 15, text: 'Lv2·3虫' },
      { key: '3-1', value: 10, text: 'Lv3·1虫' },
      { key: '3-2', value: 15, text: 'Lv3·2虫' },
      { key: '3-3', value: 20, text: 'Lv3·3虫' }
    ]
  },

  // ---------- 属痛龙珠：属性乘区，吸收≥25 才生效 ----------
  属痛龙珠: {
    label: '属痛龙珠',
    type: 'elemMult',
    minAbsorb: 25,
    options: [
      { key: '0', value: 1.00, text: '无' },
      { key: '1', value: 1.15, text: '有' }
    ]
  },

  // ---------- 弱点特效【属性】：属性乘区，吸收≥20 才生效 ----------
  弱点特效属性: {
    label: '弱点特效【属性】',
    type: 'elemMult',
    minAbsorb: 20,
    options: [
      { key: '0', value: 1.000, text: '无' },
      { key: '1', value: 1.100, text: 'Lv1' },
      { key: '2', value: 1.125, text: 'Lv2' },
      { key: '3', value: 1.150, text: 'Lv3' }
    ]
  },

  // ---------- 会心击【属性】：属性乘区 ----------
  会心击属性: {
    label: '会心击【属性】',
    type: 'elemMult',
    options: [
      { key: '0', value: 1.00, text: '无' },
      { key: '1', value: 1.05, text: 'Lv1' },
      { key: '2', value: 1.10, text: 'Lv2' },
      { key: '3', value: 1.15, text: 'Lv3' }
    ]
  },

  // ---------- 笛子属性攻击力提升：属性乘区 ----------
  笛子属性攻击力提升: {
    label: '笛子属性攻击力提升',
    type: 'elemMult',
    options: [
      { key: '0', value: 1.0, text: '无' },
      { key: '1', value: 1.1, text: '有' }
    ]
  },

  // ============================================================
  // 耐性相关（每项耐性 +N）
  // ============================================================

  // ---------- 业铠：蓝书每项 -50，这里填的是补回值 ----------
  业铠: {
    label: '业铠',
    type: 'resist',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 10, text: 'Lv1（+10）' },
      { key: '2', value: 25, text: 'Lv2（+25）' },
      { key: '3', value: 50, text: 'Lv3（+50）' }
    ]
  },

  // ---------- 激昂：每项耐性 +N ----------
  激昂: {
    label: '激昂',
    type: 'resist',
    options: [
      { key: '0', value: 0,  text: '无' },
      { key: '1', value: 5,  text: 'Lv1（+5）' },
      { key: '2', value: 10, text: 'Lv2（+10）' },
      { key: '3', value: 20, text: 'Lv3（+20）' }
    ]
  },

  // ---------- 龙气转换：耐性转属性 ----------
  龙气转换: {
    label: '龙气转换',
    type: 'dragonConv',
    options: [
      { key: '0', value: 0,    text: '无' },
      { key: '3', value: 12.5, text: 'Lv3（总耐性÷12.5）' }
    ]
  }

};
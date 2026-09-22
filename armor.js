// ============================================================
// 装备耐性数据文件
// 以后要加装备、改数值，只改这个文件就行，不用动 index.html
// ============================================================
//
// 说明：
//   label   界面上显示的名字
//   slot    部位（头/胸/臂/腰/腿），仅作标注，暂不强制限制
//   fire/water/thunder/ice/dragon  该项耐性（可负）
//
// 用户在「耐性相关」卡片里勾选装备（最多 5 件），
// 程序会把选中装备的 5 项耐性分别求和，自动填入耐性输入框。
// ============================================================

const ARMOR = {
  '堕天头盔': {
    label: '堕天头盔',
    slot: '头',
    fire: -4, water: 3, thunder: -2, ice: 2, dragon: -4
  },
  '脉动钢龙逆鳞': {
    label: '脉动钢龙逆鳞',
    slot: '胸',
    fire: -1, water: 2, thunder: -2, ice: 3, dragon: -3
  },
  '久爱铠甲': {
    label: '久爱铠甲',
    slot: '胸',
    fire: -2, water: 2, thunder: -1, ice: 2, dragon: -4
  },
  '冥渊缠铠【怒臂】': {
    label: '冥渊缠铠【怒臂】',
    slot: '臂',
    fire: 0, water: 3, thunder: -2, ice: 3, dragon: -5
  },
  '健美腕部': {
    label: '健美腕部',
    slot: '臂',
    fire: 2, water: -1, thunder: -1, ice: 0, dragon: -3
  },
  '原初腰甲': {
    label: '原初腰甲',
    slot: '腰',
    fire: -2, water: 2, thunder: 2, ice: -1, dragon: -5
  },
  '冥渊缠铠【怒足】': {
    label: '冥渊缠铠【怒足】',
    slot: '腿',
    fire: 0, water: 3, thunder: -2, ice: 3, dragon: -5
  },
  '雪崩护腿': {
    label: '雪崩护腿',
    slot: '腿',
    fire: -3, water: 2, thunder: -1, ice: 4, dragon: -1
  }
};
export enum ClanCaste {
  MEKWARRIOR = 'MekWarrior',
  ELEMENTAL = 'Elemental',
  ELEMENTAL_ADVANCED = 'Elemental-Advanced',
  AEROSPACE = 'Aerospace',
  PROTOMEK = 'ProtoMek',
  AEROSPACE_NAVAL = 'Aerospace-Naval',
  WARRIOR_CASTE_OTHER = 'Warrior Caste (Other)',
  SCIENTIST_CASTE = 'Scientist Caste',
  TECHNICIAN_CASTE = 'Technician Caste',
  MERCHANT_CASTE = 'merchant Caste',
  LABORER_CASTE = 'Laborer Caste',
}

export const isWarriorCaste = (caste: ClanCaste): boolean => [
  ClanCaste.MEKWARRIOR,
  ClanCaste.ELEMENTAL,
  ClanCaste.ELEMENTAL_ADVANCED,
  ClanCaste.AEROSPACE,
  ClanCaste.AEROSPACE_NAVAL,
  ClanCaste.PROTOMEK,
  ClanCaste.WARRIOR_CASTE_OTHER,
].includes(caste);

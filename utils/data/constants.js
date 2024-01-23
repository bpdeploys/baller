const constants = {
  GENDERS: [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ],
  POSITIONS: [
    { label: 'Goalkeeper', value: 'Goalkeeper' },
    { label: 'Defender', value: 'Defender' },
    { label: 'Midfielder', value: 'Midfielder' },
    { label: 'Forward', value: 'Forward' },
  ],
  POSITIONS_ABBREVIATED: [
    { label: 'GK', value: 'Goalkeeper' },
    { label: 'D', value: 'Defender' },
    { label: 'M', value: 'Midfielder' },
    { label: 'F', value: 'Forward' },
  ],
  MOTIVES: [
    { label: 'Competitive', value: 'Competitive' },
    { label: 'Recreational', value: 'Recreational' },
  ],
  SQUAD_NUMBERS: Array.from({ length: 100 }, (_, i) => ({
    label: i.toString(),
    value: i.toString(),
  })),
};

export default constants;

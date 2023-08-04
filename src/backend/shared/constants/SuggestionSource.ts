import SuggestionSourceEnum from 'src/backend/shared/constants/SuggestionSourceEnum';

const SuggestionSource = {
  [SuggestionSourceEnum.INTERNAL]: {
    value: SuggestionSourceEnum.INTERNAL,
    label: 'Igbo API Editor Platform',
    isSelectable: true,
  },
  [SuggestionSourceEnum.COMMUNITY]: {
    value: SuggestionSourceEnum.INTERNAL,
    label: 'Nkọwa okwu Community',
    isSelectable: true,
  },
  [SuggestionSourceEnum.IGBO_SPEECH]: {
    value: SuggestionSourceEnum.INTERNAL,
    label: 'Igbo Speech',
    isSelectable: false,
  },
  [SuggestionSourceEnum.IGBO_WIKIMEDIANS]: {
    value: SuggestionSourceEnum.IGBO_WIKIMEDIANS,
    label: 'Igbo Wikimedians User Group',
    isSelectable: true,
  },
  [SuggestionSourceEnum.BBC]: {
    value: SuggestionSourceEnum.BBC,
    label: 'BBC Igbo News',
    isSelectable: true,
  },
};

export default SuggestionSource;

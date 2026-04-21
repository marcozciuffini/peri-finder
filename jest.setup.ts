jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: { type: '3rdParty', init: jest.fn() },
}));

jest.mock('@/hooks/useAppTheme', () => ({
  useAppTheme: () => ({
    dark: false,
    colors: {
      background: '#FFF8F8',
      surface: '#FFF6EC',
      border: '#F0D8D0',
      text: '#000000',
      icon: '#7A5C5C',
      tint: '#CE0A24',
      error: '#EB3F55',
      accent: '#D4A830',
      subtle: '#D9849A',
      loadingBlock: '#000000',
      loadingBlockText: '#FFFFFF',
    },
  }),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

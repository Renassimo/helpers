interface Hashtags {
  avrTag: string;
  commonTag: string;
}

type HashtagsCollection = Record<string, Hashtags>;

const hash = '#';
const avr = 'avr';

export const insHash = (string: string | null) => string && `${hash}${string}`;

export const insRHash = (string: string | null) =>
  string && `${hash}${avr}_${string}`;

export const insertHashes = (tags: string[], func = insHash) =>
  tags.map((tag) => func(tag));

export const getHashtags = (
  hashtags: string[],
  additionalRHashtags: string[] = []
) => {
  const commonTag = insertHashes(hashtags).join(' ');
  const avrTag = insertHashes(
    [...hashtags, ...additionalRHashtags],
    insRHash
  ).join(' ');

  return {
    commonTag,
    avrTag,
  };
};

const words: Record<string, string> = {
  // aircrafts
  b737: '737',
  b747: '747',
  b757: '757',
  b767: '767',
  b777: '777',
  b787: '787',
  atr72: 'atr72',
  freighter: 'freighter',
  family: 'family',
  original: 'original',
  classic: 'classic',
  ng: 'ng',
  MAX: 'MAX',
  A300: 'A300',
  A310: 'A310',
  A320: 'A320',
  A330: 'A330',
  A340: 'A340',
  A350: 'A350',
  A380: 'A380',
  neo: 'neo',
  beluga: 'beluga',
  xl: 'XL',
  EJet: 'EJet',
  EJetE2: 'EJetE2',
  legacy: 'legacy',
  phenom: 'phenom',
  Dash8: 'Dash8',
  CRJ: 'CRJ',
  global: 'global',
  challenger: 'challenger',
  falcon: 'Falcon',
  an28: 'AN28',
  antonov: 'Antonov',
  learjet: 'Learjet',
  citation: 'Citation',
  citationexcel: 'CitationExcel',
  premierIA: 'PremierIA',
  hawker: 'Hawker',
  beechcraft: 'Beechcraft',
  dc9: 'DC9',
  // airlines
  easyJet: 'easyJet',
  KLM: 'KLM',
  lufthansa: 'Lufthansa',
  iberia: 'Iberia',
  airasia: 'AirAsia',
  airasiax: 'AirAsiaX',
  lionair: 'LionAir',
  smartwings: 'Smartwings',
  dhl: 'DHL',
  transavia: 'Transavia',
};

const derivatives: Record<string, string> = {
  // aircrafts
  b737family: `${words.b737}${words.family}`,
  b737original: `${words.b737}${words.original}`,
  b737classic: `${words.b737}${words.classic}`,
  b737ng: `${words.b737}${words.ng}`,
  b737F: `${words.b737}${words.freighter}`,
  b737MAX: `${words.b737}${words.MAX}`,
  b747: `${words.b747}${words.family}`,
  b747F: `${words.b747}${words.freighter}`,
  b757: `${words.b757}${words.family}`,
  b757F: `${words.b757}${words.freighter}`,
  b767: `${words.b767}${words.family}`,
  b767F: `${words.b767}${words.freighter}`,
  b777: `${words.b777}${words.family}`,
  b777F: `${words.b777}${words.freighter}`,
  b787: `${words.b787}${words.family}`,
  atr72: `${words.atr72}${words.family}`,
  atr72F: `${words.atr72}${words.freighter}`,
  freighter: words.freighter,
  A300family: `${words.A300}${words.family}`,
  A300F: `${words.A300}${words.freighter}`,
  belugafamily: `${words.beluga}${words.family}`,
  beluga: `${words.beluga}`,
  belugaXL: `${words.beluga}${words.xl}`,
  A310family: `${words.A310}${words.family}`,
  A310F: `${words.A310}${words.freighter}`,
  A320family: `${words.A320}${words.family}`,
  A320neofamily: `${words.A320}${words.neo}${words.family}`,
  A330family: `${words.A330}${words.family}`,
  A330F: `${words.A330}${words.freighter}`,
  A330neo: `${words.A330}${words.neo}`,
  A340family: `${words.A340}${words.family}`,
  A350family: `${words.A350}${words.family}`,
  A380family: `${words.A380}${words.family}`,
  EJet: words.EJet,
  EJetE2: words.EJetE2,
  legacy: words.legacy,
  phenom: words.phenom,
  Dash8: words.Dash8,
  CRJ: words.CRJ,
  global: words.global,
  challenger: words.challenger,
  falcon: words.falcon,
  an28: words.an28,
  antonov: words.antonov,
  learjet: words.learjet,
  citation: words.citation,
  citationexcel: words.citationexcel,
  premierIA: words.premierIA,
  hawker: words.hawker,
  beechcraft: words.beechcraft,
  dc9: words.dc9,
  // airlines
  easyJet: words.easyJet,
  KLM: words.KLM,
  lufthansa: words.lufthansa,
  iberia: words.iberia,
  airasia: words.airasia,
  airasiax: words.airasiax,
  lionair: words.lionair,
  smartwings: words.smartwings,
  dhl: words.dhl,
  transavia: words.transavia,
};

const hashtags: HashtagsCollection = Object.entries({
  // aircrafts
  b737original: {
    hashtags: [derivatives.b737family, derivatives.b737original],
  },
  b737originalF: {
    hashtags: [derivatives.b737family, derivatives.b737original],
    additionalRHashtags: [derivatives.b737F, derivatives.freighter],
  },
  b737classic: {
    hashtags: [derivatives.b737family, derivatives.b737classic],
  },
  b737classicF: {
    hashtags: [derivatives.b737family, derivatives.b737classic],
    additionalRHashtags: [derivatives.b737F, derivatives.freighter],
  },
  b737ng: {
    hashtags: [derivatives.b737family, derivatives.b737ng],
  },
  b737ngF: {
    hashtags: [derivatives.b737family, derivatives.b737ng],
    additionalRHashtags: [derivatives.b737F, derivatives.freighter],
  },
  b737MAX: {
    hashtags: [derivatives.b737family, derivatives.b737MAX],
  },
  b737MAXF: {
    hashtags: [derivatives.b737family, derivatives.b737MAX],
    additionalRHashtags: [derivatives.b737F, derivatives.freighter],
  },
  b747: {
    hashtags: [derivatives.b747],
  },
  b747F: {
    hashtags: [derivatives.b747, derivatives.b747F],
    additionalRHashtags: [derivatives.freighter],
  },
  b757: {
    hashtags: [derivatives.b757],
  },
  b757F: {
    hashtags: [derivatives.b757, derivatives.b757F],
    additionalRHashtags: [derivatives.freighter],
  },
  b767: {
    hashtags: [derivatives.b767],
  },
  b767F: {
    hashtags: [derivatives.b767, derivatives.b767F],
    additionalRHashtags: [derivatives.freighter],
  },
  b777: {
    hashtags: [derivatives.b777],
  },
  b777F: {
    hashtags: [derivatives.b777, derivatives.b777F],
    additionalRHashtags: [derivatives.freighter],
  },
  b787: {
    hashtags: [derivatives.b787],
  },
  atr72: {
    hashtags: [derivatives.atr72],
  },
  atr72F: {
    hashtags: [derivatives.atr72, derivatives.atr72F],
    additionalRHashtags: [derivatives.freighter],
  },
  A300: {
    hashtags: [derivatives.A300family],
  },
  A300F: {
    hashtags: [derivatives.A300family],
    additionalRHashtags: [derivatives.A300F, derivatives.freighter],
  },
  A300ST: {
    hashtags: [
      derivatives.A300family,
      derivatives.beluga,
      derivatives.belugafamily,
    ],
  },
  A310: {
    hashtags: [derivatives.A310family],
  },
  A310F: {
    hashtags: [derivatives.A310family],
    additionalRHashtags: [derivatives.A310F, derivatives.freighter],
  },
  A320: {
    hashtags: [derivatives.A320family],
  },
  A320neo: {
    hashtags: [derivatives.A320family, derivatives.A320neofamily],
  },
  A330: {
    hashtags: [derivatives.A330family],
  },
  A330BelugaXL: {
    hashtags: [
      derivatives.A330family,
      derivatives.beluga,
      derivatives.belugaXL,
      derivatives.belugafamily,
    ],
  },
  A330F: {
    hashtags: [derivatives.A330family],
    additionalRHashtags: [derivatives.A330F, derivatives.freighter],
  },
  A330neo: {
    hashtags: [derivatives.A330family, derivatives.A330neo],
  },
  A340: {
    hashtags: [derivatives.A340family],
  },
  A350: {
    hashtags: [derivatives.A350family],
  },
  A380: {
    hashtags: [derivatives.A380family],
  },
  ERJ: {
    hashtags: [derivatives.EJet],
  },
  E2: {
    hashtags: [derivatives.EJet, derivatives.EJetE2],
  },
  legacy: {
    hashtags: [derivatives.legacy],
  },
  phenom: {
    hashtags: [derivatives.phenom],
  },
  Q400: {
    hashtags: [derivatives.Dash8],
  },
  CRJ: {
    hashtags: [derivatives.CRJ],
  },
  global: {
    hashtags: [derivatives.global],
  },
  challenger: {
    hashtags: [derivatives.challenger],
  },
  falcon: {
    hashtags: [derivatives.falcon],
  },
  an28: {
    hashtags: [derivatives.antonov, derivatives.an28],
  },
  learjet: {
    hashtags: [derivatives.learjet],
  },
  citation: {
    hashtags: [derivatives.citation],
  },
  citationexcel: {
    hashtags: [derivatives.citation, derivatives.citationexcel],
  },
  premierIA: {
    hashtags: [
      derivatives.premierIA,
      derivatives.hawker,
      derivatives.beechcraft,
    ],
  },
  dc9: {
    hashtags: [derivatives.dc9],
  },
  // airlines
  easyJet: {
    hashtags: [derivatives.easyJet],
  },
  KLM: {
    hashtags: [derivatives.KLM],
  },
  lufthansa: {
    hashtags: [derivatives.lufthansa],
  },
  iberia: {
    hashtags: [derivatives.iberia],
  },
  airasia: {
    hashtags: [derivatives.airasia],
  },
  airasiax: {
    hashtags: [derivatives.airasia, derivatives.airasiax],
  },
  lionair: {
    hashtags: [derivatives.lionair],
  },
  smartwings: {
    hashtags: [derivatives.smartwings],
  },
  dhl: {
    hashtags: [derivatives.dhl],
  },
  transavia: {
    hashtags: [derivatives.transavia],
  },
}).reduce(
  (
    result: HashtagsCollection,
    [key, value]: [
      string,
      { hashtags: string[]; additionalRHashtags?: string[] }
    ]
  ) => {
    const { hashtags, additionalRHashtags } = value;
    return {
      ...result,
      [key]: getHashtags(hashtags, additionalRHashtags),
    };
  },
  {}
);

export const specialHashTags: HashtagsCollection = {
  // Aircrafts
  '737100': hashtags.b737original,
  '737100F': hashtags.b737originalF,
  '737200': hashtags.b737original,
  '737200F': hashtags.b737originalF,
  '737300': hashtags.b737classic,
  '737300F': hashtags.b737classicF,
  '737400': hashtags.b737classic,
  '737400F': hashtags.b737classicF,
  '737500': hashtags.b737classic,
  '737500F': hashtags.b737classicF,
  '737600': hashtags.b737ng,
  '737600F': hashtags.b737ngF,
  '737700': hashtags.b737ng,
  '737700F': hashtags.b737ngF,
  '737800': hashtags.b737ng,
  '737800F': hashtags.b737ngF,
  '737900': hashtags.b737ng,
  '737900F': hashtags.b737ngF,
  '7377': hashtags.b737MAX,
  '7377F': hashtags.b737MAXF,
  '7378': hashtags.b737MAX,
  '7378F': hashtags.b737MAXF,
  '7379': hashtags.b737MAX,
  '7379F': hashtags.b737MAXF,
  '73710': hashtags.b737MAX,
  '73710F': hashtags.b737MAXF,
  '747SP': hashtags.b747,
  '747100': hashtags.b747,
  '747200': hashtags.b747,
  '747300': hashtags.b747,
  '747400': hashtags.b747,
  '747400F': hashtags.b747F,
  '7478': hashtags.b747,
  '7478F': hashtags.b747F,
  '757100': hashtags.b757,
  '757200': hashtags.b757,
  '757200F': hashtags.b757F,
  '757300': hashtags.b757,
  '767200': hashtags.b767,
  '767300': hashtags.b767,
  '767300F': hashtags.b767F,
  '767400': hashtags.b767,
  '777200': hashtags.b777,
  '777200F': hashtags.b777F,
  '777F': hashtags.b777F,
  '777300': hashtags.b777,
  '777300F': hashtags.b777F,
  '7778': hashtags.b777,
  '7778F': hashtags.b777F,
  '7779': hashtags.b777,
  '7779F': hashtags.b777F,
  '7878': hashtags.b787,
  '7879': hashtags.b787,
  '78710': hashtags.b787,
  '72100': hashtags.atr72,
  '72100F': hashtags.atr72F,
  '72200': hashtags.atr72,
  '72200F': hashtags.atr72F,
  '72500': hashtags.atr72,
  '72500F': hashtags.atr72F,
  '72600': hashtags.atr72,
  '72600F': hashtags.atr72F,
  A300100: hashtags.A300,
  A300200: hashtags.A300,
  A300600: hashtags.A300,
  A300600F: hashtags.A300F,
  A300600ST: hashtags.A300ST,
  A310200: hashtags.A310,
  A310200F: hashtags.A310F,
  A310400: hashtags.A310,
  A310400F: hashtags.A310F,
  A318: hashtags.A320,
  A319: hashtags.A320,
  A320: hashtags.A320,
  A321: hashtags.A320,
  A318neo: hashtags.A320neo,
  A319neo: hashtags.A320neo,
  A320neo: hashtags.A320neo,
  A321neo: hashtags.A320neo,
  A330200: hashtags.A330,
  A330200F: hashtags.A330F,
  A330300: hashtags.A330,
  A330300F: hashtags.A330F,
  A330700: hashtags.A330BelugaXL,
  A330800: hashtags.A330neo,
  A330900: hashtags.A330neo,
  A340200: hashtags.A340,
  A340300: hashtags.A340,
  A340500: hashtags.A340,
  A340600: hashtags.A340,
  A350800: hashtags.A350,
  A350900: hashtags.A350,
  A3501000: hashtags.A350,
  A380: hashtags.A380,
  ERJ170: hashtags.ERJ,
  ERJ175: hashtags.ERJ,
  ERJ190: hashtags.ERJ,
  ERJ195: hashtags.ERJ,
  E170E2: hashtags.E2,
  E175E2: hashtags.E2,
  E190E2: hashtags.E2,
  E195E2: hashtags.E2,
  Legacy450: hashtags.legacy,
  Legacy500: hashtags.legacy,
  Legacy600: hashtags.legacy,
  Legacy650: hashtags.legacy,
  Phenom300: hashtags.phenom,
  Phenom100: hashtags.phenom,
  Q400: hashtags.Q400,
  CRJ100: hashtags.CRJ,
  CRJ200: hashtags.CRJ,
  CRJ700: hashtags.CRJ,
  CRJ900: hashtags.CRJ,
  CRJ1000: hashtags.CRJ,
  Global5000: hashtags.global,
  Global6000: hashtags.global,
  Challenger300: hashtags.challenger,
  Challenger350: hashtags.challenger,
  Challenger600: hashtags.challenger,
  Challenger650: hashtags.challenger,
  Falcon10: hashtags.falcon,
  Falcon20: hashtags.falcon,
  Falcon30: hashtags.falcon,
  Falcon50: hashtags.falcon,
  Falcon100: hashtags.falcon,
  Falcon200: hashtags.falcon,
  Falcon900: hashtags.falcon,
  Falcon2000: hashtags.falcon,
  Falcon7X: hashtags.falcon,
  M28: hashtags.an28,
  Learjet31: hashtags.learjet,
  Learjet35: hashtags.learjet,
  Learjet36: hashtags.learjet,
  Learjet40: hashtags.learjet,
  Learjet45: hashtags.learjet,
  Learjet55: hashtags.learjet,
  Learjet60: hashtags.learjet,
  Learjet65: hashtags.learjet,
  Learjet70: hashtags.learjet,
  Learjet75: hashtags.learjet,
  MD83: hashtags.dc9,
  MD82: hashtags.dc9,
  '650CitationIII': hashtags.citation,
  '560XLCitationExcel': hashtags.citationexcel,
  '390PremierIA': hashtags.premierIA,
  // Airlines
  easyJetEurope: hashtags.easyJet,
  easyJetSwitzerland: hashtags.easyJet,
  KLMCityhopper: hashtags.KLM,
  KLMAsia: hashtags.KLM,
  LufthansaCityLine: hashtags.lufthansa,
  IberiaExpress: hashtags.iberia,
  AirAsiaX: hashtags.airasia,
  AirAsiaIndia: hashtags.airasia,
  AirAsiaZest: hashtags.airasia,
  AirAsiaJapan: hashtags.airasia,
  AirAsiaPhilippines: hashtags.airasia,
  ThaiAirAsia: hashtags.airasia,
  IndonesiaAirAsia: hashtags.airasia,
  PhilippinesAirAsia: hashtags.airasia,
  ThaiAirAsiaX: hashtags.airasiax,
  IndonesiaAirAsiaX: hashtags.airasiax,
  ThaiLionAir: hashtags.lionair,
  SmartwingsPoland: hashtags.smartwings,
  SmartwingsSlovakia: hashtags.smartwings,
  EATLeipzig: hashtags.dhl,
  TransaviaFrance: hashtags.transavia,
};

export const freighters: Record<string, string> = {
  '737100F': '737100',
  '737200F': '737200',
  '737300F': '737300',
  '737400F': '737400',
  '737500F': '737500',
  '737600F': '737600',
  '737700F': '737700',
  '737800F': '737800',
  '737900F': '737900',
  '7377F': '7377',
  '7378F': '7378',
  '7379F': '7379',
  '73710F': '73710',
  '747400F': '747400',
  '7478F': '7478',
  '757200F': '757200',
  '767300F': '767300',
  '777200F': '777200',
  '777F': '777200',
  '777300F': '777300',
  '7778F': '7778',
  '7779F': '7779F',
  '72100F': '72100',
  '72200F': '72200',
  '72500F': '72500',
  '72600F': '72600',
  A300600F: 'A300600',
  A310200F: 'A310200',
  A310400F: 'A310400',
  A330200F: 'A330200',
  A330300F: 'A330300',
};

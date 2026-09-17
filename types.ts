export enum AppStage {
  HOME = 'HOME',
  PREP = 'PREP',
  CELL_MAP = 'CELL_MAP',
  GLYCOLYSIS = 'GLYCOLYSIS',
  SUMMARY_GLYCOLYSIS = 'SUMMARY_GLYCOLYSIS',
  OXYGEN_CHECK = 'OXYGEN_CHECK',
  ANAEROBIC = 'ANAEROBIC',
  SUMMARY_FERMENTATION = 'SUMMARY_FERMENTATION',
  LINK_REACTION = 'LINK_REACTION',
  KREBS_CYCLE = 'KREBS_CYCLE',
  SUMMARY_KREBS = 'SUMMARY_KREBS',
  ETC = 'ETC',
  SUMMARY_ETC = 'SUMMARY_ETC',
  GLOBAL_SUMMARY = 'GLOBAL_SUMMARY',
  QUIZ = 'QUIZ',
  CERTIFICATE = 'CERTIFICATE',
  BIO_LIBRARY = 'BIO_LIBRARY',
  CO_PILOT = 'CO_PILOT',
  LEARNING_HUB = 'LEARNING_HUB'
}

export interface GameState {
  atpUsed: number;
  atpMade: number;
  nadh: number;
  fadh2: number;
  glucoseCount: number;
  pyruvateCount: number;
  oxygenAvailable: boolean;
  unlockedBadges: string[];
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
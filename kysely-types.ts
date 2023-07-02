import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;
export type StudySetVisibility = "Private" | "Unlisted" | "Public";
export const StudySetVisibility = {
  Private: "Private",
  Unlisted: "Unlisted",
  Public: "Public",
};
export type EntityType = "StudySet" | "Folder";
export const EntityType = {
  StudySet: "StudySet",
  Folder: "Folder",
};
export type StudiableMode = "Flashcards" | "Learn";
export const StudiableMode = {
  Flashcards: "Flashcards",
  Learn: "Learn",
};
export type LearnMode = "Learn" | "Review";
export const LearnMode = {
  Learn: "Learn",
  Review: "Review",
};
export type LeaderboardType = "Match";
export const LeaderboardType = {
  Match: "Match",
};
export type StudySetAnswerMode = "Word" | "Definition" | "Both";
export const StudySetAnswerMode = {
  Word: "Word",
  Definition: "Definition",
  Both: "Both",
};
export type LimitedStudySetAnswerMode = "Word" | "Definition";
export const LimitedStudySetAnswerMode = {
  Word: "Word",
  Definition: "Definition",
};
export type MultipleAnswerMode = "One" | "All" | "Unknown";
export const MultipleAnswerMode = {
  One: "One",
  All: "All",
  Unknown: "Unknown",
};
export type ContainerType = "StudySet" | "Folder";
export const ContainerType = {
  StudySet: "StudySet",
  Folder: "Folder",
};
export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
};
export type AllowedEmailRegex = {
  regex: string;
  label: string;
  createdAt: Generated<Timestamp>;
};
export type AutoSaveTerm = {
  id: string;
  word: string;
  definition: string;
  rank: number;
  setAutoSaveId: string;
};
export type Container = {
  id: string;
  entityId: string;
  type: ContainerType;
  userId: string;
  viewedAt: Timestamp;
  shuffleFlashcards: Generated<number>;
  learnRound: Generated<number>;
  learnMode: Generated<LearnMode>;
  shuffleLearn: Generated<number>;
  studyStarred: Generated<number>;
  answerWith: Generated<StudySetAnswerMode>;
  multipleAnswerMode: Generated<MultipleAnswerMode>;
  extendedFeedbackBank: Generated<number>;
  enableCardsSorting: Generated<number>;
  cardsRound: Generated<number>;
  cardsStudyStarred: Generated<number>;
  cardsAnswerWith: Generated<LimitedStudySetAnswerMode>;
  matchStudyStarred: Generated<number>;
};
export type EntityShare = {
  id: string;
  entityId: string;
  type: EntityType;
};
export type Folder = {
  id: string;
  createdAt: Generated<Timestamp>;
  userId: string;
  title: string;
  slug: string | null;
  description: string;
};
export type Highscore = {
  leaderboardId: string;
  userId: string;
  time: number;
  timestamp: Timestamp;
  eligible: Generated<number>;
};
export type Leaderboard = {
  id: string;
  entityId: string;
  type: LeaderboardType;
};
export type RecentFailedLogin = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: Generated<Timestamp>;
};
export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Timestamp;
};
export type SetAutoSave = {
  userId: string;
  savedAt: Timestamp;
  title: string;
  description: string;
  tags: Generated<unknown>;
  visibility: Generated<StudySetVisibility>;
  wordLanguage: Generated<string>;
  definitionLanguage: Generated<string>;
};
export type StarredTerm = {
  userId: string;
  termId: string;
  containerId: string;
};
export type StudiableTerm = {
  userId: string;
  termId: string;
  containerId: string;
  mode: Generated<StudiableMode>;
  correctness: number;
  appearedInRound: number | null;
  incorrectCount: Generated<number>;
  studiableRank: number | null;
};
export type StudySet = {
  id: string;
  userId: string;
  createdAt: Generated<Timestamp>;
  savedAt: Generated<Timestamp>;
  title: string;
  description: string;
  tags: Generated<unknown>;
  visibility: Generated<StudySetVisibility>;
  wordLanguage: Generated<string>;
  definitionLanguage: Generated<string>;
};
export type StudySetsOnFolders = {
  studySetId: string;
  folderId: string;
};
export type Term = {
  id: string;
  word: string;
  definition: string;
  rank: number;
  studySetId: string;
};
export type User = {
  id: string;
  name: string | null;
  username: string;
  email: string | null;
  emailVerified: Timestamp | null;
  image: string | null;
  verified: Generated<number>;
  createdAt: Generated<Timestamp>;
  lastSeenAt: Generated<Timestamp>;
  bannedAt: Timestamp | null;
  displayName: Generated<number>;
  flags: Generated<number>;
  enableUsageData: Generated<number>;
  changelogVersion: string;
};
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Timestamp;
};
export type WhitelistedEmail = {
  email: string;
  createdAt: Generated<Timestamp>;
};
export type DB = {
  Account: Account;
  AllowedEmailRegex: AllowedEmailRegex;
  AutoSaveTerm: AutoSaveTerm;
  Container: Container;
  EntityShare: EntityShare;
  Folder: Folder;
  Highscore: Highscore;
  Leaderboard: Leaderboard;
  RecentFailedLogin: RecentFailedLogin;
  Session: Session;
  SetAutoSave: SetAutoSave;
  StarredTerm: StarredTerm;
  StudiableTerm: StudiableTerm;
  StudySet: StudySet;
  StudySetsOnFolders: StudySetsOnFolders;
  Term: Term;
  User: User;
  VerificationToken: VerificationToken;
  WhitelistedEmail: WhitelistedEmail;
};

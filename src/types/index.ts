export interface BirthdayData {
  recipientName: string;
  senderName: string;
  age?: number;
  birthdayDate?: string;
  whatsappNumber?: string; // e.g. 628123456789
  letterGreeting: string;
  letterBody: string;
  letterClosing: string;
  confessionQuestion: string;
  confessionMessage: string;
}

export interface TulipItem {
  id: number;
  name: string;
  meaning: string;
  colorHex: string;
  bloomed: boolean;
  petalCount: number;
  scale: number;
  rotation: number;
}

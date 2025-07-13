export interface Staff {
  name: string;
  rank: string;
  role: string;
  email: string;
  image: string;
  status: string;
  open: boolean;
}

export interface Speaker {
  id: number;
  status: string;
  translations: SpeakerTranslation[];
}

interface SpeakerTranslation {
  id: number;
  email: string;
  name: string;
  image: string;
  language_code: string;
  rank: string | null;
  role: string;
  speaker_id: number;
}

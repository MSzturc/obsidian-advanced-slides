export interface DictionaryEntry {
    value: string;
    description?: string;
    offset?: number;
}

export type Dictionary = DictionaryEntry[];
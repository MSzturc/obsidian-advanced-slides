export interface DictionaryEntry {
    value: string;
    description?: string;
    offset?: number;
}

export interface DictionaryTreeEntry {
    property: string;
    dictionary: Dictionary;
    filter?: boolean;
}

export type Dictionary = DictionaryEntry[];

export interface DictionaryMap {
    parent: Dictionary;
    children: DictionaryTreeEntry[];
}



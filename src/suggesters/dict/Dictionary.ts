export interface DictionaryEntry {
    value: string;
    description?: string;
    offset?: number;
    name?: string;
    strategy?: "contains" | "startsWith";
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

export interface DictionaryMapEntry {
    property: string;
    dictionary: DictionaryMap;
}

export interface DictionaryRoot {
    parent: Dictionary;
    children: DictionaryMapEntry[];
}

export function byInput(input: string): (value: DictionaryEntry, index: number, array: Dictionary) => boolean {
    return (x) => {

        if (x.strategy == "startsWith") {
            if (x.name) {
                return x.name.toLowerCase().startsWith(input.toLowerCase());
            } else {
                return x.value.toLowerCase().startsWith(input.toLowerCase());
            }
        } else {
            if (x.name) {
                return x.name.toLowerCase().contains(input.toLowerCase());
            } else {
                return x.value.toLowerCase().contains(input.toLowerCase());
            }
        }
    };
}


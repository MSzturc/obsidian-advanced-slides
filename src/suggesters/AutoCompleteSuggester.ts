import {
    Editor,
    EditorPosition,
    EditorSuggest,
    EditorSuggestContext,
    EditorSuggestTriggerInfo,
    TFile
} from "obsidian";
import { dict } from "./dict/AdvancedSlidesDictionary";
import { byInput, DictionaryEntry } from "./dict/Dictionary";

type Parameters = {
    tag: {
        start: number,
        end: number,
        value: string
    },
    property: {
        start: number,
        end: number,
        value: string
    },
    value: {
        start: number,
        end: number,
        value: string
    },
    start: number,
    end: number,
    line: string,
};

export class AutoCompleteSuggest extends EditorSuggest<DictionaryEntry> {

    isActive = false;

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }

    getSuggestions(ctx: EditorSuggestContext) {

        if (!this.isActive) {
            return [];
        }

        if (ctx.query.length <= 0) {
            return [];
        }

        let json: Parameters;

        try {
            json = JSON.parse(ctx.query);
            // eslint-disable-next-line no-empty
        } catch (error) { }

        if (json) {
            const tag = dict.children.filter((x) => x.property == json.tag.value);
            if (tag && tag.length > 0) {
                const map = tag.first().dictionary;
                if (json.value.value != null && json.value.value.length == 0) {
                    const result = map.children.filter((x) => x.property == json.property.value);
                    if (result && result.length > 0) {
                        return result.first().dictionary;
                    }
                } else if (json.value.value) {
                    const result = map.children.filter((x) => x.property == json.property.value);
                    if (result && result.length > 0) {
                        const dict = result.first();
                        if (dict.filter) {
                            return dict.dictionary.filter(byInput(json.value.value));
                        } else {
                            return result.first().dictionary;
                        }
                    }
                }
                else {
                    if (json.property.value) {
                        return map.parent.filter(byInput(json.property.value));
                    } else {
                        return map.parent;
                    }
                }
            }
        }

        if (ctx.query.trim().startsWith("</")) {
            return [];
        } else {
            return dict.parent.filter(byInput(ctx.query));
        }
    }
    renderSuggestion(element: DictionaryEntry, el: HTMLElement) {
        let text;
        if (element.description) {
            text = element.description;
        } else {
            text = element.value;
        }
        el.createSpan({ text });
    }
    selectSuggestion(element: DictionaryEntry, evt: MouseEvent | KeyboardEvent): void {
        if (!this.context) return;

        const cursor = this.context.editor.getCursor();

        let json: Parameters;
        try {
            json = JSON.parse(this.context.query);
            // eslint-disable-next-line no-empty
        } catch (error) { }

        if (json) {
            if (json.value.value != null) {
                const line = this.context.editor.getLine(cursor.line);

                let offset = 0;

                if (line[json.value.start] == '"' || line[json.value.start] == "'") {
                    offset = 1;
                }

                const before = line.substring(0, json.value.start + offset);
                const after = line.substring(json.value.end + offset, json.value.end + 1 + offset) + ' ' + line.substring(json.value.end + 1 + offset);
                this.context.editor.setLine(cursor.line, `${before}${element.value}${after}`);
                this.context.editor.setCursor(cursor.line, this.context.editor.getLine(cursor.line).indexOf(after) + 2);
            }
            else if (json.property.end) {
                const line = this.context.editor.getLine(cursor.line);
                const before = line.substring(0, json.property.start);
                const after = line.substring(json.property.end);
                this.context.editor.setLine(cursor.line, `${before}${element.value}${after}`);

                if (element.offset) {
                    this.context.editor.setCursor(cursor.line, this.context.start.ch + element.offset - (json.property.end - json.property.start));
                }

            } else {
                this.context.editor.replaceRange(
                    `${element.value}`,
                    this.context.start,
                    this.context.end,
                    "advancedSlides"
                );
                if (element.offset) {
                    this.context.editor.setCursor(cursor.line, this.context.start.ch + element.offset);
                }
            }

        } else {
            this.context.editor.replaceRange(
                `${element.value}`,
                this.context.start,
                this.context.end,
                "advancedSlides"
            );
            if (element.offset) {
                this.context.editor.setCursor(cursor.line, this.context.start.ch + element.offset);
            }
        }
        this.close();
    }
    onTrigger(
        cursor: EditorPosition,
        editor: Editor,
        file: TFile
    ): EditorSuggestTriggerInfo | null {

        const selectedLine = editor.getLine(cursor.line);
        const cursorPosition = cursor.ch;

        const tag = this.getTag(selectedLine, cursorPosition);
        if (tag) {
            return {
                start: { line: cursor.line, ch: cursor.ch },
                end: { line: cursor.line, ch: cursor.ch },
                query: JSON.stringify(tag),
            }
        }

        const startPosition = selectedLine.substring(0, cursorPosition).lastIndexOf(' ') + 1;
        const endPosition = selectedLine.substring(cursorPosition).indexOf(' ') + cursorPosition + 1;

        const range = editor.getRange(
            { line: cursor.line, ch: startPosition },
            { line: cursor.line, ch: endPosition }
        );
        const matchData = {
            start: { line: cursor.line, ch: startPosition },
            end: { line: cursor.line, ch: endPosition },
            query: range,
        };

        return matchData;
    }

    readTag(selectedLine: string) {
        const line = selectedLine.substring(selectedLine.lastIndexOf('<'));
        const regex = /<!?-?-?\s?\.?(\w*)\s/;

        if (regex.test(line)) {
            const result = regex.exec(line);
            if (result) {
                return {
                    start: result.index,
                    end: result.index + result[1].length,
                    value: result[1]
                }
            }
        }
    }

    getTag(selectedLine: string, cursorPosition: number) {
        const tag = this.readTag(selectedLine);

        //Determain Property
        let property;
        let propStart;
        let propEnd;

        //Determain Value
        let propValue;
        let valStart;
        let valEnd;

        if (tag) {
            const regex = /\s(\w+[\w-]*)=?((?:"|')([^(?:"|')]*)(?:"|'))?/g;
            regex.lastIndex = 0;

            let m;
            while ((m = regex.exec(selectedLine.substring(0, firstFromPosition(selectedLine, cursorPosition, ["'", '"'])))) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                property = m[1];
                propStart = m.index + 1;
                propEnd = propStart + property.length;

                propValue = undefined;
                valStart = undefined;
                valEnd = undefined;

                if (m[2] && m[3]) {
                    propValue = m[3];
                    valStart = m.index + selectedLine.substring(m.index).indexOf(propValue);
                    valEnd = valStart + propValue.length;
                } else if (m[2]) {
                    propValue = "";
                    valStart = m.index + selectedLine.substring(m.index).indexOf('"');
                    if (valStart < 0) {
                        valStart = m.index + selectedLine.substring(m.index).indexOf("'");
                    }
                    valEnd = valStart;
                }
            }

            //Reset if Cursor behind last Property
            if ((valEnd && cursorPosition > valEnd + 1) || property == "slide" || property == "element") {

                property = undefined;
                propStart = undefined;
                propEnd = undefined;

                propValue = undefined;
                valStart = undefined;
                valEnd = undefined;
            }

            return {
                tag: tag,
                property: {
                    start: propStart,
                    end: propEnd,
                    value: property
                },
                value: {
                    start: valStart,
                    end: valEnd,
                    value: propValue
                }
            }
        }

    }
}

function firstFromPosition(target: string, position: number, tokens: string[]): number {
    let result = target.length;

    for (const token of tokens) {
        const pos = target.indexOf(token, position);
        if (pos != -1) {
            result = result < pos ? result : pos;
        }
    }
    return result + 1;
}


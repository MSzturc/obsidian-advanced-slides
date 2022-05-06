import {
    Editor,
    EditorPosition,
    EditorSuggest,
    EditorSuggestContext,
    EditorSuggestTriggerInfo,
    TFile
} from "obsidian";
import { elementMap, gridMap, slideMap, splitMap, suggestionData } from "./dict/AdvancedSlidesDictionary";

interface SuggestResult {
    value: string;
    description?: string;
    aliases?: string[];
    offset?: number;
}

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

export class AutoCompleteSuggest extends EditorSuggest<SuggestResult> {

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

        console.log(`json: ${JSON.stringify(json)}`);


        if (json) {
            if (json.tag.value == "grid") {
                if (json.value.value != null && json.value.value.length == 0) {
                    const result = gridMap.children.filter((x) => x.property == json.property.value);
                    if (result && result.length > 0) {
                        return result.first().dictionary;
                    }
                } else if (json.value.value) {
                    const result = gridMap.children.filter((x) => x.property == json.property.value);
                    if (result && result.length > 0) {
                        const dict = result.first();
                        if (dict.filter) {
                            return dict.dictionary.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                        } else {
                            return result.first().dictionary;
                        }
                    }
                }
                else {
                    if (json.property.value) {
                        return gridMap.parent.filter((x) => x.value.toLowerCase().contains(json.property.value.toLowerCase()));
                    } else {
                        return gridMap.parent;
                    }
                }
            } else if (json.tag.value == "split") {
                if (json.value.value != null) {
                    const result = splitMap.children.filter((x) => x.property == json.property.value);
                    if (result && result.length > 0) {
                        return result.first().dictionary;
                    }
                }
                else if (json.property.value) {
                    return splitMap.parent.filter((x) => x.value.toLowerCase().contains(json.property.value.toLowerCase()));
                } else {
                    return splitMap.parent;
                }
            } else if (json.tag.value == "slide") {
                if (json.value.value != null && json.value.value.length == 0) {
                    const result = slideMap.children.filter((x) => x.property == json.property.value);
                    if (result && result.length > 0) {
                        return result.first().dictionary;
                    }
                } else if (json.value.value) {
                    const result = slideMap.children.filter((x) => x.property == json.property.value);
                    if (result && result.length > 0) {
                        const dict = result.first();
                        if (dict.filter) {
                            return dict.dictionary.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                        } else {
                            return result.first().dictionary;
                        }
                    }
                }
                else {
                    if (json.property.value) {
                        return slideMap.parent.filter((x) => x.value.toLowerCase().contains(json.property.value.toLowerCase()));
                    } else {
                        return slideMap.parent;
                    }
                }
            } else if (json.tag.value == "element") {
                if (json.value.value != null && json.value.value.length == 0) {
                    const result = elementMap.children.filter((x) => x.property == json.property.value);
                    if (result && result.length > 0) {
                        return result.first().dictionary;
                    }
                } else if (json.value.value) {
                    const result = elementMap.children.filter((x) => x.property == json.property.value);
                    if (result && result.length > 0) {
                        const dict = result.first();
                        if (dict.filter) {
                            return dict.dictionary.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                        } else {
                            return result.first().dictionary;
                        }
                    }
                }
                else {
                    if (json.property.value) {
                        return elementMap.parent.filter((x) => x.value.toLowerCase().contains(json.property.value.toLowerCase()));
                    } else {
                        return elementMap.parent;
                    }
                }
            }
        }

        if (ctx.query.startsWith('<!--')) {
            if (ctx.query.startsWith('<!-- slide') || ctx.query.startsWith('<!-- .slide:')) {
                return slideMap.parent;
            }
            if (ctx.query.startsWith('<!-- element') || ctx.query.startsWith('<!-- .element:')) {
                return elementMap.parent;
            }
        }

        if (ctx.query.startsWith('<') && ctx.query.endsWith('>')) {
            if (ctx.query.startsWith('<grid')) {
                return gridMap.parent;
            }

            if (ctx.query.startsWith('<split')) {
                return splitMap.parent;
            }
        }

        if (ctx.query.trim().startsWith("</")) {
            return [];
        } else {
            return suggestionData.filter((x) => x.value.toLowerCase().contains(ctx.query.toLowerCase()));
        }
    }
    renderSuggestion(element: SuggestResult, el: HTMLElement) {
        let text;
        if (element.description) {
            text = element.description;
        } else {
            text = element.value;
        }
        el.createSpan({ text });
    }
    selectSuggestion(element: SuggestResult, evt: MouseEvent | KeyboardEvent): void {
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
        let cursorPosition = cursor.ch;

        const insideTag = this.getTag(selectedLine, cursorPosition);

        if (insideTag) {
            switch (insideTag.tag.value) {
                case 'element':
                case 'slide':
                case 'split':
                case 'grid':
                    return {
                        start: { line: cursor.line, ch: cursor.ch },
                        end: { line: cursor.line, ch: cursor.ch },
                        query: JSON.stringify(insideTag),
                    }
                default:
                    return {
                        start: { line: cursor.line, ch: insideTag.start },
                        end: { line: cursor.line, ch: insideTag.end },
                        query: insideTag.line,
                    }
            }
        }

        let startPosition = 0;
        let endPosition = selectedLine.length;

        const separators = [' '];

        while (cursorPosition >= 0) {
            if (separators.contains(selectedLine[cursorPosition])) {
                cursorPosition++;
                startPosition = cursorPosition;
                break;
            }
            cursorPosition--;
        }

        while (cursorPosition <= selectedLine.length) {
            if (separators.contains(selectedLine[cursorPosition])) {
                endPosition = cursorPosition;
                break;
            }
            cursorPosition++;
        }

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

    getTag(selectedLine: string, cursorPosition: number) {
        const startIdx = selectedLine.substring(0, cursorPosition).lastIndexOf('<');
        let endIdx = selectedLine.substring(0, cursorPosition).lastIndexOf('>');

        //Filter tags that are already closed
        if (startIdx < 0 || endIdx > startIdx) return null;

        endIdx = selectedLine.indexOf('>', cursorPosition);
        if (endIdx < 0) {
            endIdx = selectedLine.length;
        } else {
            endIdx++;
        }

        //Determain Tag name
        let tag;

        let offset = 1;
        if (selectedLine.substring(startIdx).startsWith('<!--')) {
            offset = 5;
        }
        const tagStart = selectedLine.substring(startIdx + offset).length - selectedLine.substring(startIdx + offset).trimStart().length + offset + startIdx;
        const tagEnd = selectedLine.indexOf(' ', tagStart + 1);

        if (tagEnd > 0) {
            tag = selectedLine.substring(tagStart, tagEnd);
        }

        //Determain Property
        let property;
        let propStart;
        let propEnd;

        //Determain Value
        let propValue;
        let valStart;
        let valEnd;

        if (tag) {

            if (tag.startsWith('.')) {
                tag = tag.substring(1);
            }

            if (tag.endsWith(':')) {
                tag = tag.substring(0, tag.length - 1);
            }

            const regex = /\s(\w+[\w-]*)=?((?:"|')([^(?:"|')]*)(?:"|'))?/g;
            regex.lastIndex = 0;

            let m;
            while ((m = regex.exec(selectedLine)) !== null) {
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
                tag: {
                    start: tagStart,
                    end: tagEnd,
                    value: tag
                },
                property: {
                    start: propStart,
                    end: propEnd,
                    value: property
                },
                value: {
                    start: valStart,
                    end: valEnd,
                    value: propValue
                },
                start: startIdx,
                end: endIdx,
                line: selectedLine.substring(startIdx, endIdx),
            }
        }

    }
}

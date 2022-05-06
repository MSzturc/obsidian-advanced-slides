import {
    Editor,
    EditorPosition,
    EditorSuggest,
    EditorSuggestContext,
    EditorSuggestTriggerInfo,
    TFile
} from "obsidian";
import { alignData, animateData, bgData, borderData, dragData, dropData, elementData, filterData, flowData, fragData, gapData, gridData, leftData, opacityData, padData, rightData, rotateData, slideBgData, slideData, splitData, suggestionData, wrapData } from "./dict/AdvancedSlidesDictionary";

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
                    if (json.property.value == "drag") {
                        return dragData;
                    }
                    if (json.property.value == "drop") {
                        return dropData;
                    }
                    if (json.property.value == "flow") {
                        return flowData;
                    }
                    if (json.property.value == "bg") {
                        return bgData;
                    }
                    if (json.property.value == "pad") {
                        return padData;
                    }
                    if (json.property.value == "align") {
                        return alignData;
                    }
                    if (json.property.value == "border") {
                        return borderData;
                    }
                    if (json.property.value == "animate") {
                        return animateData;
                    }
                    if (json.property.value == "opacity") {
                        return opacityData;
                    }
                    if (json.property.value == "rotate") {
                        return rotateData;
                    }
                    if (json.property.value == "filter") {
                        return filterData;
                    }
                    if (json.property.value == "frag") {
                        return fragData;
                    }
                } else if (json.value.value) {
                    if (json.property.value == "drag") {
                        return dragData;
                    }
                    if (json.property.value == "drop") {
                        return dropData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "flow") {
                        return flowData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "bg") {
                        return bgData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "pad") {
                        return padData;
                    }
                    if (json.property.value == "align") {
                        return alignData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "border") {
                        return borderData;
                    }
                    if (json.property.value == "animate") {
                        return animateData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "opacity") {
                        return opacityData;
                    }
                    if (json.property.value == "rotate") {
                        return rotateData;
                    }
                    if (json.property.value == "filter") {
                        return filterData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "frag") {
                        return fragData;
                    }
                }
                else {
                    if (json.property.value) {
                        return gridData.filter((x) => x.value.toLowerCase().contains(json.property.value.toLowerCase()));
                    } else {
                        return gridData;
                    }
                }
            } else if (json.tag.value == "split") {
                if (json.value.value != null) {
                    if (json.property.value == "gap") {
                        return gapData;
                    }
                    if (json.property.value == "left") {
                        return leftData;
                    }
                    if (json.property.value == "right") {
                        return rightData;
                    }
                    if (json.property.value == "wrap") {
                        return wrapData;
                    }
                }
                else if (json.property.value) {
                    return splitData.filter((x) => x.value.toLowerCase().contains(json.property.value.toLowerCase()));
                } else {
                    return splitData;
                }
            } else if (json.tag.value == "slide") {
                if (json.value.value != null && json.value.value.length == 0) {
                    if (json.property.value == "bg") {
                        return slideBgData;
                    }
                    if (json.property.value == "data-background-opacity") {
                        return opacityData;
                    }
                } else if (json.value.value) {
                    if (json.property.value == "bg") {
                        return slideBgData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "data-background-opacity") {
                        return opacityData;
                    }
                }
                else {
                    if (json.property.value) {
                        return slideData.filter((x) => x.value.toLowerCase().contains(json.property.value.toLowerCase()));
                    } else {
                        return slideData;
                    }
                }
            } else if (json.tag.value == "element") {
                if (json.value.value != null && json.value.value.length == 0) {
                    if (json.property.value == "bg") {
                        return bgData;
                    }
                    if (json.property.value == "pad") {
                        return padData;
                    }
                    if (json.property.value == "align") {
                        return alignData;
                    }
                    if (json.property.value == "border") {
                        return borderData;
                    }
                    if (json.property.value == "animate") {
                        return animateData;
                    }
                    if (json.property.value == "opacity") {
                        return opacityData;
                    }
                    if (json.property.value == "rotate") {
                        return rotateData;
                    }
                    if (json.property.value == "filter") {
                        return filterData;
                    }
                    if (json.property.value == "frag") {
                        return fragData;
                    }
                } else if (json.value.value) {
                    if (json.property.value == "bg") {
                        return bgData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "pad") {
                        return padData;
                    }
                    if (json.property.value == "align") {
                        return alignData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "border") {
                        return borderData;
                    }
                    if (json.property.value == "animate") {
                        return animateData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "opacity") {
                        return opacityData;
                    }
                    if (json.property.value == "rotate") {
                        return rotateData;
                    }
                    if (json.property.value == "filter") {
                        return filterData.filter((x) => x.value.toLowerCase().contains(json.value.value.toLowerCase()));
                    }
                    if (json.property.value == "frag") {
                        return fragData;
                    }
                }
                else {
                    if (json.property.value) {
                        return elementData.filter((x) => x.value.toLowerCase().contains(json.property.value.toLowerCase()));
                    } else {
                        return elementData;
                    }
                }
            }
        }

        if (ctx.query.startsWith('<!--')) {
            if (ctx.query.startsWith('<!-- slide') || ctx.query.startsWith('<!-- .slide:')) {
                return slideData;
            }
            if (ctx.query.startsWith('<!-- element') || ctx.query.startsWith('<!-- .element:')) {
                return elementData;
            }
        }

        if (ctx.query.startsWith('<') && ctx.query.endsWith('>')) {
            if (ctx.query.startsWith('<grid')) {
                return gridData;
            }

            if (ctx.query.startsWith('<split')) {
                return splitData;
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

import {TemplateConditionalNode, TemplateNode, TemplateNodeType, TemplateTree} from "@/utils/TemplateTree";

type VarValuesType = { [ind: string]: string };
export type TextWithKeyType = [string, string | null];

/** Convert tuples array to plain text */
export function parsedArrayToText(array: TextWithKeyType[]): string {
    return array.reduce((acc, current) => {
        return acc + current[0];
    }, "")
}

/** Parse template text to array like [text, varKey | null][] */
export function parseTemplateMessage(template: TemplateTree,
                                     varValues: VarValuesType): TextWithKeyType[] | undefined {
    let templateTree: TemplateTree;
    try {
        templateTree = new TemplateTree(template.arrVarNames, template);
    } catch (e) {
        return undefined;
    }
    return parseNodes(templateTree.rootNode, varValues, template.arrVarNames);
}

/** Recursively parse node texts to array like [text, varKey | null][] */
function parseNodes(node: TemplateNode | null, varValues: VarValuesType, arrVarNames: string[]): TextWithKeyType[] {
    if (!node) return [];
    let resultArray: TextWithKeyType[] = [];
    let arrayToPush: TextWithKeyType[] = [];

    // recursively process all nodes and push to result array
    switch (node.type) {
        case TemplateNodeType.TEXT_NODE:
            arrayToPush = parseText(node.text, varValues, arrVarNames);
            break;
        case TemplateNodeType.CONDITIONAL_NODE:
            if (parsedArrayToText(parseText(node.text, varValues, arrVarNames)) !== "") {
                arrayToPush = parseNodes((node as TemplateConditionalNode).thenNode, varValues, arrVarNames);
            } else {
                arrayToPush = parseNodes((node as TemplateConditionalNode).elseNode, varValues, arrVarNames);
            }
            break;
    }
    resultArray =
        [
            ...resultArray,
            ...arrayToPush,
            ...parseNodes(node.nextNode, varValues, arrVarNames)
        ]
    return resultArray;
}

/** Parse node text to array like [text, varKey | null][] */
function parseText(text: string, varValues: VarValuesType, arrVarNames: string[]): TextWithKeyType[] {
    let braceIndex = -1;
    let afterBraceIndex = 0;
    let resultArray: TextWithKeyType[] = [];
    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // looking for {var} in text, save open brace index, check var when braces are closed,
        // push last text and var value tuples to resultArray
        if ((char === "{") && (braceIndex === -1)) {
            braceIndex = i;
        } else if ((char === "}") && (braceIndex !== -1)) {
            resultArray = [
                ...resultArray,
                [text.slice(afterBraceIndex, braceIndex), null],
                getProcessedTuple(text.slice(braceIndex + 1, i), varValues, arrVarNames)
            ]
            afterBraceIndex = i + 1;
            braceIndex = -1;
        }
    }

    // push remaining text to resultArray
    if (afterBraceIndex < text.length) {
        resultArray = [
            ...resultArray,
            [text.slice(afterBraceIndex), null]
        ]
    }
    return resultArray;
}

/** Parse "{variable}" to tuple like [text, varKey | null] */
function getProcessedTuple(key: string, varValues: VarValuesType, arrVarNames: string[]): TextWithKeyType {
    // If key there is in arrVarNames and values - return its value
    // If key there isn't in arrVarNames - interpret as text
    // If key there isn't in valuesArray - return empty text
    if (arrVarNames.includes(key)) {
        if (key in varValues) {
            return [varValues[key], key];
        }
        return ["", null];
    }
    return [`{${key}}`, null];
}

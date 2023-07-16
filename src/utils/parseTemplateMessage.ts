import {TemplateConditionalNode, TemplateNode, TemplateNodeType, TemplateTree} from "@/utils/TemplateTree";

type VarValuesType = { [ind: string]: string };
type TextWithKeyType = [string, string | null];

export function parseTemplateMessage(template: TemplateTree,
                                     varValues: VarValuesType): TextWithKeyType[] | undefined {
    let templateTree: TemplateTree;
    try {
        templateTree = new TemplateTree(template.arrVarNames, template);
    } catch (e) {
        return undefined;
    }
    return parseNode(templateTree.rootNode, varValues, template.arrVarNames);
}

function parseNode(node: TemplateNode | null, varValues: VarValuesType, arrVarNames: string[]): TextWithKeyType[] {
    if (!node) return [];
    let resultArray: TextWithKeyType[] = [];
    let arrayToPush: TextWithKeyType[] = [];

    // recursively process all nodes and join result arrays
    switch (node.type) {
        case TemplateNodeType.TEXT_NODE:
            arrayToPush = getProcessedArray(node.text, varValues, arrVarNames);
            break;
        case TemplateNodeType.CONDITIONAL_NODE:
            if (getTextFromArray(getProcessedArray(node.text, varValues, arrVarNames)) !== "") {
                arrayToPush = parseNode((node as TemplateConditionalNode).thenNode, varValues, arrVarNames);
            } else {
                arrayToPush = parseNode((node as TemplateConditionalNode).elseNode, varValues, arrVarNames);
            }
            break;
    }
    resultArray =
        [
            ...resultArray,
            ...arrayToPush,
            ...parseNode(node.nextNode, varValues, arrVarNames)
        ]
    return resultArray;
}

function getProcessedArray(text: string, varValues: VarValuesType, arrVarNames: string[]): TextWithKeyType[] {
    let braceIndex = -1;
    let afterBraceIndex = 0;
    let resultArray: TextWithKeyType[] = [];
    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // looking for {var} in text, save open brace index, check var when braces are closed,
        // push join last text and var value to resultArray
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
    if (afterBraceIndex < text.length) {
        resultArray = [
            ...resultArray,
            [text.slice(afterBraceIndex), null]
        ]
    }
    return resultArray;
}

function getProcessedTuple(key: string, varValues: VarValuesType, arrVarNames: string[]): TextWithKeyType {
    // If key there is in arrVarNames and values - return its value
    // If key there is not in arrVarNames - interpret as text
    // If key there is not in value - return empty text
    if (arrVarNames.includes(key)) {
        if (key in varValues) {
            return [varValues[key], key];
        }
        return ["", null];
    }
    return [`{${key}}`, null];
}

export function getTextFromArray(array: TextWithKeyType[]): string {
    return array.reduce((acc, current) => {
        return acc + current[0];
    }, "")
}

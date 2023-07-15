import {TemplateConditionalNode, TemplateNode, TemplateNodeType, TemplateTree} from "@/utils/TemplateTree";

type VarValuesType = { [ind: string]: string };
type TextWithKeyType = [string, string | null];

export function parseTemplateMessage(arrVarNames: string[], template: TemplateTree,
                                     varValues: VarValuesType): TextWithKeyType[] | undefined {
    let templateTree: TemplateTree;
    try {
        templateTree = new TemplateTree(template);
    } catch (e) {
        return undefined;
    }
    return parseNode(templateTree.rootNode, varValues);
}

function parseNode(node: TemplateNode | null, varValues: VarValuesType): TextWithKeyType[] {
    if (!node) return [];
    let resultArray: TextWithKeyType[] = [];
    let arrayToPush: TextWithKeyType[] = [];

    // recursively process all nodes and join result arrays
    switch (node.type) {
        case TemplateNodeType.TEXT_NODE:
            arrayToPush = getProcessedArray(node.text, varValues);
            break;
        case TemplateNodeType.CONDITIONAL_NODE:
            if (getTextFromArray(getProcessedArray(node.text, varValues)) !== "") {
                arrayToPush = parseNode((node as TemplateConditionalNode).thenNode, varValues);
            } else {
                arrayToPush = parseNode((node as TemplateConditionalNode).elseNode, varValues);
            }
            break;
    }
    resultArray =
        [
            ...resultArray,
            ...arrayToPush,
            ...parseNode(node.nextNode, varValues)
        ]
    return resultArray;
}

function getProcessedArray(text: string, varValues: VarValuesType): TextWithKeyType[] {
    let braceIndex = -1;
    let afterBraceIndex = 0;
    let resultArray: TextWithKeyType[] = [];
    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // looking for {var} in text, save open brace index, check var when braces are closed,
        // join last text and var value
        if ((char === "{") && (braceIndex === -1)) {
            braceIndex = i;
        } else if ((char === "}") && (braceIndex !== -1)) {
            resultArray = [
                ...resultArray,
                [text.slice(afterBraceIndex, braceIndex), null],
                getValueTuple(text.slice(braceIndex + 1, i), varValues)
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

function getValueTuple(key: string, varValues: VarValuesType): TextWithKeyType {
    return (key in varValues) ? [varValues[key], key] : ["", null];
}

export function getTextFromArray(array: TextWithKeyType[]): string {
    return array.reduce((acc, current) => {
        return acc + current[0];
    }, "")
}

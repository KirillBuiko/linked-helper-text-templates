import {TemplateConditionalNode, TemplateNode, TemplateNodeType, TemplateTree} from "@/utils/TemplateTree";

type VarValuesType = { [ind: string]: string };

/** Parse template and values to text */
export function parseTemplateMessage(template: TemplateTree,
                                     varValues: VarValuesType): string | undefined {
    let templateTree: TemplateTree;
    try {
        templateTree = new TemplateTree(template.arrVarNames, template);
    } catch (e) {
        return undefined;
    }
    return parseNodes(templateTree.rootNode, varValues, template.arrVarNames);
}

/** Recursively parse node texts */
function parseNodes(node: TemplateNode | null, varValues: VarValuesType, arrVarNames: string[]): string {
    if (!node) return "";
    let resultText = "";

    // Recursively process all nodes and add to result string
    switch (node.type) {
        case TemplateNodeType.TEXT_NODE:
            resultText += parseText(node.text, varValues, arrVarNames);
            break;
        case TemplateNodeType.CONDITIONAL_NODE:
            if (parseText(node.text, varValues, arrVarNames) !== "") {
                resultText += parseNodes((node as TemplateConditionalNode).thenNode, varValues, arrVarNames);
            } else {
                resultText += parseNodes((node as TemplateConditionalNode).elseNode, varValues, arrVarNames);
            }
            break;
    }
    resultText += parseNodes(node.nextNode, varValues, arrVarNames);
    return resultText;
}

/** Parse node text and values */
function parseText(text: string, varValues: VarValuesType, arrVarNames: string[]): string {
    let braceIndex = -1;
    let afterBraceIndex = 0;
    let resultText = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // looking for {var} in text, save open brace index, check var when braces are closed,
        // add last text and var value to resultText
        if ((char === "{") && (braceIndex === -1)) {
            braceIndex = i;
        } else if ((char === "}") && (braceIndex !== -1)) {
            resultText +=
                text.slice(afterBraceIndex, braceIndex) +
                getProcessedText(text.slice(braceIndex + 1, i), varValues, arrVarNames);
            afterBraceIndex = i + 1;
            braceIndex = -1;
        }
    }

    // add remaining text to resultText
    if (afterBraceIndex < text.length) {
        resultText += text.slice(afterBraceIndex);
    }
    return resultText;
}

/** Parse "{variable}" to text */
function getProcessedText(key: string, varValues: VarValuesType, arrVarNames: string[]): string {
    // If key there is in arrVarNames and values - return its value
    // If key there isn't in arrVarNames - interpret as text
    // If key there isn't in valuesArray - return empty text
    if (arrVarNames.includes(key)) {
        if (key in varValues) {
            return varValues[key];
        }
        return "";
    }
    return `{${key}}`;
}

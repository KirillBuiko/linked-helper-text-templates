import VariablesBlock from "@/components/VariablesBlock";
import InsertConditionalBlockButton from "@/components/InsertConditionalBlockButton";
import TemplateRecursiveBlock from "@/components/TemplateRecursiveBlock";
import TemplateActionsButtonPanel from "@/components/TemplateActionsButtonPanel";
import {useState} from "react";
import styles from './TemplateEditWidget.module.scss';

export default function TemplateEditWidget(
    {callbackSave, arrVarNames, template}:
        {
            callbackSave: (template: string) => Promise<void>,
            arrVarNames: string[],
            template?: string
        }) {
    const [templateTree, setTemplateTree] =
        useState(new TemplateTree(template ?? arrVarNames));
    const [lastClickedBlock, setLastClickedBlock] =
        useState<TemplateTextNode | null>(null);
    const [lastClickedIndex, setLastClickedIndex] =
        useState<number | null>(null);

    function updateTemplateTree() {
        // Make shallow copy of tree and set
        const newTree = Object.assign(new TemplateTree([]), templateTree);
        setTemplateTree(newTree);
    }

    function deleteNode(node: TemplateNode) {
        templateTree.deleteNode(node);
        updateTemplateTree();
    }

    function insertVariable(variable: string) {
        if (lastClickedBlock && lastClickedIndex) {
            lastClickedBlock.text =
                lastClickedBlock.text.slice(0, lastClickedIndex)
                    .concat(`{${variable}}`)
                    .concat(lastClickedBlock.text.slice(lastClickedIndex));
        } else {
            templateTree.rootNode.text = variable.concat(templateTree.rootNode.text);
        }
        updateTemplateTree();
    }

    function insertConditionalBlock() {
        if (lastClickedBlock && lastClickedIndex && arrVarNames.length > 0) {
            lastClickedBlock.insertConditionalNode(lastClickedIndex, arrVarNames[0]);
            updateTemplateTree();
        }
    }

    function onSave() {
        // TODO: ask user about save, notify about successful save (no)
        callbackSave(templateTree.toString());
    }

    function onClose() {
        // TODO: i'm don't know what to do here :/
    }

    function onPreview() {
        // TODO: show preview (add component to render)
    }

    return (
        <div className={styles.wrapper}>
            <h1>Message Template Editor</h1>
            <VariablesBlock arrVarNames={arrVarNames} onVariableClick={insertVariable}/>
            <InsertConditionalBlockButton onInsertClick={insertConditionalBlock}/>
            <div>
                <TemplateRecursiveBlock props={{
                    currentNode: templateTree.rootNode,
                    arrVarNames: templateTree.arrVarNames,
                    setLastClickedBlock,
                    setLastClickedIndex,
                    updateTemplateTree,
                    deleteNode
                }}/>
            </div>
            <TemplateActionsButtonPanel onClose={onClose}
                                        onPreview={onPreview}
                                        onSave={onSave}/>
        </div>
    );
}

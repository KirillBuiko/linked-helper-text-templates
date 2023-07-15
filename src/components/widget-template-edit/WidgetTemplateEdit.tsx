import VariablesBlock from "@/components/widget-template-edit/VariablesBlock";
import InsertConditionalBlockButton from "@/controls/insert-buttons/InsertConditionalBlockButton";
import TemplateRecursiveBlock from "@/components/widget-template-edit/TemplateRecursiveBlock";
import TemplateActionButtonsPanel from "@/components/widget-template-edit/TemplateActionButtonsPanel";
import {type TemplateNode, TemplateNodeType, type TemplateTextNode, TemplateTree} from "@/classes/TemplateTree"
import {useState} from "react";
import styles from "./WidgetTemplateEdit.module.scss";
import ControlButton from "@/controls/ControlButton";

type Props = {
    callbackSave: (template: string) => Promise<void>,
    arrVarNames: string[],
    template?: string
};
export default function WidgetTemplateEdit({callbackSave, arrVarNames, template}: Props) {
    const [templateTree, setTemplateTree] =
        useState(new TemplateTree(template ?? arrVarNames));
    const [lastClickedBlock, setLastClickedBlock] =
        useState<TemplateTextNode>(templateTree.rootNode);
    const [lastClickedIndex, setLastClickedIndex] =
        useState<number>(0);

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
        const varToInsert = `{${variable}}`;
        lastClickedBlock.text = lastClickedBlock.text.slice(0, lastClickedIndex) +
            varToInsert + lastClickedBlock.text.slice(lastClickedIndex);
        setLastClickedIndex(lastClickedIndex + varToInsert.length);
        updateTemplateTree();
    }

    function insertConditionalBlock() {
        // TODO: Think about on conditional node click behavior!
        if(lastClickedBlock.type !== TemplateNodeType.CONDITIONAL_NODE) {
            templateTree.insertConditionalNode(lastClickedBlock, lastClickedIndex);
            updateTemplateTree();
        }
    }

    function onSave() {
        callbackSave(templateTree.toString());
    }

    function onClose() {
        // TODO: ask user about save
    }

    function onPreview() {
        // TODO: show preview (add component to render)
    }

    function updateView() {
        const tree = templateTree.toString();
        const newTree = new TemplateTree(['1','2','3']);
        newTree.deleteNode(newTree.rootNode.nextNode);
        setTemplateTree(newTree);
        setTimeout(()=>setTemplateTree(new TemplateTree(tree)), 1000);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.insertPanelWrapper}>
                <InsertConditionalBlockButton onInsertClick={insertConditionalBlock}/>
                <ControlButton onClick={updateView}>Update</ControlButton>
            </div>
            <div className={styles.mainWrapper}>
                <h1 className={styles.widgetHeader}>Message Template Editor</h1>
                <div className={styles.variableButtonsWrapper}>
                    <VariablesBlock arrVarNames={arrVarNames} onVariableClick={insertVariable}/>
                </div>
                Template:
                <div className={styles.templateBlocksWrapper}>
                    <div className={styles.templateBlocks}>
                        <TemplateRecursiveBlock props={{
                            currentNode: templateTree.rootNode,
                            arrVarNames: templateTree.arrVarNames,
                            setLastClickedBlock,
                            setLastClickedIndex,
                            updateTemplateTree,
                            deleteNode
                        }}/>
                    </div>
                </div>
                <div className={styles.actionButtonsWrapper}>
                    <TemplateActionButtonsPanel onClose={onClose}
                                                onPreview={onPreview}
                                                onSave={onSave}/>
                </div>
            </div>
        </div>
    );
}

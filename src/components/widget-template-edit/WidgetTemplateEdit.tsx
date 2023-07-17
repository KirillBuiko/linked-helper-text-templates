import VariablesBlock from "@/components/widget-template-edit/VariablesBlock";
import InsertConditionalBlockButton from "@/components/controls/insert-buttons/InsertConditionalBlockButton";
import TemplateRecursiveBlock from "@/components/widget-template-edit/TemplateRecursiveBlock";
import TemplateActionButtonsPanel from "@/components/widget-template-edit/TemplateActionButtonsPanel";
import {type TemplateNode, type TemplateTextNode, TemplateTree} from "@/utils/TemplateTree"
import {useState} from "react";
import styles from "./WidgetTemplateEdit.module.scss";
import TemplatePreviewOverlay from "@/components/widget-template-edit/TemplatePreviewOverlay";

type Props = {
    callbackSave: (arrVarNames: string[], template: TemplateTree) => Promise<void>,
    arrVarNames: string[],
    template?: TemplateTree | null,
    onClose: () => void
};
export default function WidgetTemplateEdit(props: Props) {
    // State of template tree
    const [templateTree, setTemplateTree] =
        useState(() => {
            let templateTree: TemplateTree;
            try {
                templateTree = new TemplateTree(props.arrVarNames, props.template);
            } catch (e) {
                if (e instanceof Error) {
                    alert(e.message);
                }
                templateTree = new TemplateTree(props.arrVarNames);
            }
            return templateTree;
        });

    //State of last clicked block (for insert IF-THEN-ELSE and variables)
    const [lastClickedBlock, setLastClickedBlock] =
        useState<TemplateTextNode>(templateTree.rootNode);

    //State of last clicked index (for insert IF-THEN-ELSE and variables)
    const [lastClickedIndex, setLastClickedIndex] =
        useState(0);

    //State of template tree for preview (copy of current template tree)
    const [previewTemplate, setPreviewTemplate] =
        useState<TemplateTree | undefined>(undefined);

    /** Make shallow copy of template tree and set */
    function updateTemplateTree() {
        const newTree = Object.assign(new TemplateTree(props.arrVarNames), templateTree);
        setTemplateTree(newTree);
    }

    /** Delete node from template tree */
    function deleteNode(node: TemplateNode) {
        templateTree.deleteNode(node);
        updateTemplateTree();
    }

    /** Insert variable to last clicked text block */
    function insertVariable(variable: string) {
        const varToInsert = `{${variable}}`;
        lastClickedBlock.text = lastClickedBlock.text.slice(0, lastClickedIndex) +
            varToInsert + lastClickedBlock.text.slice(lastClickedIndex);
        setLastClickedIndex(lastClickedIndex + varToInsert.length);
        updateTemplateTree();
    }

    /** Insert IF-THEN-ELSE to last clicked block */
    function insertConditionalBlock() {
        templateTree.insertConditionalNode(lastClickedBlock, lastClickedIndex);
        updateTemplateTree();
    }

    /**
     * Save template tree
     */
    function onSave() {
        props.callbackSave(props.arrVarNames, templateTree).then(() => {
            alert("Save completed");
        });
    }

    /** Close widget, ask to save */
    function onClose() {
        props.onClose();
        const result = confirm("Do you want to save template?");
        if (result) {
            onSave();
        }
    }

    /** Open preview with copy of template tree */
    function onPreview() {
        setPreviewTemplate(JSON.parse(JSON.stringify(templateTree)));
    }

    /** Close preview */
    function onPreviewClose() {
        setPreviewTemplate(undefined);
    }

    return (
        <div className={styles.wrapper}>
            <TemplatePreviewOverlay template={previewTemplate}
                                    arrVarNames={props.arrVarNames}
                                    onClose={onPreviewClose}/>
            <div className={styles.insertPanelWrapper}>
                <InsertConditionalBlockButton onInsertClick={insertConditionalBlock}/>
            </div>
            <div className={styles.mainWrapper}>
                <h1 className={styles.widgetHeader}>Message Template Editor</h1>
                <div className={styles.variableButtonsWrapper}>
                    <VariablesBlock arrVarNames={props.arrVarNames} onVariableClick={insertVariable}/>
                </div>
                Template:
                <div className={styles.templateBlocksWrapper}>
                    <div className={styles.templateBlocks}>
                        <TemplateRecursiveBlock props={{
                            currentNode: templateTree.rootNode,
                            arrVarNames: props.arrVarNames,
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

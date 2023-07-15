import {TemplateBlockPropsType} from "@/types/ComponentPropTypes";
import TemplateRecursiveBlock from "@/components/widget-template-edit/TemplateRecursiveBlock";
import IfIcon from "@/icons/IfIcon";
import ElseIcon from "@/icons/ElseIcon";
import ThenIcon from "@/icons/ThenIcon";
import styles from './TemplateConditionalBlock.module.scss';
import TemplateTextBlock from "@/components/widget-template-edit/TemplateTextBlock";
import {TemplateConditionalNode} from "@/classes/TemplateTree";
import DeleteButton from "@/controls/DeleteButton";

type Props = { props: TemplateBlockPropsType }
export default function TemplateConditionalBlock({props}: Props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.blockRow}>
                <div className={styles.blockDescription}>
                    <IfIcon/>
                    <DeleteButton onClick={() => props.deleteNode(props.currentNode)}/>
                </div>
                <div className={styles.ifBlockDescription + " " + styles.blockText}>
                    <TemplateTextBlock props={{
                        ...props,
                        setLastClickedBlock: () => {
                        },
                        setLastClickedIndex: () => {
                        },
                        placeholder: "Write condition like {variable1}{variable2}"
                    }}/>
                </div>
            </div>
            <div className={styles.blockRow}>
                <div className={styles.blockDescription}>
                    <div>
                        <ThenIcon/>
                        <div style={{width: "50%", height: "100%", borderRight: "2px dashed white"}}/>
                    </div>
                </div>
                <div className={styles.blockText}>
                    <TemplateRecursiveBlock props={{
                        ...props,
                        currentNode: (props.currentNode as TemplateConditionalNode).thenNode
                    }}/>
                </div>
            </div>
            <div className={styles.blockRow}>
                <div className={styles.blockDescription}>
                    <ElseIcon/>
                </div>
                <div className={styles.blockText}>
                    <TemplateRecursiveBlock props={{
                        ...props,
                        currentNode: (props.currentNode as TemplateConditionalNode).elseNode
                    }}/>
                </div>
            </div>
        </div>
    );
}

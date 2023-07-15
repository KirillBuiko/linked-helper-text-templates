import {TemplateBlockPropsType} from "@/types/ComponentPropTypes";
import TemplateRecursiveBlock from "@/components/widget-template-edit/TemplateRecursiveBlock";
import IfIcon from "@/components/icons/IfIcon";
import ElseIcon from "@/components/icons/ElseIcon";
import ThenIcon from "@/components/icons/ThenIcon";
import styles from './TemplateConditionalBlock.module.scss';
import TemplateTextBlock from "@/components/widget-template-edit/TemplateTextBlock";
import {TemplateConditionalNode} from "@/utils/TemplateTree";
import DeleteButton from "@/components/controls/DeleteButton";

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
                        placeholder: "Write condition like {variable1}{variable2}"
                    }}/>
                </div>
            </div>
            <div className={styles.blockRow}>
                <div className={styles.blockDescription}>
                    <div className={styles.thenWrapper}>
                        <ThenIcon/>
                        <div className={styles.thenElseLine}/>
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

import {TemplateBlockPropsType} from "@/types/ComponentPropTypes";
import ControlTextArea from "@/controls/ControlTextArea";
import styles from './TemplateTextBlock.module.scss';

export default function TemplateTextBlock(
    {props}:
        { props: TemplateBlockPropsType }) {
    return (
        <div className={styles.wrapper}>
            <ControlTextArea setLastClickedIndex={props.setLastClickedIndex}
                             setLastClickedBlock={props.setLastClickedBlock}
                             node={props.currentNode as TemplateTextNode}
                             updateTemplateTree={props.updateTemplateTree}/>
        </div>
    );
}
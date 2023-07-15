import {TemplateBlockPropsType} from "@/types/ComponentPropTypes";
import ControlTextArea from "@/controls/ControlTextArea";
import styles from './TemplateTextBlock.module.scss';
import {TemplateTextNode} from "@/utils/TemplateTree";

type Props = {props: TemplateBlockPropsType & {placeholder?: string}}
export default function TemplateTextBlock({props}: Props) {
    return (
        <div className={styles.wrapper}>
            <ControlTextArea setLastClickedIndex={props.setLastClickedIndex}
                             setLastClickedBlock={props.setLastClickedBlock}
                             node={props.currentNode as TemplateTextNode}
                             updateTemplateTree={props.updateTemplateTree}
                             placeholder={props.placeholder}/>
        </div>
    );
}
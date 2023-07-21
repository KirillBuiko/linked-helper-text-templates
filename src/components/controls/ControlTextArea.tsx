import {TemplateTextNode} from "@/utils/TemplateTree";
import styles from "./ControlTextArea.module.scss"
import TextareaAutosize from 'react-textarea-autosize';

type Props = {
    node: TemplateTextNode,
    updateTemplateTree: () => void,
    setLastClickedIndex: (ind: number) => void,
    setLastClickedBlock: (node: TemplateTextNode) => void,
    placeholder?: string
}
export default function ControlTextArea(props: Props) {
    const placeHolder = props.placeholder ?? "Write template text with {variables} here";
    function onInput(event: React.FormEvent) {
        props.node.text = (event.target as HTMLInputElement).value;
        props.updateTemplateTree();
        onFocus(event);
    }

    function onFocus(event: React.FormEvent) {
        const inputElement = event.target as HTMLInputElement;
        if(inputElement.selectionStart === null) return;
        console.log(inputElement.selectionStart);
        props.setLastClickedBlock(props.node);
        props.setLastClickedIndex(inputElement.selectionStart);
    }

    return (
        <div className={styles.wrapper}>
            <TextareaAutosize value={props.node.text}
                              className={styles.textarea}
                              onInput={onInput}
                              onFocus={onFocus}
                              onClick={onFocus}
                              onKeyUp={onFocus}
                              minRows={1}
                              placeholder={placeHolder}/>
        </div>
    )
}

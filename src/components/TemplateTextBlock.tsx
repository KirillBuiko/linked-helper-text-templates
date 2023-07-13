import {TemplateBlockPropsType} from "@/types/ComponentPropTypes";
import ControlTextArea from "@/controls/ControlTextArea";

export default function TemplateTextBlock(
    {props}:
        { props: TemplateBlockPropsType }) {
    return (
        <div>
            <ControlTextArea setLastClickedIndex={props.setLastClickedIndex}
                             setLastClickedBlock={props.setLastClickedBlock}
                             node={props.currentNode as TemplateTextNode}
                             updateTemplateTree={props.updateTemplateTree}/>
        </div>
    );
}
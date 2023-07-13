import IfVariableSelect from "@/components/IfVariableSelect";
import {TemplateBlockPropsType} from "@/types/ComponentPropTypes";
import TemplateRecursiveBlock from "@/components/TemplateRecursiveBlock";
import IfIcon from "@/icons/IfIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import ElseIcon from "@/icons/ElseIcon";
import ThenIcon from "@/icons/ThenIcon";

export default function TemplateConditionalBlock(
    {props}:
        { props: TemplateBlockPropsType }) {
    return (
        <div>
            <div>
                <div>
                    <IfIcon/>
                    <span><DeleteIcon/></span>
                </div>
                <IfVariableSelect props={props}/>
            </div>
            <div>
                <ThenIcon/>
                <TemplateRecursiveBlock props={{
                    ...props,
                    currentNode: (props.currentNode as TemplateConditionalNode).thenNode
                }}/>
            </div>
            <div>
                <ElseIcon/>
                <TemplateRecursiveBlock props={{
                    ...props,
                    currentNode: (props.currentNode as TemplateConditionalNode).elseNode
                }}/>
            </div>
        </div>
    );
}

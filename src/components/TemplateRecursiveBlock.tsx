import TemplateConditionalBlock from "@/components/TemplateConditionalBlock";
import TemplateTextBlock from "@/components/TemplateTextBlock";
import {TemplateBlockPropsType} from "@/types/ComponentPropTypes";

export default function TemplateRecursiveBlock(
    {props}:
        {props: TemplateBlockPropsType}) {
    let templateBlock;
    switch (props.currentNode.type) {
        case TemplateNodeType.CONDITIONAL_NODE:
            templateBlock = <TemplateConditionalBlock props={props}/>;
            break;
        case TemplateNodeType.TEXT_NODE:
            templateBlock = <TemplateTextBlock props={props}/>;
            break;
    }
    return (
        <div>
            {templateBlock}
            {props.currentNode.nextNode && <TemplateRecursiveBlock props={props}/>}
        </div>
    );
}

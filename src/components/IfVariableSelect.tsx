export default function IfVariableSelect(
    {props}: {
        props: {
            currentNode: TemplateNode,
            arrVarNames: string[],
            updateTemplateTree: () => void
        }
    }) {
    return (
        <div>
            {(props.currentNode as TemplateConditionalNode).variable}
        </div>
    );
}

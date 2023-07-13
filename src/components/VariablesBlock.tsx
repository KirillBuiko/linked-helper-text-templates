import VariablesItem from "@/components/VariablesItem";

export default function VariablesBlock(
    {arrVarNames, onVariableClick}:
        { arrVarNames: string[], onVariableClick: (variable: string) => void }) {
    const variablesList = arrVarNames.map((v, ind) =>
        <VariablesItem key={ind} variable={v} onVariableClick={() => onVariableClick(v)}/>);
    return (
        <div>
            {variablesList}
        </div>
    );
}
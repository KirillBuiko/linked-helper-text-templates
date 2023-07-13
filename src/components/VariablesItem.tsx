export default function VariablesItem(
    {variable, onVariableClick}:
        { variable: string, onVariableClick: () => void }) {
    return (
        <button onClick={onVariableClick}>{variable}</button>
    );
}
export default function InsertConditionalBlockButton(
    {onInsertClick}:
        {onInsertClick: ()=>void}) {
    return (
        <div>
            <button onClick={onInsertClick}>INSERT IF STATEMENT</button>
        </div>
    );
}

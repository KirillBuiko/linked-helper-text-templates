import {useRef} from "react";

export default function ControlTextArea(
    {node, updateTemplateTree, setLastClickedBlock, setLastClickedIndex}:
        {
            node: TemplateTextNode,
            updateTemplateTree: () => void,
            setLastClickedIndex: (ind: number) => void,
            setLastClickedBlock: (node: TemplateTextNode) => void,
        }) {
    const inputRef = useRef<HTMLInputElement>(null);

    function onInput(event: React.FormEvent) {
        node.text = (event.target as HTMLInputElement).value;
        updateTemplateTree();
        onFocus();
    }

    function onFocus() {
        if(!(inputRef && inputRef.current && inputRef.current.selectionStart !== null)) return;
        setLastClickedBlock(node);
        setLastClickedIndex(inputRef.current.selectionStart);
    }

    return (
        <div>
            <input type="text"
                   ref={inputRef}
                   value={node.text}
                   onInput={onInput}
                   onFocus={onFocus}
                   onClick={onFocus}/>
        </div>
    )
}

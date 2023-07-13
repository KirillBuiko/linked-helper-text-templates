export interface TemplateBlockPropsType {
    currentNode: TemplateNode,
    setLastClickedIndex: (ind: number) => void,
    setLastClickedBlock: (node: TemplateTextNode) => void,
    deleteNode: (node: TemplateNode) => void,
    arrVarNames: string[],
    updateTemplateTree: () => void
}

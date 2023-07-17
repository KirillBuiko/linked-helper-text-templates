import {TemplateConditionalNode, TemplateTree} from "@/utils/TemplateTree";

/** Prepare template tree with conditional node */
export function prepareTree(arrVarNames = ["var1", "var2", "var3"]) {
    const tree = new TemplateTree(arrVarNames)
    tree.rootNode.text = "Start text ";
    const ifNode1 = tree.rootNode!.nextNode as TemplateConditionalNode;
    ifNode1.text = "{var1}";
    ifNode1.thenNode.text = "{var1}";
    ifNode1.elseNode.text = "{var2}";
    ifNode1.nextNode!.text = " End text";
    return tree;
}

/** Prepare template tree with two conditional nodes */
export function prepareTree2(arrVarNames = ["var1", "var2", "var3"]) {
    const tree = new TemplateTree(arrVarNames)
    tree.rootNode.text = "Start text ";

    const ifNode1 = tree.rootNode!.nextNode as TemplateConditionalNode;
    ifNode1.text = "{var1}";
    ifNode1.thenNode.text = "{var1}";
    ifNode1.elseNode.text = "{var2}";
    tree.insertConditionalNode(ifNode1.elseNode);

    const ifNode2 = ifNode1.elseNode!.nextNode as TemplateConditionalNode;
    ifNode2.text = "{var4}";
    ifNode2.thenNode.text = "{var4}";
    ifNode2.elseNode.text = "";

    ifNode1.nextNode!.text = " End text";
    return tree;
}
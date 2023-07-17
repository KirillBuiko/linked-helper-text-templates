export enum TemplateNodeType {
    TEXT_NODE,
    CONDITIONAL_NODE
}

/** Template tree class */
export class TemplateTree {
    rootNode: TemplateTextNode;

    constructor(public arrVarNames: string[], template?: TemplateTree | null) {
        this.rootNode = new TemplateTextNode("Hello!");
        if (template) {
            if (template.rootNode) {
                this.rootNode = template.rootNode;
            } else {
                throw new Error("Template is invalid");
            }
        } else {
            this.initDefaultTree();
        }
    }

    /** Init default tree with one conditional node */
    initDefaultTree() {
        this.rootNode.nextNode = new TemplateConditionalNode();
        this.rootNode.nextNode.nextNode = new TemplateTextNode("Bye!");
    }

    /** Search parent node */
    findParent(node: TemplateNode | null, current: TemplateNode | null = this.rootNode): TemplateNode | null {
        if (!node || !current) return null;
        if (current.nextNode === node) {
            return current;
        } else if (current.type === TemplateNodeType.TEXT_NODE) {
            // If text node - search in next node
            return this.findParent(node, current.nextNode);
        } else if (current.type === TemplateNodeType.CONDITIONAL_NODE) {
            // If conditional node - search in then, else and next
            return this.findParent(node, (current as TemplateConditionalNode).thenNode)
                || this.findParent(node, (current as TemplateConditionalNode).elseNode)
                || this.findParent(node, (current as TemplateConditionalNode).nextNode);
        }
        return null;
    }

    /** Delete node from tree */
    deleteNode(node: TemplateNode): void {
        const parentNode = this.findParent(node);
        if (!parentNode) return;
        parentNode.nextNode = node.nextNode;
        // Merge two nearby text blocks
        if (parentNode.nextNode && parentNode.nextNode.type === TemplateNodeType.TEXT_NODE &&
            parentNode.type === TemplateNodeType.TEXT_NODE) {
            parentNode.text += parentNode.nextNode.text;
            parentNode.nextNode = parentNode.nextNode.nextNode;
        }
    }

    /** Split text node and insert conditional node between them */
    insertConditionalNode(node: TemplateNode, cursor: number = -1) {
        switch (node.type) {
            case TemplateNodeType.TEXT_NODE:
                this.insertConditionalNodeToTextNode(node, cursor);
                break;
            case TemplateNodeType.CONDITIONAL_NODE:
                //this.insertConditionalNodeToConditionalNode(node, cursor);
                break;
        }
    }

    insertConditionalNodeToTextNode(node: TemplateNode, cursor: number = -1) {
        // Create new textNodes and conditionalNode
        const newTextNode =
            new TemplateTextNode((cursor < node.text.length && cursor >= 0) ? node.text.slice(cursor) : "");
        if (newTextNode.text !== "") {
            node.text = node.text.slice(0, cursor);
        }
        const newConditionalNode = new TemplateConditionalNode();

        // Linking new nodes like (current -> conditionalNode -> textNode -> currentNext);
        newTextNode.nextNode = node.nextNode;
        node.nextNode = newConditionalNode;
        newConditionalNode.nextNode = newTextNode;
    }

    insertConditionalNodeToConditionalNode(node: TemplateNode, cursor: number = -1) {
        // Create new textNodes
        const cursorIndex = (cursor < node.text.length && cursor >= 0) ? cursor : 0;
        const newTextNode1 = new TemplateTextNode(node.text.slice(0, cursorIndex));
        const newTextNode2 = new TemplateTextNode(node.text.slice(cursorIndex));
        node.text = "";
        const parentNode = this.findParent(node);
        if (!parentNode) return;

        // Linking new nodes like (parent -> text1 -> current -> text2 -> currentNext);
        parentNode.nextNode = newTextNode1;
        newTextNode1.nextNode = node;
        newTextNode2.nextNode = node.nextNode;
        node.nextNode = newTextNode2;
    }
}

/** Base template tree node class */
export abstract class TemplateNode {
    nextNode: TemplateNode | null;

    protected constructor(public type: TemplateNodeType, public text = "") {
        this.nextNode = null;
    }
}

/** Text node class */
export class TemplateTextNode extends TemplateNode {
    constructor(text = "") {
        super(TemplateNodeType.TEXT_NODE, text);
        this.text = text;
    }
}

/** Conditional node class */
export class TemplateConditionalNode extends TemplateNode {
    thenNode: TemplateTextNode;
    elseNode: TemplateTextNode;

    constructor() {
        super(TemplateNodeType.CONDITIONAL_NODE, "");
        this.thenNode = new TemplateTextNode("");
        this.elseNode = new TemplateTextNode("");
    }
}

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

    /** Search and delete node from tree */
    deleteNode(node: TemplateNode | null, current: TemplateNode | null = this.rootNode): boolean {
        if (!node || !current) return false;
        if (current.nextNode === node) {
            // Delete node
            current.nextNode = node.nextNode;
            // Merge two nearby text blocks
            if (current.nextNode && current.nextNode.type === TemplateNodeType.TEXT_NODE &&
                current.type === TemplateNodeType.TEXT_NODE) {
                current.text += current.nextNode.text;
                current.nextNode = current.nextNode.nextNode;
            }
            return true;
        } else if (current.type === TemplateNodeType.TEXT_NODE) {
            // If text node - search in next node
            return this.deleteNode(node, current.nextNode);
        } else if (current.type === TemplateNodeType.CONDITIONAL_NODE) {
            // If conditional node - search in then, else and next
            return this.deleteNode(node, (current as TemplateConditionalNode).thenNode)
                || this.deleteNode(node, (current as TemplateConditionalNode).elseNode)
                || this.deleteNode(node, (current as TemplateConditionalNode).nextNode);
        }
        return false;
    }

    /** Split text node and insert conditional node between them */
    insertConditionalNode(node: TemplateTextNode, cursor: number = -1) {
        // Create new textNode and conditionalNode
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

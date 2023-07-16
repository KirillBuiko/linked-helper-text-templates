export enum TemplateNodeType {
    TEXT_NODE,
    CONDITIONAL_NODE
}

export abstract class TemplateNode {
    nextNode: TemplateNode | null;

    protected constructor(public type: TemplateNodeType, public text = "") {
        this.nextNode = null;
    }
}

export class TemplateTextNode extends TemplateNode {
    constructor(text = "") {
        super(TemplateNodeType.TEXT_NODE, text);
        this.text = text;
    }
}

export class TemplateConditionalNode extends TemplateNode {
    thenNode: TemplateTextNode;
    elseNode: TemplateTextNode;

    constructor() {
        super(TemplateNodeType.CONDITIONAL_NODE, "");
        this.thenNode = new TemplateTextNode("");
        this.elseNode = new TemplateTextNode("");
    }
}

export class TemplateTree {
    rootNode: TemplateTextNode;

    constructor(public arrVarNames: string[], template?: TemplateTree) {
        this.rootNode = new TemplateTextNode("Hello!");

        if (template) {
            if(template.rootNode) {
                this.rootNode = template.rootNode;
            } else {
                throw new Error("Template is invalid");
            }
        } else {
            this.initDefaultTree();
        }
    }

    initDefaultTree() {
        this.rootNode.nextNode = new TemplateConditionalNode();
        this.rootNode.nextNode.nextNode = new TemplateTextNode("Bye!");
    }

    deleteNode(node: TemplateNode | null, current: TemplateNode | null = this.rootNode): boolean {
        if (!node || !current) return false;
        if (current.nextNode === node) {
            // Skip block to delete
            current.nextNode = node.nextNode;
            // Merge two nearby text blocks
            if (current.nextNode && current.nextNode.type === TemplateNodeType.TEXT_NODE &&
                current.type === TemplateNodeType.TEXT_NODE) {
                (current as TemplateTextNode).text += (current.nextNode as TemplateTextNode).text;
                current.nextNode = current.nextNode.nextNode;
            }
            return true;
        } else if (current.type === TemplateNodeType.TEXT_NODE) {
            return this.deleteNode(node, current.nextNode);
        } else if (current.type === TemplateNodeType.CONDITIONAL_NODE) {
            return this.deleteNode(node, (current as TemplateConditionalNode).thenNode)
                || this.deleteNode(node, (current as TemplateConditionalNode).elseNode)
                || this.deleteNode(node, (current as TemplateConditionalNode).nextNode);
        }
        return false;
    }

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

    toString() {
        return JSON.stringify(this);
    }
}

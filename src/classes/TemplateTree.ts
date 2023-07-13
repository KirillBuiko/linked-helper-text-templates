enum TemplateNodeType {
    TEXT_NODE,
    CONDITIONAL_NODE
}

abstract class TemplateNode {
    nextNode: TemplateNode | null;
    type;

    protected constructor(type: TemplateNodeType) {
        this.nextNode = null;
        this.type = type;
    }
}

class TemplateTextNode extends TemplateNode {
    text: string;

    constructor(text = "") {
        super(TemplateNodeType.TEXT_NODE);
        this.text = text;
    }

    insertConditionalNode(cursor: number = -1, variable: string = "") {
        const newTextNode = new TemplateTextNode((cursor < this.text.length && cursor > 0) ? this.text.slice(cursor) : "");
        if (newTextNode.text !== "") {
            this.text = this.text.slice(0, cursor);
        }
        const newConditionalNode = new TemplateConditionalNode(variable);
        this.nextNode = newConditionalNode;
        newConditionalNode.nextNode = newTextNode;
    }
}

class TemplateConditionalNode extends TemplateNode {
    variable: string;
    thenNode: TemplateTextNode;
    elseNode: TemplateTextNode;

    constructor(variable: string = "") {
        super(TemplateNodeType.CONDITIONAL_NODE);
        this.variable = variable;
        this.thenNode = new TemplateTextNode("");
        this.elseNode = new TemplateTextNode("");
    }
}

class TemplateTree {
    arrVarNames: string[];
    rootNode: TemplateTextNode;

    constructor(arrVarNames: string[]);
    constructor(template: string);
    constructor(arg: string[] | string);
    constructor(arg: string[] | string) {
        this.rootNode = new TemplateTextNode("Hello!");
        this.arrVarNames = [];

        if (typeof arg === "object") {
            this.arrVarNames = arg;
            this.initDefaultTree();
        } else {
            Object.assign(this, JSON.parse(arg));
        }
    }

    initDefaultTree() {
        this.rootNode.nextNode = new TemplateConditionalNode(this.arrVarNames[0] || "");
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

    toString() {
        return JSON.stringify(this);
    }
}

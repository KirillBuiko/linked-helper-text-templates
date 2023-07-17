import {expect, test,} from '@jest/globals';
import {TemplateTree} from "@/utils/TemplateTree"
import {parsedArrayToText, parseTemplateMessage, TextWithKeyType} from "../utils/parseTemplateMessage";
import {prepareTree, prepareTree2} from "./trees";

test('tree test, create if node', () => {
    const tree = prepareTree();
    expect(tree.rootNode.nextNode).not.toBeNull();
});

test('tree test, join if node with next', () => {
    const tree = prepareTree();
    expect(tree.rootNode.nextNode && tree.rootNode.nextNode.nextNode).not.toBeNull();
});

test("tree test, invalid template", () => {
    expect(() => {
        new TemplateTree([], JSON.parse("{}"));
    }).toThrow(Error);
});

test('parse test, parse return not undefined', () => {
    const tree = prepareTree();
    const parsedArray = parseTemplateMessage(tree, {});

    expect(parsedArray).not.toBeUndefined();
});

test('parse test, all vars defined', () => {
    const tree = prepareTree();
    const parsedArray = parseTemplateMessage(tree, {
        var1: "text1",
        var2: "text2",
        var3: "text3"
    }) as TextWithKeyType[];

    expect(parsedArrayToText(parsedArray)).toBe("Start text text1 End text");
});

test("parse test, var1 undefined, var4 not in array", () => {
    const tree = prepareTree2();
    const parsedArray = parseTemplateMessage(tree, {
        var2: "text2",
        var3: "text3",
        var4: "text4"
    }) as TextWithKeyType[];

    expect(parsedArrayToText(parsedArray)).toBe("Start text text2{var4} End text");
});

test("parse test, invalid template", () => {
    const parsedArray = parseTemplateMessage(JSON.parse("{}"), {}) as TextWithKeyType[];

    expect(parsedArray).toBeUndefined();
});

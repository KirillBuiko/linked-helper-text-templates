import TemplateConditionalBlock from "@/components/widget-template-edit/TemplateConditionalBlock";
import TemplateTextBlock from "@/components/widget-template-edit/TemplateTextBlock";
import {TemplateBlockPropsType} from "@/types/ComponentPropTypes";
import styles from './TemplateRecursiveBlock.module.scss';
import {TemplateNodeType} from "@/classes/TemplateTree";
import {useEffect, useRef, useState} from "react";

type Props = { props: TemplateBlockPropsType }
export default function TemplateRecursiveBlock({props}: Props) {
    const [clip, setClip] = useState("unset");

    useEffect(()=>{
        setClip('0');
    }, [setClip]);

    let templateBlock;
    switch (props.currentNode.type) {
        case TemplateNodeType.CONDITIONAL_NODE:
            templateBlock = <TemplateConditionalBlock props={{...props}}/>;
            break;
        case TemplateNodeType.TEXT_NODE:
            templateBlock = <TemplateTextBlock props={{...props}}/>;
            break;
    }
    return (
        <div className={styles.wrapper} style={{clipPath: `inset(0 0 ${clip}% 0)`}}>
            <div className={styles.currentNode}>
                {templateBlock}
            </div>
            <div className={styles.nextNode}>
                {props.currentNode.nextNode &&
                    <TemplateRecursiveBlock props={{
                        ...props,
                        currentNode: props.currentNode.nextNode
                    }}/>
                }
            </div>
        </div>
    );
}

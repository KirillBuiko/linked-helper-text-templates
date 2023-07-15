import styles from './TemplatePreviewOverlay.module.scss';
import OverlayContainer from "@/components/overlays/OverlayContainer";
import {parseTemplateMessage} from "@/utils/parseTemplateMessage";
import {useState} from "react";
import VariableValueInput from "@/components/controls/VariableValueInput";

type Props = {
    template: string,
    arrVarNames: string[],
    onClose: () => void,
}

const colorPalette: string[] = [];
for (let i = 0; i < 20; i++) {
    colorPalette[i] = `hsl(${(i * 70 + 40) % 360} 100% 50%)`;
}

export default function TemplatePreviewOverlay(props: Props) {
    const [values, setValues] = useState(
        props.arrVarNames.reduce((acc, val) => {
            acc[val] = "";
            return acc;
        }, {} as Record<string, string>)
    );
    const parsedArray = parseTemplateMessage(props.arrVarNames, props.template, values);

    const parsedElements = parsedArray ? parsedArray.map((text, ind) => (
        <span key={ind}
              className={text[1] !== null ? styles.coloredText : ""}
              style={{borderColor: text[1] ? colorPalette[props.arrVarNames.indexOf(text[1])] : "black"}}>
            {text[0]}
        </span>
    )) : "";

    function onSetValue(key: string, value: string) {
        if (key in values) {
            values[key] = value;
        }
        setValues(Object.assign({}, values));
    }

    const variableInputs = props.arrVarNames.map((v, ind) => (
        <VariableValueInput key={ind}
                            onChange={(val) => onSetValue(v, val)}
                            color={colorPalette[props.arrVarNames.indexOf(v)]}
                            variable={v}/>
    ));

    return (
        <OverlayContainer isShown={props.template !== ""}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className={styles.title}>Message Preview</div>
                    <div className={styles.closeButton} onClick={props.onClose}>
                        ✕
                    </div>
                </header>
                <div className={styles.previewText}>
                    {parsedElements}
                </div>
                <div className={styles.variableInputsWrapper}>
                    Variables: {variableInputs}
                </div>
            </div>
        </OverlayContainer>
    );
}
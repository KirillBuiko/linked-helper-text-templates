import styles from './TemplatePreviewOverlay.module.scss';
import OverlayContainer from "@/components/overlays/OverlayContainer";
import {parseTemplateMessage} from "@/utils/parseTemplateMessage";
import {useState} from "react";
import VariableValueInput from "@/components/controls/VariableValueInput";
import {TemplateTree} from "@/utils/TemplateTree";

const colorPalette: string[] = [];
for (let i = 0; i < 20; i++) {
    colorPalette[i] = `hsl(${(i * 70 + 40) % 360} 100% 50%)`;
}

type Props = {
    template: TemplateTree | undefined,
    arrVarNames: string[],
    onClose: () => void,
}

export default function TemplatePreviewOverlay(props: Props) {
    // State with empty input values
    const [values, setValues] = useState(
        props.arrVarNames.reduce((acc, val) => {
            acc[val] = "";
            return acc;
        }, {} as Record<string, string>)
    );

    // Trying to parse template and values to text
    const parsedText = props.template ? parseTemplateMessage(props.template, values) : [];

    function onSetValue(key: string, value: string) {
        if (key in values) {
            values[key] = value;
        }
        setValues(Object.assign({}, values));
    }

    // Map var names to inputs
    const variableInputs = props.arrVarNames.map((v, ind) => (
        <VariableValueInput key={ind}
                            onChange={(val) => onSetValue(v, val)}
                            color={colorPalette[props.arrVarNames.indexOf(v)]}
                            variable={v}/>
    ));

    return (
        <OverlayContainer isShown={!!props.template}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className={styles.title}>Message Preview</div>
                    <div className={styles.closeButton} onClick={props.onClose}>
                        ✕
                    </div>
                </header>
                <div className={styles.previewText}>
                    {parsedText}
                </div>
                <div className={styles.variableInputsWrapper}>
                    Variables: {variableInputs}
                </div>
            </div>
        </OverlayContainer>
    );
}
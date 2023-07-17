import VariableButton from "@/components/controls/VariableButton";
import styles from './VariablesBlock.module.scss';

type Props = { arrVarNames: string[], onVariableClick: (variable: string) => void };
export default function VariablesBlock(props: Props) {
    // Map var names to var buttons
    const variablesList = props.arrVarNames.map((v, ind) =>
        <>
            <VariableButton key={ind}
                            variable={v}
                            onVariableClick={() => props.onVariableClick(v)}/>
        </>
    );
    return (
        <div className={styles.wrapper}>
            Variables:
            {variablesList}
        </div>
    );
}
import VariablesItem from "@/components/widget-template-edit/VariablesItem";
import styles from './VariablesBlock.module.scss';

type Props = { arrVarNames: string[], onVariableClick: (variable: string) => void };
export default function VariablesBlock(props: Props) {
    const variablesList = props.arrVarNames.map((v, ind) =>
        <>
            <VariablesItem key={ind}
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
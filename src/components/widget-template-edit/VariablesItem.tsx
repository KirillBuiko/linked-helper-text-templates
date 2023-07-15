import styles from './VariablesItem.module.scss';
import ControlButton from "@/controls/ControlButton";

type Props = {
    variable: string,
    onVariableClick: () => void
}
export default function VariablesItem(props: Props) {
    return (
        <div className={styles.wrapper}>
            <ControlButton onClick={props.onVariableClick}>{props.variable}</ControlButton>
        </div>
    );
}
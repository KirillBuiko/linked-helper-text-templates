import styles from './VariableButton.module.scss';
import ControlButton from "@/components/controls/ControlButton";

type Props = {
    variable: string,
    onVariableClick: () => void
}
export default function VariableButton(props: Props) {
    return (
        <div className={styles.wrapper}>
            <ControlButton onClick={props.onVariableClick}>{props.variable}</ControlButton>
        </div>
    );
}
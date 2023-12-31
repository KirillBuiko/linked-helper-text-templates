import styles from './InsertConditionalBlockButton.module.scss';
import ControlButton from "@/components/controls/ControlButton";
import IfIcon from "@/components/icons/IfIcon";
import ThenIcon from "@/components/icons/ThenIcon";
import ElseIcon from "@/components/icons/ElseIcon";

type Props = {onInsertClick: ()=>void}
export default function InsertConditionalBlockButton(props: Props) {
    return (
        <div className={styles.wrapper}>
            <ControlButton onClick={props.onInsertClick}>
                <div className={styles.buttonTextWrapper}>
                    <span>Insert IF-THEN-ELSE block</span>
                    <div className={styles.blockDescription}>
                        <IfIcon/><div>:&nbsp; {"{var}"} or expression</div>
                    </div>
                    <div className={styles.blockDescription}>
                        <ThenIcon/><div>:&nbsp; If not empty</div>
                    </div>
                    <div className={styles.blockDescription}>
                        <ElseIcon/><div>:&nbsp; Else</div>
                    </div>
                </div>
            </ControlButton>
        </div>
    );
}

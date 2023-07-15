import styles from './TemplateActionButtonsPanel.module.scss';
import ControlButton from "@/controls/ControlButton";

type Props = {
    onSave: () => void,
    onPreview: () => void,
    onClose: () => void
}
export default function TemplateActionButtonsPanel(props: Props) {
    return (
        <div className={styles.wrapper}>
            <ControlButton onClick={props.onSave}>SAVE</ControlButton>
            <ControlButton onClick={props.onPreview}>PREVIEW</ControlButton>
            <ControlButton onClick={props.onClose}>CLOSE</ControlButton>
        </div>
    )
}
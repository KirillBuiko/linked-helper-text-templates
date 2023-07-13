import styles from './TemplateActionsButtonPanel.module.scss';
import ControlButton from "@/controls/ControlButton";

export default function TemplateActionsButtonPanel(
    {onSave, onPreview, onClose}:
        { onSave: () => void, onPreview: () => void, onClose: () => void }) {
    return (
        <div className={styles.wrapper}>
            <ControlButton onClick={onSave}>SAVE</ControlButton>
            <ControlButton onClick={onPreview}>PREVIEW</ControlButton>
            <ControlButton onClick={onClose}>CLOSE</ControlButton>
        </div>
    )
}
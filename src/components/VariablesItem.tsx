import styles from './VariablesItem.module.scss';

export default function VariablesItem(
    {variable, onVariableClick}:
        { variable: string, onVariableClick: () => void }) {
    return (
        <button className={styles.button} onClick={onVariableClick}>{variable}</button>
    );
}
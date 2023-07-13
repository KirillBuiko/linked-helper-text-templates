import styles from './InsertConditionalBlockButton.module.scss';

export default function InsertConditionalBlockButton(
    {onInsertClick}:
        {onInsertClick: ()=>void}) {
    return (
        <div className={styles.wrapper}>
            <button onClick={onInsertClick}>INSERT IF STATEMENT</button>
        </div>
    );
}

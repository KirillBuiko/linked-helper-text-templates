import styles from './Icon.module.scss';

export default function DeleteIcon() {
    return (
        <div className={styles.wrapper}
             style={{borderColor: "rgb(255,132,132)", borderRadius: "0"}}>
            DELETE
        </div>
    );
}

import * as React from 'react';
import DeleteIcon from "@/icons/DeleteIcon";
import styles from './DeleteButton.module.scss'

type Props = {
    onClick: () => void
};
export default function DeleteButton(props: Props) {
    return (
        <div className={styles.wrapper} onClick={props.onClick}>
            <DeleteIcon/>
        </div>
    );
}
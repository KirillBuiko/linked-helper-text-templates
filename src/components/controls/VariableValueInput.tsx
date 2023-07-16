import * as React from 'react';
import styles from './VariableValueInput.module.scss';

type Props = {
    onChange: (value: string) => void,
    color: string,
    variable: string
};
export default function VariableValueInput(props: Props) {
    return (
        <div className={styles.wrapper} style={{borderColor: props.color}}>
            <div className={styles.variableTitle}>{props.variable}</div>
            <input className={styles.variableInput}
                   placeholder={'Value'}
                   onChange={(e) => props.onChange(e.target.value)}/>
        </div>
    );
}
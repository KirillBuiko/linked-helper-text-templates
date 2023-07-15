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
            <input className={styles.variableInput}
                   placeholder={props.variable}
                   onChange={(e) => props.onChange(e.target.value)}/>
        </div>
    );
}
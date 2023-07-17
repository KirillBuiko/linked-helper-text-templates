import * as React from 'react';
import styles from './OverlayContainer.module.scss';

type Props = { children: React.ReactNode, isShown: boolean };
export default function OverlayContainer(props: Props) {
    return (
        <div className={`${styles.wrapper} ${props.isShown ? styles.isShown : ""}`}>
            {props.children}
        </div>
    );
}
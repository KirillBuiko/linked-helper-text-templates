import * as React from 'react';
import styles from './BigWidgetButton.module.scss';
import ControlButton from "@/components/controls/ControlButton";

type Props = {
    children: React.ReactNode,
    onClick: () => void
};
export default function BigWidgetButton(props: Props) {
    return (
        <div className={styles.wrapper}>
            <ControlButton onClick={props.onClick}>
                <div className={styles.widgetImage}></div>
                <div className={styles.title}>{props.children}</div>
            </ControlButton>
        </div>
    );
}
import styles from "./ControlButton.module.scss";

type Props = {
    children: React.ReactNode,
    onClick: () => void
}
export default function ControlButton(props: Props) {
    return (
        <div className={styles.wrapper}
             onClick={props.onClick}>
            {props.children}
        </div>
    )
}

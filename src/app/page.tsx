import WidgetSelect from "@/views/WidgetSelect";
import styles from "./page.module.scss";
import './globals.css';

export default function Home() {
    // TODO: write function to save/read template

    return (
        <div className={styles.wrapper}>
            <WidgetSelect/>
        </div>
    )
}

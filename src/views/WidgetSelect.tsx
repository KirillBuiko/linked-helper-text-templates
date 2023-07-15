"use client"
import * as React from 'react';
import {WidgetName} from "@/types/WidgetsTypes";
import styles from './WidgetSelect.module.scss';
import {useState} from "react";
import WidgetTemplateEdit from "@/components/widget-template-edit/WidgetTemplateEdit";
import BigWidgetButton from "@/components/controls/BigWidgetButton";

function widgetTemplateEdit(props: { onClose: () => void }) {
    // TODO: create functions for widgetTemplate
    async function save(template: string) {

    }

    return (
        <WidgetTemplateEdit callbackSave={save}
                            arrVarNames={["111111111", "2222222222", "3", "44444", "5", "6"]}
                            onClose={props.onClose}/>);
}

type Props = {};
export default function WidgetSelect(props: Props) {
    const [selectedWidget, setSelectedWidget] =
        useState<WidgetName | null>(null);

    function onClose() {
        setSelectedWidget(null);
    }

    const widgets: { [ind in WidgetName]: React.ReactNode } = {
        templateEdit: widgetTemplateEdit({onClose})
    }
    const buttonsText: { [ind in WidgetName]: React.ReactNode } = {
        templateEdit: "Message template editor"
    }

    const widgetsButtonsList = (
        <div className={styles.selectWidgetWrapper}>
            {(Object.keys(widgets) as WidgetName[]).map(
                (w, ind) =>
                    <BigWidgetButton key={ind}
                                     onClick={() => setSelectedWidget(w)}>{buttonsText[w]}</BigWidgetButton>
            )}
        </div>
    )

    return (
        <div className={styles.wrapper}>
            {selectedWidget ? widgets[selectedWidget] : widgetsButtonsList}
        </div>
    );
}
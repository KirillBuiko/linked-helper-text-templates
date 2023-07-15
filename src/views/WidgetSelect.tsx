"use client"
import * as React from 'react';
import {WidgetName} from "@/types/WidgetsTypes";
import styles from './WidgetSelect.module.scss';
import {useState} from "react";
import WidgetTemplateEdit from "@/components/widget-template-edit/WidgetTemplateEdit";
import BigWidgetButton from "@/controls/BigWidgetButton";

function widgetTemplateEdit() {
    // TODO: create functions for widgetTemplate
    async function save(template: string) {

    }

    return (<WidgetTemplateEdit callbackSave={save} arrVarNames={["1", "2", "3"]}/>);
}

type Props = {};
export default function WidgetSelect(props: Props) {
    const [selectedWidget, setSelectedWidget] =
        useState<WidgetName | null>(null);

    const widgets: { [ind in WidgetName]: React.ReactNode } = {
        templateEdit: widgetTemplateEdit()
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
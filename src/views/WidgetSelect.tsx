"use client"
import * as React from 'react';
import {WidgetName} from "@/types/WidgetsTypes";
import styles from './WidgetSelect.module.scss';
import {useState} from "react";
import WidgetTemplateEdit from "@/components/widget-template-edit/WidgetTemplateEdit";
import BigWidgetButton from "@/components/controls/BigWidgetButton";
import {TemplateTree} from "@/utils/TemplateTree";

function widgetTemplateEdit(props: { onClose: () => void }) {
    const arrVarNames =
        localStorage.arrVarNames
            ? JSON.parse(localStorage.arrVarNames)
            : ["firstname", "lastname", "company", "position"];
    const template =
        localStorage.template
            ? JSON.parse(localStorage.template)
            : null;

    async function save(arrVarNames: string[], template: TemplateTree) {
        localStorage.setItem("arrVarNames", JSON.stringify(arrVarNames));
        localStorage.setItem("template", JSON.stringify(template));
    }

    return (
        <WidgetTemplateEdit arrVarNames={arrVarNames}
                            template={template}
                            callbackSave={save}
                            onClose={props.onClose}/>
    );
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
"use client"
import * as React from 'react';
import {WidgetName} from "@/types/WidgetsTypes";
import styles from './WidgetSelect.module.scss';
import {useEffect, useState} from "react";
import WidgetTemplateEdit from "@/components/widget-template-edit/WidgetTemplateEdit";
import BigWidgetButton from "@/components/controls/BigWidgetButton";
import {TemplateTree} from "@/utils/TemplateTree";

function WidgetTemplateEditWrapper(props: { onClose: () => void }) {
    const [arrVarNames, setArrVarNames] =
        useState(["firstname", "lastname", "company", "position"]);

    const [template, setTemplate] =
        useState<TemplateTree | null>(null);

    useEffect(() => {
        setTemplate(localStorage.template
            ? JSON.parse(localStorage.template)
            : null);

        setArrVarNames(localStorage.arrVarNames
            ? JSON.parse(localStorage.arrVarNames)
            : ["firstname", "lastname", "company", "position"]
        );
    }, [setTemplate, setArrVarNames]);

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

export default function WidgetSelect() {
    // State of selected widget name
    const [selectedWidget, setSelectedWidget] =
        useState<WidgetName | null>(null);

    // Close widget
    function onClose() {
        setSelectedWidget(null);
    }

    // Object with widget elements
    const widgets: { [ind in WidgetName]: React.ReactNode } = {
        templateEdit: WidgetTemplateEditWrapper({onClose})
    }

    // Object with widget button texts
    const buttonsText: { [ind in WidgetName]: React.ReactNode } = {
        templateEdit: "Message template editor"
    }

    // Map widget names to widget open buttons
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
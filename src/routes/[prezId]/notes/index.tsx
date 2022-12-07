import {component$, useContext, useStyles$} from "@builder.io/qwik";
import {DocumentHead} from "@builder.io/qwik-city";
import Notes from "~/components/notes";
import Presentation from "~/components/presentation/presentation";
import styles from "./notes.scss?inline";
import {PrezPagesContext} from "~/components/data";
import {PrezControlsContext} from "~/components/controls/controls";
import Timeline from "~/components/timeline/timeline";

export default component$(() => {
    useStyles$(styles);

    const presentation = useContext(PrezPagesContext);
    const controls = useContext(PrezControlsContext);

    const actualPage = presentation.pages[controls.actual];
    const nextPage = presentation.pages[controls.actual + 1];

    return (
        <div class={'main-note'}>
            <div className={'sub-note'}>
                <Notes></Notes>
            </div>
            <div className={'sub-current'}>
                <h2>Current Slide</h2>
                <div className={'current'}>
                    <Presentation page={actualPage}></Presentation>
                </div>
            </div>
            <div className={'sub-next'}>
                <h2>Next Slide</h2>
                <div class={'next'}>
                    <Presentation page={nextPage}></Presentation>
                </div>
            </div>
            <div className={'sub-tempo'}>
                <Timeline/>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: 'Prez - Notes',
    meta: [
        {
            name: 'description',
            content: 'Qwik presentation list',
        },
    ],
};
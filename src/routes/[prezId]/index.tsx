import {component$, useContext} from "@builder.io/qwik";
import {DocumentHead} from "@builder.io/qwik-city";
import Presentation from "~/components/presentation";
import {PrezPagesContext} from "~/components/data";
import {PrezControlsContext} from "~/components/controls/controls";

export default component$(() => {
    const presentation = useContext(PrezPagesContext);
    const controls = useContext(PrezControlsContext);

    const actualPage = presentation.pages[controls.actual];

    return (
        <Presentation page={actualPage}></Presentation>
    );
});

export const head: DocumentHead = {
    title: 'Prez - Presentation',
    meta: [
        {
            name: 'description',
            content: 'Qwik presentation list',
        },
    ],
};


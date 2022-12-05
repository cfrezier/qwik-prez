import {component$} from "@builder.io/qwik";
import {PrezPage} from "~/routes/model.prez.interface";
import {DocumentHead} from "@builder.io/qwik-city";
import Presentation from "~/components/presentation";

export interface PrezPages {
    pages: PrezPage[];
    notes: (string[] | undefined)[];
    durations: number[];
}

export default component$(() => {
    return (
        <Presentation></Presentation>
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


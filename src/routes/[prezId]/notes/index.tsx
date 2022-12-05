import {component$} from "@builder.io/qwik";
import {DocumentHead} from "@builder.io/qwik-city";
import Notes from "~/components/notes";

export default component$(() => {
    return (
        <Notes></Notes>
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
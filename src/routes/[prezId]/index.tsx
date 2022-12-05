import {component$} from "@builder.io/qwik";
import {DocumentHead} from "@builder.io/qwik-city";
import Presentation from "~/components/presentation";

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


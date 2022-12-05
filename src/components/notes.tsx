import {component$, useContext} from "@builder.io/qwik";
import {PrezControlsContext} from "~/components/controls";
import {PrezPagesContext} from "~/components/data";

export default component$(() => {

    const presentation = useContext(PrezPagesContext);
    const controls = useContext(PrezControlsContext);
    const actualPage = presentation.pages[controls.actual];

    return (
        <div>
            <h1>{actualPage.title}</h1>
            { !actualPage.notes &&
                <p>Pas de notes</p>
            }
            <ul>
            { actualPage.notes?.map((item) => <li>{item}</li>)}
            </ul>
            <p>{controls.actual + 1} / {presentation.pages.length}</p>
            <p>{controls.elapsed}s</p>
        </div>
    );
});
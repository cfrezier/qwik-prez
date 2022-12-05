import {component$, useContext} from "@builder.io/qwik";
import {PrezControlsContext} from "~/components/controls/controls";
import {PrezPagesContext} from "~/components/data";

export default component$(() => {

    const presentation = useContext(PrezPagesContext);
    const controls = useContext(PrezControlsContext);
    const actualPage = presentation.pages[controls.actual];

    return (
        <div>
            <h1>Notes</h1>
            { !actualPage.notes &&
                <p>Pas de notes</p>
            }
            <ul>
            { actualPage.notes?.map((item) => <li>{item}</li>)}
            </ul>
        </div>
    );
});
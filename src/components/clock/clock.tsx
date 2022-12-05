import {component$, useContext, useStylesScoped$} from '@builder.io/qwik';
import {PrezControlsContext} from "~/components/controls/controls";
import {PrezPagesContext} from "~/components/data";
import styles from "./clock.scss?inline";
import {useLocation} from "@builder.io/qwik-city";

export default component$(() => {
    useStylesScoped$(styles);

    const controls = useContext(PrezControlsContext);
    const presentation = useContext(PrezPagesContext);

    const isNotes = useLocation().href.indexOf('notes') >= 0;

    return (
        <>
            {presentation.loaded && isNotes &&
                <p>{(Math.floor(controls.elapsed / 60) + '').padStart(2, '0')}:{(controls.elapsed % 60 + '').padStart(2, '0')}</p>
            }
        </>
    );
});
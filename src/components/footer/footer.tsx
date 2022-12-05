import {component$, useContext, useStylesScoped$} from '@builder.io/qwik';
import {PrezPresentator} from "~/routes/model.prez.interface";
import {PrezPresentatorContext} from "~/routes/presentator";
import {PrezControlsContext} from "~/components/controls/controls";
import {PrezPagesContext} from "~/components/data";
import styles from "./footer.scss?inline";
import {useLocation} from "@builder.io/qwik-city";
import Clock from "~/components/clock/clock";

export default component$(() => {
    useStylesScoped$(styles);

    const presentator = useContext<PrezPresentator>(PrezPresentatorContext);
    const controls = useContext(PrezControlsContext);
    const presentation = useContext(PrezPagesContext);

    const isNotes = useLocation().href.indexOf('notes') >= 0;

    return (
        <footer>
            <a href={'https://twitter.com/' + presentator.author} target="_blank">
                {presentator.author}
            </a>
            {presentation.loaded &&
                <p>{controls.actual + 1} / {presentation.pages.length}</p>
            }
            <Clock/>
        </footer>
    );
});
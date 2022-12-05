import {component$, useContext, useStylesScoped$} from '@builder.io/qwik';
import styles from './header.scss?inline';
import {PrezPresentator} from "~/routes/model.prez.interface";
import {PrezPresentatorContext} from "~/routes/presentator";

export default component$(() => {
    useStylesScoped$(styles);

    const presentator = useContext<PrezPresentator>(PrezPresentatorContext);

    return (
        <header>
            <div className="logo">
                <a href="https://qwik.builder.io/" target="_blank">
                    <img src={presentator.logo}></img>
                </a>
            </div>
        </header>
    );
});

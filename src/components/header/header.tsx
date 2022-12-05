import {component$, useContext, useStylesScoped$} from '@builder.io/qwik';
import styles from './header.scss?inline';
import {PrezPresentator} from "~/routes/model.prez.interface";
import {PrezPresentatorContext} from "~/routes/presentator";
import {useLocation} from "@builder.io/qwik-city";

export default component$(() => {
    useStylesScoped$(styles);

    const id = useLocation().params['prezId'];
    const presentator = useContext<PrezPresentator>(PrezPresentatorContext);

    return (
        <header>
            <div className="logo">
                <a href="https://qwik.builder.io/" target="_blank">
                    <img src={presentator.logo}></img>
                </a>
            </div>
            {!!id &&
                <p>{id}</p>
            }
        </header>
    );
});

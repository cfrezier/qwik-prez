import {component$, useContext} from '@builder.io/qwik';
import {PrezPresentator} from "~/routes/model.prez.interface";
import {PrezPresentatorContext} from "~/routes/presentator";

export default component$(() => {
    const presentator = useContext<PrezPresentator>(PrezPresentatorContext);

    return (
        <footer>
            <a href={'https://twitter.com/' + presentator.author} target="_blank">
                {presentator.author}
            </a>
        </footer>
    );
});
import {component$, useContext} from "@builder.io/qwik";
import {PrezControlsContext} from "~/components/controls";
import {PrezPageList, PrezPageText} from "~/routes/model.prez.interface";
import {PrezPagesContext} from "~/components/data";

export default component$(() => {

    const presentation = useContext(PrezPagesContext);

    const controls = useContext(PrezControlsContext);

    const actualPage = presentation.pages[controls.actual];

    return (
        <div>
            <h1>{actualPage.title}</h1>
            {!!actualPage &&
                <div>
                    {actualPage.type === 'list' &&
                        <ul>
                            {(actualPage as PrezPageList).items.map((item) => <li>{item}</li>)}
                        </ul>
                    }
                    {actualPage.type === 'text' &&
                        <div>
                            {(actualPage as PrezPageText).text.map((item) => <p>{item}</p>)}
                        </div>
                    }
                </div>
            }
            <p>{controls.actual + 1} / {presentation.pages.length}</p>
            <p>{controls.elapsed}s</p>
        </div>
    );
});
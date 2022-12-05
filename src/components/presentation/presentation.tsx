import {component$, useClientEffect$, useContext, useStylesScoped$} from "@builder.io/qwik";
import hljs from "highlight.js";
import {PrezPage, PrezPageCode, PrezPageList, PrezPageMeta, PrezPageText} from "~/routes/model.prez.interface";
import {PrezControlsContext} from "~/components/controls/controls";
import styles from "highlight.js/styles/github.css?inline";
import stylesPres from "./presentation.scss?inline";
import Presentation from "~/components/presentation/presentation";

export default component$((props: { page: PrezPage }) => {
    useStylesScoped$(styles);
    useStylesScoped$(stylesPres);

    const controls = useContext(PrezControlsContext);

    useClientEffect$(({track}) => {
        track(() => controls.actual);
        setTimeout(() => {
            hljs.highlightAll();
        }, 100);
    }, {eagerness: 'load'});

    return (
        <div>
            {!!props.page &&
                <>
                    <h1>{props.page.title}</h1>
                    <div>
                        {props.page.type === 'list' &&
                            <ul>
                                {(props.page as PrezPageList).items.map((item) => <li>{item}</li>)}
                            </ul>
                        }
                        {props.page.type === 'text' &&
                            <div>
                                {(props.page as PrezPageText).text.map((item) => <p>{item}</p>)}
                            </div>
                        }
                        {props.page.type === 'code' &&
                            <pre>
                                <code className={`hljs language-${(props.page as PrezPageCode).lang}`}>
                                    {(props.page as PrezPageCode).code.join('\n')
                                        .replace(/</g, '&lt;')
                                        .replace(/>/g, '&gt;')}
                                </code>
                            </pre>
                        }
                        {props.page.type === 'meta' &&
                            <>
                                {(props.page as PrezPageMeta).pages.map(page =>
                                    <Presentation page={page}/>
                                )}
                            </>
                        }
                    </div>
                </>
            }
            {!props.page &&
                <h1>No next page</h1>
            }
        </div>
    );
});
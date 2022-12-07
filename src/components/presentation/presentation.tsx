import {component$, useClientEffect$, useContext, useStyles$, useStylesScoped$} from "@builder.io/qwik";
import hljs from "highlight.js";
import {PrezPage, PrezPageCode, PrezPageList, PrezPageMeta, PrezPageText} from "~/routes/model.prez.interface";
import {PrezControlsContext} from "~/components/controls/controls";
import hljsStyles from "highlight.js/styles/github.css?inline";
import styles from "./presentation.scss?inline";
import Presentation from "~/components/presentation/presentation";

export default component$((props: { page: PrezPage, ignoreStyle?:boolean }) => {
    useStylesScoped$(hljsStyles);
    useStyles$(styles);

    const controls = useContext(PrezControlsContext);

    useClientEffect$(({track}) => {
        track(() => controls.actual);
        setTimeout(() => {
            hljs.highlightAll();
        }, 100);
    }, {eagerness: 'load'});

    if (!props.page) {
        return <h1>No next page</h1>
    }

    useClientEffect$(({track}) => {
        track(() => props.page && props.page.background);
        if (props.ignoreStyle !== true && props.page) {
            if (props.page && props.page.background) {
                document.body.style.backgroundImage = `url(${props.page.background})`;
            } else {
                document.body.style.backgroundImage = `none`;
            }
            if (props.page && props.page.color) {
                document.body.style.color = `${props.page.color}`;
            } else {
                document.body.style.color = ``;
            }
        }
    });

    return (
        <div class={'prez'}>
            <h1 className={props.page.type === 'head' ? 'big-head' : ''}>{props.page.title}</h1>
            <div className={'prez-text'}>
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
        </div>
    );
});
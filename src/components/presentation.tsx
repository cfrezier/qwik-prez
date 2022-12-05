import {component$, useClientEffect$} from "@builder.io/qwik";
import {PrezPage, PrezPageCode, PrezPageList, PrezPageText} from "~/routes/model.prez.interface";

export default component$((props: { page: PrezPage }) => {

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
                                <code className={`langage-${(props.page as PrezPageCode).lang}`}>
                                    {(props.page as PrezPageCode).code.map((item) => <p>{item}</p>)}
                                </code>
                            </pre>
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
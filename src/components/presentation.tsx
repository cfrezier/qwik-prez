import {component$} from "@builder.io/qwik";
import {PrezPage, PrezPageList, PrezPageText} from "~/routes/model.prez.interface";

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
                    </div>
                </>
            }
            {!props.page &&
                <h1>No next page</h1>
            }
        </div>
    );
});
import {component$, createContext, Resource, useContextProvider, useResource$, useStore} from "@builder.io/qwik";
import {PrezPage} from "~/routes/model.prez.interface";
import {DocumentHead, useLocation} from "@builder.io/qwik-city";
import {url} from "~/url.constant";
import Controls from "~/routes/[prezId]/controls";
import Presentation from "~/routes/[prezId]/presentation";

export interface PrezPages {
    pages: PrezPage[];
    notes: (string[] | undefined)[];
    durations: number[];
}

export const PrezPagesContext = createContext<PrezPages>('prez-pages');

export const handleError = function (err: any) {
    console.warn(err);
    return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error'
    }));
};

export default component$(() => {

    const presentation = useStore({
        pages: [] as PrezPage[],
        notes: [] as (string[] | undefined)[],
        durations: [] as number[]
    });

    const location = useLocation();

    const presentationResource = useResource$<{ pages: PrezPage[] }>(async () => {
        const res = await (fetch(`${url}/prez/${location.params.prezId}.json`).catch(handleError));
        const response = await res.json() as { pages: PrezPage[] };
        presentation.pages = response.pages;
        presentation.notes = response.pages.map(page => page.notes);
        presentation.durations = response.pages.map(page => page.duration);
        return presentation
    });

    useContextProvider(PrezPagesContext, presentation);

    return (
        <Controls>
            <Resource
                value={presentationResource}
                onPending={() => <div>Loading...</div>}
                onRejected={() => <div>Failed to load presentation {location.params.prezId}</div>}
                onResolved={(presentation) => {
                    return <Presentation></Presentation>;
                }}
            />
        </Controls>
    );
});

export const head: DocumentHead = {
    title: 'Welcome to Qwik Presentation',
    meta: [
        {
            name: 'description',
            content: 'Qwik presentation list',
        },
    ],
};


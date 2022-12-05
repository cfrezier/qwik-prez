import {component$, createContext, Resource, Slot, useContextProvider, useResource$, useStore} from "@builder.io/qwik";
import {PrezPage} from "~/routes/model.prez.interface";
import {useLocation} from "@builder.io/qwik-city";
import {url} from "~/url.constant";

export const handleError = function (err: any) {
    console.warn(err);
    return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error'
    }));
};

export interface PrezPages {
    pages: PrezPage[];
    notes: (string[] | undefined)[];
    durations: number[];
    loaded: boolean;
}

export const PrezPagesContext = createContext<PrezPages>('prez-pages');

export default component$(() => {

    const presentation = useStore({
        pages: [] as PrezPage[],
        notes: [] as (string[] | undefined)[],
        durations: [] as number[],
        loaded: false
    });

    const location = useLocation();

    const presentationResource = useResource$<{ pages: PrezPage[] }>(async () => {
        if (location.params.prezId) {
            const res = await (fetch(`${url}/prez/${location.params.prezId}.json`).catch(handleError));
            const response = await res.json() as { pages: PrezPage[] };
            presentation.pages = response.pages;
            presentation.notes = response.pages.map(page => page.notes);
            presentation.durations = response.pages.map(page => page.duration);
            presentation.loaded = true;
        }
        return presentation
    });

    useContextProvider(PrezPagesContext, presentation);

    // div needed in order for events keyup to be detected
    return (
        <Resource
            value={presentationResource}
            onPending={() => <div>Loading...</div>}
            onRejected={() => <div>Failed to load presentation {location.params.prezId}</div>}
            onResolved={(presentation) => {
                return <Slot></Slot>;
            }}
        />
    );
});
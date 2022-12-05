import {
    component$,
    createContext,
    NoSerialize,
    Resource,
    Slot,
    useContextProvider,
    useResource$,
    useStore
} from "@builder.io/qwik";
import {handleError, PrezPages} from "~/routes/[prezId]";
import {PrezPage} from "~/routes/model.prez.interface";
import {useLocation} from "@builder.io/qwik-city";
import {url} from "~/url.constant";

export interface PrezControls {
    actual: number;
    elapsed: number;
    playing: boolean;
    bc?: NoSerialize<BroadcastChannel>;
    interval?: NoSerialize<() => void>;
}

export const PrezPagesContext = createContext<PrezPages>('prez-pages');

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
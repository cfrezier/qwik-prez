import {
    component$,
    createContext,
    Resource,
    ResourceReturn,
    Slot,
    useContextProvider,
    useResource$,
    useStore
} from '@builder.io/qwik';
import Header from '../components/header/header';
import {PrezPresentator} from "~/routes/model.prez.interface";
import {url} from "~/url.constant";

export const PrezPresentatorContext = createContext<ResourceReturn<PrezPresentator>>('prez-presentator');

export default component$(() => {
    const presentator = useStore({
        logo: '',
        author: ''
    });

    const presentatorResource = useResource$<PrezPresentator>(async () => {
        const res = await fetch(`${url}/presentator.json`);
        const response = await res.json() as PrezPresentator;
        presentator.logo = response.logo;
        presentator.author = response.author;
        console.log('received', presentator);
        return presentator;
    });

    useContextProvider(PrezPresentatorContext, presentatorResource);

    return (
        <>
            <Header/>
            <main>
                <section>
                    <Slot/>
                </section>
            </main>
            <footer>
                <Resource
                    value={presentatorResource}
                    onPending={() => <div>Loading...</div>}
                    onRejected={() => <div>Failed to load presentator data</div>}
                    onResolved={(presentator) => {
                        return (
                            <a href={'https://twitter.com/' + presentator.author} target="_blank">
                                {presentator.author}
                            </a>
                        );
                    }}
                />
            </footer>
        </>
    );
});

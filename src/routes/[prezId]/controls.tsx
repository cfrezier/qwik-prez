import {
    $,
    component$,
    createContext,
    noSerialize,
    Slot,
    useClientEffect$,
    useContext,
    useContextProvider,
    useOnDocument,
    useStore
} from "@builder.io/qwik";
import {PrezPagesContext} from "~/routes/[prezId]/index";

export interface PrezControls {
    actual: number;
    elapsed: number;
    playing: boolean;
    bc?: BroadcastChannel;
    interval?: NodeJS.Timer;
}

export const PrezControlsContext = createContext<PrezControls>('prez-controls');

export default component$(() => {
    const controls = useStore({
        actual: 0,
        elapsed: 0,
        playing: false,
        bc : undefined,
        interval: undefined
    } as PrezControls);

    const pages = useContext(PrezPagesContext);


    useClientEffect$(() => {
        controls.bc = noSerialize(new BroadcastChannel('prez'));
    }, {eagerness: 'load'});

    useOnDocument('keyup', $((_event) => {
        const event = _event as KeyboardEvent;
        switch (event.key) {
            case 'KeyA':
            case 'KeyS':
            case 'ArrowLeft':
            case 'ArrowDown':
                if (controls.actual > 0) {
                    controls.actual--;
                    controls.bc?.postMessage({type: 'actual', value: controls.actual});
                }
                break;
            case 'KeyD':
            case 'KeyW':
            case 'ArrowRight':
            case 'ArrowUp':
                if (controls.actual < pages.pages.length - 1) {
                    controls.actual++;
                    controls.bc?.postMessage({type: 'actual', value: controls.actual});
                }
                break;
            case 'KeyP':
                controls.playing = !controls.playing;
                if(controls.playing) {
                    controls.interval = noSerialize(setInterval(() => {
                        controls.elapsed++;
                        controls.bc?.postMessage({type: 'elapsed', value: controls.elapsed});
                    }, 1000));
                } else {
                    clearInterval(controls.interval);
                }
                break;
        }
    }));


    useContextProvider(PrezControlsContext, controls);

    // div needed in order for events keyup to be detected
    return (
        <div>
            <Slot></Slot>
        </div>
    );
});
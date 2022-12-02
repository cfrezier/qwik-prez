import {
    $,
    component$,
    createContext,
    NoSerialize,
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
    bc?: NoSerialize<BroadcastChannel>;
    interval?: NoSerialize<() => void>;
}

export const PrezControlsContext = createContext<PrezControls>('prez-controls');

export default component$(() => {
    const controls = useStore({
        actual: 0,
        elapsed: 0,
        playing: false,
        bc: undefined,
        interval: undefined
    } as PrezControls);

    const pages = useContext(PrezPagesContext);


    useClientEffect$(() => {
        controls.bc = noSerialize(new BroadcastChannel('prez'));

        if (controls.bc) {
            controls.bc.onmessage = (msg) => {
                switch (msg.data.type) {
                    case 'actual':
                        // @ts-ignore
                        controls.actual = msg.data.value;
                        break;
                    case 'elapsed':
                        // @ts-ignore
                        controls.elapsed = msg.data.value;
                        break;
                    case 'playing':
                        // @ts-ignore
                        controls.playing = msg.data.value;
                        if(!controls.playing) {
                            controls.interval && controls.interval();
                        }
                        break;
                }
            }
        }
    }, {eagerness: 'load'});

    useOnDocument('keyup', $((_event) => {
        const event = _event as KeyboardEvent;
        console.log('key', event);
        switch (event.code) {
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
                if (controls.playing) {
                    const tmp = setInterval(() => {
                        controls.elapsed++;
                        controls.bc?.postMessage({type: 'elapsed', value: controls.elapsed});
                    }, 1000);
                    controls.interval = noSerialize(() => clearInterval(tmp));
                    controls.bc?.postMessage({type: 'playing', value: true});
                } else {
                    controls.interval && controls.interval();
                    controls.bc?.postMessage({type: 'playing', value: false});
                }
                break;
        }
        return controls.interval;
    }));

    useContextProvider(PrezControlsContext, controls);

    // div needed in order for events keyup to be detected
    return (
        <div>
            <Slot></Slot>
        </div>
    );
});
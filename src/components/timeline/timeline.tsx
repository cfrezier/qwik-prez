import {component$, useContext, useStylesScoped$} from '@builder.io/qwik';

import styles from "./timeline.scss?inline";
import {PrezControlsContext} from "~/components/controls/controls";
import {PrezPagesContext} from "~/components/data";

export default component$(() => {
    useStylesScoped$(styles);

    const controls = useContext(PrezControlsContext);
    const presentation = useContext(PrezPagesContext);

    const plannedLength = presentation.durations.reduce((p, c) => p + c, 0);
    const currentMax = Math.max(plannedLength, controls.elapsed);

    const elapsedWidth = {
        width: Math.round(100 * Math.min(controls.elapsed, plannedLength) / currentMax) + '%'
    }

    const notElapsedWidth = {
        width: Math.max(0, Math.round(100 * (plannedLength - controls.elapsed) / plannedLength)) + '%'
    }

    const tooMuchElapsedWidth = {
        width: (controls.elapsed > plannedLength ? Math.round(100 * (controls.elapsed - plannedLength - 0.000001) / currentMax) : 0) + '%'
    }

    console.log(elapsedWidth, notElapsedWidth, tooMuchElapsedWidth);

    return (
        <>
            <div class={'elapsed'} style={elapsedWidth}></div>
            <div class={'not-elapsed'} style={notElapsedWidth}></div>
            <div class={'too-much-elapsed'} style={tooMuchElapsedWidth}></div>
            {}
        </>
    );
});
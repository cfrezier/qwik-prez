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

    const durationsUntil = [presentation.durations[0]] as number[];
    presentation.durations.reduce((a, b, i) => durationsUntil[i] = a + b);

    const tracked = (duration: number, index: number) => {
        const roundFn = index === presentation.durations.length - 1 ? Math.floor : Math.round;
        return {
            borderRight: controls.actual > index ? '2px solid green' :
                controls.elapsed > durationsUntil[index] ? '2px solid red' : '2px solid grey',
            width: roundFn(duration / currentMax * 100) + '%'
        }
    }

    return (
        <>
            <div class={'elapsed'} style={elapsedWidth}></div>
            <div class={'not-elapsed'} style={notElapsedWidth}></div>
            <div class={'too-much-elapsed'} style={tooMuchElapsedWidth}></div>
            {presentation.durations.map((duration, index) =>
                <div className={'track'} style={tracked(duration, index)} title={index + 1 + ''}></div>
            )}
        </>
    );
});
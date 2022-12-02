import {component$, Resource} from '@builder.io/qwik';
import type {DocumentHead, RequestHandler} from '@builder.io/qwik-city';
import {Link, useEndpoint} from '@builder.io/qwik-city';
import fs from 'fs';

export const onGet: RequestHandler<string[]> = async () => {
    return fs.readdirSync('./public/prez/').map(name => name.substring(0, 5));
};

export default component$(() => {
    const presentationsList = useEndpoint<string[]>();

    return (
        <div>
            <h1>
                Welcome to Qwik Presentation <span class="lightning">⚡️</span>
            </h1>
            <Resource
                value={presentationsList}
                onPending={() => <div>Loading...</div>}
                onRejected={() => <div>Error</div>}
                onResolved={(presentations) => (
                    <div>
                        <ul>
                            {presentations.map((presentation) =>
                                <li>
                                    <Link href={'./' + presentation + '/'}>{presentation}</Link>
                                    <Link href={'./' + presentation + '/notes'}>Notes</Link>
                                </li>)
                            }
                        </ul>
                    </div>
                )}
            />
        </div>
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

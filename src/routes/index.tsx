import {component$, Resource} from '@builder.io/qwik';
import type {DocumentHead, RequestHandler} from '@builder.io/qwik-city';
import {useEndpoint} from '@builder.io/qwik-city';
import fs from 'fs';

export const onGet: RequestHandler<string[]> = async () => {
    return fs.readdirSync('./public/prez/').map(name => name.substring(0, 5));
};

export default component$(() => {
    const presentationsList = useEndpoint<string[]>();

    return (
        <div>
            <h1>
                Prez listing
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
                                    <a href={'./' + presentation + '/'} className={'btn'}>{presentation}</a>
                                    <a href={'./' + presentation + '/notes'} className={'btn'} target={'_blank'}>Notes</a>
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
    title: 'Prez - listing',
    meta: [
        {
            name: 'description',
            content: 'Qwik presentation list',
        },
    ],
};

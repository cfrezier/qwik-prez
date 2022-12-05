import {component$, Resource, ResourceReturn, useContext, useStylesScoped$} from '@builder.io/qwik';
import styles from './header.scss?inline';
import {PrezPresentatorContext} from "~/routes/layout";
import {PrezPresentator} from "~/routes/model.prez.interface";

export default component$(() => {
  useStylesScoped$(styles);

  const presentatorResource = useContext<ResourceReturn<PrezPresentator>>(PrezPresentatorContext);

  return (
    <header>
        <Resource
            value={presentatorResource}
            onPending={() => <div>Loading...</div>}
            onRejected={() => <div>Failed to load presentator data</div>}
            onResolved={(presentator) => {
                return (
                    <div className="logo">
                        <a href="https://qwik.builder.io/" target="_blank">
                            <img src={presentator.logo}></img>
                        </a>
                    </div>
                );
            }}
        />
    </header>
  );
});

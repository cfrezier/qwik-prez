import {component$, Slot} from '@builder.io/qwik';
import Header from '../components/header/header';
import Footer from "~/components/footer/footer";
import Presentator from "~/routes/presentator";
import Controls from "~/components/controls/controls";
import Data from "~/components/data";

export default component$(() => {

    return (
        <Presentator>
            <Data>
                <Controls>
                    <Header/>
                    <main>
                        <section>
                            <Slot/>
                        </section>
                    </main>
                    <Footer/>
                </Controls>
            </Data>
        </Presentator>
    );
});

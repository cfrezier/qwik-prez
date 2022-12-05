import {component$, Slot} from '@builder.io/qwik';
import Footer from "~/components/footer/footer";
import Presentator from "~/routes/presentator";
import Data from "~/components/data";
import Controls from "~/components/controls";
import Header from "~/components/header/header";

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

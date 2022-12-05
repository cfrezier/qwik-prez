import {component$, Slot} from '@builder.io/qwik';
import Header from '../components/header/header';
import Footer from "~/components/footer/footer";
import Presentator from "~/routes/presentator";

export default component$(() => {

    return (
        <Presentator>
            <Header/>
            <main>
                <section>
                    <Slot/>
                </section>
            </main>
            <Footer/>
        </Presentator>
    );
});

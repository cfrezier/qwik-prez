export type PrezPage = PrezPageHead | PrezPageList | PrezPageText | PrezPageCode | PrezPageMeta | PrezPageHtml;

export interface PrezBasicPage {
    duration: number,
    type: string;
    title?: string;
    background?: string;
    color?: string;
    notes?: string[];
}

export interface PrezPageHead extends PrezBasicPage {

}

export interface PrezPageList extends PrezBasicPage {
    items: string[];
}

export interface PrezPageText extends PrezBasicPage {
    text: string[];
}

export interface PrezPageCode extends PrezBasicPage {
    code: string[];
    lang: string;
}

export interface PrezPageMeta extends PrezBasicPage {
    pages: PrezPage[];
}

export interface PrezPageHtml extends PrezBasicPage {
    html: string;
}

export interface PrezPresentator {
    logo: string;
    author: string;
}
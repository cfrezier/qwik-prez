export type PrezPage = PrezPageHead | PrezPageList | PrezPageText | PrezPageCode | PrezPageMeta;

export interface PrezBasicPage {
    duration: number,
    type: string;
    title?: string;
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

export interface PrezPresentator {
    logo: string;
    author: string;
}
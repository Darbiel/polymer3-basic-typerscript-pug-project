import { PolymerElement } from '@polymer/polymer/polymer-element';

import {html} from "@polymer/polymer/polymer-element";
import * as view from "./app.template.pug";
import * as css from "./app.scss";


export class BasicPolymerElement extends PolymerElement {
    constructor() {
        super();
    }

    static get template() {
        const stringArray = [`<style>${css.toString()}</style> ${view}`];
        return html({raw: stringArray, ...stringArray} as TemplateStringsArray);
    }

    ready() {
        super.ready()
    }
}
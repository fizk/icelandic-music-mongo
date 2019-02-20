import * as React from 'react';
import './_index.scss';
import {StatelessComponent} from "react";

export const IT = (props: any) => ( //@todo fix any
    <svg width="64px" height="64px">
        <path fill="#434244" d="M42.157,12.992v27.496c-1.072-0.805-2.4-1.287-3.844-1.287c-3.544,0-6.417,2.874-6.417,6.418
                                            c0,3.544,2.873,6.417,6.417,6.417c3.493,0,6.327-2.791,6.41-6.263h0.008v-32.78H42.157z"/>
        <path fill="#24A6DE" d="M44.73,11.625h-22.4v23.511c-1.072-0.805-2.4-1.287-3.844-1.287c-3.544,0-6.417,2.874-6.417,6.417
                                            c0,3.544,2.874,6.417,6.417,6.417c3.492,0,6.327-2.791,6.41-6.263h0.008V19.152H44.73V11.625z"/>
        <rect x="38.35" y="-2.734" transform="matrix(-0.4197 0.9077 -0.9077 -0.4197 74.432 -9.0881)" fill="#434244" width="3.542" height="43.965"/>
        <path fill="#434244" d="M32,2C15.432,2,2,15.432,2,32s13.432,30,30,30s30-13.432,30-30S48.568,2,32,2z M32,58.236
                                            c-14.612,0-26.458-11.846-26.458-26.458C5.542,17.167,17.388,5.321,32,5.321s26.458,11.846,26.458,26.458
                                            C58.458,46.391,46.612,58.236,32,58.236z"/>
    </svg>
);

export const Delete = (props: any) => ( //@todo fix any
    <svg className="icon" {...props} style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
        <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
    </svg>
);

export const Loading: StatelessComponent = () => (
    <svg height="78" width="78" viewBox="0 0 78 78">
        <g transform="translate(18, 17)">
            <circle opacity="0.2" fill="#444444" cx="19.109" cy="3.965" r="2.908">
                <animate id="animation1"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="0s;animation2.end" />
                <animate id="animation2"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation1.end" />
            </circle>
            <circle opacity="0.2" fill="#444444" cx="29.804" cy="5.656" r="2.908">
                <animate id="animation3"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="0.2s;animation4.end" />
                <animate id="animation4"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation3.end" />
            </circle>
            <circle opacity="0.2" fill="#444444" cx="37.208" cy="12.347" r="2.907">
                <animate id="animation5"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="0.4s;animation6.end" />
                <animate id="animation6"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation5.end" />
            </circle>
            <circle opacity="0.2" fill="#444444" cx="40.116" cy="22.477" r="2.908">
                <animate id="animation7"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="0.6s;animation8.end" />
                <animate id="animation8"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation7.end" />
            </circle>
            <circle opacity="0.2" fill="#444444" cx="37.823" cy="31.519" r="2.908">
                <animate id="animation9"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="0.8s;animation10.end" />
                <animate id="animation10"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation9.end" />
            </circle>
            <circle opacity="0.2" fill="#444444" cx="29.804" cy="38.853" r="2.908">
                <animate id="animation11"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="1.0s;animation12.end" />
                <animate id="animation12"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation11.end" />
            </circle>
            <circle opacity="0.2" fill="#444444" cx="19.703" cy="40.034" r="2.908">
                <animate id="animation13"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="1.2s;animation14.end" />
                <animate id="animation14"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation13.end" />
            </circle>
            <circle opacity="0.2" fill="#444444" cx="10.398" cy="36.581" r="2.908">
                <animate id="animation15"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="1.4s;animation16.end" />
                <animate id="animation16"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation15.end" />
            </circle>
            <circle opacity="0.2" fill="#444444" cx="3.881" cy="27.697" r="2.908">
                <animate id="animation17"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="1.6s;animation18.end" />
                <animate id="animation18"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation17.end" />
            </circle>
            <circle opacity="0.2" fill="#444444" cx="3.881" cy="17.07" r="2.908">
                <animate id="animation19"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="1.8s;animation20.end" />
                <animate id="animation20"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation19.end" />
            </circle>
            <circle opacity="0.2" fill="#444444" cx="10.032" cy="8.565" r="2.908">
                <animate id="animation21"
                    attributeName="opacity"
                    from="1" to="0.2" dur="0.5s"
                    begin="2.0s;animation22.end" />
                <animate id="animation22"
                    attributeName="opacity"
                    from="0.2" to="0.2" dur="1.8s"
                    begin="animation21.end" />
            </circle>

        </g>
    </svg>
)

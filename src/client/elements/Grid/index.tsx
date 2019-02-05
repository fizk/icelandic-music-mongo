import * as React from 'react';
import {StatelessComponent} from 'react';
import './_index.scss';

export const Grid: StatelessComponent<{}> = ({children, }) => (
    <div className="container">{children}</div>
);

export const Row: StatelessComponent<{head?: boolean, tail?: boolean, justify?: string}> = ({children, head, tail, justify, }) => {
    const variationsArray = ['row', ];

    if (head) {
        variationsArray.push('row--head');
    }

    if (tail) {
        variationsArray.push('row--tail');
    }

    if (justify) {
        variationsArray.push(`row justify-content-${justify}`);
    }

    return (
        <div className={variationsArray.join(' ')}>{children}</div>
    );
};

export const Column: StatelessComponent<{
    columns?: number,
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    offsetSm?: number,
    offsetMd?: number,
    offsetLg?: number,
    offsetXl?: number
}> = ({children, columns, xs, sm, md, lg, xl, offsetSm, offsetMd, offsetLg, offsetXl, }) => {
    const variationsArray = ['col', ];

    if (columns) {
        variationsArray.push(`col-${columns}`);
    }

    if (xs) {
        variationsArray.push(`col-xs-${xs}`);
    }

    if (sm) {
        variationsArray.push(`col-sm-${sm}`);
    }

    if (md) {
        variationsArray.push(`col-md-${md}`);
    }

    if (lg) {
        variationsArray.push(`col-lg-${lg}`);
    }

    if (xl) {
        variationsArray.push(`col-xl-${xl}`);
    }

    if (offsetSm) {
        variationsArray.push(`offset-sm-${offsetSm}`);
    }

    if (offsetMd) {
        variationsArray.push(`offset-md-${offsetMd}`);
    }

    if (offsetLg) {
        variationsArray.push(`offset-lg-${offsetLg}`);
    }

    if (offsetXl) {
        variationsArray.push(`offset-xl-${offsetXl}`);
    }


    return (
        <div className={variationsArray.join(' ').trim()}>{children}</div>
    );
};

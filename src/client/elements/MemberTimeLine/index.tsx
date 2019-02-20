import * as React from 'react';
import {scaleTime} from 'd3-scale';
import {timeYear} from 'd3-time';
import {validDate} from '../../helpers/date'
import {GraphQLTypes} from "../../../../@types";
import './_index.scss';

interface Props {
    albums: GraphQLTypes.Collection[];
    artists: {
        artist: GraphQLTypes.Artist;
        periods: GraphQLTypes.Period[];
    }[];
}

export default class MemberTimeLine extends React.Component<Props> {

    static defaultProps = {
        albums: [],
        artists: [],
    };

    render() {

        const width = 550;
        const padding = 16;
        const bar = 30;

        const albums = this.props.albums.filter(album => validDate(album.releaseDates)).sort((a, b) => {
            return new Date(a.releaseDates || 0).getTime() - new Date(b.releaseDates || 0).getTime();
        });

        const artistDates: string[] =  this.props.artists.map(artist => {
            return artist.periods.map(period => (
                [period.from, period.to
                    ? period.to
                    : `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`
                ]
            )).reduce((prev, current) => [...prev, ...current], [])
        }).reduce((prev, current) => ([...prev, ...current]), []);

        const albumDate: (string|undefined)[] = this.props.albums
            .map(album => album.releaseDates);

        const date: number[] = [...artistDates, ...albumDate]
            .filter(validDate)
            .map(d => new Date(d as string).getTime());

        const max = Math.max(...date);
        const min = Math.min(...date);

        const minDate = new Date(min);
        minDate.setMonth(0);
        minDate.setDate(1);
        const maxDate = new Date(max);
        maxDate.setMonth(11);
        maxDate.setDate(31);

        const scale = scaleTime().domain([minDate, maxDate]).range([0, width, ]);
        const ticks = timeYear.range(minDate, maxDate, 1);

        return (
            <svg xmlns="" width={width + 100 + (2 * padding)}
                height={(this.props.artists.length * bar) + (2 * padding)}
                viewBox={`0 0 ${width + 100 + (2 * padding)} ${(this.props.artists.length * bar) + (2 * padding)}`}>
                <g transform={`translate(100, ${padding})`}>

                    <line x1={0}
                        y1={0}
                        x2={0}
                        y2={this.props.artists.length * bar}
                        strokeWidth={1}
                        stroke={'gray'}
                        strokeDasharray={'1 4'}
                    />

                    <g>
                        {albums.map(album => (
                            <line x1={Math.round(scale(new Date(album.releaseDates!)))}
                                y1={0}
                                x2={Math.round(scale(new Date(album.releaseDates!)))}
                                y2={this.props.artists.length * bar}
                                stroke={'gray'}
                                strokeWidth={1}
                                key={`album-${album._id}`}
                            />
                        ))}
                    </g>
                    <g>
                        {this.props.artists.map((artist, i) => (
                            <g key={`artists-${i}`}>
                                {artist.periods.map(period => (
                                    <line x1={Math.round(scale(new Date(period.from)))}
                                        y1={(i * bar) + 15}
                                        x2={Math.round(scale(new Date(period.to)))}
                                        y2={(i * bar) + 15}
                                        stroke={'gray'}
                                        strokeWidth={15}
                                        key={`period-${i}`}
                                    />
                                ))}
                            </g>
                        ))}
                    </g>
                    <g transform={`translate(0, ${this.props.artists.length * bar})`}>
                        <line x1={0} y1={0} x2={width} y2={0} strokeWidth={1} stroke={'gray'} strokeDasharray={'1 4'} />
                        {ticks.map(year => (
                            <g key={`year-${year.toString()}`}>
                                <text fontSize={10}
                                    x={Math.round(scale(year))-12}
                                    y={16}>
                                    {year.getFullYear()}
                                </text>
                                <line key={`verical-${year.getTime()}`}
                                    x1={Math.round(scale(year))}
                                    y1={0}
                                    x2={Math.round(scale(year))}
                                    y2={5}
                                    strokeWidth="1"
                                    stroke="red"  />
                            </g>
                        ))}
                    </g>
                </g>
                <g transform={`translate(${padding}, ${padding})`}>
                    {this.props.artists.map((artist, i) => (
                        <text x={0} y={(i * bar) + 20} key={`artis-${i}`}>
                            {artist.artist.name}
                        </text>
                    ))}
                </g>
            </svg>
        );
    }
}



/*
 <div>
                {hasStartDate && <svg className="member-timeline" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>

                    <g>
                        {ticks.map(year => {
                            return (<line key={`verical-${year.getTime()}`} x1={Math.round(scale(year))} y1={gutter} x2={Math.round(scale(year))} y2={height - gutter - bottomStrip} strokeWidth="1" stroke="rgb(200,200,200)"  />);
                        })}
                    </g>
                    <g>
                        {albumDates.map((year, i) => {
                            return (<line key={`album-${year.getTime()}-${i}`} x1={Math.round(scale(year))} y1={gutter} x2={Math.round(scale(year))} y2={height - gutter - bottomStrip} strokeWidth="1" stroke="rgb(0,0,0)"  />);
                        })}
                    </g>
                    <g>
                        {ticks.map(year => {
                            return (<text key={`year-label-${year.getTime()}`} x={Math.round(scale(year)) - 15} y={(height - bottomStrip) + 4} fontSize={8} transform={`rotate(-90 ${Math.round(scale(year))},${height - bottomStrip})`}>{year.getFullYear()}</text>);
                        })}
                    </g>
                    <g>
                        <line x1={gutter} y1={height - gutter - bottomStrip} x2={width - gutter} y2={height - gutter - bottomStrip} strokeWidth="1" stroke="rgb(0,0,0)"  />
                    </g>
                    <g>
                        {this.props.artists.map((collection, index) => {
                            return (<g key={`group-${collection.artist._id}`} >
                                <text fontSize={8} x={gutter} y={(index * 20) + gutter + 8}>{collection.artist.name}</text>
                                {collection.periods.map(periods => {
                                    if (periods.from) {
                                        return (<rect key={periods.from} className="member-timeline__line"
                                          x={Math.round(scale(new Date(periods.from)))}
                                          y={(index * 20) + gutter}
                                          height="10"
                                          width={
                                              Math.round(scale(periods.to ? new Date(periods.to) : new Date())) - Math.round(scale(new Date(periods.from)))
                                          }
                                        />);
                                    } else {
                                        return null;
                                    }
                                })}
                            </g>);
                        })}
                    </g>
                </svg>}
            </div>
 */

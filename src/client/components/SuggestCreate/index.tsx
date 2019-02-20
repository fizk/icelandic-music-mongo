import * as React from 'react';
import {Button} from '../../elements/Form';
import {Redirect} from 'react-router-dom';

interface Props {
    term: string;
    unit: any;
    onCreate: (contentType: any, name: string) => void;
}

interface State {
    screen: string;
    contentType: {
        type: string|undefined;
        subtype: string|undefined;
        attribute: string|undefined;
    };
    name: string;
}

class SuggestCreate extends React.Component<Props, State> {

    static defaultProps = {
        term: undefined,
        unit: undefined,
    };

    constructor(props: Props) {
        super(props);

        this.handleSelectUnit = this.handleSelectUnit.bind(this);
        this.handleSelectArtist = this.handleSelectArtist.bind(this);
        this.handleSelectAlbum = this.handleSelectAlbum.bind(this);
        this.handleSelectBand = this.handleSelectBand.bind(this);
        this.handleSelectPerson = this.handleSelectPerson.bind(this);
        this.handleSelectAlbumType = this.handleSelectAlbumType.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.state = {
            screen: 'index',
            contentType: {
                type: undefined,
                subtype: undefined,
                attribute: undefined,
            },
            name: this.props.term,
        };
    }

    handleSelectUnit() {
        this.setState({screen: 'unit-select', });
    }

    handleSelectArtist() {
        this.setState({
            screen: 'artist-select',
            contentType: {
                type: 'artist',
                subtype: undefined,
                attribute: undefined,
            },
        });
    }

    handleSelectAlbum() {
        this.setState({
            screen: 'album-select',
            contentType: {
                type: 'collection',
                subtype: 'album',
                attribute: undefined,
            },
        });
    }

    handleSelectBand() {
        this.setState({
            screen: 'got-it',
            contentType: {
                type: 'artist',
                subtype: 'group',
                attribute: undefined,
            },
        });
    }

    handleSelectPerson() {
        this.setState({
            screen: 'got-it',
            contentType: {
                type: 'artist',
                subtype: 'person',
                attribute: undefined,
            },
        });
    }

    handleSelectAlbumType(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            screen: 'got-it',
            contentType: {
                type: 'collection',
                subtype: 'album',
                attribute: event.target.value ? event.target.value : undefined,
            },
        });
    }

    handleCreate() {
        this.props.onCreate(this.state.contentType, this.state.name);
    }

    createResourcePathFromUnit(unit: any) { //@todo fix any
        switch (unit.contentType.type) {
            case 'collection':
                return `/verk/${unit._id}`;
            case 'artist':
                return `/listamenn/${unit._id}`;
            default:
                return '';
        }
    }

    render() {
        return (
            <div>{this.props.unit && <Redirect to={this.createResourcePathFromUnit(this.props.unit)} />}
                {/*{*/}
                {/*{*/}
                {/*'index': (*/}
                {/*<div>*/}
                {/*Maybe you should just create {this.props.term}*/}
                {/*<Button variations={['primary']} onClick={this.handleSelectUnit}>OK</Button>*/}
                {/*</div>*/}
                {/*),*/}
                {/*'unit-select': (*/}
                {/*<div>*/}
                {/*Is it an*/}
                {/*<Button variations={['primary', ]} onClick={this.handleSelectArtist}>Artist</Button> or an*/}
                {/*<Button variations={['primary', ]} onClick={this.handleSelectAlbum}>Album</Button>?*/}
                {/*</div>*/}
                {/*),*/}
                {/*'artist-select': (*/}
                {/*<div>*/}
                {/*Is it a*/}
                {/*<Button variations={['primary', ]} onClick={this.handleSelectBand}>Band</Button> or a*/}
                {/*<Button variations={['primary', ]} onClick={this.handleSelectPerson}>Person</Button>?*/}
                {/*</div>*/}
                {/*),*/}
                {/*'album-select': (*/}
                {/*<div>*/}
                {/*is it a*/}
                {/*<ul>*/}
                {/*<li><input name="album-type" value="" type="radio" onClick={this.handleSelectAlbumType}/> Good old Album</li>*/}
                {/*<li><input name="album-type" value="compilation" type="radio" onClick={this.handleSelectAlbumType}/> a Compilation</li>*/}
                {/*<li><input name="album-type" value="single" type="radio" onClick={this.handleSelectAlbumType}/> a Single</li>*/}
                {/*<li><input name="album-type" value="ep" type="radio" onClick={this.handleSelectAlbumType}/> or an EP</li>*/}
                {/*</ul>*/}
                {/*</div>*/}
                {/*),*/}
                {/*'got-it': (*/}
                {/*<div>*/}
                {/*Got it... and the name is <input value={this.state.name} onChange={event => this.setState({name: event.target.value})}/>*/}
                {/*<Button variations={['primary']} onClick={this.handleCreate}>Create</Button>*/}
                {/*</div>*/}
                {/*),*/}
                {/*}[this.state.screen]}*/}
            </div>
        );
    }
}

export {SuggestCreate, SuggestCreate as SuggestCreateWithState};

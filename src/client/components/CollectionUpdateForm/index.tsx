import * as React from 'react';
import {InputContainer, Input, Textarea, Button, Form} from '../../elements/Form';
import {Grid, Row, Column} from '../../elements/Grid';
import {Block, Static, Stretched} from '../../elements/Block';
import {Tab, TabList, TabContent, TabContainer, TabItem} from '../../elements/Tab';
import ReactMarkdown from 'react-markdown';
import {SelectArray, Select} from "../../elements/Form";
import {FormEvent, SyntheticEvent} from "react";

type Props = {
    collection: {
        _id: string,
        name: string,
        aka: string[],
        genres: string[],
        description: string,
        releaseDates: string,
    },
    onSubmit: () => void,
    onCancel: () => void,
}

type State = {
    genres: Array<string|undefined>
    description: string
    aka: Array<string|undefined>
}

class CollectionUpdateForm extends React.Component<Props, State> {

    static defaultProps = {
        collection: {
            _id: undefined,
            name: undefined,
            releaseDates: undefined,
        },
        onSubmit: () => {},
        onCancel: () => {},
    };

    constructor(props: Props) {
        super(props);

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        this.handleAddGenre = this.handleAddGenre.bind(this);
        this.handleRemoveGenre = this.handleRemoveGenre.bind(this);
        this.handleChangeGenre = this.handleChangeGenre.bind(this);

        this.handleChangeAka = this.handleChangeAka.bind(this);
        this.handleAddAka = this.handleAddAka.bind(this);
        this.handleRemoveAka = this.handleRemoveAka.bind(this);

        this.state = {
            description: this.props.collection.description,
            genres: (this.props.collection.genres || []).length === 0 ? [undefined, ] : this.props.collection.genres,
            aka: (this.props.collection.aka || []).length === 0 ? [undefined, ] : this.props.collection.aka,
        };
    }

    handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) { //@hmmm change-event
        this.setState({description: event.target.value, });
    }

    handleAddGenre() {
        this.setState({
            genres: [
                ...this.state.genres,
                undefined,
            ],
        });
    }

    handleRemoveGenre(index: number) {
        this.setState({
            genres: [
                ...this.state.genres.slice(0, index),
                ...this.state.genres.slice(index + 1),
            ],
        });
    }

    handleChangeGenre(value: string, index: number) {
        this.setState({
            genres: [
                ...this.state.genres.slice(0, index),
                value,
                ...this.state.genres.slice(index + 2),
            ],
        });
    }

    handleChangeAka(value: string, index: number) {
        this.setState({
            aka: [
                ...this.state.aka.slice(0, index),
                value,
                ...this.state.aka.slice(index + 2),
            ],
        });
    }

    handleAddAka() {
        this.setState({
            aka: [
                ...this.state.aka,
                undefined,
            ],
        });
    }

    handleRemoveAka(index: number) {
        this.setState({
            aka: [
                ...this.state.aka.slice(0, index),
                ...this.state.aka.slice(index + 1),
            ],
        });
    }

    render() {
        return (
            <Form variations={['stretch', ]} onSubmit={this.props.onSubmit}>
                <Block>
                    <Static>
                        <div style={{backgroundColor: '#ffe082', padding: '25px', }}>
                            <span onClick={this.props.onCancel}>Close</span>
                        </div>
                    </Static>
                    <Static>
                        <Grid>
                            <Row>
                                <Column>
                                    <InputContainer label="name">
                                        <Input name="name" type="text" variations={['md', 'elastic', ]} defaultValue={this.props.collection.name}/>
                                    </InputContainer>

                                    <InputContainer label="releaseDates">
                                        <Input variations={['md']} name="releaseDates" type="text" defaultValue={this.props.collection.releaseDates}/>
                                    </InputContainer>
                                </Column>
                                <Column>
                                    <InputContainer label="aka">
                                        <SelectArray
                                            onChange={this.handleChangeAka}
                                            onAdd={this.handleAddAka}
                                            onRemove={this.handleRemoveAka}>
                                            {this.state.aka.map((alias, i) => (
                                                <Input key={i} variations={['md', 'elastic']} name="aka" defaultValue={alias}/>
                                            ))}
                                        </SelectArray>
                                    </InputContainer>

                                    <InputContainer label="Genre">
                                        <SelectArray
                                            onChange={this.handleChangeGenre}
                                            onAdd={this.handleAddGenre}
                                            onRemove={this.handleRemoveGenre}>
                                            {this.state.genres.map((genre, i) => (
                                                <Select key={`genre-${i}`} defaultValue={genre} name="genre" variations={['md', 'elastic', ]}>
                                                    <option value={undefined}>-</option>
                                                    <option value="Blues">Blues</option>
                                                    <option value="Classical">Classical</option>
                                                    <option value="Country">Country</option>
                                                    <option value="Electronic">Electronic</option>
                                                    <option value="Folk">Folk</option>
                                                    <option value="Hip-hop">Hip-hop</option>
                                                    <option value="International">International</option>
                                                    <option value="Jazz">Jazz</option>
                                                    <option value="Latin">Latin</option>
                                                    <option value="Pop/Rock">Pop/Rock</option>
                                                    <option value="R&B">R&amp;B</option>
                                                    <option value="Rap">Rap</option>
                                                    <option value="Reggae">Reggae</option>
                                                </Select>
                                            ))}
                                        </SelectArray>
                                    </InputContainer>
                                </Column>
                            </Row>
                        </Grid>
                    </Static>
                    <Stretched>
                        <TabContainer variations={['stretch', ]}>
                            <TabList>
                                <Tab>Edit</Tab>
                                <Tab>View</Tab>
                            </TabList>
                            <TabContent>
                                <TabItem>
                                    <Textarea variations={['md', 'elastic', 'stretch', ]}
                                        onChange={this.handleDescriptionChange}
                                        name="description"
                                        defaultValue={this.props.collection.description} />
                                </TabItem>
                                <TabItem>
                                    <div style={{height: '100%', padding: '16px', backgroundColor: 'white', color: 'black', boxSizing: 'border-box', overflowY: 'auto'}}>
                                        <ReactMarkdown className="mark-down-container" source={this.state.description || ''} />
                                    </div>
                                </TabItem>
                            </TabContent>
                        </TabContainer>
                    </Stretched>
                    <Static>
                        <Grid>
                            <Row>
                                <Column>
                                    <Button variations={['secondary']}>Submit!</Button>
                                </Column>
                            </Row>
                        </Grid>
                    </Static>
                </Block>

            </Form>
        );
    }
}

export {CollectionUpdateForm};

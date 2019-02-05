import * as React from 'react';
import {Link} from 'react-router-dom';
// import {OptionsWithKeyBinding, OptionsItem} from '../../elements/Options';
// import {SuggestItemAvatar, SuggestItem} from '../../elements/Suggest';
// import {SuggestCreateWithState} from '../../components/SuggestCreate';
import {Grid, Column, Row} from '../../elements/Grid';
import {IT} from '../../elements/Icons';
import {SyntheticEvent} from "react";

type Props = {
    searchResults?: {
        _id: string,
        name: string,
        contentType: {
            type: string,
        },
        avatar: {
            url: string,
            base64: string,
        },
    }[],
    user: {
        id: string,
        name: string,
        url: string,
    },
    onFullSearch: (term: string) => void,
    onFullSearchClear: () => void,
    onLoginStatus: () => void,
    onLogin: () => void,
    onLogout: () => void,
}

class Chrome extends React.Component<Props> {
    static defaultProps = {
        searchResults: [],
        user: {
            id: undefined,
            name: undefined,
            url: undefined,
        },
        onFullSearch: () => {},
        onFullSearchClear: () => {},
        onLoginStatus: () => {},
        onLogin: () => {},
        onLogout: () => {},
    };

    constructor(props: Props) {
        super(props);

        this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
        this.props.onLoginStatus();
    }

    handleLogin(event: SyntheticEvent<MouseEvent>) {
        event.preventDefault();
        this.props.onLogin();
    }

    handleLogOut(event: SyntheticEvent<MouseEvent>) {
        event.preventDefault();
        this.props.onLogout();
    }

    handleSearchOnChange(term: string) {
        this.props.onFullSearch(term);
    }

    render() {
        return (
            <div>
                <header>
                    <div style={{maxWidth: '1024px', margin: 'auto'}}>
                        <Grid>
                            <Row>
                                <Column>
                                    <Link to="/">
                                        <IT/>
                                    </Link>
                                    {this.props.user.id && (
                                        <span>
                                            <img src={this.props.user.url} />
                                            <span onClick={() => this.handleLogOut}>Logout</span>
                                        </span>

                                    )}
                                    {!this.props.user.id && <span onClick={() => this.handleLogin}>Login</span>}
                                </Column>
                                <Column>
                                    <div style={{display: 'flex', height: '100%', alignItems: 'center'}}>
                                        {/*<OptionsWithKeyBinding*/}
                                            {/*elastic={true}*/}
                                            {/*onClear={this.props.onFullSearchClear}*/}
                                            {/*onSelect={() => {}}*/}
                                            {/*onChange={this.handleSearchOnChange}>*/}
                                            {/*{this.props.searchResults.map(item => (*/}
                                                {/*<OptionsItem key={`search-result-id-${item._id}`}>*/}
                                                    {/*{{*/}
                                                        {/*'artist': (*/}
                                                            {/*<SuggestItemAvatar avatar={<Avatar*/}
                                                                {/*src={item.avatar ? item.avatar.url : undefined}*/}
                                                                {/*base64={item.avatar ? item.avatar.base64 : undefined}/>}>*/}
                                                                {/*<Link to={`/listamenn/${item._id}`}>*/}
                                                                    {/*{item.name}*/}
                                                                {/*</Link>*/}
                                                            {/*</SuggestItemAvatar>*/}
                                                        {/*),*/}
                                                        {/*'collection': (*/}
                                                            {/*<SuggestItemAvatar avatar={<Poster*/}
                                                                {/*src={item.avatar ? item.avatar.url : undefined}*/}
                                                                {/*base64={item.avatar ? item.avatar.base64 : undefined}/>}>*/}
                                                                {/*<Link to={`/verk/${item._id}`}>*/}
                                                                    {/*{item.name}*/}
                                                                {/*</Link>*/}
                                                            {/*</SuggestItemAvatar>*/}
                                                        {/*),*/}
                                                        {/*'item': (*/}
                                                            {/*<SuggestItem>*/}
                                                                {/*<Link to={`/stak/${item._id}`}>*/}
                                                                    {/*{item.name}*/}
                                                                {/*</Link>*/}
                                                            {/*</SuggestItem>*/}
                                                        {/*),*/}
                                                        {/*'no-result': (*/}
                                                            {/*<SuggestCreateWithState term={item.term} />*/}
                                                        {/*),*/}
                                                    {/*}[item.contentType.type]}*/}
                                                {/*</OptionsItem>*/}
                                            {/*))}*/}
                                        {/*</OptionsWithKeyBinding>*/}
                                    </div>
                                </Column>
                            </Row>
                        </Grid>
                    </div>
                </header>
                <main role="main">
                    <section>
                        {this.props.children}
                    </section>
                </main>
                <footer></footer>
            </div>
        );
    }
}

export {Chrome, Chrome as ChromeWithState};

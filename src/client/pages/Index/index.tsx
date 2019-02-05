import * as React from 'react';
// import PropTypes from 'prop-types';
// import { graphql, gql, compose } from 'react-apollo';
// import {ArtistPanel, ArtistTile} from '../../elements/ArtistPanel';
// import {Grid, Column, Row} from '../../elements/Grid';
//
// class Index extends React.Component {
//     static propTypes = {
//         artists: PropTypes.arrayOf(PropTypes.shape({
//             _id: PropTypes.string,
//             name: PropTypes.string,
//             hero: PropTypes.shape({
//                 url: PropTypes.string,
//                 base64: PropTypes.string,
//             }),
//         })),
//         submit: PropTypes.func
//     };
//
//     static defaultProps = {
//         artists: [],
//         submit: () => {},
//     };
//
//     render() {
//         return (
//             <Grid>
//                 <Row>
//                     <Column>
//                         Massive search
//                     </Column>
//                 </Row>
//                 <Row>
//                     <Column>
//                         <ArtistPanel>
//                             {this.props.artists.map(artist => (
//                                 <ArtistTile artist={artist} key={`artist-id-${artist._id}`} />
//                             ))}
//                         </ArtistPanel>
//                     </Column>
//
//                 </Row>
//
//             </Grid>
//
//         );
//     }
// }
//
// const artistsQuery = gql`{
//     Highlighted {
//         _id
//         name
//         hero {
//             url
//             base64
//         }
//     }
// }`;
//
// const IndexWithData = compose(
//     graphql(artistsQuery, {
//         props: (props) => ({artists: props.data.loading === false ? props.data.Highlighted : undefined, }),
//     })
// )(Index);
//
// export {Index, IndexWithData};
//

export default () => (<div>index</div>)

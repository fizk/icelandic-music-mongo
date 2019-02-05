// import React from 'react';
// import {Options} from './Options';
//
// type Props = {
//     onClean: () => void
//     onClear: () => void
// }
// type State = {
//     index: number
// }
//
// const withKeyBinding = Component => {
//     return class extends React.Component<Props, State> {
//
//         static defaultProps = {
//             onClear: () => {},
//         };
//
//         constructor(props) {
//             super(props);
//
//             this.handleKeyListening = this.handleKeyListening.bind(this);
//
//             this.state = {
//                 index: undefined,
//             };
//         }
//
//         componentWillReceiveProps(nextProps) {
//             if (nextProps.children.length > 0 && this.state.index === undefined) {
//                 this.setState({index: 0});
//             }
//             if (this.props.children.length === 0 && nextProps.children.length > 0) {
//                 document.body.addEventListener('keydown', this.handleKeyListening);
//             } else if (this.props.children.length > 0 && nextProps.children.length === 0) {
//                 document.body.removeEventListener('keydown', this.handleKeyListening);
//             }
//         }
//
//         handleKeyListening(event) {
//             let index = undefined;
//             let keyCode = event.code || event.key || event.keyIdentifier; //Chrome || IE || Safari
//
//             switch (keyCode) {
//             case 'ArrowDown':
//             case 'Down':
//                 event.preventDefault();
//                 index = this.state.index === undefined ? 0 : this.state.index + 1;
//                 this.setState({
//                     index: (index > this.props.children.length - 1 ? this.props.children.length - 1 : index),
//                 });
//                 break;
//             case 'ArrowUp':
//             case 'Up':
//                 event.preventDefault();
//                 index = this.state.index === undefined ? 0 : this.state.index - 1;
//                 this.setState({
//                     index: (index < 0 ? 0 : index),
//                 });
//                 break;
//             case 'Enter':
//                 index = this.state.index;
//                 this.props.onSelect(this.props.children[index].props.value);
//                 this.setState({index: undefined, });
//                 break;
//             case 'Escape':
//                 this.props.onClear();
//                 this.setState({index: undefined, });
//                 break;
//             }
//
//         }
//
//         render() {
//             return (<Component {...this.props} index={this.state.index}/>);
//         }
//     };
// };
//
// const OptionsWithKeyBinding = withKeyBinding(Options);
//
// export {OptionsWithKeyBinding};

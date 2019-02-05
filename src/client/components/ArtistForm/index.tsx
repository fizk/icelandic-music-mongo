import * as React from 'react';
import Input from '../../elements/Form/Input';
import Form from '../../elements/Form/Form';
import TextArea from '../../elements/Form/Textarea';
import './_index.scss';

export default class ArtistForm extends React.Component {
    render() {
        return (
            <div className="artist-form">
                <Form>
                    <div>
                        <label>Name</label>
                        <Input />
                    </div>
                    <div>
                        <label>AKA</label>
                        <Input />
                    </div>
                    <div>
                        <label>Description</label>
                        <TextArea />
                    </div>
                    <div>
                        <label>periods</label>
                        <Input />
                    </div>
                    <div>
                        <label>genres</label>
                        <Input />
                    </div>
                </Form>
            </div>
        );
    }
}

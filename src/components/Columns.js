import Context from '../lib/pdf-context';

export default class Columns extends Context.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <columns>
                {this.props}
            </columns>
        );
    }
};
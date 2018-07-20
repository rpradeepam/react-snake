import React from 'react'

export class Cell extends React.PureComponent {
    render() {
        return (
            <div className={this.props.snake ? "cell snake" : 'cell'}>
                {/* TODO */}
            </div>
        );
    }
}
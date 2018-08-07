import React from 'react'

export class Cell extends React.PureComponent {
    render() {
        let className = "cell";
        switch (this.props.snake) {
            case 1:
                className = "cell snake";
                break;
            case 2:
                className = "cell head";
                break;
            case 3:
                className = "cell rat";
                break;

            default:
                className = "cell";
                break;
        }

        return (
            <div className={className}>
                {/* TODO */}
            </div>
        );
    }
}
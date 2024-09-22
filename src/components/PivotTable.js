import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css'; // Import default styles
import TableRenderers from 'react-pivottable/TableRenderers';

class PivotTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pivotState: {
        data: this.props.data, // Data passed as a prop from parent component
        rows: ['Sport'], // Initial rows for pivot table
        cols: ['Day'], // Initial columns for pivot table
        aggregatorName: 'Sum',
        vals: ['Stake'], // Initial value to aggregate
        rendererName: 'Table'
      }
    };
  }

  render() {
    return (
      <div>
        <h2>Pivot Table</h2>
        <PivotTableUI
          data={this.state.pivotState.data}
          onChange={s => this.setState({ pivotState: s })}
          {...this.state.pivotState}
          renderers={Object.assign({}, TableRenderers)}
        />
      </div>
    );
  }
}

export default PivotTable;

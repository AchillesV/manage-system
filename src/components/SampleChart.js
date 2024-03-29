import React from 'react';
import G2 from '@antv/g2';


class SampleChart extends React.Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.chart = new G2.Chart({
      container: this.containerRef,
      width: 450,
      height: 300
    })

    this.refreshChart();
  }

  refreshChart = () => {
    this.chart.source(this.props.data);
    this.chart.interval.position('genre*sold').color('genre');
    this.chart.render();
  }

  render() {
    return (
      <div ref={this.containerRef} />
    )
  }
}


export default SampleChart;
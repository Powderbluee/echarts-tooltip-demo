import './App.css'
import * as echarts from 'echarts'
import React, { useEffect, useRef } from 'react'
import { getBarOptions } from './echartsOptions'
import { useTooltip } from './useTooltip'

function App() {
  let myChart = null
  const chartRef = useRef()
  const dataOptions = {
    xAxis: {
      type: 'category',
      data: Array(30).fill('')
        .map((item, index) => `2022-03-${(index + 1) < 10 ? '0' + (index + 1) : index + 1}`),
      offset: 7
    },
    series: [
      {
        data: Array(30).fill('').map(() => {
          return {
            list: Array(10).fill('').map(() => Math.random() * 10),
            value: Math.random() * 100
          }
        }),
        type: 'line',
        smooth: true,
      },
      {
        data: Array(30).fill('').map(() => {
          return {
            list: Array(10).fill('').map(() => Math.random() * 10),
            value: Math.random() * 100
          }
        }),
        type: 'line',
        smooth: true
      }
    ]
  }
  function expandList(dataIndex, status) {
    window.tooltipSpace.data[dataIndex].status = status
    updateTooltip(dataIndex, myChart)
  }
  const { updateTooltip } = useTooltip({
    expandList: expandList,
    data: Array(30).fill({ status: -1 }),
    lastDataIndex: -1
  })

  useEffect(() => {
    if (!myChart) {
      if (!chartRef.current) {
        return
      }
      myChart = echarts.init(chartRef.current)
    }
    myChart.setOption(Object.assign(getBarOptions(), dataOptions))
  }, [])

  return (
    <div className="App">
      <div className='chart' id='chartRef' ref={chartRef}/>
    </div>
  )
}

export default App

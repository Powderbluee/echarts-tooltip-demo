import { initializeData } from './useTooltip'

export const chartColors = ['#4ea397', '#7bd9a5', '#3fb1e3', '#22c3aa']

export const getBarOptions = () => {
  const options = {
    name: '',
    type: 'line',
    color: chartColors,
    symbol: 'none',
    data: [0, 0],
    yAxisIndex: 1,
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: [
      {
        type: 'value',
      },
    ],
    tooltip: {
      trigger: 'axis',
      enterable: true,
      axisPointer: {
        z: 10,
        type: 'shadow',
      },
      valueFormatter: (value) => value.toFixed(2),
      formatter(params) {
        const dataIndex = params[0].dataIndex
        if (window.tooltipSpace.lastDataIndex !== dataIndex) {
          initializeData()
        }
        window.tooltipSpace.lastDataIndex = dataIndex
        const list = params[0]?.data?.list ?? []
        const item = (color, value, index) => {
          return `
            <div style="display: flex; justify-content: space-between;">
              <div style="display: flex; width: 70px; align-items: center">
                <span style="height: 10px; width: 10px; border-radius: 5px; background-color: ${color}"></span>
                <span style="margin-left: 5px">${value?.toFixed(2)}</span>
              </div>
              <div style="color: #3fb1e3" onclick="window.tooltipSpace.expandList(${dataIndex}, ${index})">More</div>
            </div>
              ${window.tooltipSpace?.data[dataIndex]?.status === index ?
                `<div>${list.map((listItem, listIndex) =>
                  `<div>Level ${listIndex + 1} : ${listItem.toFixed(2)}</div>`).join('')}</div>`
              :
                ''}
          `
        }
        return `
          <div style="text-align: left; line-height: 25px">
            <div>${params[0]?.axisValue}</div>
            ${params.map((param, paramIndex) => item(chartColors[paramIndex], param?.value, paramIndex)).join("")}
          </div>
        `
      },
      position: function (point, params, dom, rect, size) {
        // 提示框位置
        let x, y
        // 当前鼠标位置
        const pointX = point[0]
        const pointY = point[1]
        // 提示框尺寸
        const boxWidth = size.contentSize[0]
        const boxHeight = size.contentSize[1]
        // 容器尺寸
        const viewWidth = size.viewSize[0]
        // const viewHeight = size.viewSize[1]
        // 设置光标左右位置
        if (viewWidth - boxWidth < pointX) {
          // 光标位置 大于 容器减去提示框的位置，右边放不下，放在左侧
          x = pointX - boxWidth
        } else {
          // 默认紧贴光标右侧显示
          x = pointX
        }
        // 设置光标上下位置
        if (boxHeight < pointY) {
          // 光标位置 小于 提示框位置，上面放不下，放在下侧
          y = pointY - boxHeight
        } else {
          // 默认紧贴光标上侧显示
          y = pointY
        }
        // 记录提示框位置
        // if (window.tooltipSpace?.position) window.tooltipSpace.position = [x, y]
        return [x, y]
      }
    }
  }
  return options
}

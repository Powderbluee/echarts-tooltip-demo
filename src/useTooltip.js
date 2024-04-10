import { useEffect } from 'react'
export function useTooltip(list) {
  useEffect(() => {
    if (!window.tooltipSpace) {
      window.tooltipSpace = {}
    }
    for (const key in list) {
      window.tooltipSpace[key] = list[key]
    }
    return () => {
      delete window.tooltipSpace
    }
  }, [])
  return { updateTooltip }
}


export const updateTooltip = (dataIndex: number, chart) => {
  // 先消失后显示，以此实现数据更新
  chart.dispatchAction({
    type: 'hideTip',
    seriesIndex: 0,
    dataIndex // 第几个节点的tooltip
  })
  chart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    position: window.tooltipSpace?.position,
    dataIndex
  })
}

export const initializeData = () => {
  if (!window.tooltipSpace?.data) return
  window.tooltipSpace.data.forEach((item) => {
    item.status = -1
  })
}

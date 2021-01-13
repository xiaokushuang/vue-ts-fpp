interface options {
    label?: string;//标题
    value: string;//选中的值
}
interface condition {
    title: string;//展示标题
    value: any;//筛选结果-value
    type: string;//radio-input-checkbox-三选一
    options?: options[];//选项
}
interface sort {
    label?: string;//筛选标题
    eventName: string;//选中的值
}
export interface search {
    content: string; //搜索-value
    sort_Type: string; //排序-value
    condition?: condition[];
    sort?: sort[];
}
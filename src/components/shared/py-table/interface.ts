interface table_control_Options {
    title: string; //下拉展示名
    eventName: string; //注册响应字符串
}
interface table_config {
    label: string; //表头
    data_key: string; //配置td的key值
    width: string;//表格宽度设置
    slot_name?: string;//插槽名字
    fixed?: string;//left, right
}
interface table_control {
    title: string;//按钮名称
    eventName?: string;//注册响应字符串
    options?: table_control_Options[];//下拉框启用
}
// 配置对象
export interface config {
    table_config: table_config[];// 表格配置
    table_control: table_control[];// 表格控制
}

export interface page {
    page_count: number,
    page_size: number,
    total: number
}
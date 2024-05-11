import { layoutInteractionType } from './type'

export const setActions = (params) => ({
    type: layoutInteractionType.SET_ACTIONS,
    params
})

export const changeCollapsedSider = (collapsed) => ({
    type: layoutInteractionType.CHANGE_COLLAPSED_SIDER,
    params: collapsed
})

export const changeSearch = (search) => ({
    type: layoutInteractionType.CHANGE_SEARCH,
    params: search
})

export const onClickFilter = (filter) => ({
    type: layoutInteractionType.ON_CLICK_FILTER,
    filter
})

export const setFilerMenu = (filerMenu) => ({
    type: layoutInteractionType.SET_FILER_MENU,
    filerMenu
})

export const setHeader = (headerTitle, filerMenu) => ({
    type: layoutInteractionType.SET_HEADER,
    headerTitle: headerTitle,
    filerMenu: filerMenu
})

export const onChangeVisibleDrawer = (mode) => ({
    type: layoutInteractionType.ON_CHANGE_VISIBLE_DRAWER,
    params: mode
})

export const onChangeVisibleModal = (params) => ({
    type: layoutInteractionType.ON_CHANGE_VISIBLE_MODAL,
    params
})

export const onReloadData = (params) => ({
    type: layoutInteractionType.ON_RELOAD_DATA,
    params
})

export const onPaginationChange = (page, pageSize) => ({
    type: layoutInteractionType.ON_PAGINATION_CHANGE,
    page,
    pageSize
})

export const onSorterChange = (sorter) => ({
    type: layoutInteractionType.ON_SORTER_CHANGE,
    sorter
})

export const onChangeSuccess = (params) => ({
    type: layoutInteractionType.ON_CHANGE_SUCCESS_AXIOS,
    params
})

export const onChangeObject = (object) => ({
    type: layoutInteractionType.ON_CHANGE_OBJECT,
    object
})

export const onPaginationSortChange = (page, pageSize, sort) => ({
    type: layoutInteractionType.ON_PAGINATION_SORT_CHANGE,
    page,
    pageSize,
    sort
})

export const onChangeRepeatText = (repeatText) => ({
    type: layoutInteractionType.ON_CHANGE_REPEAT_TEXT,
    repeatText
})

export const onChangeScreenWidth = (screenWidth) => ({
    type: layoutInteractionType.ON_CHANGE_SCREEN_WIDTH,
    screenWidth
})

export const setBreadcrumb = (breadcrumb) => ({
    type: layoutInteractionType.SET_BREADCRUMB,
    breadcrumb
})

export const showSiderChat = ({ open = false, data = {} }) => ({
    type: layoutInteractionType.SHOW_SIDER_CHAT,
    payload: {
        open,
        data
    }
})

export const clearSiderChat = () => ({
    type: layoutInteractionType.CLEAR_SIDER_CHAT
})

export const setBreadcrumbTask = (breadcrumbTask) => ({
    type: layoutInteractionType.SET_BREADCRUMB_TASK,
    breadcrumbTask
})

export const changeDataButtonProcess = (reloadData) => ({
    type: layoutInteractionType.RELOAD_DATA_BUTTON_PROCESS,
    reloadData
})

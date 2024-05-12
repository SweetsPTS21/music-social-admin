import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { getTags } from '../api/tag/api'

export const TagContext = createContext(null)
export const useTagContext = () => useContext(TagContext)

const TagContextProvider = ({ children }) => {
    const [allTag, setAllTag] = useState([])
    const [tagLoading, setTagLoading] = useState(false)

    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(50)
    const [sort, setSort] = useState('createdDate,desc')

    const fetchTagData = useCallback(async (page, size, sort, searchText) => {
        setTagLoading(true)
        try {
            const res = await getTags({
                page,
                size,
                sort,
                searchText
            })
            setAllTag(res)
        } catch (error) {
            console.error('Error fetching tag:', error)
        } finally {
            setTagLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTagData(page, size, sort, searchText).then((r) => r)
    }, [])

    const changeEditModalState = (data) => {
        setEditModalState(data)
        setOpenEditModal(!openEditModal)
    }

    const changeDeleteModalState = (data) => {
        setDeleteModalState(data)
        setOpenDeleteModal(!openDeleteModal)
    }

    const changeModalMode = (mode) => {
        setModalMode(mode)
    }

    const contextValue = useMemo(() => {
        return {
            allTag,
            tagLoading,
            fetchTagData,
            openEditModal,
            editModalState,
            changeEditModalState,
            modalMode,
            changeModalMode,
            openDeleteModal,
            deleteModalState,
            changeDeleteModalState
        }
    }, [
        allTag,
        tagLoading,
        openEditModal,
        editModalState,
        modalMode,
        openDeleteModal,
        deleteModalState
    ])

    return (
        <TagContext.Provider value={contextValue}>
            {children}
        </TagContext.Provider>
    )
}

export default TagContextProvider

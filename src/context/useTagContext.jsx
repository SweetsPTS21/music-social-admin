import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react'
import { createTag, updateTag } from '../api/tag/api'
import { useManagementContext } from './useManagementContext'

export const TagContext = createContext(null)
export const useTagContext = () => useContext(TagContext)

const TagContextProvider = ({ children }) => {
    const { fetchSongTags } = useManagementContext()

    const [tagCreating, setTagCreating] = useState(false)
    const [tagUpdating, setTagUpdating] = useState(false)

    const [currentData, setCurrentData] = useState({})

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    const changeDeleteModalState = (data) => {
        setDeleteModalState(data)
        setOpenDeleteModal(!openDeleteModal)
    }

    const handleCreateTag = useCallback((data) => {
        setTagCreating(true)
        createTag(data)
            .then((res) => {
                if (res?.id) {
                    fetchSongTags()
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setTagCreating(false)
            })
    }, [])

    const handleUpdateTag = useCallback((id, data) => {
        setTagUpdating(true)
        updateTag(id, data)
            .then((res) => {
                if (res?.id) {
                    fetchSongTags()
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setTagUpdating(false)
            })
    }, [])

    const contextValue = useMemo(() => {
        return {
            currentData,
            setCurrentData,
            openDeleteModal,
            deleteModalState,
            changeDeleteModalState,
            handleUpdateTag,
            tagUpdating,
            handleCreateTag,
            tagCreating
        }
    }, [openDeleteModal, deleteModalState, tagUpdating, tagCreating])

    return (
        <TagContext.Provider value={contextValue}>
            {children}
        </TagContext.Provider>
    )
}

export default TagContextProvider

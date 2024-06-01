import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { useManagementContext } from './useManagementContext'

export const UserContext = createContext(null)
export const useUserContext = () => useContext(UserContext)

const UserContextProvider = ({ children }) => {
    const { allUsers } = useManagementContext()
    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const userId = window.location.pathname.split('/').pop()

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    useEffect(() => {
        if (userId && allUsers?.length > 0) {
            const findUser = allUsers?.find(
                (user) => user.id === Number(userId)
            )
            if (findUser) {
                changeEditModalState({
                    ...findUser,
                    image: findUser?.image?.path
                })
                changeModalMode('update')
            }
        }
    }, [userId, allUsers])

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
        openEditModal,
        editModalState,
        modalMode,
        openDeleteModal,
        deleteModalState
    ])

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider

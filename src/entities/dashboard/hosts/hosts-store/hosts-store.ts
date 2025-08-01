import { UpdateHostCommand } from '@remnawave/backend-contract'
import { devtools } from 'zustand/middleware'

import { create } from '@shared/hocs/store-wrapper'

import { IActions, IState } from './interfaces'

const initialState: IState = {
    filters: {
        configProfileUuid: null,
        inboundUuid: null
    },
    editModal: {
        isOpen: false,
        host: null,
        isLoading: false
    },
    createModal: {
        isOpen: false,
        isLoading: false
    }
}

export const useHostsStore = create<IActions & IState>()(
    devtools(
        (set) => ({
            ...initialState,
            actions: {
                toggleEditModal: (isOpen: boolean) => {
                    set((state) => ({
                        editModal: { ...state.editModal, isOpen }
                    }))
                    if (!isOpen) {
                        set((state) => ({
                            editModal: { ...state.editModal, host: null, isLoading: false }
                        }))
                    }
                },
                toggleCreateModal: (isOpen: boolean) => {
                    set((state) => ({
                        createModal: { ...state.createModal, isOpen }
                    }))
                    if (!isOpen) {
                        set((state) => ({
                            createModal: { ...state.createModal, isLoading: false }
                        }))
                    }
                },
                setHost: (host: UpdateHostCommand.Response['response']) => {
                    set((state) => ({
                        editModal: { ...state.editModal, host }
                    }))
                },
                getInitialState: () => {
                    return initialState
                },
                resetState: async () => {
                    set({ ...initialState })
                },
                setConfigProfileFilter: (configProfileUuid: null | string) => {
                    set((state) => ({
                        filters: { ...state.filters, configProfileUuid, inboundUuid: null }
                    }))
                },
                setInboundFilter: (inboundUuid: null | string) => {
                    set((state) => ({
                        filters: { ...state.filters, inboundUuid }
                    }))
                },
                resetFilters: () => {
                    set({ filters: { configProfileUuid: null, inboundUuid: null } })
                }
            }
        }),
        {
            name: 'hostsStore',
            anonymousActionType: 'hostsStore'
        }
    )
)

export const useHostsStoreActions = () => useHostsStore((store) => store.actions)

export const useHostsStoreFilters = () => useHostsStore((state) => state.filters)

export const useHostsStoreConfigProfileFilter = () =>
    useHostsStore((state) => state.filters.configProfileUuid)

export const useHostsStoreInboundFilter = () => useHostsStore((state) => state.filters.inboundUuid)

// Edit Modal
export const useHostsStoreEditModalIsOpen = () => useHostsStore((state) => state.editModal.isOpen)
export const useHostsStoreEditModalHost = () => useHostsStore((state) => state.editModal.host)
export const useHostsStoreEditModalIsLoading = () =>
    useHostsStore((state) => state.editModal.isLoading)

// Create Modal
export const useHostsStoreCreateModalIsOpen = () =>
    useHostsStore((state) => state.createModal.isOpen)
export const useHostsStoreCreateModalIsLoading = () =>
    useHostsStore((state) => state.createModal.isLoading)

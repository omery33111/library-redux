


export interface UserIns {
    uuid?: string;
    name: { 
        first: string;
        last: string;
        title: string;
    };
    email: string;
    location: {
        country: string;
        city: string;
        street: {
            name: string;
            number: number
        }
    };
    picture: { medium: string };
}



export interface UserInsState {
    users: UserIns[];

    userSearch: string;

    isLoading: boolean;

    selectedUser: UserIns;

    isEditModalOpen: boolean,
    isDeleteModalOpen: boolean,
    isPostUserFormOpen: boolean,
}
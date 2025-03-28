import { useMutation, useQueryClient } from '@tanstack/react-query';

const addUser = async (user) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
};

function AddUser() {
    const queryClient = useQueryClient();
    const mutation = useMutation(addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']); // Refetch users after adding
        },
    });
    return (
        <button onClick={() => mutation.mutate({ name: 'New User' })}>
            Add User
        </button>
    );
}